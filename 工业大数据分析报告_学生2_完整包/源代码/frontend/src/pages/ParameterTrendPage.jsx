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
  Button,
  ButtonGroup,
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  ShowChart,
  AccessTime,
} from '@mui/icons-material';
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts/core';

const ParameterTrendPage = () => {
  const [timeRange, setTimeRange] = useState('24h');
  const [selectedParameter, setSelectedParameter] = useState('all');
  const [selectedDevice, setSelectedDevice] = useState('all');

  // Generate time-based data
  const generateTimeData = (hours) => {
    const data = [];
    const now = new Date();
    for (let i = hours; i >= 0; i--) {
      const time = new Date(now.getTime() - i * 60 * 60 * 1000);
      data.push(time.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }));
    }
    return data;
  };

  const generateTrendData = (base, variance, points) => {
    return Array.from({ length: points }, () => base + (Math.random() - 0.5) * variance);
  };

  const timeData = generateTimeData(24);

  // Parameter data for different time ranges
  const parameterData = {
    '24h': {
      airTemp: generateTrendData(298.5, 3, 25),
      processTemp: generateTrendData(308.7, 3, 25),
      rotationalSpeed: generateTrendData(1550, 200, 25),
      torque: generateTrendData(42.5, 15, 25),
      toolWear: generateTrendData(120, 5, 25),
    },
    '7d': {
      airTemp: generateTrendData(298.5, 5, 7),
      processTemp: generateTrendData(308.7, 5, 7),
      rotationalSpeed: generateTrendData(1550, 300, 7),
      torque: generateTrendData(42.5, 20, 7),
      toolWear: generateTrendData(120, 10, 7),
    },
    '30d': {
      airTemp: generateTrendData(298.5, 8, 30),
      processTemp: generateTrendData(308.7, 8, 30),
      rotationalSpeed: generateTrendData(1550, 400, 30),
      torque: generateTrendData(42.5, 25, 30),
      toolWear: generateTrendData(120, 15, 30),
    },
  };

  const currentData = parameterData[timeRange] || parameterData['24h'];

  // Multi-line trend chart option
  const multiLineOption = {
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
      data: ['空气温度', '工艺温度', '转速', '扭矩', '刀具磨损'],
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
      data: timeData,
      axisLabel: {
        color: '#666',
        rotate: 45,
      },
    },
    yAxis: [
      {
        type: 'value',
        name: '温度 (K) / 转速 (rpm)',
        position: 'left',
        axisLabel: {
          color: '#666',
        },
        splitLine: {
          lineStyle: {
            color: '#f0f0f0',
          },
        },
      },
      {
        type: 'value',
        name: '扭矩 (Nm) / 磨损 (min)',
        position: 'right',
        axisLabel: {
          color: '#666',
        },
        splitLine: {
          show: false,
        },
      },
    ],
    series: [
      {
        name: '空气温度',
        type: 'line',
        smooth: true,
        data: currentData.airTemp,
        itemStyle: { color: '#52c41a' },
        lineStyle: { width: 2 },
        showSymbol: false,
      },
      {
        name: '工艺温度',
        type: 'line',
        smooth: true,
        data: currentData.processTemp,
        itemStyle: { color: '#1890ff' },
        lineStyle: { width: 2 },
        showSymbol: false,
      },
      {
        name: '转速',
        type: 'line',
        smooth: true,
        yAxisIndex: 0,
        data: currentData.rotationalSpeed,
        itemStyle: { color: '#722ed1' },
        lineStyle: { width: 2 },
        showSymbol: false,
      },
      {
        name: '扭矩',
        type: 'line',
        smooth: true,
        yAxisIndex: 1,
        data: currentData.torque,
        itemStyle: { color: '#faad14' },
        lineStyle: { width: 2 },
        showSymbol: false,
      },
      {
        name: '刀具磨损',
        type: 'line',
        smooth: true,
        yAxisIndex: 1,
        data: currentData.toolWear,
        itemStyle: { color: '#f5222d' },
        lineStyle: { width: 2, type: 'dashed' },
        showSymbol: false,
      },
    ],
    dataZoom: [
      {
        type: 'inside',
        start: 0,
        end: 100,
      },
      {
        start: 0,
        end: 100,
        height: 20,
        bottom: 40,
        borderColor: 'transparent',
        backgroundColor: '#e2e2e2',
        fillerColor: 'rgba(82, 196, 26, 0.2)',
        handleStyle: {
          color: '#52c41a',
        },
      },
    ],
  };

  // Single parameter detailed chart
  const getSingleParameterOption = (paramName, data, unit, color) => ({
    title: {
      text: paramName,
      left: 'center',
      textStyle: {
        color: '#52c41a',
        fontSize: 16,
      },
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
      },
      formatter: (params) => {
        return `${params[0].name}<br/>${paramName}: ${params[0].value.toFixed(2)} ${unit}`;
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '15%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: timeData,
      axisLabel: {
        color: '#666',
        rotate: 45,
      },
    },
    yAxis: {
      type: 'value',
      name: unit,
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
        name: paramName,
        type: 'line',
        smooth: true,
        data: data,
        itemStyle: { color: color },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: color + '66' },
            { offset: 1, color: color + '11' },
          ]),
        },
        lineStyle: { width: 3 },
        markPoint: {
          data: [
            { type: 'max', name: '最大值' },
            { type: 'min', name: '最小值' },
          ],
          itemStyle: { color: color },
        },
        markLine: {
          data: [{ type: 'average', name: '平均值' }],
          lineStyle: { color: color, type: 'dashed' },
        },
      },
    ],
    dataZoom: [
      {
        type: 'inside',
        start: 0,
        end: 100,
      },
      {
        start: 0,
        end: 100,
        height: 20,
        bottom: 10,
      },
    ],
  });

  const parameterConfigs = [
    {
      name: '空气温度',
      data: currentData.airTemp,
      unit: 'K',
      color: '#52c41a',
      icon: <TrendingUp />,
    },
    {
      name: '工艺温度',
      data: currentData.processTemp,
      unit: 'K',
      color: '#1890ff',
      icon: <ShowChart />,
    },
    {
      name: '转速',
      data: currentData.rotationalSpeed,
      unit: 'rpm',
      color: '#722ed1',
      icon: <TrendingUp />,
    },
    {
      name: '扭矩',
      data: currentData.torque,
      unit: 'Nm',
      color: '#faad14',
      icon: <TrendingDown />,
    },
  ];

  // Anomaly detection data
  const anomalyData = {
    time: timeData.filter((_, i) => i % 3 === 0),
    anomalies: Array.from({ length: 9 }, () => Math.random() > 0.8),
  };

  const anomalyOption = {
    title: {
      text: '异常检测监控',
      left: 'center',
      textStyle: {
        color: '#52c41a',
        fontSize: 16,
      },
    },
    tooltip: {
      trigger: 'axis',
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '10%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: anomalyData.time,
      axisLabel: {
        color: '#666',
        rotate: 45,
      },
    },
    yAxis: {
      type: 'value',
      data: ['正常', '异常'],
      axisLabel: {
        color: '#666',
      },
    },
    series: [
      {
        name: '状态',
        type: 'scatter',
        data: anomalyData.anomalies.map((a, i) => [i, a ? 1 : 0]),
        symbolSize: 20,
        itemStyle: {
          color: (params) => {
            return anomalyData.anomalies[params.dataIndex] ? '#f5222d' : '#52c41a';
          },
        },
      },
    ],
  };

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
        参数趋势分析
      </Typography>

      {/* Time Range Selector */}
      <Paper sx={{ p: 3, mb: 3, borderRadius: 3 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 2,
          }}
        >
          <Box>
            <Typography variant="h6" sx={{ color: '#52c41a', fontWeight: 600, mb: 1 }}>
              时间范围选择
            </Typography>
            <ButtonGroup variant="outlined" color="primary">
              <Button
                onClick={() => setTimeRange('24h')}
                variant={timeRange === '24h' ? 'contained' : 'outlined'}
              >
                最近24小时
              </Button>
              <Button
                onClick={() => setTimeRange('7d')}
                variant={timeRange === '7d' ? 'contained' : 'outlined'}
              >
                最近7天
              </Button>
              <Button
                onClick={() => setTimeRange('30d')}
                variant={timeRange === '30d' ? 'contained' : 'outlined'}
              >
                最近30天
              </Button>
            </ButtonGroup>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <FormControl sx={{ minWidth: 150 }}>
              <InputLabel>选择参数</InputLabel>
              <Select
                value={selectedParameter}
                label="选择参数"
                onChange={(e) => setSelectedParameter(e.target.value)}
              >
                <MenuItem value="all">全部参数</MenuItem>
                <MenuItem value="airTemp">空气温度</MenuItem>
                <MenuItem value="processTemp">工艺温度</MenuItem>
                <MenuItem value="rotationalSpeed">转速</MenuItem>
                <MenuItem value="torque">扭矩</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ minWidth: 150 }}>
              <InputLabel>选择设备</InputLabel>
              <Select
                value={selectedDevice}
                label="选择设备"
                onChange={(e) => setSelectedDevice(e.target.value)}
              >
                <MenuItem value="all">全部设备</MenuItem>
                <MenuItem value="L001">L-001</MenuItem>
                <MenuItem value="M001">M-001</MenuItem>
                <MenuItem value="H001">H-001</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
      </Paper>

      {/* Main Trend Chart */}
      {selectedParameter === 'all' && (
        <Paper
          sx={{
            p: 3,
            mb: 3,
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
            全参数综合趋势图
          </Typography>
          <ReactECharts
            option={multiLineOption}
            style={{ height: '450px', width: '100%' }}
            opts={{ renderer: 'svg' }}
          />
        </Paper>
      )}

      {/* Individual Parameter Charts */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {parameterConfigs.map((config, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Paper
              sx={{
                p: 3,
                borderRadius: 3,
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  mb: 2,
                  color: config.color,
                }}
              >
                {config.icon}
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    ml: 1,
                    color: config.color,
                  }}
                >
                  {config.name}趋势
                </Typography>
              </Box>
              <ReactECharts
                option={getSingleParameterOption(
                  config.name,
                  config.data,
                  config.unit,
                  config.color
                )}
                style={{ height: '300px', width: '100%' }}
              />
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Anomaly Detection */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper
            sx={{
              p: 3,
              borderRadius: 3,
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
            }}
          >
            <ReactECharts
              option={anomalyOption}
              style={{ height: '350px', width: '100%' }}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 3,
              borderRadius: 3,
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
              height: '350px',
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
              趋势分析摘要
            </Typography>
            <Box sx={{ mt: 3 }}>
              <Typography
                variant="body1"
                paragraph
                sx={{ mb: 2, color: '#333', lineHeight: 1.8 }}
              >
                <strong style={{ color: '#52c41a' }}>温度稳定：</strong>
                空气温度与工艺温度在过去{timeRange === '24h' ? '24小时' : timeRange === '7d' ? '7天' : '30天'}内保持稳定，波动范围在±2K以内。
              </Typography>
              <Typography
                variant="body1"
                paragraph
                sx={{ mb: 2, color: '#333', lineHeight: 1.8 }}
              >
                <strong style={{ color: '#722ed1' }}>转速波动：</strong>
                设备转速根据负载自动调整，平均转速为1550 rpm，符合预期运行参数。
              </Typography>
              <Typography
                variant="body1"
                paragraph
                sx={{ mb: 2, color: '#333', lineHeight: 1.8 }}
              >
                <strong style={{ color: '#faad14' }}>扭矩监控：</strong>
                扭矩值在中负载区间内平稳运行，未出现异常峰值。
              </Typography>
              <Box
                sx={{
                  mt: 3,
                  p: 2,
                  bgcolor: '#f6ffed',
                  borderRadius: 2,
                  borderLeft: '4px solid #52c41a',
                }}
              >
                <Typography variant="body2" color="#52c41a" fontWeight={600}>
                  建议：所有参数运行正常，建议继续按照当前维护计划执行。
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ParameterTrendPage;
