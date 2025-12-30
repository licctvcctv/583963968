import React, { useState } from 'react'
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Card,
  CardContent,
  Chip,
  Grid,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material'
import {
  Power,
  Wifi,
  Cloud,
  MoreVert,
  Refresh,
  ExitToApp,
} from '@mui/icons-material'
import ReactECharts from 'echarts-for-react'

const MonitoringPage = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const [statusData, setStatusData] = useState({
    uptime: '99.9%',
    cpu: '45%',
    memory: '62%',
    disk: '38%',
    network: '正常',
  })

  const generateTimeSeriesData = () => {
    const now = new Date()
    const data = []
    for (let i = 19; i >= 0; i--) {
      const time = new Date(now - i * 60000)
      data.push([
        time.getTime(),
        Math.floor(Math.random() * 30) + 40,
      ])
    }
    return data
  }

  const generateNetworkData = () => {
    return ['CPU', '内存', '磁盘', '网络'].map(item => ({
      name: item,
      value: Math.floor(Math.random() * 100),
    }))
  }

  const generateAlarmData = () => {
    return [
      { time: '2024-01-20 14:30', level: 'warning', device: '服务器-01', message: 'CPU使用率过高' },
      { time: '2024-01-20 14:25', level: 'error', device: '服务器-02', message: '内存使用率过高' },
      { time: '2024-01-20 14:20', level: 'info', device: '网络设备-01', message: '网络延迟正常' },
      { time: '2024-01-20 14:15', level: 'warning', device: '服务器-03', message: '磁盘空间不足' },
    ]
  }

  const getAlarmColor = (level) => {
    switch (level) {
      case 'error': return '#f44336'
      case 'warning': return '#ff9800'
      case 'info': return '#2196f3'
      default: return '#4caf50'
    }
  }

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    window.location.href = '/'
  }

  const refreshData = () => {
    setStatusData({
      uptime: '99.9%',
      cpu: Math.floor(Math.random() * 30) + 40 + '%',
      memory: Math.floor(Math.random() * 20) + 50 + '%',
      disk: Math.floor(Math.random() * 20) + 30 + '%',
      network: '正常',
    })
  }

  const cpuOption = {
    title: {
      text: 'CPU 使用率',
      textStyle: { color: '#ffffff', fontSize: 16 }
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(45, 45, 45, 0.9)',
      borderColor: '#fa8c16',
      textStyle: { color: '#ffffff' }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: generateTimeSeriesData().map(item => new Date(item[0]).toLocaleTimeString()),
      axisLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.2)' } },
      axisLabel: { color: 'rgba(255, 255, 255, 0.7)' }
    },
    yAxis: {
      type: 'value',
      axisLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.2)' } },
      axisLabel: { color: 'rgba(255, 255, 255, 0.7)' },
      splitLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.1)' } }
    },
    series: [{
      name: 'CPU使用率',
      type: 'line',
      smooth: true,
      symbol: 'none',
      lineStyle: { color: '#fa8c16', width: 3 },
      areaStyle: {
        color: new Function(`return {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [{
            offset: 0,
            color: 'rgba(250, 140, 22, 0.3)'
          }, {
            offset: 1,
            color: 'rgba(250, 140, 22, 0)'
          }]
        }`)()
      },
      data: generateTimeSeriesData().map(item => item[1])
    }]
  }

  const networkOption = {
    title: {
      text: '资源使用分布',
      textStyle: { color: '#ffffff', fontSize: 16 }
    },
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(45, 45, 45, 0.9)',
      borderColor: '#fa8c16',
      textStyle: { color: '#ffffff' }
    },
    series: [{
      name: '资源使用',
      type: 'pie',
      radius: ['40%', '70%'],
      center: ['50%', '50%'],
      avoidLabelOverlap: true,
      itemStyle: {
        borderRadius: 8,
        borderColor: '#2d2d2d',
        borderWidth: 2
      },
      label: {
        show: false,
        position: 'center'
      },
      emphasis: {
        label: {
          show: true,
          fontSize: '16',
          fontWeight: 'bold',
          color: '#ffffff'
        }
      },
      labelLine: {
        show: false
      },
      data: generateNetworkData()
    }]
  }

  return (
    <Box sx={{ height: '100vh', overflow: 'hidden', background: '#1a1a1a' }}>
      {/* 顶部导航栏 */}
      <AppBar position="static" sx={{
        background: 'rgba(26, 26, 26, 0.95)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(250, 140, 22, 0.3)'
      }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <Typography variant="h5" sx={{ color: '#fa8c16', fontWeight: 600 }}>
              综合监控指挥中心
            </Typography>
            <Chip
              icon={<Power />}
              label="系统运行中"
              size="small"
              sx={{
                background: 'rgba(76, 175, 80, 0.2)',
                border: '1px solid #4caf50',
                color: '#4caf50',
                fontWeight: 500
              }}
            />
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Chip
                icon={<Wifi />}
                label="网络正常"
                size="small"
                sx={{
                  background: 'rgba(33, 150, 243, 0.2)',
                  border: '1px solid #2196f3',
                  color: '#2196f3'
                }}
              />
              <Chip
                icon={<Cloud />}
                label="云端连接"
                size="small"
                sx={{
                  background: 'rgba(250, 140, 22, 0.2)',
                  border: '1px solid #fa8c16',
                  color: '#fa8c16'
                }}
              />
            </Box>

            <IconButton color="inherit" onClick={handleMenuClick}>
              <MoreVert />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              sx={{
                '& .MuiPaper-root': {
                  backgroundColor: 'rgba(45, 45, 45, 0.95)',
                  border: '1px solid rgba(250, 140, 22, 0.3)',
                  borderRadius: '8px'
                }
              }}
            >
              <MenuItem onClick={refreshData} sx={{ color: '#ffffff' }}>
                <Refresh sx={{ mr: 1 }} /> 刷新数据
              </MenuItem>
              <MenuItem onClick={handleLogout} sx={{ color: '#ffffff' }}>
                <ExitToApp sx={{ mr: 1 }} /> 退出登录
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      {/* 主要内容区域 */}
      <Box sx={{ padding: '20px', height: 'calc(100vh - 64px)' }}>
        {/* 实时状态卡片 */}
        <Grid container spacing={3} sx={{ marginBottom: '20px' }}>
          {[
            { label: '系统运行时间', value: statusData.uptime, icon: <Power /> },
            { label: 'CPU使用率', value: statusData.cpu, icon: <Cloud /> },
            { label: '内存使用率', value: statusData.memory, icon: <Cloud /> },
            { label: '磁盘使用率', value: statusData.disk, icon: <Cloud /> },
            { label: '网络状态', value: statusData.network, icon: <Wifi /> },
          ].map((item, index) => (
            <Grid item xs={12} sm={2.4} key={index}>
              <Card sx={{
                background: 'rgba(45, 45, 45, 0.8)',
                border: '1px solid rgba(250, 140, 22, 0.2)',
                height: '100%'
              }}>
                <CardContent sx={{ padding: '20px !important' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box>
                      <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                        {item.label}
                      </Typography>
                      <Typography variant="h4" sx={{ color: '#fa8c16', fontWeight: 600, mt: '8px' }}>
                        {item.value}
                      </Typography>
                    </Box>
                    <Box sx={{
                      color: '#fa8c16',
                      fontSize: '24px',
                      opacity: 0.8
                    }}>
                      {item.icon}
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* 图表区域 */}
        <Grid container spacing={3} sx={{ height: 'calc(100% - 140px)' }}>
          <Grid item xs={12} lg={8}>
            <Card sx={{
              height: '100%',
              background: 'rgba(45, 45, 45, 0.8)',
              border: '1px solid rgba(250, 140, 22, 0.2)'
            }}>
              <CardContent sx={{ padding: '0 !important', height: '100%' }}>
                <ReactECharts
                  option={cpuOption}
                  style={{ height: '100%', width: '100%' }}
                />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} lg={4}>
            <Card sx={{
              height: '100%',
              background: 'rgba(45, 45, 45, 0.8)',
              border: '1px solid rgba(250, 140, 22, 0.2)'
            }}>
              <CardContent sx={{ padding: '0 !important', height: '100%' }}>
                <ReactECharts
                  option={networkOption}
                  style={{ height: '100%', width: '100%' }}
                />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export default MonitoringPage
