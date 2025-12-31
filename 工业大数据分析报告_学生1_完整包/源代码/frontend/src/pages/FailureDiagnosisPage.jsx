import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  Slider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
  Alert,
  Chip,
  Divider,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Troubleshoot as Diagnostic,
  Build,
  Warning,
  CheckCircle,
  Speed,
  Thermostat,
  RotateRight,
  Settings
} from '@mui/icons-material';
import ReactECharts from 'echarts-for-react';

const FailureDiagnosisPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [csvData, setCsvData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Input parameters for diagnosis
  const [inputParams, setInputParams] = useState({
    type: 'L',
    airTemp: 300,
    processTemp: 310,
    rotationalSpeed: 1500,
    torque: 40,
    toolWear: 10
  });

  const [diagnosisResult, setDiagnosisResult] = useState(null);
  const [riskLevel, setRiskLevel] = useState('unknown');
  const [similarCases, setSimilarCases] = useState([]);

  useEffect(() => {
    loadCSVData();
  }, []);

  const loadCSVData = async () => {
    try {
      const response = await fetch('http://localhost:8001/api/data/machine-data');
      if (response.ok) {
        const data = await response.json();
        setCsvData(data);
        setLoading(false);
      } else {
        throw new Error('API not available');
      }
    } catch (error) {
      loadPapaParseCSV();
    }
  };

  const loadPapaParseCSV = async () => {
    try {
      const Papa = await import('papaparse');
      const response = await fetch('/data/ai4i2020.csv');
      const text = await response.text();
      const result = Papa.parse(text, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true
      });
      setCsvData(result.data);
      setLoading(false);
    } catch (error) {
      console.error('Error loading CSV:', error);
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setInputParams({
      ...inputParams,
      [field]: value
    });
  };

  const runDiagnosis = () => {
    // Calculate similarity score based on input parameters
    const similarities = csvData.map(row => {
      let score = 0;

      // Type match (high weight)
      if (row.Type === inputParams.type) score += 30;

      // Temperature similarity (normalized difference)
      const tempDiff = Math.abs(row['Air temperature [K]'] - inputParams.airTemp) +
                       Math.abs(row['Process temperature [K]'] - inputParams.processTemp);
      score += Math.max(0, 20 - tempDiff / 2);

      // Rotational speed similarity
      const speedDiff = Math.abs(row['Rotational speed [rpm]'] - inputParams.rotationalSpeed);
      score += Math.max(0, 20 - speedDiff / 100);

      // Torque similarity
      const torqueDiff = Math.abs(row['Torque [Nm]'] - inputParams.torque);
      score += Math.max(0, 15 - torqueDiff / 3);

      // Tool wear similarity
      const wearDiff = Math.abs(row['Tool wear [min]'] - inputParams.toolWear);
      score += Math.max(0, 15 - wearDiff / 5);

      return { ...row, similarityScore: score };
    });

    // Sort by similarity and get top matches
    const topMatches = similarities
      .sort((a, b) => b.similarityScore - a.similarityScore)
      .slice(0, 10);

    setSimilarCases(topMatches);

    // Analyze failure risk from top matches
    const failureCount = topMatches.filter(m => m['Machine failure'] === 1).length;
    const failurePercentage = (failureCount / topMatches.length) * 100;

    // Determine risk level
    let risk = 'low';
    let riskLabel = '低风险';
    let riskColor = '#52c41a';
    let riskIcon = <CheckCircle />;

    if (failurePercentage > 40) {
      risk = 'high';
      riskLabel = '高风险';
      riskColor = '#ff4d4f';
      riskIcon = <Warning />;
    } else if (failurePercentage > 20) {
      risk = 'medium';
      riskLabel = '中风险';
      riskColor = '#faad14';
      riskIcon = <Warning />;
    }

    setRiskLevel(risk);

    // Analyze failure types
    const failureTypes = {
      '工具磨损故障 (TWF)': topMatches.reduce((sum, m) => sum + (m.TWF || 0), 0),
      '散热故障 (HDF)': topMatches.reduce((sum, m) => sum + (m.HDF || 0), 0),
      '功率故障 (PWF)': topMatches.reduce((sum, m) => sum + (m.PWF || 0), 0),
      '过载故障 (OSF)': topMatches.reduce((sum, m) => sum + (m.OSF || 0), 0),
      '随机故障 (RNF)': topMatches.reduce((sum, m) => sum + (m.RNF || 0), 0)
    };

    const likelyFailures = Object.entries(failureTypes)
      .filter(([_, count]) => count > 0)
      .sort(([_, a], [__, b]) => b - a)
      .map(([name, count]) => name);

    setDiagnosisResult({
      riskLevel: risk,
      riskLabel,
      riskColor,
      riskIcon,
      failurePercentage: failurePercentage.toFixed(1),
      failureCount,
      totalAnalyzed: topMatches.length,
      likelyFailures,
      avgToolWear: (topMatches.reduce((sum, m) => sum + m['Tool wear [min]'], 0) / topMatches.length).toFixed(1),
      recommendations: getRecommendations(inputParams, risk, likelyFailures)
    });
  };

  const getRecommendations = (params, risk, failures) => {
    const recommendations = [];

    // Tool wear recommendations
    if (params.toolWear > 150) {
      recommendations.push({
        priority: 'high',
        category: '工具维护',
        message: '工具磨损严重，建议立即更换工具'
      });
    } else if (params.toolWear > 100) {
      recommendations.push({
        priority: 'medium',
        category: '工具维护',
        message: '工具磨损较高，计划近期更换'
      });
    }

    // Temperature recommendations
    if (params.airTemp > 305) {
      recommendations.push({
        priority: 'high',
        category: '温度控制',
        message: '空气温度过高，检查冷却系统'
      });
    }

    // Rotational speed recommendations
    if (params.rotationalSpeed > 2000) {
      recommendations.push({
        priority: 'medium',
        category: '速度调节',
        message: '转速较高，考虑降低以减少磨损'
      });
    }

    // Torque recommendations
    if (params.torque > 60) {
      recommendations.push({
        priority: 'medium',
        category: '负载管理',
        message: '扭矩过大，可能导致过载故障'
      });
    }

    // Risk-based recommendations
    if (risk === 'high') {
      recommendations.push({
        priority: 'high',
        category: '综合建议',
        message: '当前参数组合存在高风险，建议立即停机检查'
      });
    } else if (risk === 'medium') {
      recommendations.push({
        priority: 'medium',
        category: '综合建议',
        message: '存在一定故障风险，建议加强监控'
      });
    }

    // Failure-specific recommendations
    failures.forEach(failure => {
      if (failure.includes('TWF')) {
        recommendations.push({
          priority: 'medium',
          category: '预防性维护',
          message: '注意工具磨损故障风险，定期检查工具状态'
        });
      }
      if (failure.includes('HDF')) {
        recommendations.push({
          priority: 'high',
          category: '散热系统',
          message: '存在散热故障风险，检查散热片和冷却液'
        });
      }
      if (failure.includes('PWF')) {
        recommendations.push({
          priority: 'high',
          category: '电源系统',
          message: '存在功率故障风险，检查电源供应'
        });
      }
      if (failure.includes('OSF')) {
        recommendations.push({
          priority: 'high',
          category: '过载保护',
          message: '存在过载故障风险，检查负载分配'
        });
      }
    });

    return recommendations.slice(0, 5);
  };

  const getRadarChartOption = () => {
    if (!diagnosisResult) return {};

    const maxValues = {
      airTemp: Math.max(...csvData.map(d => d['Air temperature [K]'])),
      processTemp: Math.max(...csvData.map(d => d['Process temperature [K]'])),
      rotationalSpeed: Math.max(...csvData.map(d => d['Rotational speed [rpm]'])),
      torque: Math.max(...csvData.map(d => d['Torque [Nm]'])),
      toolWear: Math.max(...csvData.map(d => d['Tool wear [min]']))
    };

    return {
      title: {
        text: '参数指标评估',
        left: 'center',
        textStyle: {
          fontSize: isMobile ? 14 : 16,
          fontWeight: 'bold',
          color: '#fff'
        }
      },
      tooltip: {},
      radar: {
        indicator: [
          { name: '空气温度', max: maxValues.airTemp || 310 },
          { name: '工艺温度', max: maxValues.processTemp || 315 },
          { name: '转速', max: maxValues.rotationalSpeed || 3000 },
          { name: '扭矩', max: maxValues.torque || 80 },
          { name: '工具磨损', max: maxValues.toolWear || 250 }
        ],
        splitArea: {
          show: true,
          areaStyle: {
            color: ['rgba(24,144,255,0.1)', 'rgba(24,144,255,0.05)']
          }
        },
        axisLine: {
          lineStyle: {
            color: 'rgba(255,255,255,0.2)'
          }
        },
        splitLine: {
          lineStyle: {
            color: 'rgba(255,255,255,0.1)'
          }
        },
        name: {
          textStyle: {
            color: 'rgba(255,255,255,0.7)',
            fontSize: isMobile ? 10 : 12
          }
        }
      },
      series: [{
        name: '当前参数',
        type: 'radar',
        data: [{
          value: [
            inputParams.airTemp,
            inputParams.processTemp,
            inputParams.rotationalSpeed,
            inputParams.torque,
            inputParams.toolWear
          ],
          name: '当前配置',
          itemStyle: {
            color: '#1890ff'
          },
          areaStyle: {
            color: 'rgba(24,144,255,0.3)'
          }
        }],
        lineStyle: {
          width: 2
        },
        symbol: 'circle',
        symbolSize: 6
      }]
    };
  };

  const getSimilarCasesOption = () => {
    if (similarCases.length === 0) return {};

    return {
      title: {
        text: '相似案例故障分布',
        left: 'center',
        textStyle: {
          fontSize: isMobile ? 14 : 16,
          fontWeight: 'bold',
          color: '#fff'
        }
      },
      tooltip: {
        trigger: 'item'
      },
      series: [{
        name: '故障状态',
        type: 'pie',
        radius: ['40%', '65%'],
        center: ['50%', '50%'],
        data: [
          {
            value: similarCases.filter(c => c['Machine failure'] === 0).length,
            name: '正常运行',
            itemStyle: { color: '#52c41a' }
          },
          {
            value: similarCases.filter(c => c['Machine failure'] === 1).length,
            name: '发生故障',
            itemStyle: { color: '#ff4d4f' }
          }
        ],
        label: {
          fontSize: 12,
          color: '#ccc'
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }]
    };
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography sx={{ color: '#fff' }}>加载诊断系统...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: isMobile ? 1 : 3 }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant={isMobile ? 'h5' : 'h4'} component="h1" sx={{ fontWeight: 700, color: '#fff', mb: 0.5 }}>
          <Diagnostic sx={{ verticalAlign: 'middle', mr: 1, color: '#1890ff' }} />
          设备故障智能诊断
        </Typography>
        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)' }}>
          基于历史数据的AI故障预测系统
        </Typography>
      </Box>

      <Grid container spacing={isMobile ? 2 : 3}>
        {/* Left Panel - Input Parameters */}
        <Grid item xs={12} md={5} lg={4}>
          <Paper sx={{ p: 3, borderRadius: 3, bgcolor: 'rgba(26,26,46,0.8)', border: '1px solid rgba(24,144,255,0.2)', height: 'fit-content' }}>
            <Typography variant="h6" sx={{ color: '#fff', mb: 3, display: 'flex', alignItems: 'center' }}>
              <Settings sx={{ mr: 1, color: '#1890ff' }} />
              输入设备参数
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12}>
                <FormControl fullWidth size="small">
                  <InputLabel sx={{ color: 'rgba(255,255,255,0.7)' }}>产品类型</InputLabel>
                  <Select
                    value={inputParams.type}
                    label="产品类型"
                    onChange={(e) => handleInputChange('type', e.target.value)}
                    sx={{ color: '#fff' }}
                  >
                    <MenuItem value="L">L型 (低质量)</MenuItem>
                    <MenuItem value="M">M型 (中等质量)</MenuItem>
                    <MenuItem value="H">H型 (高质量)</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', mb: 1, display: 'flex', alignItems: 'center' }}>
                  <Thermostat sx={{ mr: 1, fontSize: 18 }} />
                  空气温度: {inputParams.airTemp} K
                </Typography>
                <Slider
                  value={inputParams.airTemp}
                  onChange={(e, v) => handleInputChange('airTemp', v)}
                  min={295}
                  max={305}
                  step={0.1}
                  sx={{ color: '#1890ff' }}
                />
              </Grid>

              <Grid item xs={12}>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', mb: 1, display: 'flex', alignItems: 'center' }}>
                  <Thermostat sx={{ mr: 1, fontSize: 18 }} />
                  工艺温度: {inputParams.processTemp} K
                </Typography>
                <Slider
                  value={inputParams.processTemp}
                  onChange={(e, v) => handleInputChange('processTemp', v)}
                  min={305}
                  max={315}
                  step={0.1}
                  sx={{ color: '#fa8c16' }}
                />
              </Grid>

              <Grid item xs={12}>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', mb: 1, display: 'flex', alignItems: 'center' }}>
                  <RotateRight sx={{ mr: 1, fontSize: 18 }} />
                  转速: {inputParams.rotationalSpeed} rpm
                </Typography>
                <Slider
                  value={inputParams.rotationalSpeed}
                  onChange={(e, v) => handleInputChange('rotationalSpeed', v)}
                  min={1100}
                  max={3000}
                  step={10}
                  sx={{ color: '#52c41a' }}
                />
              </Grid>

              <Grid item xs={12}>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', mb: 1, display: 'flex', alignItems: 'center' }}>
                  <Speed sx={{ mr: 1, fontSize: 18 }} />
                  扭矩: {inputParams.torque} Nm
                </Typography>
                <Slider
                  value={inputParams.torque}
                  onChange={(e, v) => handleInputChange('torque', v)}
                  min={10}
                  max={80}
                  step={1}
                  sx={{ color: '#722ed1' }}
                />
              </Grid>

              <Grid item xs={12}>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', mb: 1, display: 'flex', alignItems: 'center' }}>
                  <Build sx={{ mr: 1, fontSize: 18 }} />
                  工具磨损: {inputParams.toolWear} min
                </Typography>
                <Slider
                  value={inputParams.toolWear}
                  onChange={(e, v) => handleInputChange('toolWear', v)}
                  min={0}
                  max={250}
                  step={5}
                  sx={{ color: '#ff4d4f' }}
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={runDiagnosis}
                  startIcon={<Diagnostic />}
                  sx={{
                    py: 1.5,
                    background: 'linear-gradient(135deg, #1890ff 0%, #096dd9 100%)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #40a9ff 0%, #1890ff 100%)',
                    }
                  }}
                >
                  开始诊断分析
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Right Panel - Diagnosis Results */}
        <Grid item xs={12} md={7} lg={8}>
          {!diagnosisResult ? (
            <Paper sx={{ p: 6, borderRadius: 3, bgcolor: 'rgba(26,26,46,0.8)', border: '1px solid rgba(24,144,255,0.2)', textAlign: 'center' }}>
              <Diagnostic sx={{ fontSize: 80, color: 'rgba(24,144,255,0.3)', mb: 2 }} />
              <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.5)' }}>
                请输入设备参数并点击"开始诊断分析"
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.3)', mt: 1 }}>
                系统将基于历史数据进行智能故障预测
              </Typography>
            </Paper>
          ) : (
            <Box>
              {/* Risk Level Alert */}
              <Alert
                severity={diagnosisResult.riskLevel === 'high' ? 'error' : diagnosisResult.riskLevel === 'medium' ? 'warning' : 'success'}
                sx={{
                  mb: 3,
                  borderRadius: 2,
                  bgcolor: diagnosisResult.riskLevel === 'high' ? 'rgba(255,77,79,0.15)' :
                          diagnosisResult.riskLevel === 'medium' ? 'rgba(250,173,20,0.15)' :
                          'rgba(82,196,26,0.15)',
                  color: diagnosisResult.riskColor,
                  '& .MuiAlert-icon': { color: diagnosisResult.riskColor }
                }}
              >
                <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
                  {diagnosisResult.riskIcon}
                  <span style={{ marginLeft: 8 }}>故障风险等级: {diagnosisResult.riskLabel}</span>
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  基于相似案例分析，故障概率约为 {diagnosisResult.failurePercentage}%
                  ({diagnosisResult.failureCount}/{diagnosisResult.totalAnalyzed} 个相似案例发生故障)
                </Typography>
              </Alert>

              {/* Charts */}
              <Grid container spacing={isMobile ? 2 : 3} sx={{ mb: 3 }}>
                <Grid item xs={12} md={6}>
                  <Paper sx={{ p: 2, borderRadius: 3, bgcolor: 'rgba(26,26,46,0.8)', border: '1px solid rgba(24,144,255,0.2)' }}>
                    <ReactECharts option={getRadarChartOption()} style={{ height: 300, width: '100%' }} />
                  </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Paper sx={{ p: 2, borderRadius: 3, bgcolor: 'rgba(26,26,46,0.8)', border: '1px solid rgba(24,144,255,0.2)' }}>
                    <ReactECharts option={getSimilarCasesOption()} style={{ height: 300, width: '100%' }} />
                  </Paper>
                </Grid>
              </Grid>

              {/* Recommendations */}
              <Paper sx={{ p: 3, borderRadius: 3, bgcolor: 'rgba(26,26,46,0.8)', border: '1px solid rgba(24,144,255,0.2)', mb: 3 }}>
                <Typography variant="h6" sx={{ color: '#fff', mb: 2 }}>
                  <Build sx={{ mr: 1, color: '#1890ff', verticalAlign: 'middle' }} />
                  维护建议
                </Typography>
                <Grid container spacing={2}>
                  {diagnosisResult.recommendations.map((rec, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                      <Card
                        sx={{
                          bgcolor: rec.priority === 'high' ? 'rgba(255,77,79,0.1)' :
                                  rec.priority === 'medium' ? 'rgba(250,173,20,0.1)' :
                                  'rgba(82,196,26,0.1)',
                          border: `1px solid ${rec.priority === 'high' ? '#ff4d4f' :
                                           rec.priority === 'medium' ? '#faad14' :
                                           '#52c41a'}`,
                          borderRadius: 2
                        }}
                      >
                        <CardContent sx={{ p: 2 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <Chip
                              label={rec.priority === 'high' ? '高' : rec.priority === 'medium' ? '中' : '低'}
                              size="small"
                              sx={{
                                bgcolor: rec.priority === 'high' ? '#ff4d4f' :
                                        rec.priority === 'medium' ? '#faad14' :
                                        '#52c41a',
                                color: '#fff',
                                fontWeight: 600,
                                mr: 1
                              }}
                            />
                            <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.6)' }}>
                              {rec.category}
                            </Typography>
                          </Box>
                          <Typography variant="body2" sx={{ color: '#fff' }}>
                            {rec.message}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Paper>

              {/* Likely Failures */}
              {diagnosisResult.likelyFailures.length > 0 && (
                <Paper sx={{ p: 3, borderRadius: 3, bgcolor: 'rgba(26,26,46,0.8)', border: '1px solid rgba(24,144,255,0.2)' }}>
                  <Typography variant="h6" sx={{ color: '#fff', mb: 2 }}>
                    <Warning sx={{ mr: 1, color: '#faad14', verticalAlign: 'middle' }} />
                    可能的故障类型
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {diagnosisResult.likelyFailures.map((failure, index) => (
                      <Chip
                        key={index}
                        label={failure}
                        sx={{
                          bgcolor: 'rgba(255,77,79,0.15)',
                          color: '#ff4d4f',
                          border: '1px solid #ff4d4f',
                          fontWeight: 600
                        }}
                      />
                    ))}
                  </Box>
                </Paper>
              )}
            </Box>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default FailureDiagnosisPage;
