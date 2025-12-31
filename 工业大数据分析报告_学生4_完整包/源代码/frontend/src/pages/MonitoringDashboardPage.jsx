import React, { useState, useEffect, useMemo } from 'react'
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  Chip,
  IconButton,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  ToggleButton,
  ToggleButtonGroup,
  Tabs,
  Tab
} from '@mui/material'
import {
  Refresh,
  Fullscreen,
  Settings,
  Warning,
  CheckCircle,
  Speed,
  PrecisionManufacturing,
  TrendingUp,
  ErrorOutline
} from '@mui/icons-material'
import ReactECharts from 'echarts-for-react'
import { loadEquipmentData, getAggregatedStats } from '../utils/dataUtils'

const MonitoringDashboardPage = () => {
  const [data, setData] = useState([])
  const [stats, setStats] = useState(null)
  const [selectedType, setSelectedType] = useState('all')
  const [selectedLoadLevel, setSelectedLoadLevel] = useState('all')
  const [timeRange, setTimeRange] = useState('24h')
  const [currentTab, setCurrentTab] = useState(0)
  const [autoRefresh, setAutoRefresh] = useState(true)

  useEffect(() => {
    void loadData()
    if (autoRefresh) {
      const interval = setInterval(() => {
        void loadData()
      }, 30000)
      return () => clearInterval(interval)
    }
  }, [autoRefresh])

  const loadData = async () => {
    try {
      const loadedData = await loadEquipmentData()
      setData(loadedData)
      setStats(getAggregatedStats(loadedData))
    } catch (error) {
      console.error('加载数据失败:', error)
      setData([])
      setStats(getAggregatedStats([]))
    }
  }

  const filteredData = useMemo(() => {
    return data.filter(item => {
      if (selectedType !== 'all' && item.Type !== selectedType) return false
      if (selectedLoadLevel !== 'all' && item['Load_Level'] !== selectedLoadLevel) return false
      return true
    })
  }, [data, selectedType, selectedLoadLevel])

  const orderedData = useMemo(() => (
    [...filteredData].sort((a, b) => (Number(a.UDI) || 0) - (Number(b.UDI) || 0))
  ), [filteredData])

  const getRecentRows = (count) => {
    if (!orderedData.length) return []
    return orderedData.slice(-count)
  }

  // Temperature trend chart
  const getTemperatureTrendOption = () => {
    const rows = getRecentRows(20)
    const timePoints = rows.map((row, index) => row.UDI ?? row['Product ID'] ?? index + 1)
    const airTempData = rows.map(row => Number(row['Air temperature [K]']) || 0)
    const processTempData = rows.map(row => Number(row['Process temperature [K]']) || 0)

    return {
      backgroundColor: 'transparent',
      title: {
        text: '温度趋势监控',
        left: 'center',
        textStyle: { color: '#ffffff', fontSize: 18, fontWeight: 600 }
      },
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(45, 45, 45, 0.95)',
        borderColor: '#fa8c16',
        borderWidth: 1,
        textStyle: { color: '#ffffff' },
        axisPointer: { type: 'cross' }
      },
      legend: {
        data: ['空气温度', '工艺温度'],
        top: 30,
        textStyle: { color: 'rgba(255, 255, 255, 0.8)' }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        top: 80,
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: timePoints,
        axisLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.2)' } },
        axisLabel: { color: 'rgba(255, 255, 255, 0.6)', fontSize: 11 },
        splitLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.05)' } }
      },
      yAxis: {
        type: 'value',
        name: '温度 (K)',
        nameTextStyle: { color: 'rgba(255, 255, 255, 0.6)' },
        axisLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.2)' } },
        axisLabel: { color: 'rgba(255, 255, 255, 0.6)' },
        splitLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.1)', type: 'dashed' } }
      },
      series: [
        {
          name: '空气温度',
          type: 'line',
          smooth: true,
          symbol: 'circle',
          symbolSize: 8,
          lineStyle: { color: '#fa8c16', width: 3 },
          itemStyle: { color: '#fa8c16', borderColor: '#fff', borderWidth: 2 },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0, y: 0, x2: 0, y2: 1,
              colorStops: [
                { offset: 0, color: 'rgba(250, 140, 22, 0.4)' },
                { offset: 1, color: 'rgba(250, 140, 22, 0.05)' }
              ]
            }
          },
          data: airTempData
        },
        {
          name: '工艺温度',
          type: 'line',
          smooth: true,
          symbol: 'circle',
          symbolSize: 8,
          lineStyle: { color: '#ff6b6b', width: 3 },
          itemStyle: { color: '#ff6b6b', borderColor: '#fff', borderWidth: 2 },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0, y: 0, x2: 0, y2: 1,
              colorStops: [
                { offset: 0, color: 'rgba(255, 107, 107, 0.3)' },
                { offset: 1, color: 'rgba(255, 107, 107, 0.05)' }
              ]
            }
          },
          data: processTempData
        }
      ]
    }
  }

  // Torque and Speed chart
  const getTorqueSpeedOption = () => {
    const rows = getRecentRows(24)
    const timePoints = rows.map((row, index) => row.UDI ?? row['Product ID'] ?? index + 1)
    const torqueData = rows.map(row => Number(row['Torque [Nm]']) || 0)
    const speedData = rows.map(row => {
      const speed = Number(row['Rotational speed [rpm]']) || 0
      return Number((speed / 100).toFixed(1))
    })

    return {
      backgroundColor: 'transparent',
      title: {
        text: '扭矩与转速关联分析',
        left: 'center',
        textStyle: { color: '#ffffff', fontSize: 18, fontWeight: 600 }
      },
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(45, 45, 45, 0.95)',
        borderColor: '#fa8c16',
        textStyle: { color: '#ffffff' },
        axisPointer: { type: 'cross' }
      },
      legend: {
        data: ['扭矩 (Nm)', '转速 (rpm/100)'],
        top: 30,
        textStyle: { color: 'rgba(255, 255, 255, 0.8)' }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        top: 80,
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: timePoints,
        axisLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.2)' } },
        axisLabel: { color: 'rgba(255, 255, 255, 0.6)' },
        splitLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.05)' } }
      },
      yAxis: [
        {
          type: 'value',
          name: '扭矩 (Nm)',
          position: 'left',
          nameTextStyle: { color: 'rgba(255, 255, 255, 0.6)' },
          axisLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.2)' } },
          axisLabel: { color: 'rgba(255, 255, 255, 0.6)' },
          splitLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.1)' } }
        },
        {
          type: 'value',
          name: '转速 (rpm)',
          position: 'right',
          nameTextStyle: { color: 'rgba(255, 255, 255, 0.6)' },
          axisLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.2)' } },
          axisLabel: { color: 'rgba(255, 255, 255, 0.6)' },
          splitLine: { show: false }
        }
      ],
      series: [
        {
          name: '扭矩 (Nm)',
          type: 'bar',
          yAxisIndex: 0,
          itemStyle: {
            color: {
              type: 'linear',
              x: 0, y: 0, x2: 0, y2: 1,
              colorStops: [
                { offset: 0, color: '#fa8c16' },
                { offset: 1, color: '#d46b08' }
              ]
            },
            borderRadius: [4, 4, 0, 0]
          },
          data: torqueData
        },
        {
          name: '转速 (rpm/100)',
          type: 'line',
          yAxisIndex: 1,
          smooth: true,
          lineStyle: { color: '#4ecdc4', width: 3 },
          itemStyle: { color: '#4ecdc4' },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0, y: 0, x2: 0, y2: 1,
              colorStops: [
                { offset: 0, color: 'rgba(78, 205, 196, 0.3)' },
                { offset: 1, color: 'rgba(78, 205, 196, 0)' }
              ]
            }
          },
          data: speedData
        }
      ]
    }
  }

  // Tool wear gauge
  const getToolWearGauge = () => {
    const toolWearValues = filteredData
      .map(row => Number(row['Tool wear [min]']))
      .filter(Number.isFinite)
    const toolWearValue = toolWearValues.length
      ? Math.round(toolWearValues.reduce((sum, value) => sum + value, 0) / toolWearValues.length)
      : 0

    return {
      backgroundColor: 'transparent',
      title: {
        text: '工具磨损指数',
        left: 'center',
        textStyle: { color: '#ffffff', fontSize: 18, fontWeight: 600 }
      },
      series: [{
        type: 'gauge',
        center: ['50%', '60%'],
        radius: '80%',
        startAngle: 200,
        endAngle: -20,
        min: 0,
        max: 300,
        splitNumber: 6,
        itemStyle: {
          color: '#fa8c16',
          shadowColor: 'rgba(250, 140, 22, 0.5)',
          shadowBlur: 10
        },
        progress: {
          show: true,
          itemStyle: {
            color: {
              type: 'linear',
              x: 0, y: 0, x2: 1, y2: 0,
              colorStops: [
                { offset: 0, color: '#4caf50' },
                { offset: 0.5, color: '#ff9800' },
                { offset: 1, color: '#f44336' }
              ]
            }
          }
        },
        pointer: {
          icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
          length: '12%',
          width: 20,
          offsetCenter: [0, '-60%'],
          itemStyle: {
            color: '#ffffff'
          }
        },
        axisLine: {
          lineStyle: {
            width: 20,
            color: [[1, 'rgba(255, 255, 255, 0.1)']]
          }
        },
        axisTick: {
          distance: -25,
          length: 8,
          lineStyle: {
            color: '#ffffff',
            width: 2
          }
        },
        splitLine: {
          distance: -30,
          length: 20,
          lineStyle: {
            color: '#ffffff',
            width: 3
          }
        },
        axisLabel: {
          distance: -5,
          color: 'rgba(255, 255, 255, 0.8)',
          fontSize: 14,
          fontWeight: 'bold'
        },
        detail: {
          valueAnimation: true,
          formatter: '{value} min',
          color: '#ffffff',
          fontSize: 36,
          offsetCenter: [0, '20%'],
          fontWeight: 'bold'
        },
        data: [{
          value: toolWearValue
        }]
      }]
    }
  }

  // Failure type distribution
  const getFailureDistribution = () => {
    const failureCounts = filteredData.reduce((acc, row) => {
      if (Number(row.TWF) === 1) acc.TWF += 1
      if (Number(row.HDF) === 1) acc.HDF += 1
      if (Number(row.PWF) === 1) acc.PWF += 1
      if (Number(row.OSF) === 1) acc.OSF += 1
      if (Number(row.RNF) === 1) acc.RNF += 1
      return acc
    }, {
      TWF: 0,
      HDF: 0,
      PWF: 0,
      OSF: 0,
      RNF: 0
    })

    return {
      backgroundColor: 'transparent',
      title: {
        text: '故障类型分布',
        left: 'center',
        textStyle: { color: '#ffffff', fontSize: 18, fontWeight: 600 }
      },
      tooltip: {
        trigger: 'item',
        backgroundColor: 'rgba(45, 45, 45, 0.95)',
        borderColor: '#fa8c16',
        textStyle: { color: '#ffffff' },
        formatter: '{b}: {c} ({d}%)'
      },
      legend: {
        orient: 'vertical',
        right: 10,
        top: 'center',
        textStyle: { color: 'rgba(255, 255, 255, 0.8)' }
      },
      series: [{
        type: 'pie',
        radius: ['45%', '75%'],
        center: ['40%', '50%'],
        avoidLabelOverlap: true,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#2d2d2d',
          borderWidth: 3
        },
        label: {
          show: true,
          position: 'outside',
          color: 'rgba(255, 255, 255, 0.9)',
          fontSize: 13,
          formatter: '{b}\n{d}%'
        },
        labelLine: {
          show: true,
          lineStyle: { color: 'rgba(255, 255, 255, 0.5)', width: 2 }
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 16,
            fontWeight: 'bold'
          },
          itemStyle: {
            shadowBlur: 15,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        },
        data: [
          { value: failureCounts.TWF, name: '工具磨损故障 (TWF)', itemStyle: { color: '#fa8c16' } },
          { value: failureCounts.HDF, name: '散热故障 (HDF)', itemStyle: { color: '#f44336' } },
          { value: failureCounts.PWF, name: '功率故障 (PWF)', itemStyle: { color: '#9c27b0' } },
          { value: failureCounts.OSF, name: '过载故障 (OSF)', itemStyle: { color: '#ff9800' } },
          { value: failureCounts.RNF, name: '随机故障 (RNF)', itemStyle: { color: '#607d8b' } }
        ]
      }]
    }
  }

  // Product type distribution
  const getProductTypeChart = () => {
    return {
      backgroundColor: 'transparent',
      title: {
        text: '产品类型产量统计',
        left: 'center',
        textStyle: { color: '#ffffff', fontSize: 18, fontWeight: 600 }
      },
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(45, 45, 45, 0.95)',
        borderColor: '#fa8c16',
        textStyle: { color: '#ffffff' },
        axisPointer: { type: 'shadow' }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        top: 60,
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: ['L型 (低)', 'M型 (中)', 'H型 (高)'],
        axisLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.2)' } },
        axisLabel: { color: 'rgba(255, 255, 255, 0.8)', fontSize: 14 },
        axisTick: { show: false }
      },
      yAxis: {
        type: 'value',
        name: '产量',
        nameTextStyle: { color: 'rgba(255, 255, 255, 0.6)' },
        axisLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.2)' } },
        axisLabel: { color: 'rgba(255, 255, 255, 0.6)' },
        splitLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.1)' } }
      },
      series: [{
        type: 'bar',
        barWidth: '50%',
        itemStyle: {
          color: {
            type: 'linear',
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: '#ffac4a' },
              { offset: 1, color: '#fa8c16' }
            ]
          },
          borderRadius: [8, 8, 0, 0]
        },
        label: {
          show: true,
          position: 'top',
          color: '#ffffff',
          fontSize: 16,
          fontWeight: 'bold'
        },
        data: [
          { value: stats?.byType?.L || 0, itemStyle: { color: '#4caf50' } },
          { value: stats?.byType?.M || 0, itemStyle: { color: '#fa8c16' } },
          { value: stats?.byType?.H || 0, itemStyle: { color: '#f44336' } }
        ]
      }]
    }
  }

  // Real-time data stream
  const getRealTimeStreamOption = () => {
    const rows = getRecentRows(50)
    const categories = rows.map((row, index) => row.UDI ?? row['Product ID'] ?? index + 1)
    const data1 = rows.map(row => Number(row['Torque [Nm]']) || 0)
    const data2 = rows.map(row => Number(row['Rotational speed [rpm]']) || 0)

    return {
      backgroundColor: 'transparent',
      title: {
        text: '实时数据流监控',
        left: 'center',
        textStyle: { color: '#ffffff', fontSize: 18, fontWeight: 600 }
      },
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(45, 45, 45, 0.95)',
        borderColor: '#fa8c16',
        textStyle: { color: '#ffffff' }
      },
      legend: {
        data: ['扭矩 (Nm)', '转速 (rpm)'],
        top: 30,
        textStyle: { color: 'rgba(255, 255, 255, 0.8)' }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        top: 80,
        containLabel: true
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: categories,
        axisLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.2)' } },
        axisLabel: { show: false }
      },
      yAxis: [
        {
          type: 'value',
          position: 'left',
          axisLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.2)' } },
          axisLabel: { color: 'rgba(255, 255, 255, 0.6)' },
          splitLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.1)' } }
        },
        {
          type: 'value',
          position: 'right',
          axisLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.2)' } },
          axisLabel: { color: 'rgba(255, 255, 255, 0.6)' },
          splitLine: { show: false }
        }
      ],
      series: [
        {
          name: '扭矩 (Nm)',
          type: 'line',
          smooth: true,
          showSymbol: false,
          lineStyle: { color: '#fa8c16', width: 2 },
          data: data1
        },
        {
          name: '转速 (rpm)',
          type: 'line',
          smooth: true,
          yAxisIndex: 1,
          showSymbol: false,
          lineStyle: { color: '#4ecdc4', width: 2 },
          data: data2
        }
      ]
    }
  }

  return (
    <Box sx={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #1a1a1a 0%, #0d0d0d 100%)',
      p: 3
    }}>
      {/* Header */}
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 3,
        pb: 2,
        borderBottom: '1px solid rgba(250, 140, 22, 0.2)'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <PrecisionManufacturing sx={{ fontSize: 40, color: '#fa8c16' }} />
          <Box>
            <Typography variant="h4" sx={{ color: '#fa8c16', fontWeight: 700 }}>
              工业设备综合监控中心
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)' }}>
              Student 4 System - 实时监控平台
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Chip
            icon={<CheckCircle />}
            label="系统运行正常"
            sx={{
              background: 'rgba(76, 175, 80, 0.2)',
              border: '1px solid #4caf50',
              color: '#4caf50',
              fontWeight: 600
            }}
          />
          <ToggleButtonGroup
            value={autoRefresh}
            exclusive
            onChange={() => setAutoRefresh(!autoRefresh)}
            size="small"
          >
            <ToggleButton value={true} sx={{ color: '#fa8c16', borderColor: '#fa8c16' }}>
              自动刷新: {autoRefresh ? '开' : '关'}
            </ToggleButton>
          </ToggleButtonGroup>
          <IconButton onClick={loadData} sx={{ color: '#fa8c16' }}>
            <Refresh />
          </IconButton>
        </Box>
      </Box>

      {/* Filters */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel sx={{ color: 'rgba(255,255,255,0.7)' }}>产品类型</InputLabel>
          <Select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            label="产品类型"
            sx={{
              color: '#fff',
              '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(250,140,22,0.5)' },
              '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#fa8c16' }
            }}
          >
            <MenuItem value="all">全部</MenuItem>
            <MenuItem value="L">L型 (低变体)</MenuItem>
            <MenuItem value="M">M型 (中变体)</MenuItem>
            <MenuItem value="H">H型 (高变体)</MenuItem>
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel sx={{ color: 'rgba(255,255,255,0.7)' }}>负载等级</InputLabel>
          <Select
            value={selectedLoadLevel}
            onChange={(e) => setSelectedLoadLevel(e.target.value)}
            label="负载等级"
            sx={{
              color: '#fff',
              '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(250,140,22,0.5)' },
              '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#fa8c16' }
            }}
          >
            <MenuItem value="all">全部</MenuItem>
            <MenuItem value="轻负载">轻负载</MenuItem>
            <MenuItem value="中负载">中负载</MenuItem>
            <MenuItem value="重负载">重负载</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Statistics Cards */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={2.4}>
          <Card sx={{
            background: 'linear-gradient(135deg, rgba(250, 140, 22, 0.2) 0%, rgba(250, 140, 22, 0.05) 100%)',
            border: '1px solid rgba(250, 140, 22, 0.3)',
            borderRadius: 3
          }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)' }}>
                    总记录数
                  </Typography>
                  <Typography variant="h4" sx={{ color: '#fa8c16', fontWeight: 700, mt: 1 }}>
                    {stats?.totalRecords || 0}
                  </Typography>
                </Box>
                <PrecisionManufacturing sx={{ fontSize: 40, color: '#fa8c16', opacity: 0.5 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={2.4}>
          <Card sx={{
            background: 'linear-gradient(135deg, rgba(244, 67, 54, 0.2) 0%, rgba(244, 67, 54, 0.05) 100%)',
            border: '1px solid rgba(244, 67, 54, 0.3)',
            borderRadius: 3
          }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)' }}>
                    故障次数
                  </Typography>
                  <Typography variant="h4" sx={{ color: '#f44336', fontWeight: 700, mt: 1 }}>
                    {stats?.failures || 0}
                  </Typography>
                </Box>
                <ErrorOutline sx={{ fontSize: 40, color: '#f44336', opacity: 0.5 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={2.4}>
          <Card sx={{
            background: 'linear-gradient(135deg, rgba(76, 175, 80, 0.2) 0%, rgba(76, 175, 80, 0.05) 100%)',
            border: '1px solid rgba(76, 175, 80, 0.3)',
            borderRadius: 3
          }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)' }}>
                    设备可用率
                  </Typography>
                  <Typography variant="h4" sx={{ color: '#4caf50', fontWeight: 700, mt: 1 }}>
                    {stats?.failureRate ? (100 - parseFloat(stats.failureRate)).toFixed(1) : 100}%
                  </Typography>
                </Box>
                <CheckCircle sx={{ fontSize: 40, color: '#4caf50', opacity: 0.5 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={2.4}>
          <Card sx={{
            background: 'linear-gradient(135deg, rgba(33, 150, 243, 0.2) 0%, rgba(33, 150, 243, 0.05) 100%)',
            border: '1px solid rgba(33, 150, 243, 0.3)',
            borderRadius: 3
          }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)' }}>
                    平均扭矩
                  </Typography>
                  <Typography variant="h4" sx={{ color: '#2196f3', fontWeight: 700, mt: 1 }}>
                    {stats?.avgTorque || 0} Nm
                  </Typography>
                </Box>
                <Speed sx={{ fontSize: 40, color: '#2196f3', opacity: 0.5 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={2.4}>
          <Card sx={{
            background: 'linear-gradient(135deg, rgba(156, 39, 176, 0.2) 0%, rgba(156, 39, 176, 0.05) 100%)',
            border: '1px solid rgba(156, 39, 176, 0.3)',
            borderRadius: 3
          }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)' }}>
                    平均温度
                  </Typography>
                  <Typography variant="h4" sx={{ color: '#9c27b0', fontWeight: 700, mt: 1 }}>
                    {stats?.avgAirTemp || 0} K
                  </Typography>
                </Box>
                <TrendingUp sx={{ fontSize: 40, color: '#9c27b0', opacity: 0.5 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Tabs for different views */}
      <Box sx={{ mb: 2 }}>
        <Tabs
          value={currentTab}
          onChange={(e, v) => setCurrentTab(v)}
          sx={{
            '& .MuiTabs-indicator': { backgroundColor: '#fa8c16' },
            '& .MuiTab-root': { color: 'rgba(255,255,255,0.6)' },
            '& .MuiTab-root.Mui-selected': { color: '#fa8c16' }
          }}
        >
          <Tab label="温度趋势" />
          <Tab label="扭矩转速" />
          <Tab label="故障分析" />
          <Tab label="实时监控" />
        </Tabs>
      </Box>

      {/* Charts Grid */}
      {currentTab === 0 && (
        <Grid container spacing={2}>
          <Grid item xs={12} lg={8}>
            <Card sx={{ background: 'rgba(45,45,45,0.6)', border: '1px solid rgba(250,140,22,0.2)', height: 500 }}>
              <ReactECharts option={getTemperatureTrendOption()} style={{ height: '100%', width: '100%' }} />
            </Card>
          </Grid>
          <Grid item xs={12} lg={4}>
            <Card sx={{ background: 'rgba(45,45,45,0.6)', border: '1px solid rgba(250,140,22,0.2)', height: 500 }}>
              <ReactECharts option={getToolWearGauge()} style={{ height: '100%', width: '100%' }} />
            </Card>
          </Grid>
        </Grid>
      )}

      {currentTab === 1 && (
        <Grid container spacing={2}>
          <Grid item xs={12} lg={8}>
            <Card sx={{ background: 'rgba(45,45,45,0.6)', border: '1px solid rgba(250,140,22,0.2)', height: 500 }}>
              <ReactECharts option={getTorqueSpeedOption()} style={{ height: '100%', width: '100%' }} />
            </Card>
          </Grid>
          <Grid item xs={12} lg={4}>
            <Card sx={{ background: 'rgba(45,45,45,0.6)', border: '1px solid rgba(250,140,22,0.2)', height: 500 }}>
              <ReactECharts option={getProductTypeChart()} style={{ height: '100%', width: '100%' }} />
            </Card>
          </Grid>
        </Grid>
      )}

      {currentTab === 2 && (
        <Grid container spacing={2}>
          <Grid item xs={12} lg={6}>
            <Card sx={{ background: 'rgba(45,45,45,0.6)', border: '1px solid rgba(250,140,22,0.2)', height: 500 }}>
              <ReactECharts option={getFailureDistribution()} style={{ height: '100%', width: '100%' }} />
            </Card>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Card sx={{ background: 'rgba(45,45,45,0.6)', border: '1px solid rgba(250,140,22,0.2)', height: 500 }}>
              <ReactECharts option={getProductTypeChart()} style={{ height: '100%', width: '100%' }} />
            </Card>
          </Grid>
        </Grid>
      )}

      {currentTab === 3 && (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Card sx={{ background: 'rgba(45,45,45,0.6)', border: '1px solid rgba(250,140,22,0.2)', height: 500 }}>
              <ReactECharts option={getRealTimeStreamOption()} style={{ height: '100%', width: '100%' }} />
            </Card>
          </Grid>
        </Grid>
      )}
    </Box>
  )
}

export default MonitoringDashboardPage
