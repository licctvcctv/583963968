import React, { useEffect, useState } from 'react';
import {
  Container,
  Box,
  Paper,
  Grid,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  LinearProgress,
  ToggleButton,
  ToggleButtonGroup,
  Tabs,
  Tab
} from '@mui/material';
import {
  ShowChart,
  Psychology,
  Analytics,
  Speed,
  CheckCircle,
  Warning,
  Error,
  TrendingUp
} from '@mui/icons-material';
import ReactECharts from 'echarts-for-react';
import { styled } from "@mui/material/styles";
import { getPredictionData, getEquipmentHealthData, generateMaintenanceData } from '../data/maintenanceData';

const MainContainer = styled(Container)`
  padding-top: 24px;
  padding-bottom: 40px;
`;

const StatCard = styled(Paper)`
  padding: 24px;
  border-radius: 16px;
  background: linear-gradient(135deg, rgba(114, 46, 209, 0.05) 0%, rgba(114, 46, 209, 0.02) 100%);
  border: 1px solid rgba(114, 46, 209, 0.1);
  transition: all 0.3s ease;
  height: 100%;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(114, 46, 209, 0.15);
  }
`;

const ChartCard = styled(Paper)`
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  height: 100%;
`;

const FailureProbChip = ({ prob }) => {
  if (prob < 0.3) {
    return <Chip label="低风险" size="small" sx={{ bgcolor: '#f6ffed', color: '#52c41a', border: '1px solid #52c41a', fontWeight: 500 }} />;
  } else if (prob < 0.6) {
    return <Chip label="中风险" size="small" sx={{ bgcolor: '#fffbe6', color: '#faad14', border: '1px solid #faad14', fontWeight: 500 }} />;
  } else {
    return <Chip label="高风险" size="small" sx={{ bgcolor: '#fff1f0', color: '#ff4d4f', border: '1px solid #ff4d4f', fontWeight: 500 }} />;
  }
};

const TabPanel = ({ children, value, index }) => {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box>{children}</Box>}
    </div>
  );
};

