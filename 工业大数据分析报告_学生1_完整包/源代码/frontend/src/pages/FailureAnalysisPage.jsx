import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Paper,
  useTheme,
  useMediaQuery,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination
} from '@mui/material';
import {
  GridOn as HeatmapIcon,
  TrendingUp,
  Warning,
  Speed
} from '@mui/icons-material';
import ReactECharts from 'echarts-for-react';

const FailureAnalysisPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  const [csvData, setCsvData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState('all');
  const [selectedLoad, setSelectedLoad] = useState('all');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [analysisData, setAnalysisData] = useState({
    typeStats: { L: 0, M: 0, H: 0 },
    failureByType: {},
    tempStats: { min: 0, max: 0, avg: 0 },
    rotationStats: { min: 0, max: 0, avg: 0 },
    torqueStats: { min: 0, max: 0, avg: 0 },
    toolWearStats: { min: 0, max: 0, avg: 0 }
  });

  useEffect(() => {
    loadCSVData();
  }, []);

  const loadCSVData = async () => {
    try {
      const response = await fetch('http://localhost:8001/api/data/machine-data');
      if (response.ok) {
        const data = await response.json();
        processData(data);
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
      processData(result.data);
    } catch (error) {
      console.error('Error loading CSV:', error);
      setLoading(false);
    }
  };

  const processData = (data) => {
    setCsvData(data);

    // Calculate type statistics
    const typeStats = { L: 0, M: 0, H: 0 };
    const failureByType = { L: 0, M: 0, H: 0 };

    const temps = [];
    const rotations = [];
    const torques = [];
    const toolWears = [];

    data.forEach(row => {
      typeStats[row.Type] = (typeStats[row.Type] || 0) + 1;
      if (row['Machine failure'] === 1) {
        failureByType[row.Type] = (failureByType[row.Type] || 0) + 1;
      }
      temps.push(row['Air temperature [K]']);
      rotations.push(row['Rotational speed [rpm]']);
      torques.push(row['Torque [Nm]']);
      toolWears.push(row['Tool wear [min]']);
    });

    const calcStats = (arr) => ({
      min: Math.min(...arr),
      max: Math.max(...arr),
      avg: (arr.reduce((a, b) => a + b, 0) / arr.length).toFixed(2)
    });

    setAnalysisData({
      typeStats,
      failureByType,
      tempStats: calcStats(temps),
      rotationStats: calcStats(rotations),
      torqueStats: calcStats(torques),
      toolWearStats: calcStats(toolWears)
    });
    setLoading(false);
  };

  const getFilteredData = () => {
    return csvData.filter(row => {
      const typeMatch = selectedType === 'all' || row.Type === selectedType;
      const loadMatch = selectedLoad === 'all' || row['Load_Level'] === selectedLoad;
      return typeMatch && loadMatch;
    });
  };

  const getCorrelationHeatmapOption = () => {
    const filteredData = getFilteredData().slice(0, 1000);

    // Calculate correlations
    const params = [
      'Air temperature [K]',
      'Process temperature [K]',
      'Rotational speed [rpm]',
      'Torque [Nm]',
      'Tool wear [min]'
    ];

    const paramNames = ['空气温度', '工艺温度', '转速', '扭矩', '工具磨损'];

    const correlationMatrix = [];
    for (let i = 0; i < params.length; i++) {
      for (let j = 0; j < params.length; j++) {
        if (i === j) {
          correlationMatrix.push([i, j, 1]);
        } else {
          const xValues = filteredData.map(d => d[params[i]]);
          const yValues = filteredData.map(d => d[params[j]]);
          const correlation = calculateCorrelation(xValues, yValues);
          correlationMatrix.push([i, j, correlation]);
        }
      }
    }

    return {
      title: {
        text: '参数相关性热力图',
        left: 'center',
        textStyle: {
          fontSize: isMobile ? 14 : 18,
          fontWeight: 'bold',
          color: '#fff'
        }
      },
      tooltip: {
        position: 'top',
        formatter: (params) => {
          const x = paramNames[params.value[0]];
          const y = paramNames[params.value[1]];
          const val = params.value[2].toFixed(3);
          return `${x} vs ${y}<br/>相关系数: ${val}`;
        }
      },
      grid: {
        height: '70%',
        top: '15%',
        bottom: '5%'
      },
      xAxis: {
        type: 'category',
        data: paramNames,
        splitArea: {
          show: true
        },
        axisLabel: {
          rotate: isMobile ? 45 : 0,
          fontSize: isMobile ? 10 : 12,
          color: '#999'
        },
        axisLine: {
          lineStyle: {
            color: 'rgba(255,255,255,0.1)'
          }
        }
      },
      yAxis: {
        type: 'category',
        data: paramNames,
        splitArea: {
          show: true
        },
        axisLabel: {
          fontSize: isMobile ? 10 : 12,
          color: '#999'
        },
        axisLine: {
          lineStyle: {
            color: 'rgba(255,255,255,0.1)'
          }
        }
      },
      visualMap: {
        min: -1,
        max: 1,
        calculable: true,
        orient: isMobile ? 'horizontal' : 'vertical',
        left: isMobile ? 'center' : 'right',
        bottom: isMobile ? '0%' : '5%',
        inRange: {
          color: ['#1890ff', '#e6f7ff', '#ffffff', '#ffe6e6', '#ff4d4f']
        },
        textStyle: {
          color: '#999'
        }
      },
      series: [{
        name: '相关系数',
        type: 'heatmap',
        data: correlationMatrix,
        label: {
          show: !isMobile,
          fontSize: isMobile ? 9 : 11,
          formatter: (params) => params.value[2].toFixed(2),
          color: '#333'
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }]
    };
  };

  const calculateCorrelation = (x, y) => {
    const n = x.length;
    const meanX = x.reduce((a, b) => a + b, 0) / n;
    const meanY = y.reduce((a, b) => a + b, 0) / n;
    let num = 0, denX = 0, denY = 0;
    for (let i = 0; i < n; i++) {
      num += (x[i] - meanX) * (y[i] - meanY);
      denX += (x[i] - meanX) ** 2;
      denY += (y[i] - meanY) ** 2;
    }
    return num / Math.sqrt(denX * denY);
  };

  const getFailureByTypeOption = () => {
    return {
      title: {
        text: '各类型产品故障率',
        left: 'center',
        textStyle: {
          fontSize: isMobile ? 14 : 18,
          fontWeight: 'bold',
          color: '#fff'
        }
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        },
        formatter: '{b}<br/>故障率: {c}%'
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: isMobile ? '15%' : '3%',
        top: '15%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: ['L型 (低质量)', 'M型 (中等质量)', 'H型 (高质量)'],
        axisLabel: {
          rotate: isMobile ? 45 : 0,
          fontSize: isMobile ? 10 : 12,
          color: '#999'
        },
        axisLine: {
          lineStyle: {
            color: 'rgba(255,255,255,0.1)'
          }
        }
      },
      yAxis: {
        type: 'value',
        name: '故障率 (%)',
        nameTextStyle: {
          fontSize: isMobile ? 10 : 12,
          color: '#999'
        },
        axisLabel: {
          fontSize: isMobile ? 10 : 12,
          color: '#999'
        },
        axisLine: {
          lineStyle: {
            color: 'rgba(255,255,255,0.1)'
          }
        },
        splitLine: {
          lineStyle: {
            color: 'rgba(255,255,255,0.05)'
          }
        }
      },
      series: [
        {
          name: '故障率',
          type: 'bar',
          data: [
            {
              value: ((analysisData.failureByType.L / analysisData.typeStats.L) * 100).toFixed(2),
              itemStyle: { color: '#1890ff' }
            },
            {
              value: ((analysisData.failureByType.M / analysisData.typeStats.M) * 100).toFixed(2),
              itemStyle: { color: '#52c41a' }
            },
            {
              value: ((analysisData.failureByType.H / analysisData.typeStats.H) * 100).toFixed(2),
              itemStyle: { color: '#faad14' }
            }
          ],
          barWidth: '50%',
          itemStyle: {
            borderRadius: [6, 6, 0, 0]
          }
        }
      ]
    };
  };

  const getFailureCausePieOption = () => {
    const filteredData = getFilteredData();
    const causes = {
      '工具磨损(TWF)': filteredData.reduce((sum, row) => sum + (row.TWF || 0), 0),
      '散热故障(HDF)': filteredData.reduce((sum, row) => sum + (row.HDF || 0), 0),
      '功率故障(PWF)': filteredData.reduce((sum, row) => sum + (row.PWF || 0), 0),
      '过载故障(OSF)': filteredData.reduce((sum, row) => sum + (row.OSF || 0), 0),
      '随机故障(RNF)': filteredData.reduce((sum, row) => sum + (row.RNF || 0), 0)
    };

    return {
      title: {
        text: '故障原因分布',
        left: 'center',
        textStyle: {
          fontSize: isMobile ? 14 : 18,
          fontWeight: 'bold',
          color: '#fff'
        }
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: isMobile ? 'horizontal' : 'vertical',
        left: isMobile ? 'center' : 'right',
        bottom: isMobile ? '5%' : 'middle',
        textStyle: {
          fontSize: isMobile ? 10 : 12,
          color: '#999'
        }
      },
      series: [
        {
          name: '故障类型',
          type: 'pie',
          radius: isMobile ? ['35%', '60%'] : ['40%', '65%'],
          center: isMobile ? ['50%', '45%'] : ['35%', '50%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 8,
            borderColor: '#1a1a2e',
            borderWidth: 2
          },
          label: {
            show: !isMobile,
            formatter: '{b}\n{d}%',
            fontSize: 11,
            color: '#ccc'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 14,
              fontWeight: 'bold'
            }
          },
          data: Object.entries(causes).map(([name, value], index) => ({
            value,
            name,
            itemStyle: {
              color: ['#722ed1', '#eb2f96', '#fa8c16', '#f5222d', '#13c2c2'][index]
            }
          }))
        }
      ]
    };
  };

  const getFilteredFailures = () => {
    const filtered = getFilteredData().filter(row => row['Machine failure'] === 1);
    return filtered.slice(page * rowsPerPage, (page + 1) * rowsPerPage);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography sx={{ color: '#fff' }}>加载分析数据中...</Typography>
      </Box>
    );
  }

  const filteredFailures = getFilteredData().filter(row => row['Machine failure'] === 1);

  return (
    <Box sx={{ p: isMobile ? 1 : 3 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3, flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant={isMobile ? 'h5' : 'h4'} component="h1" sx={{ fontWeight: 700, color: '#fff', mb: 0.5 }}>
            故障分析
          </Typography>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)' }}>
            深度分析设备故障原因与关联性
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel sx={{ color: 'rgba(255,255,255,0.7)' }}>产品类型</InputLabel>
            <Select
              value={selectedType}
              label="产品类型"
              onChange={(e) => setSelectedType(e.target.value)}
              sx={{
                color: '#fff',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(24,144,255,0.3)'
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#1890ff'
                }
              }}
            >
              <MenuItem value="all">全部类型</MenuItem>
              <MenuItem value="L">L型 (低质量)</MenuItem>
              <MenuItem value="M">M型 (中等质量)</MenuItem>
              <MenuItem value="H">H型 (高质量)</MenuItem>
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel sx={{ color: 'rgba(255,255,255,0.7)' }}>负载等级</InputLabel>
            <Select
              value={selectedLoad}
              label="负载等级"
              onChange={(e) => setSelectedLoad(e.target.value)}
              sx={{
                color: '#fff',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(24,144,255,0.3)'
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#1890ff'
                }
              }}
            >
              <MenuItem value="all">全部负载</MenuItem>
              <MenuItem value="轻负载">轻负载</MenuItem>
              <MenuItem value="中负载">中负载</MenuItem>
              <MenuItem value="重负载">重负载</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      {/* Statistics Cards */}
      <Grid container spacing={isMobile ? 2 : 3} sx={{ mb: 3 }}>
        <Grid item xs={6} sm={3}>
          <Paper sx={{ p: 2, borderRadius: 2, bgcolor: 'rgba(26,26,46,0.8)', borderLeft: '3px solid #1890ff' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <Speed sx={{ color: '#1890ff', fontSize: 20 }} />
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)' }}>总记录</Typography>
            </Box>
            <Typography variant="h5" sx={{ color: '#fff', fontWeight: 700 }}>
              {getFilteredData().length}
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={6} sm={3}>
          <Paper sx={{ p: 2, borderRadius: 2, bgcolor: 'rgba(26,26,46,0.8)', borderLeft: '3px solid #ff4d4f' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <Warning sx={{ color: '#ff4d4f', fontSize: 20 }} />
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)' }}>故障数</Typography>
            </Box>
            <Typography variant="h5" sx={{ color: '#ff4d4f', fontWeight: 700 }}>
              {filteredFailures.length}
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={6} sm={3}>
          <Paper sx={{ p: 2, borderRadius: 2, bgcolor: 'rgba(26,26,46,0.8)', borderLeft: '3px solid #faad14' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <TrendingUp sx={{ color: '#faad14', fontSize: 20 }} />
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)' }}>故障率</Typography>
            </Box>
            <Typography variant="h5" sx={{ color: '#faad14', fontWeight: 700 }}>
              {((filteredFailures.length / getFilteredData().length) * 100).toFixed(2)}%
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={6} sm={3}>
          <Paper sx={{ p: 2, borderRadius: 2, bgcolor: 'rgba(26,26,46,0.8)', borderLeft: '3px solid #52c41a' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <HeatmapIcon sx={{ color: '#52c41a', fontSize: 20 }} />
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)' }}>正常数</Typography>
            </Box>
            <Typography variant="h5" sx={{ color: '#52c41a', fontWeight: 700 }}>
              {getFilteredData().length - filteredFailures.length}
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Charts */}
      <Grid container spacing={isMobile ? 2 : 3} sx={{ mb: 3 }}>
        <Grid item xs={12} lg={8}>
          <Paper sx={{ height: isMobile ? 350 : 450, borderRadius: 3, bgcolor: 'rgba(26,26,46,0.8)', border: '1px solid rgba(24,144,255,0.2)' }}>
            <ReactECharts option={getCorrelationHeatmapOption()} style={{ height: '100%', width: '100%' }} />
          </Paper>
        </Grid>

        <Grid item xs={12} lg={4}>
          <Paper sx={{ height: isMobile ? 300 : 220, borderRadius: 3, mb: isMobile ? 2 : 0, bgcolor: 'rgba(26,26,46,0.8)', border: '1px solid rgba(24,144,255,0.2)' }}>
            <ReactECharts option={getFailureByTypeOption()} style={{ height: '100%', width: '100%' }} />
          </Paper>
          <Paper sx={{ height: isMobile ? 300 : 220, borderRadius: 3, mt: isMobile ? 0 : 1, bgcolor: 'rgba(26,26,46,0.8)', border: '1px solid rgba(24,144,255,0.2)' }}>
            <ReactECharts option={getFailureCausePieOption()} style={{ height: '100%', width: '100%' }} />
          </Paper>
        </Grid>
      </Grid>

      {/* Failure Records Table */}
      <Paper sx={{ borderRadius: 3, bgcolor: 'rgba(26,26,46,0.8)', border: '1px solid rgba(24,144,255,0.2)' }}>
        <Box sx={{ p: 2, borderBottom: '1px solid rgba(24,144,255,0.2)' }}>
          <Typography variant="h6" sx={{ color: '#fff', fontWeight: 600 }}>
            故障记录详情 ({filteredFailures.length} 条)
          </Typography>
        </Box>
        <TableContainer>
          <Table size={isMobile ? 'small' : 'medium'}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>UDI</TableCell>
                <TableCell sx={{ color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>产品ID</TableCell>
                <TableCell sx={{ color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>类型</TableCell>
                <TableCell sx={{ color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>空气温度</TableCell>
                <TableCell sx={{ color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>转速</TableCell>
                <TableCell sx={{ color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>扭矩</TableCell>
                <TableCell sx={{ color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>工具磨损</TableCell>
                <TableCell sx={{ color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>故障类型</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredFailures.slice(page * rowsPerPage, (page + 1) * rowsPerPage).map((row, index) => (
                <TableRow key={index} hover sx={{ '&:hover': { bgcolor: 'rgba(24,144,255,0.1)' } }}>
                  <TableCell sx={{ color: '#ccc' }}>{row.UDI}</TableCell>
                  <TableCell sx={{ color: '#ccc' }}>{row['Product ID']}</TableCell>
                  <TableCell>
                    <Chip
                      label={row.Type}
                      size="small"
                      sx={{
                        bgcolor: row.Type === 'L' ? 'rgba(24,144,255,0.2)' :
                               row.Type === 'M' ? 'rgba(82,196,26,0.2)' : 'rgba(250,173,20,0.2)',
                        color: row.Type === 'L' ? '#1890ff' :
                               row.Type === 'M' ? '#52c41a' : '#faad14',
                        fontWeight: 600
                      }}
                    />
                  </TableCell>
                  <TableCell sx={{ color: '#ccc' }}>{row['Air temperature [K]']} K</TableCell>
                  <TableCell sx={{ color: '#ccc' }}>{row['Rotational speed [rpm]']} rpm</TableCell>
                  <TableCell sx={{ color: '#ccc' }}>{row['Torque [Nm]']} Nm</TableCell>
                  <TableCell sx={{ color: '#ccc' }}>{row['Tool wear [min]']} min</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                      {row.TWF === 1 && <Chip label="TWF" size="small" sx={{ bgcolor: 'rgba(114,46,209,0.2)', color: '#722ed1', fontSize: 10 }} />}
                      {row.HDF === 1 && <Chip label="HDF" size="small" sx={{ bgcolor: 'rgba(235,47,150,0.2)', color: '#eb2f96', fontSize: 10 }} />}
                      {row.PWF === 1 && <Chip label="PWF" size="small" sx={{ bgcolor: 'rgba(250,140,22,0.2)', color: '#fa8c16', fontSize: 10 }} />}
                      {row.OSF === 1 && <Chip label="OSF" size="small" sx={{ bgcolor: 'rgba(245,34,45,0.2)', color: '#f5222d', fontSize: 10 }} />}
                      {row.RNF === 1 && <Chip label="RNF" size="small" sx={{ bgcolor: 'rgba(19,194,194,0.2)', color: '#13c2c2', fontSize: 10 }} />}
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50]}
          component="div"
          count={filteredFailures.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="每页行数:"
          labelDisplayedRows={({ from, to, count }) => `${from}-${to} 共 ${count}`}
          sx={{
            color: 'rgba(255,255,255,0.7)',
            '& .MuiTablePagination-select': { color: 'rgba(255,255,255,0.7)' },
            '& .MuiTablePagination-selectIcon': { color: 'rgba(255,255,255,0.7)' },
            '& .MuiTablePagination-actions': { color: '#1890ff' }
          }}
        />
      </Paper>
    </Box>
  );
};

export default FailureAnalysisPage;
