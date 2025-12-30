import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  useTheme,
  useMediaQuery,
  Paper,
  Chip,
  LinearProgress
} from '@mui/material';
import {
  TrendingUp,
  Warning,
  CheckCircle,
  Speed,
  PrecisionManufacturing,
  Assessment
} from '@mui/icons-material';
import ReactECharts from 'echarts-for-react';

const DashboardPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  const [csvData, setCsvData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statistics, setStatistics] = useState({
    totalRecords: 0,
    totalFailures: 0,
    failureRate: 0,
    typeL: 0,
    typeM: 0,
    typeH: 0,
    twf: 0,
    hdf: 0,
    pwf: 0,
    osf: 0,
    rnf: 0
  });

  useEffect(() => {
    loadCSVData();
  }, []);

  const loadCSVData = async () => {
    try {
      // Try to fetch from backend first
      const response = await fetch('http://localhost:8001/api/data/machine-data');
      if (response.ok) {
        const data = await response.json();
        processCSVData(data);
      } else {
        throw new Error('API not available');
      }
    } catch (error) {
      // Fallback to direct CSV loading with PapaParse
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
      processCSVData(result.data);
    } catch (error) {
      console.error('Error loading CSV:', error);
      setLoading(false);
    }
  };

  const processCSVData = (data) => {
    setCsvData(data);

    // Calculate statistics from real data
    const totalRecords = data.length;
    const totalFailures = data.filter(row => row['Machine failure'] === 1).length;
    const failureRate = ((totalFailures / totalRecords) * 100).toFixed(2);

    const typeL = data.filter(row => row.Type === 'L').length;
    const typeM = data.filter(row => row.Type === 'M').length;
    const typeH = data.filter(row => row.Type === 'H').length;

    const twf = data.reduce((sum, row) => sum + (row.TWF || 0), 0);
    const hdf = data.reduce((sum, row) => sum + (row.HDF || 0), 0);
    const pwf = data.reduce((sum, row) => sum + (row.PWF || 0), 0);
    const osf = data.reduce((sum, row) => sum + (row.OSF || 0), 0);
    const rnf = data.reduce((sum, row) => sum + (row.RNF || 0), 0);

    setStatistics({
      totalRecords,
      totalFailures,
      failureRate: parseFloat(failureRate),
      typeL,
      typeM,
      typeH,
      twf,
      hdf,
      pwf,
      osf,
      rnf
    });
    setLoading(false);
  };

  // Stat Card Component
  const StatCard = ({ title, value, unit, icon, color, trend }) => (
    <Card
      sx={{
        height: '100%',
        boxShadow: 2,
        borderRadius: 3,
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 6
        },
        borderLeft: `4px solid ${color}`
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: `${color}15` }}>
            {icon}
          </Box>
          {trend && (
            <Chip
              label={trend}
              size="small"
              sx={{
                bgcolor: trend.includes('+') ? '#ff4d4f15' : '#52c41a15',
                color: trend.includes('+') ? '#ff4d4f' : '#52c41a',
                fontWeight: 600,
                fontSize: 12
              }}
            />
          )}
        </Box>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h4" component="div" sx={{ color, fontWeight: 700 }}>
          {value}
          {unit && <Typography component="span" variant="body1" sx={{ ml: 0.5, color: 'text.secondary' }}>{unit}</Typography>}
        </Typography>
      </CardContent>
    </Card>
  );

  const getFailureTypePieOption = () => ({
    title: {
      text: '产品类型分布',
      left: 'center',
      textStyle: {
        fontSize: isMobile ? 14 : 18,
        fontWeight: 'bold',
        color: '#fff'
      }
    },
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c} ({d}%)'
    },
    legend: {
      orient: isMobile ? 'horizontal' : 'vertical',
      left: isMobile ? 'center' : 'right',
      bottom: isMobile ? '5%' : 'middle',
      textStyle: {
        fontSize: isMobile ? 11 : 13,
        color: '#ccc'
      },
      itemGap: 8
    },
    series: [
      {
        name: '产品类型',
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
          position: 'outside',
          formatter: '{b}\n{d}%',
          fontSize: 12,
          color: '#ccc'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 16,
            fontWeight: 'bold',
            color: '#fff'
          },
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        },
        labelLine: {
          show: !isMobile,
          lineStyle: {
            color: 'rgba(255,255,255,0.3)'
          }
        },
        data: [
          { value: statistics.typeL, name: 'L型 - 低质量', itemStyle: { color: '#1890ff' } },
          { value: statistics.typeM, name: 'M型 - 中等质量', itemStyle: { color: '#52c41a' } },
          { value: statistics.typeH, name: 'H型 - 高质量', itemStyle: { color: '#faad14' } }
        ]
      }
    ]
  });

  const getFailureTypeBarOption = () => ({
    title: {
      text: '故障类型统计',
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
      formatter: '{b}: {c} 次'
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
      data: ['工具磨损', '散热故障', '功率故障', '过载故障', '随机故障'],
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
      name: '故障次数',
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
        name: '故障次数',
        type: 'bar',
        data: [
          { value: statistics.twf, itemStyle: { color: '#722ed1' } },
          { value: statistics.hdf, itemStyle: { color: '#eb2f96' } },
          { value: statistics.pwf, itemStyle: { color: '#fa8c16' } },
          { value: statistics.osf, itemStyle: { color: '#f5222d' } },
          { value: statistics.rnf, itemStyle: { color: '#13c2c2' } }
        ],
        barWidth: '50%',
        itemStyle: {
          borderRadius: [6, 6, 0, 0]
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  });

  const getTemperatureTrendOption = () => {
    // Sample temperature data from CSV (first 50 records)
    const sampleData = csvData.slice(0, 100).map((row, index) => [
      index,
      row['Air temperature [K]'] || 298,
      row['Process temperature [K]'] || 308
    ]);

    return {
      title: {
        text: '温度趋势监控',
        left: 'center',
        textStyle: {
          fontSize: isMobile ? 14 : 18,
          fontWeight: 'bold',
          color: '#fff'
        }
      },
      tooltip: {
        trigger: 'axis',
        formatter: (params) => {
          let result = `记录: ${params[0].data[0]}<br/>`;
          params.forEach(param => {
            result += `${param.seriesName}: ${param.data[1]} K<br/>`;
          });
          return result;
        }
      },
      legend: {
        data: ['空气温度', '工艺温度'],
        bottom: '5%',
        textStyle: {
          color: '#999'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '15%',
        top: '15%',
        containLabel: true
      },
      xAxis: {
        type: 'value',
        name: '采样点',
        nameTextStyle: {
          color: '#999'
        },
        axisLabel: {
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
      yAxis: {
        type: 'value',
        name: '温度 (K)',
        nameTextStyle: {
          color: '#999'
        },
        axisLabel: {
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
          name: '空气温度',
          type: 'line',
          smooth: true,
          data: sampleData.map(d => [d[0], d[1]]),
          itemStyle: { color: '#1890ff' },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0, y: 0, x2: 0, y2: 1,
              colorStops: [
                { offset: 0, color: 'rgba(24,144,255,0.3)' },
                { offset: 1, color: 'rgba(24,144,255,0.05)' }
              ]
            }
          },
          lineStyle: {
            width: 2
          },
          symbol: 'circle',
          symbolSize: 4
        },
        {
          name: '工艺温度',
          type: 'line',
          smooth: true,
          data: sampleData.map(d => [d[0], d[2]]),
          itemStyle: { color: '#fa8c16' },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0, y: 0, x2: 0, y2: 1,
              colorStops: [
                { offset: 0, color: 'rgba(250,140,22,0.3)' },
                { offset: 1, color: 'rgba(250,140,22,0.05)' }
              ]
            }
          },
          lineStyle: {
            width: 2
          },
          symbol: 'circle',
          symbolSize: 4
        }
      ]
    };
  };

  const getLoadLevelOption = () => {
    const loadLevels = csvData.reduce((acc, row) => {
      const level = row['Load_Level'] || 'Unknown';
      acc[level] = (acc[level] || 0) + 1;
      return acc;
    }, {});

    return {
      title: {
        text: '负载等级分布',
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
      series: [
        {
          name: '负载等级',
          type: 'pie',
          radius: ['45%', '70%'],
          center: ['50%', '50%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#1a1a2e',
            borderWidth: 2
          },
          label: {
            show: true,
            position: 'outside',
            formatter: '{b}\n{d}%',
            fontSize: 12,
            color: '#ccc'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 16,
              fontWeight: 'bold'
            }
          },
          data: [
            { value: loadLevels['轻负载'] || 0, name: '轻负载', itemStyle: { color: '#52c41a' } },
            { value: loadLevels['中负载'] || 0, name: '中负载', itemStyle: { color: '#1890ff' } },
            { value: loadLevels['重负载'] || 0, name: '重负载', itemStyle: { color: '#ff4d4f' } }
          ]
        }
      ]
    };
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Box sx={{ textAlign: 'center' }}>
          <PrecisionManufacturing sx={{ fontSize: 60, color: '#1890ff', mb: 2 }} />
          <Typography variant="h6" sx={{ color: '#fff' }}>加载数据中...</Typography>
          <LinearProgress sx={{ mt: 2, bgcolor: 'rgba(24,144,255,0.2)', '& .MuiLinearProgress-bar': { bgcolor: '#1890ff' } }} />
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ p: isMobile ? 1 : 3 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3, flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant={isMobile ? 'h5' : 'h4'} component="h1" sx={{ fontWeight: 700, color: '#fff', mb: 0.5 }}>
            数据概览仪表板
          </Typography>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)' }}>
            工业设备故障分析系统 - 实时监控
          </Typography>
        </Box>
        <Chip
          icon={<Assessment />}
          label={`共 ${statistics.totalRecords.toLocaleString()} 条记录`}
          sx={{
            bgcolor: 'rgba(24,144,255,0.15)',
            color: '#1890ff',
            fontWeight: 600,
            '& .MuiChip-icon': { color: '#1890ff' }
          }}
        />
      </Box>

      {/* Statistics Cards */}
      <Grid container spacing={isMobile ? 2 : 3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} lg={3}>
          <StatCard
            title="总记录数"
            value={statistics.totalRecords.toLocaleString()}
            icon={<Speed sx={{ color: '#1890ff', fontSize: 28 }} />}
            color="#1890ff"
          />
        </Grid>

        <Grid item xs={12} sm={6} lg={3}>
          <StatCard
            title="故障总数"
            value={statistics.totalFailures}
            icon={<Warning sx={{ color: '#ff4d4f', fontSize: 28 }} />}
            color="#ff4d4f"
            trend={`↑ ${(statistics.failureRate).toFixed(2)}%`}
          />
        </Grid>

        <Grid item xs={12} sm={6} lg={3}>
          <StatCard
            title="故障率"
            value={statistics.failureRate}
            unit="%"
            icon={<TrendingUp sx={{ color: '#faad14', fontSize: 28 }} />}
            color="#faad14"
          />
        </Grid>

        <Grid item xs={12} sm={6} lg={3}>
          <StatCard
            title="正常运行"
            value={statistics.totalRecords - statistics.totalFailures}
            icon={<CheckCircle sx={{ color: '#52c41a', fontSize: 28 }} />}
            color="#52c41a"
          />
        </Grid>
      </Grid>

      {/* Charts Row 1 */}
      <Grid container spacing={isMobile ? 2 : 3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6} lg={4}>
          <Paper
            sx={{
              height: isMobile ? 350 : 400,
              borderRadius: 3,
              boxShadow: 2,
              bgcolor: 'rgba(26,26,46,0.8)',
              border: '1px solid rgba(24,144,255,0.2)'
            }}
          >
            <ReactECharts
              option={getFailureTypePieOption()}
              style={{ height: '100%', width: '100%' }}
              opts={{ renderer: 'canvas' }}
            />
          </Paper>
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <Paper
            sx={{
              height: isMobile ? 350 : 400,
              borderRadius: 3,
              boxShadow: 2,
              bgcolor: 'rgba(26,26,46,0.8)',
              border: '1px solid rgba(24,144,255,0.2)'
            }}
          >
            <ReactECharts
              option={getFailureTypeBarOption()}
              style={{ height: '100%', width: '100%' }}
              opts={{ renderer: 'canvas' }}
            />
          </Paper>
        </Grid>

        <Grid item xs={12} md={12} lg={4}>
          <Paper
            sx={{
              height: isMobile ? 350 : 400,
              borderRadius: 3,
              boxShadow: 2,
              bgcolor: 'rgba(26,26,46,0.8)',
              border: '1px solid rgba(24,144,255,0.2)'
            }}
          >
            <ReactECharts
              option={getLoadLevelOption()}
              style={{ height: '100%', width: '100%' }}
              opts={{ renderer: 'canvas' }}
            />
          </Paper>
        </Grid>
      </Grid>

      {/* Charts Row 2 */}
      <Grid container spacing={isMobile ? 2 : 3}>
        <Grid item xs={12}>
          <Paper
            sx={{
              height: 400,
              borderRadius: 3,
              boxShadow: 2,
              bgcolor: 'rgba(26,26,46,0.8)',
              border: '1px solid rgba(24,144,255,0.2)'
            }}
          >
            <ReactECharts
              option={getTemperatureTrendOption()}
              style={{ height: '100%', width: '100%' }}
              opts={{ renderer: 'canvas' }}
            />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardPage;