const PredictionModelPage = () => {
  const [predictionData, setPredictionData] = useState(null);
  const [equipmentData, setEquipmentData] = useState([]);
  const [liveData, setLiveData] = useState([]);
  const [tabValue, setTabValue] = useState(0);
  const [selectedModel, setSelectedModel] = useState('random_forest');

  useEffect(() => {
    setPredictionData(getPredictionData());
    setEquipmentData(getEquipmentHealthData());
    setLiveData(generateMaintenanceData(30));
  }, []);

  if (!predictionData) return null;

  // Model Performance Chart
  const modelPerformanceOption = {
    title: {
      text: '模型性能对比',
      left: 'center',
      textStyle: { fontSize: 16, fontWeight: 600, color: '#262626' }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' }
    },
    legend: {
      data: ['准确率', '精确率', '召回率', 'F1分数'],
      top: 30
    },
    xAxis: {
      type: 'category',
      data: predictionData.modelPerformance.map(m => m.model)
    },
    yAxis: {
      type: 'value',
      max: 100,
      axisLabel: { formatter: '{value}%' }
    },
    series: [
      {
        name: '准确率',
        type: 'bar',
        data: predictionData.modelPerformance.map(m => m.accuracy),
        itemStyle: { color: '#722ed1', borderRadius: [4, 4, 0, 0] }
      },
      {
        name: '精确率',
        type: 'bar',
        data: predictionData.modelPerformance.map(m => m.precision),
        itemStyle: { color: '#13c2c2', borderRadius: [4, 4, 0, 0] }
      },
      {
        name: '召回率',
        type: 'bar',
        data: predictionData.modelPerformance.map(m => m.recall),
        itemStyle: { color: '#52c41a', borderRadius: [4, 4, 0, 0] }
      },
      {
        name: 'F1分数',
        type: 'bar',
        data: predictionData.modelPerformance.map(m => m.f1Score),
        itemStyle: { color: '#faad14', borderRadius: [4, 4, 0, 0] }
      }
    ],
    grid: { left: 60, right: 30, bottom: 30, top: 80 }
  };

  // Feature Importance Chart
  const featureImportanceOption = {
    title: {
      text: '特征重要性分析',
      left: 'center',
      textStyle: { fontSize: 16, fontWeight: 600, color: '#262626' }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' }
    },
    xAxis: {
      type: 'value',
      max: 0.4,
      axisLabel: { formatter: '{value}' }
    },
    yAxis: {
      type: 'category',
      data: predictionData.featureImportance.map(f => f.feature)
    },
    series: [{
      type: 'bar',
      data: predictionData.featureImportance.map(f => ({
        value: f.importance,
        itemStyle: {
          color: new Array(6).fill(0).map((_, i) => {
            const colors = ['#722ed1', '#9254de', '#b37feb', '#d3adf7', '#efdbff', '#f9f0ff'];
            return colors[i];
          })
        }
      })),
      barWidth: '50%',
      itemStyle: { borderRadius: [0, 8, 8, 0] },
      label: {
        show: true,
        position: 'right',
        formatter: '{c}',
        color: '#722ed1',
        fontWeight: 600
      }
    }],
    grid: { left: 120, right: 50, bottom: 30, top: 60 }
  };

  // Confusion Matrix Heatmap
  const confusionMatrixOption = {
    title: {
      text: '混淆矩阵 - 随机森林',
      left: 'center',
      textStyle: { fontSize: 16, fontWeight: 600, color: '#262626' }
    },
    tooltip: {
      position: 'top',
      formatter: (params) => {
        return `预测: ${params.name}<br/>实际: ${params.name}<br/>数量: ${params.value[2]}`;
      }
    },
    xAxis: {
      type: 'category',
      data: ['正常', '故障'],
      axisLabel: { fontSize: 12 }
    },
    yAxis: {
      type: 'category',
      data: ['正常', '故障'],
      axisLabel: { fontSize: 12 }
    },
    visualMap: {
      min: 0,
      max: 9000,
      calculable: true,
      orient: 'horizontal',
      left: 'center',
      bottom: 10,
      inRange: {
        color: ['#f9f0ff', '#722ed1']
      }
    },
    series: [{
      type: 'heatmap',
      data: [
        [0, 0, 9657],
        [1, 0, 43],
        [0, 1, 113],
        [1, 1, 187]
      ],
      label: {
        show: true,
        formatter: '{c}',
        fontSize: 14,
        fontWeight: 600
      },
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }],
    grid: { left: 80, right: 30, bottom: 60, top: 60 }
  };

  // Failure Probability Trend
  const failureTrendOption = {
    title: {
      text: '故障概率趋势',
      left: 'center',
      textStyle: { fontSize: 16, fontWeight: 600, color: '#262626' }
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: predictionData.predictions.slice(0, 5).map(p => p.equipment),
      top: 30
    },
    xAxis: {
      type: 'category',
      data: ['当前', '+7天', '+14天', '+21天', '+30天']
    },
    yAxis: {
      type: 'value',
      max: 100,
      axisLabel: { formatter: '{value}%' }
    },
    series: predictionData.predictions.slice(0, 5).map((pred, index) => ({
      name: pred.equipment,
      type: 'line',
      smooth: true,
      data: [
        pred.failureProb * 100,
        pred.failureProb * 100 * (1 + Math.random() * 0.3),
        pred.failureProb * 100 * (1 + Math.random() * 0.5),
        pred.failureProb * 100 * (1 + Math.random() * 0.7),
        pred.failureProb * 100 * (1 + Math.random())
      ],
      itemStyle: { color: ['#722ed1', '#13c2c2', '#52c41a', '#faad14', '#ff4d4f'][index] },
      areaStyle: {
        opacity: 0.3
      }
    })),
    grid: { left: 60, right: 30, bottom: 30, top: 80 }
  };

  // ROC Curve
  const rocCurveOption = {
    title: {
      text: 'ROC 曲线',
      left: 'center',
      textStyle: { fontSize: 16, fontWeight: 600, color: '#262626' }
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['随机森林 (AUC=0.94)', '逻辑回归 (AUC=0.89)', 'SVM (AUC=0.91)', '神经网络 (AUC=0.92)'],
      top: 30
    },
    xAxis: {
      type: 'value',
      name: '假阳性率',
      min: 0,
      max: 1
    },
    yAxis: {
      type: 'value',
      name: '真阳性率',
      min: 0,
      max: 1
    },
    series: [
      {
        name: '随机森林 (AUC=0.94)',
        type: 'line',
        data: [[0, 0], [0.1, 0.75], [0.2, 0.88], [0.3, 0.93], [0.4, 0.95], [0.5, 0.97], [0.6, 0.98], [0.7, 0.99], [0.8, 0.99], [0.9, 1], [1, 1]],
        itemStyle: { color: '#722ed1' },
        areaStyle: { opacity: 0.1 }
      },
      {
        name: '逻辑回归 (AUC=0.89)',
        type: 'line',
        data: [[0, 0], [0.1, 0.68], [0.2, 0.82], [0.3, 0.87], [0.4, 0.90], [0.5, 0.92], [0.6, 0.94], [0.7, 0.96], [0.8, 0.97], [0.9, 0.99], [1, 1]],
        itemStyle: { color: '#13c2c2' },
        lineStyle: { type: 'dashed' }
      },
      {
        name: 'SVM (AUC=0.91)',
        type: 'line',
        data: [[0, 0], [0.1, 0.71], [0.2, 0.85], [0.3, 0.90], [0.4, 0.93], [0.5, 0.95], [0.6, 0.96], [0.7, 0.98], [0.8, 0.98], [0.9, 0.99], [1, 1]],
        itemStyle: { color: '#52c41a' },
        lineStyle: { type: 'dotted' }
      },
      {
        name: '神经网络 (AUC=0.92)',
        type: 'line',
        data: [[0, 0], [0.1, 0.73], [0.2, 0.86], [0.3, 0.91], [0.4, 0.94], [0.5, 0.96], [0.6, 0.97], [0.7, 0.98], [0.8, 0.99], [0.9, 0.99], [1, 1]],
        itemStyle: { color: '#faad14' },
        lineStyle: { type: 'dashdot' }
      }
    ],
    grid: { left: 60, right: 30, bottom: 50, top: 80 }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <MainContainer maxWidth="xl">
      <Box mb={4}>
        <Typography variant="h4" fontWeight={700} gutterBottom sx={{ color: '#262626' }}>
          ML 预测模型
        </Typography>
        <Typography variant="body1" color="text.secondary">
          基于机器学习的设备故障预测与模型性能分析
        </Typography>
      </Box>

      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard>
            <Box display="flex" alignItems="center">
              <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: 'rgba(114, 46, 209, 0.1)', mr: 2 }}>
                <ShowChart sx={{ color: '#722ed1', fontSize: 28 }} />
              </Box>
              <Box>
                <Typography variant="h4" fontWeight={700} sx={{ color: '#722ed1' }}>
                  {predictionData.overallAccuracy}%
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  模型准确率
                </Typography>
              </Box>
            </Box>
          </StatCard>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <StatCard>
            <Box display="flex" alignItems="center">
              <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: 'rgba(19, 194, 194, 0.1)', mr: 2 }}>
                <Psychology sx={{ color: '#13c2c2', fontSize: 28 }} />
              </Box>
              <Box>
                <Typography variant="h4" fontWeight={700} sx={{ color: '#13c2c2' }}>
                  4
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ML 模型
                </Typography>
              </Box>
            </Box>
          </StatCard>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <StatCard>
            <Box display="flex" alignItems="center">
              <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: 'rgba(82, 196, 26, 0.1)', mr: 2 }}>
                <Analytics sx={{ color: '#52c41a', fontSize: 28 }} />
              </Box>
              <Box>
                <Typography variant="h4" fontWeight={700} sx={{ color: '#52c41a' }}>
                  10k
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  训练样本
                </Typography>
              </Box>
            </Box>
          </StatCard>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <StatCard>
            <Box display="flex" alignItems="center">
              <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: 'rgba(250, 173, 20, 0.1)', mr: 2 }}>
                <Speed sx={{ color: '#faad14', fontSize: 28 }} />
              </Box>
              <Box>
                <Typography variant="h4" fontWeight={700} sx={{ color: '#faad14' }}>
                  实时
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  预测更新
                </Typography>
              </Box>
            </Box>
          </StatCard>
        </Grid>
      </Grid>

      <Box mb={3}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          sx={{
            '& .MuiTab-root': {
              fontSize: '16px',
              fontWeight: 600,
              color: '#8c8c8c',
              '&.Mui-selected': { color: '#722ed1' }
            },
            '& .MuiTabs-indicator': { bgcolor: '#722ed1' }
          }}
        >
          <Tab label="模型性能" />
          <Tab label="特征分析" />
          <Tab label="预测结果" />
        </Tabs>
      </Box>

      <TabPanel value={tabValue} index={0}>
        <Grid container spacing={3}>
          <Grid item xs={12} mb={2}>
            <ChartCard>
              <ReactECharts option={modelPerformanceOption} style={{ height: 400 }} />
            </ChartCard>
          </Grid>

          <Grid item xs={12} md={6}>
            <ChartCard>
              <ReactECharts option={confusionMatrixOption} style={{ height: 400 }} />
            </ChartCard>
          </Grid>

          <Grid item xs={12} md={6}>
            <ChartCard>
              <ReactECharts option={rocCurveOption} style={{ height: 400 }} />
            </ChartCard>
          </Grid>
        </Grid>
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <ChartCard>
              <ReactECharts option={featureImportanceOption} style={{ height: 400 }} />
            </ChartCard>
          </Grid>

          <Grid item xs={12} md={6}>
            <ChartCard>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                特征说明
              </Typography>
              <Box sx={{ mt: 3 }}>
                {predictionData.featureImportance.map((feature, index) => (
                  <Box key={index} sx={{ mb: 3, p: 2, borderRadius: 2, bgcolor: 'rgba(114, 46, 209, 0.03)' }}>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                      <Typography variant="subtitle2" fontWeight={600} sx={{ color: '#722ed1' }}>
                        {feature.feature}
                      </Typography>
                      <Typography variant="body2" fontWeight={600}>
                        {(feature.importance * 100).toFixed(1)}%
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={feature.importance * 100}
                      sx={{
                        height: 8,
                        borderRadius: 4,
                        bgcolor: '#f0f0f0',
                        '& .MuiLinearProgress-bar': {
                          bgcolor: ['#722ed1', '#9254de', '#b37feb', '#d3adf7', '#efdbff', '#f9f0ff'][index],
                          borderRadius: 4,
                        }
                      }}
                    />
                  </Box>
                ))}
              </Box>
            </ChartCard>
          </Grid>
        </Grid>
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        <Grid container spacing={3}>
          <Grid item xs={12} mb={2}>
            <ChartCard>
              <ReactECharts option={failureTrendOption} style={{ height: 350 }} />
            </ChartCard>
          </Grid>

          <Grid item xs={12}>
            <ChartCard>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                设备故障预测详情
              </Typography>

              <TableContainer sx={{ mt: 2 }}>
                <Table>
                  <TableHead>
                    <TableRow sx={{ bgcolor: 'rgba(114, 46, 209, 0.05)' }}>
                      <TableCell sx={{ fontWeight: 600 }}>设备</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>故障概率</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>预测故障类型</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>预期时间</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>风险等级</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {predictionData.predictions.map((pred, index) => (
                      <TableRow key={index} hover>
                        <TableCell>
                          <Typography variant="body2" fontWeight={600} sx={{ color: '#722ed1' }}>
                            {pred.equipment}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <LinearProgress
                              variant="determinate"
                              value={pred.failureProb * 100}
                              sx={{
                                width: 100,
                                height: 8,
                                borderRadius: 4,
                                bgcolor: '#f0f0f0',
                                '& .MuiLinearProgress-bar': {
                                  bgcolor: pred.failureProb < 0.3 ? '#52c41a' : pred.failureProb < 0.6 ? '#faad14' : '#ff4d4f',
                                  borderRadius: 4,
                                }
                              }}
                            />
                            <Typography variant="body2" fontWeight={600}>
                              {(pred.failureProb * 100).toFixed(0)}%
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          {pred.predictedFailure === '无' ? (
                            <CheckCircle sx={{ color: '#52c41a', fontSize: 20 }} />
                          ) : (
                            <Typography variant="body2" sx={{ color: '#ff4d4f', fontWeight: 600 }}>
                              {pred.predictedFailure}
                            </Typography>
                          )}
                        </TableCell>
                        <TableCell>{pred.timeframe}</TableCell>
                        <TableCell>
                          <FailureProbChip prob={pred.failureProb} />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </ChartCard>
          </Grid>
        </Grid>
      </TabPanel>

      <Box mt={4} p={3} sx={{ bgcolor: 'rgba(114, 46, 209, 0.05)', borderRadius: 3, border: '1px solid rgba(114, 46, 209, 0.1)' }}>
        <Typography variant="subtitle1" fontWeight={600} gutterBottom sx={{ color: '#722ed1' }}>
          模型说明
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          本系统采用随机森林、逻辑回归、支持向量机和神经网络四种机器学习模型进行设备故障预测。
          模型基于 AI4I 2020 数据集训练，包含 10,000 个样本数据，涵盖空气温度、工艺温度、转速、扭矩、
          刀具磨损等关键特征。当前最佳模型（随机森林）准确率达到 {predictionData.overallAccuracy}%，
          可有效预测刀具磨损、散热系统故障、过载等常见设备故障类型。
        </Typography>
        <Typography variant="body2" color="text.secondary">
          特征重要性分析显示，刀具磨损（35%）、空气温度（22%）和扭矩（18%）是影响设备故障的最关键因素。
          建议优先监控这些指标，以实现更精准的预测性维护。
        </Typography>
      </Box>
    </MainContainer>
  );
};

export default PredictionModelPage;
