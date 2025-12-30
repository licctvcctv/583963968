import React, { useState, useEffect } from 'react';
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
} from '@mui/material';
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts/core';

const ParameterCorrelationPage = () => {
  const [selectedType, setSelectedType] = useState('all');
  const [selectedLoad, setSelectedLoad] = useState('all');

  const parameters = [
    'Air temperature [K]',
    'Process temperature [K]',
    'Rotational speed [rpm]',
    'Torque [Nm]',
    'Tool wear [min]',
    'Machine failure',
  ];

  // Sample correlation matrix data based on typical industrial equipment relationships
  const correlationData = {
    all: [
      [1.00, 0.88, 0.12, -0.25, 0.02, 0.09],
      [0.88, 1.00, 0.05, -0.28, 0.01, 0.07],
      [0.12, 0.05, 1.00, -0.61, 0.00, 0.20],
      [-0.25, -0.28, -0.61, 1.00, 0.02, 0.50],
      [0.02, 0.01, 0.00, 0.02, 1.00, 0.10],
      [0.09, 0.07, 0.20, 0.50, 0.10, 1.00],
    ],
    L: [
      [1.00, 0.90, 0.10, -0.20, 0.03, 0.08],
      [0.90, 1.00, 0.08, -0.25, 0.02, 0.06],
      [0.10, 0.08, 1.00, -0.58, 0.01, 0.18],
      [-0.20, -0.25, -0.58, 1.00, 0.03, 0.48],
      [0.03, 0.02, 0.01, 0.03, 1.00, 0.12],
      [0.08, 0.06, 0.18, 0.48, 0.12, 1.00],
    ],
    M: [
      [1.00, 0.87, 0.13, -0.26, 0.01, 0.10],
      [0.87, 1.00, 0.04, -0.30, 0.00, 0.08],
      [0.13, 0.04, 1.00, -0.62, -0.01, 0.22],
      [-0.26, -0.30, -0.62, 1.00, 0.01, 0.52],
      [0.01, 0.00, -0.01, 0.01, 1.00, 0.09],
      [0.10, 0.08, 0.22, 0.52, 0.09, 1.00],
    ],
    H: [
      [1.00, 0.85, 0.15, -0.22, 0.04, 0.11],
      [0.85, 1.00, 0.06, -0.24, 0.03, 0.09],
      [0.15, 0.06, 1.00, -0.60, 0.02, 0.19],
      [-0.22, -0.24, -0.60, 1.00, 0.02, 0.51],
      [0.04, 0.03, 0.02, 0.02, 1.00, 0.11],
      [0.11, 0.09, 0.19, 0.51, 0.11, 1.00],
    ],
  };

  const currentData = correlationData[selectedType] || correlationData.all;

  // Generate heatmap data
  const generateHeatmapData = (data) => {
    const heatmapData = [];
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[i].length; j++) {
        heatmapData.push([j, i, data[i][j].toFixed(2)]);
      }
    }
    return heatmapData;
  };

  const heatmapOption = {
    tooltip: {
      position: 'top',
      formatter: (params) => {
        const paramNames = [
          'Air temperature',
          'Process temperature',
          'Rotational speed',
          'Torque',
          'Tool wear',
          'Machine failure',
        ];
        return `${paramNames[params.value[1]]} vs ${paramNames[params.value[0]]}<br/>Correlation: ${params.value[2]}`;
      },
    },
    grid: {
      height: '70%',
      top: '10%',
    },
    xAxis: {
      type: 'category',
      data: ['Air T', 'Proc T', 'Speed', 'Torque', 'Wear', 'Failure'],
      splitArea: {
        show: true,
      },
      axisLabel: {
        rotate: 45,
        color: '#666',
      },
    },
    yAxis: {
      type: 'category',
      data: ['Air T', 'Proc T', 'Speed', 'Torque', 'Wear', 'Failure'],
      splitArea: {
        show: true,
      },
      axisLabel: {
        color: '#666',
      },
    },
    visualMap: {
      min: -1,
      max: 1,
      calculable: true,
      orient: 'horizontal',
      left: 'center',
      bottom: '0%',
      inRange: {
        color: ['#3f51b5', '#ffffff', '#52c41a'],
      },
      text: ['Positive', 'Negative'],
      textStyle: {
        color: '#666',
      },
    },
    series: [
      {
        name: 'Correlation',
        type: 'heatmap',
        data: generateHeatmapData(currentData),
        label: {
          show: true,
          color: '#333',
          fontSize: 11,
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
        itemStyle: {
          borderColor: '#fff',
          borderWidth: 2,
          borderRadius: 4,
        },
      },
    ],
  };

  // Scatter plot options for key correlations
  const scatterOption = {
    title: {
      text: '扭矩 vs 故障率散点图',
      left: 'center',
      textStyle: {
        color: '#52c41a',
        fontSize: 16,
      },
    },
    tooltip: {
      trigger: 'item',
      formatter: (params) => {
        return `Torque: ${params.value[0]} Nm<br/>Failure Probability: ${(params.value[1] * 100).toFixed(1)}%`;
      },
    },
    xAxis: {
      name: 'Torque (Nm)',
      nameLocation: 'middle',
      nameGap: 30,
      min: 0,
      max: 80,
      axisLabel: {
        color: '#666',
      },
      splitLine: {
        lineStyle: {
          color: '#f0f0f0',
        },
      },
    },
    yAxis: {
      name: 'Failure Rate',
      nameLocation: 'middle',
      nameGap: 40,
      min: 0,
      max: 0.05,
      axisLabel: {
        color: '#666',
        formatter: (value) => `${(value * 100).toFixed(0)}%`,
      },
      splitLine: {
        lineStyle: {
          color: '#f0f0f0',
        },
      },
    },
    series: [
      {
        name: 'Normal',
        type: 'scatter',
        symbolSize: 8,
        data: Array.from({ length: 200 }, () => [
          Math.random() * 40 + 10,
          Math.random() * 0.01,
        ]),
        itemStyle: {
          color: '#52c41a',
          opacity: 0.6,
        },
      },
      {
        name: 'Warning',
        type: 'scatter',
        symbolSize: 10,
        data: Array.from({ length: 50 }, () => [
          Math.random() * 20 + 50,
          Math.random() * 0.02 + 0.01,
        ]),
        itemStyle: {
          color: '#faad14',
          opacity: 0.7,
        },
      },
      {
        name: 'Failure',
        type: 'scatter',
        symbolSize: 12,
        data: Array.from({ length: 20 }, () => [
          Math.random() * 10 + 60,
          Math.random() * 0.03 + 0.02,
        ]),
        itemStyle: {
          color: '#f5222d',
          opacity: 0.8,
        },
      },
    ],
    legend: {
      bottom: 10,
      data: ['Normal', 'Warning', 'Failure'],
    },
    grid: {
      bottom: 60,
    },
  };

  // Key insights cards
  const insights = [
    {
      title: '强正相关',
      value: '0.88',
      description: '空气温度与工艺温度',
      icon: 'trending_up',
      color: '#52c41a',
    },
    {
      title: '强负相关',
      value: '-0.61',
      description: '转速与扭矩',
      icon: 'trending_down',
      color: '#1890ff',
    },
    {
      title: '故障关联',
      value: '0.50',
      description: '扭矩与故障率',
      icon: 'warning',
      color: '#f5222d',
    },
    {
      title: '独立参数',
      value: '0.00',
      description: '刀具磨损与其他参数',
      icon: 'remove',
      color: '#666',
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
        参数关联分析
      </Typography>

      {/* Filters */}
      <Paper sx={{ p: 3, mb: 3, borderRadius: 3 }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth>
              <InputLabel>设备类型</InputLabel>
              <Select
                value={selectedType}
                label="设备类型"
                onChange={(e) => setSelectedType(e.target.value)}
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
                value={selectedLoad}
                label="负载等级"
                onChange={(e) => setSelectedLoad(e.target.value)}
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

      {/* Key Insights */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {insights.map((insight, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              sx={{
                height: '100%',
                borderLeft: `4px solid ${insight.color}`,
                background: `linear-gradient(135deg, #ffffff 0%, ${insight.color}11 100%)`,
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                },
              }}
            >
              <CardContent>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  {insight.title}
                </Typography>
                <Typography
                  variant="h3"
                  sx={{ color: insight.color, fontWeight: 700, mb: 1 }}
                >
                  {insight.value}
                </Typography>
                <Typography variant="body2" color="textPrimary">
                  {insight.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Correlation Heatmap */}
      <Paper
        sx={{
          p: 3,
          mb: 3,
          borderRadius: 3,
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
        }}
      >
        <Typography
          variant="h5"
          gutterBottom
          sx={{
            color: '#52c41a',
            fontWeight: 600,
            mb: 2,
          }}
        >
          参数相关系数热力图
        </Typography>
        <ReactECharts
          option={heatmapOption}
          style={{ height: '500px', width: '100%' }}
          opts={{ renderer: 'svg' }}
        />
      </Paper>

      {/* Scatter Plot */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              p: 3,
              borderRadius: 3,
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
              height: '500px',
            }}
          >
            <ReactECharts
              option={scatterOption}
              style={{ height: '450px', width: '100%' }}
            />
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              p: 3,
              borderRadius: 3,
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
              height: '500px',
            }}
          >
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                color: '#52c41a',
                fontWeight: 600,
              }}
            >
              关键发现
            </Typography>
            <Box sx={{ mt: 3 }}>
              <Typography
                variant="body1"
                paragraph
                sx={{ mb: 2, color: '#333', lineHeight: 1.8 }}
              >
                <strong style={{ color: '#52c41a' }}>1. 温度参数高度相关：</strong>
                空气温度与工艺温度的相关系数达到 0.88，表明两者存在显著的线性关系，这是由于工艺过程中热传导的自然结果。
              </Typography>
              <Typography
                variant="body1"
                paragraph
                sx={{ mb: 2, color: '#333', lineHeight: 1.8 }}
              >
                <strong style={{ color: '#1890ff' }}>2. 转速-扭矩负相关：</strong>
                转速与扭矩呈现 -0.61 的负相关关系，符合功率守恒原理（P = T × n），转速越高，扭矩越低。
              </Typography>
              <Typography
                variant="body1"
                paragraph
                sx={{ mb: 2, color: '#333', lineHeight: 1.8 }}
              >
                <strong style={{ color: '#f5222d' }}>3. 扭矩预测故障：</strong>
                扭矩与故障率的相关系数为 0.50，表明高扭矩运行显著增加设备故障风险，应重点关注。
              </Typography>
              <Typography
                variant="body1"
                paragraph
                sx={{ mb: 2, color: '#333', lineHeight: 1.8 }}
              >
                <strong style={{ color: '#666' }}>4. 刀具磨损独立性强：</strong>
                刀具磨损与其他参数相关性极低，是一个相对独立的维护指标，需要单独监控。
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ParameterCorrelationPage;
