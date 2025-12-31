import React, { useState } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
  Tab,
  Tabs,
  Chip,
} from '@mui/material';
import {
  TrendingUp,
  Speed,
  Thermostat,
  Settings,
} from '@mui/icons-material';
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts/core';

const PerformanceComparisonPage = () => {
  const [tabValue, setTabValue] = useState(0);
  const [deviceType, setDeviceType] = useState('all');
  const [loadLevel, setLoadLevel] = useState('all');

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Performance metrics by device type
  const devicePerformance = {
    all: {
      efficiency: [85, 87, 89, 88, 90, 92, 91, 93, 94, 92],
      reliability: [95, 96, 94, 97, 96, 95, 97, 98, 97, 96],
      availability: [92, 93, 94, 93, 95, 94, 96, 95, 96, 97],
      oee: [78, 80, 82, 81, 84, 85, 84, 87, 88, 86],
    },
    L: {
      efficiency: [82, 84, 86, 85, 87, 89, 88, 90, 91, 89],
      reliability: [94, 95, 93, 96, 95, 94, 96, 97, 96, 95],
      availability: [91, 92, 93, 92, 94, 93, 95, 94, 95, 96],
      oee: [75, 77, 79, 78, 81, 82, 81, 84, 85, 83],
    },
    M: {
      efficiency: [87, 89, 91, 90, 92, 94, 93, 95, 96, 94],
      reliability: [96, 97, 95, 98, 97, 96, 98, 99, 98, 97],
      availability: [93, 94, 95, 94, 96, 95, 97, 96, 97, 98],
      oee: [81, 83, 85, 84, 87, 88, 87, 90, 91, 89],
    },
    H: {
      efficiency: [90, 92, 94, 93, 95, 97, 96, 98, 99, 97],
      reliability: [97, 98, 96, 99, 98, 97, 99, 99, 99, 98],
      availability: [94, 95, 96, 95, 97, 96, 98, 97, 98, 99],
      oee: [84, 86, 88, 87, 90, 91, 90, 93, 94, 92],
    },
  };

  const currentData = devicePerformance[deviceType] || devicePerformance.all;
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];

  // Line chart option for performance metrics
  const performanceLineOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985',
        },
      },
    },
    legend: {
      data: ['设备效率', '可靠性', '可用性', 'OEE'],
      bottom: 0,
      textStyle: {
        color: '#666',
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '10%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: months,
      axisLabel: {
        color: '#666',
      },
    },
    yAxis: {
      type: 'value',
      max: 100,
      axisLabel: {
        color: '#666',
        formatter: '{value}%',
      },
      splitLine: {
        lineStyle: {
          color: '#f0f0f0',
        },
      },
    },
    series: [
      {
        name: '设备效率',
        type: 'line',
        smooth: true,
        data: currentData.efficiency,
        itemStyle: { color: '#52c41a' },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(82, 196, 26, 0.3)' },
            { offset: 1, color: 'rgba(82, 196, 26, 0.05)' },
          ]),
        },
        lineStyle: { width: 3 },
      },
      {
        name: '可靠性',
        type: 'line',
        smooth: true,
        data: currentData.reliability,
        itemStyle: { color: '#1890ff' },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(24, 144, 255, 0.3)' },
            { offset: 1, color: 'rgba(24, 144, 255, 0.05)' },
          ]),
        },
        lineStyle: { width: 3 },
      },
      {
        name: '可用性',
        type: 'line',
        smooth: true,
        data: currentData.availability,
        itemStyle: { color: '#722ed1' },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(114, 46, 209, 0.3)' },
            { offset: 1, color: 'rgba(114, 46, 209, 0.05)' },
          ]),
        },
        lineStyle: { width: 3 },
      },
      {
        name: 'OEE',
        type: 'line',
        smooth: true,
        data: currentData.oee,
        itemStyle: { color: '#faad14' },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(250, 173, 20, 0.3)' },
            { offset: 1, color: 'rgba(250, 173, 20, 0.05)' },
          ]),
        },
        lineStyle: { width: 3 },
      },
    ],
  };

  // Radar chart for device type comparison
  const radarOption = {
    tooltip: {
      trigger: 'item',
    },
    legend: {
      data: ['L型', 'M型', 'H型'],
      bottom: 0,
      textStyle: {
        color: '#666',
      },
    },
    radar: {
      indicator: [
        { name: '效率', max: 100 },
        { name: '可靠性', max: 100 },
        { name: '可用性', max: 100 },
        { name: 'OEE', max: 100 },
        { name: '能效比', max: 100 },
        { name: '维护性', max: 100 },
      ],
      splitArea: {
        areaStyle: {
          color: ['rgba(82, 196, 26, 0.05)', 'rgba(82, 196, 26, 0.1)'],
        },
      },
      axisLine: {
        lineStyle: {
          color: 'rgba(82, 196, 26, 0.3)',
        },
      },
      splitLine: {
        lineStyle: {
          color: 'rgba(82, 196, 26, 0.3)',
        },
      },
    },
    series: [
      {
        name: '设备类型对比',
        type: 'radar',
        data: [
          {
            value: [85, 94, 91, 78, 82, 88],
            name: 'L型',
            itemStyle: { color: '#52c41a' },
            areaStyle: { color: 'rgba(82, 196, 26, 0.3)' },
          },
          {
            value: [90, 96, 93, 84, 88, 92],
            name: 'M型',
            itemStyle: { color: '#1890ff' },
            areaStyle: { color: 'rgba(24, 144, 255, 0.3)' },
          },
          {
            value: [94, 98, 96, 89, 92, 95],
            name: 'H型',
            itemStyle: { color: '#722ed1' },
            areaStyle: { color: 'rgba(114, 46, 209, 0.3)' },
          },
        ],
      },
    ],
  };

  // Bar chart for parameter comparison
  const parameterBarOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    legend: {
      data: ['空气温度', '工艺温度', '转速', '扭矩'],
      bottom: 0,
      textStyle: {
        color: '#666',
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '10%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: ['L型', 'M型', 'H型'],
      axisLabel: {
        color: '#666',
      },
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        color: '#666',
      },
      splitLine: {
        lineStyle: {
          color: '#f0f0f0',
        },
      },
    },
    series: [
      {
        name: '空气温度',
        type: 'bar',
        data: [298.2, 298.5, 298.8],
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#52c41a' },
            { offset: 1, color: '#95de64' },
          ]),
        },
      },
      {
        name: '工艺温度',
        type: 'bar',
        data: [308.5, 308.8, 309.2],
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#1890ff' },
            { offset: 1, color: '#69c0ff' },
          ]),
        },
      },
      {
        name: '转速',
        type: 'bar',
        data: [1450, 1550, 1650],
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#722ed1' },
            { offset: 1, color: '#b37feb' },
          ]),
        },
      },
      {
        name: '扭矩',
        type: 'bar',
        data: [45, 42, 35],
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#faad14' },
            { offset: 1, color: '#ffd666' },
          ]),
        },
      },
    ],
  };

  // Performance summary cards
  const summaryCards = [
    {
      title: '平均设备效率',
      value: '90.5%',
      change: '+2.3%',
      icon: <TrendingUp sx={{ fontSize: 32 }} />,
      color: '#52c41a',
    },
    {
      title: '平均可靠性',
      value: '96.2%',
      change: '+0.8%',
      icon: <Settings sx={{ fontSize: 32 }} />,
      color: '#1890ff',
    },
    {
      title: '平均可用性',
      value: '94.8%',
      change: '+1.5%',
      icon: <Speed sx={{ fontSize: 32 }} />,
      color: '#722ed1',
    },
    {
      title: '综合OEE',
      value: '84.3%',
      change: '+3.1%',
      icon: <Thermostat sx={{ fontSize: 32 }} />,
      color: '#faad14',
    },
  ];

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          color: '#52c41a',
          fontWeight: 700,
          borderBottom: '3px solid #52c41a',
          pb: 1,
          mb: 3,
        }}
      >
        性能对比分析
      </Typography>

      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {summaryCards.map((card, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              sx={{
                height: '100%',
                borderLeft: `4px solid ${card.color}`,
                background: `linear-gradient(135deg, #ffffff 0%, ${card.color}11 100%)`,
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                },
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                  }}
                >
                  <Box>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      gutterBottom
                    >
                      {card.title}
                    </Typography>
                    <Typography
                      variant="h4"
                      sx={{ color: card.color, fontWeight: 700, mb: 1 }}
                    >
                      {card.value}
                    </Typography>
                    <Chip
                      label={card.change}
                      size="small"
                      sx={{
                        bgcolor: `${card.color}20`,
                        color: card.color,
                        fontWeight: 600,
                      }}
                    />
                  </Box>
                  <Box
                    sx={{
                      p: 1,
                      borderRadius: '50%',
                      bgcolor: `${card.color}20`,
                      color: card.color,
                    }}
                  >
                    {card.icon}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Filters */}
      <Paper sx={{ p: 3, mb: 3, borderRadius: 3 }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth>
              <InputLabel>设备类型</InputLabel>
              <Select
                value={deviceType}
                label="设备类型"
                onChange={(e) => setDeviceType(e.target.value)}
              >
                <MenuItem value="all">全部类型</MenuItem>
                <MenuItem value="L">L型</MenuItem>
                <MenuItem value="M">M型</MenuItem>
                <MenuItem value="H">H型</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth>
              <InputLabel>负载等级</InputLabel>
              <Select
                value={loadLevel}
                label="负载等级"
                onChange={(e) => setLoadLevel(e.target.value)}
              >
                <MenuItem value="all">全部负载</MenuItem>
                <MenuItem value="light">轻负载</MenuItem>
                <MenuItem value="medium">中负载</MenuItem>
                <MenuItem value="heavy">重负载</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>

      {/* Tabs */}
      <Box sx={{ mb: 2 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          sx={{
            '& .MuiTab-root': {
              color: '#666',
              fontWeight: 600,
            },
            '& .Mui-selected': {
              color: '#52c41a',
            },
            '& .MuiTabs-indicator': {
              backgroundColor: '#52c41a',
            },
          }}
        >
          <Tab label="性能趋势" />
          <Tab label="设备类型对比" />
          <Tab label="参数对比" />
        </Tabs>
      </Box>

      {/* Tab Content */}
      {tabValue === 0 && (
        <Paper
          sx={{
            p: 3,
            borderRadius: 3,
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
          }}
        >
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              color: '#52c41a',
              fontWeight: 600,
              mb: 2,
            }}
          >
            性能指标趋势（10个月）
          </Typography>
          <ReactECharts
            option={performanceLineOption}
            style={{ height: '400px', width: '100%' }}
          />
        </Paper>
      )}

      {tabValue === 1 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Paper
              sx={{
                p: 3,
                borderRadius: 3,
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
              }}
            >
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  color: '#52c41a',
                  fontWeight: 600,
                  mb: 2,
                }}
              >
                设备类型雷达图对比
              </Typography>
              <ReactECharts
                option={radarOption}
                style={{ height: '450px', width: '100%' }}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper
              sx={{
                p: 3,
                borderRadius: 3,
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                height: '450px',
              }}
            >
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  color: '#52c41a',
                  fontWeight: 600,
                  mb: 2,
                }}
              >
                设备类型说明
              </Typography>
              <Box sx={{ mt: 3 }}>
                <Box sx={{ mb: 3 }}>
                  <Typography
                    variant="h6"
                    sx={{ color: '#52c41a', fontWeight: 600, mb: 1 }}
                  >
                    L型（低功率）
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    适用于轻型加工任务，占总设备60%。能效比适中，维护成本低。
                  </Typography>
                </Box>
                <Box sx={{ mb: 3 }}>
                  <Typography
                    variant="h6"
                    sx={{ color: '#1890ff', fontWeight: 600, mb: 1 }}
                  >
                    M型（中功率）
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    适用于中型加工任务，占总设备30%。综合性能最佳，应用范围广。
                  </Typography>
                </Box>
                <Box sx={{ mb: 3 }}>
                  <Typography
                    variant="h6"
                    sx={{ color: '#722ed1', fontWeight: 600, mb: 1 }}
                  >
                    H型（高功率）
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    适用于重型加工任务，占总设备10%。性能最优，但成本较高。
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      )}

      {tabValue === 2 && (
        <Paper
          sx={{
            p: 3,
            borderRadius: 3,
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
          }}
        >
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              color: '#52c41a',
              fontWeight: 600,
              mb: 2,
            }}
          >
            各类型设备平均运行参数对比
          </Typography>
          <ReactECharts
            option={parameterBarOption}
            style={{ height: '400px', width: '100%' }}
          />
        </Paper>
      )}
    </Container>
  );
};

export default PerformanceComparisonPage;
