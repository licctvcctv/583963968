import React, { useState, useEffect } from 'react'
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Chip,
  Button,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tab,
  Tabs,
  Badge,
  Divider
} from '@mui/material'
import {
  CheckCircle,
  ErrorOutline,
  Warning,
  Info,
  Delete,
  Search,
  Notifications,
  NotificationsActive,
  Schedule,
  TrendingUp,
  Close
} from '@mui/icons-material'
import ReactECharts from 'echarts-for-react'
import { loadEquipmentData, getAlerts } from '../utils/dataUtils'

// Format time distance function
const formatTimeDistance = (date) => {
  const now = new Date()
  const diffInSeconds = Math.floor((now - date) / 1000)

  if (diffInSeconds < 60) return '刚刚'
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}分钟前`
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}小时前`
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}天前`
  return date.toLocaleDateString('zh-CN')
}

const AlertCenterPage = () => {
  const [allAlerts, setAllAlerts] = useState([])
  const [filteredAlerts, setFilteredAlerts] = useState([])
  const [selectedAlert, setSelectedAlert] = useState(null)
  const [detailDialog, setDetailDialog] = useState(false)
  const [filterSeverity, setFilterSeverity] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [currentTab, setCurrentTab] = useState(0)

  useEffect(() => {
    void loadAlerts()
  }, [])

  useEffect(() => {
    applyFilters()
  }, [allAlerts, filterSeverity, filterStatus, searchTerm])

  const loadAlerts = async () => {
    try {
      const data = await loadEquipmentData()
      const alerts = getAlerts(data)
      setAllAlerts(alerts)
    } catch (error) {
      console.error('加载告警数据失败:', error)
      setAllAlerts([])
    }
  }

  const applyFilters = () => {
    let filtered = [...allAlerts]

    if (filterSeverity !== 'all') {
      filtered = filtered.filter(alert => alert.severity === filterSeverity)
    }

    if (filterStatus === 'resolved') {
      filtered = filtered.filter(alert => alert.resolved)
    } else if (filterStatus === 'unresolved') {
      filtered = filtered.filter(alert => !alert.resolved)
    }

    if (searchTerm) {
      filtered = filtered.filter(alert =>
        alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        alert.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
        alert.productId.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    setFilteredAlerts(filtered)
  }

  const handleResolveAlert = (alertId) => {
    setAllAlerts(alerts =>
      alerts.map(alert =>
        alert.id === alertId ? { ...alert, resolved: true } : alert
      )
    )
  }

  const handleDeleteAlert = (alertId) => {
    setAllAlerts(alerts => alerts.filter(alert => alert.id !== alertId))
  }

  const handleResolveAll = () => {
    setAllAlerts(alerts => alerts.map(alert => ({ ...alert, resolved: true })))
  }

  const handleViewDetail = (alert) => {
    setSelectedAlert(alert)
    setDetailDialog(true)
  }

  const getAlertIcon = (severity) => {
    switch (severity) {
      case 'critical': return <ErrorOutline sx={{ fontSize: 28, color: '#f44336' }} />
      case 'warning': return <Warning sx={{ fontSize: 28, color: '#ff9800' }} />
      case 'info': return <Info sx={{ fontSize: 28, color: '#2196f3' }} />
      default: return <Notifications sx={{ fontSize: 28, color: '#4caf50' }} />
    }
  }

  const getAlertColor = (severity) => {
    switch (severity) {
      case 'critical': return { bg: 'rgba(244, 67, 54, 0.15)', border: '#f44336', color: '#f44336' }
      case 'warning': return { bg: 'rgba(255, 152, 0, 0.15)', border: '#ff9800', color: '#ff9800' }
      case 'info': return { bg: 'rgba(33, 150, 243, 0.15)', border: '#2196f3', color: '#2196f3' }
      default: return { bg: 'rgba(76, 175, 80, 0.15)', border: '#4caf50', color: '#4caf50' }
    }
  }

  // Alert trend chart
  const getAlertTrendOption = () => {
    const hours = Array.from({ length: 24 }, (_, i) => `${i}:00`)
    const criticalData = Array.from({ length: 24 }, () => 0)
    const warningData = Array.from({ length: 24 }, () => 0)
    const infoData = Array.from({ length: 24 }, () => 0)

    allAlerts.forEach((alert) => {
      const hour = new Date(alert.timestamp).getHours()
      if (alert.severity === 'critical') {
        criticalData[hour] += 1
      } else if (alert.severity === 'warning') {
        warningData[hour] += 1
      } else if (alert.severity === 'info') {
        infoData[hour] += 1
      }
    })

    return {
      backgroundColor: 'transparent',
      title: {
        text: '告警趋势分析 (24小时)',
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
        data: ['严重告警', '警告告警', '信息告警'],
        top: 35,
        textStyle: { color: 'rgba(255,255,255,0.8)' }
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
        data: hours,
        axisLine: { lineStyle: { color: 'rgba(255,255,255,0.2)' } },
        axisLabel: { color: 'rgba(255,255,255,0.6)' },
        splitLine: { lineStyle: { color: 'rgba(255,255,255,0.05)' } }
      },
      yAxis: {
        type: 'value',
        name: '告警数量',
        nameTextStyle: { color: 'rgba(255,255,255,0.6)' },
        axisLine: { lineStyle: { color: 'rgba(255,255,255,0.2)' } },
        axisLabel: { color: 'rgba(255,255,255,0.6)' },
        splitLine: { lineStyle: { color: 'rgba(255,255,255,0.1)' } }
      },
      series: [
        {
          name: '严重告警',
          type: 'line',
          smooth: true,
          lineStyle: { color: '#f44336', width: 2 },
          itemStyle: { color: '#f44336' },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0, y: 0, x2: 0, y2: 1,
              colorStops: [
                { offset: 0, color: 'rgba(244, 67, 54, 0.3)' },
                { offset: 1, color: 'rgba(244, 67, 54, 0)' }
              ]
            }
          },
          data: criticalData
        },
        {
          name: '警告告警',
          type: 'line',
          smooth: true,
          lineStyle: { color: '#ff9800', width: 2 },
          itemStyle: { color: '#ff9800' },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0, y: 0, x2: 0, y2: 1,
              colorStops: [
                { offset: 0, color: 'rgba(255, 152, 0, 0.3)' },
                { offset: 1, color: 'rgba(255, 152, 0, 0)' }
              ]
            }
          },
          data: warningData
        },
        {
          name: '信息告警',
          type: 'line',
          smooth: true,
          lineStyle: { color: '#2196f3', width: 2 },
          itemStyle: { color: '#2196f3' },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0, y: 0, x2: 0, y2: 1,
              colorStops: [
                { offset: 0, color: 'rgba(33, 150, 243, 0.3)' },
                { offset: 1, color: 'rgba(33, 150, 243, 0)' }
              ]
            }
          },
          data: infoData
        }
      ]
    }
  }

  // Alert distribution pie
  const getAlertDistributionOption = () => {
    const stats = {
      critical: allAlerts.filter(a => a.severity === 'critical' && !a.resolved).length,
      warning: allAlerts.filter(a => a.severity === 'warning' && !a.resolved).length,
      info: allAlerts.filter(a => a.severity === 'info' && !a.resolved).length
    }

    return {
      backgroundColor: 'transparent',
      title: {
        text: '未解决告警分布',
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
        textStyle: { color: 'rgba(255,255,255,0.8)' }
      },
      series: [{
        type: 'pie',
        radius: ['50%', '75%'],
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
          color: 'rgba(255,255,255,0.9)',
          fontSize: 14,
          formatter: '{b}\n{c}条'
        },
        labelLine: {
          show: true,
          lineStyle: { color: 'rgba(255,255,255,0.5)', width: 2 }
        },
        data: [
          { value: stats.critical, name: '严重告警', itemStyle: { color: '#f44336' } },
          { value: stats.warning, name: '警告告警', itemStyle: { color: '#ff9800' } },
          { value: stats.info, name: '信息告警', itemStyle: { color: '#2196f3' } }
        ]
      }]
    }
  }

  const stats = {
    total: allAlerts.length,
    unresolved: allAlerts.filter(a => !a.resolved).length,
    critical: allAlerts.filter(a => a.severity === 'critical' && !a.resolved).length,
    warning: allAlerts.filter(a => a.severity === 'warning' && !a.resolved).length,
    info: allAlerts.filter(a => a.severity === 'info' && !a.resolved).length,
    today: allAlerts.filter(a => {
      const today = new Date()
      const alertDate = new Date(a.timestamp)
      return alertDate.toDateString() === today.toDateString()
    }).length
  }

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(180deg, #1a1a1a 0%, #0d0d0d 100%)', p: 3 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Badge badgeContent={stats.unresolved} color="error">
            <NotificationsActive sx={{ fontSize: 36, color: '#fa8c16' }} />
          </Badge>
          <Box>
            <Typography variant="h4" sx={{ color: '#fa8c16', fontWeight: 700 }}>
              告警中心
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)' }}>
              实时告警监控与管理
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<CheckCircle />}
            onClick={handleResolveAll}
            sx={{ borderColor: '#fa8c16', color: '#fa8c16' }}
          >
            全部标记已读
          </Button>
          <Button
            variant="contained"
            startIcon={<Schedule />}
            onClick={loadAlerts}
            sx={{ background: '#fa8c16', '&:hover': { background: '#e58520' } }}
          >
            刷新
          </Button>
        </Box>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={2.4}>
          <Card sx={{ background: 'rgba(45,45,45,0.6)', border: '1px solid rgba(250,140,22,0.2)' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)' }}>总告警数</Typography>
                  <Typography variant="h3" sx={{ color: '#fa8c16', fontWeight: 700, mt: 1 }}>{stats.total}</Typography>
                </Box>
                <Notifications sx={{ fontSize: 32, color: '#fa8c16', opacity: 0.5 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={2.4}>
          <Card sx={{ background: 'rgba(244, 67, 54, 0.15)', border: '1px solid rgba(244, 67, 54, 0.3)' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)' }}>严重告警</Typography>
                  <Typography variant="h3" sx={{ color: '#f44336', fontWeight: 700, mt: 1 }}>{stats.critical}</Typography>
                </Box>
                <ErrorOutline sx={{ fontSize: 32, color: '#f44336', opacity: 0.5 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={2.4}>
          <Card sx={{ background: 'rgba(255, 152, 0, 0.15)', border: '1px solid rgba(255, 152, 0, 0.3)' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)' }}>警告告警</Typography>
                  <Typography variant="h3" sx={{ color: '#ff9800', fontWeight: 700, mt: 1 }}>{stats.warning}</Typography>
                </Box>
                <Warning sx={{ fontSize: 32, color: '#ff9800', opacity: 0.5 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={2.4}>
          <Card sx={{ background: 'rgba(33, 150, 243, 0.15)', border: '1px solid rgba(33, 150, 243, 0.3)' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)' }}>信息告警</Typography>
                  <Typography variant="h3" sx={{ color: '#2196f3', fontWeight: 700, mt: 1 }}>{stats.info}</Typography>
                </Box>
                <Info sx={{ fontSize: 32, color: '#2196f3', opacity: 0.5 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={2.4}>
          <Card sx={{ background: 'rgba(76, 175, 80, 0.15)', border: '1px solid rgba(76, 175, 80, 0.3)' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)' }}>今日新增</Typography>
                  <Typography variant="h3" sx={{ color: '#4caf50', fontWeight: 700, mt: 1 }}>{stats.today}</Typography>
                </Box>
                <TrendingUp sx={{ fontSize: 32, color: '#4caf50', opacity: 0.5 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Filters */}
      <Card sx={{ mb: 3, background: 'rgba(45,45,45,0.6)', border: '1px solid rgba(250,140,22,0.2)' }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                size="small"
                placeholder="搜索告警..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <Search sx={{ color: 'rgba(255,255,255,0.5)', mr: 1 }} />
                  )
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    color: '#fff',
                    '& fieldset': { borderColor: 'rgba(250,140,22,0.3)' }
                  }
                }}
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <FormControl fullWidth size="small">
                <InputLabel sx={{ color: 'rgba(255,255,255,0.7)' }}>告警级别</InputLabel>
                <Select
                  value={filterSeverity}
                  onChange={(e) => setFilterSeverity(e.target.value)}
                  label="告警级别"
                  sx={{ color: '#fff' }}
                >
                  <MenuItem value="all">全部</MenuItem>
                  <MenuItem value="critical">严重</MenuItem>
                  <MenuItem value="warning">警告</MenuItem>
                  <MenuItem value="info">信息</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} md={3}>
              <FormControl fullWidth size="small">
                <InputLabel sx={{ color: 'rgba(255,255,255,0.7)' }}>处理状态</InputLabel>
                <Select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  label="处理状态"
                  sx={{ color: '#fff' }}
                >
                  <MenuItem value="all">全部</MenuItem>
                  <MenuItem value="resolved">已处理</MenuItem>
                  <MenuItem value="unresolved">未处理</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Tabs */}
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
          <Tab label={`告警列表 (${filteredAlerts.length})`} />
          <Tab label="统计分析" />
        </Tabs>
      </Box>

      {/* Alert List */}
      {currentTab === 0 && (
        <Grid container spacing={2}>
          <Grid item xs={12} lg={7}>
            <Card sx={{ background: 'rgba(45,45,45,0.6)', border: '1px solid rgba(250,140,22,0.2)', maxHeight: 700, overflow: 'auto' }}>
              <List>
                {filteredAlerts.length === 0 ? (
                  <Box sx={{ p: 4, textAlign: 'center' }}>
                    <Typography sx={{ color: 'rgba(255,255,255,0.5)' }}>暂无告警信息</Typography>
                  </Box>
                ) : (
                  filteredAlerts.map((alert, index) => {
                    const colors = getAlertColor(alert.severity)
                    return (
                      <React.Fragment key={alert.id}>
                        <ListItem
                          sx={{
                            background: alert.resolved ? 'rgba(76,175,80,0.05)' : colors.bg,
                            borderLeft: `4px solid ${alert.resolved ? '#4caf50' : colors.border}`,
                            mb: 1,
                            mx: 1,
                            borderRadius: 1,
                            '&:hover': { background: alert.resolved ? 'rgba(76,175,80,0.1)' : `${colors.bg}dd` }
                          }}
                        >
                          <ListItemIcon sx={{ minWidth: 48 }}>
                            {getAlertIcon(alert.severity)}
                          </ListItemIcon>
                          <ListItemText
                            disableTypography
                            primary={
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Typography variant="subtitle1" component="span" sx={{ color: '#ffffff', fontWeight: 600 }}>
                                  {alert.title}
                                </Typography>
                                {alert.resolved && (
                                  <Chip label="已处理" size="small" sx={{ background: 'rgba(76,175,80,0.2)', color: '#4caf50' }} />
                                )}
                              </Box>
                            }
                            secondary={
                              <Box>
                                <Typography variant="body2" component="span" sx={{ color: 'rgba(255,255,255,0.7)', display: 'block' }}>
                                  {alert.message}
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 0.5 }}>
                                  <Typography variant="caption" component="span" sx={{ color: 'rgba(255,255,255,0.5)' }}>
                                    设备: {alert.productId}
                                  </Typography>
                                  <Typography variant="caption" component="span" sx={{ color: 'rgba(255,255,255,0.5)' }}>
                                    <Schedule sx={{ fontSize: 12, verticalAlign: 'middle', mr: 0.5 }} />
                                    {formatTimeDistance(alert.timestamp)}
                                  </Typography>
                                </Box>
                              </Box>
                            }
                          />
                          <ListItemSecondaryAction>
                            <Box sx={{ display: 'flex', gap: 1 }}>
                              {!alert.resolved && (
                                <IconButton
                                  onClick={() => handleResolveAlert(alert.id)}
                                  size="small"
                                  sx={{ color: '#4caf50' }}
                                >
                                  <CheckCircle />
                                </IconButton>
                              )}
                              <IconButton
                                onClick={() => handleViewDetail(alert)}
                                size="small"
                                sx={{ color: '#2196f3' }}
                              >
                                <Info />
                              </IconButton>
                              <IconButton
                                onClick={() => handleDeleteAlert(alert.id)}
                                size="small"
                                sx={{ color: '#f44336' }}
                              >
                                <Delete />
                              </IconButton>
                            </Box>
                          </ListItemSecondaryAction>
                        </ListItem>
                        {index < filteredAlerts.length - 1 && <Divider />}
                      </React.Fragment>
                    )
                  })
                )}
              </List>
            </Card>
          </Grid>

          <Grid item xs={12} lg={5}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Card sx={{ background: 'rgba(45,45,45,0.6)', border: '1px solid rgba(250,140,22,0.2)', height: 330 }}>
                  <ReactECharts option={getAlertDistributionOption()} style={{ height: '100%', width: '100%' }} />
                </Card>
              </Grid>
              <Grid item xs={12}>
                <Card sx={{ background: 'rgba(45,45,45,0.6)', border: '1px solid rgba(250,140,22,0.2)', height: 330 }}>
                  <ReactECharts option={getAlertTrendOption()} style={{ height: '100%', width: '100%' }} />
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}

      {/* Statistics View */}
      {currentTab === 1 && (
        <Grid container spacing={2}>
          <Grid item xs={12} lg={6}>
            <Card sx={{ background: 'rgba(45,45,45,0.6)', border: '1px solid rgba(250,140,22,0.2)', height: 500 }}>
              <ReactECharts option={getAlertTrendOption()} style={{ height: '100%', width: '100%' }} />
            </Card>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Card sx={{ background: 'rgba(45,45,45,0.6)', border: '1px solid rgba(250,140,22,0.2)', height: 500 }}>
              <ReactECharts option={getAlertDistributionOption()} style={{ height: '100%', width: '100%' }} />
            </Card>
          </Grid>
        </Grid>
      )}

      {/* Alert Detail Dialog */}
      <Dialog
        open={detailDialog}
        onClose={() => setDetailDialog(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            background: 'rgba(45, 45, 45, 0.95)',
            border: '1px solid rgba(250, 140, 22, 0.3)',
            borderRadius: 2
          }
        }}
      >
        {selectedAlert && (
          <>
            <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                {getAlertIcon(selectedAlert.severity)}
                <Typography variant="h6" sx={{ color: '#ffffff' }}>
                  {selectedAlert.title}
                </Typography>
              </Box>
              <IconButton onClick={() => setDetailDialog(false)} sx={{ color: 'rgba(255,255,255,0.7)' }}>
                <Close />
              </IconButton>
            </DialogTitle>
            <DialogContent>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)' }}>告警ID</Typography>
                  <Typography variant="body1" sx={{ color: '#ffffff' }}>#{selectedAlert.id}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)' }}>设备ID</Typography>
                  <Typography variant="body1" sx={{ color: '#ffffff' }}>{selectedAlert.productId}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)' }}>告警时间</Typography>
                  <Typography variant="body1" sx={{ color: '#ffffff' }}>{new Date(selectedAlert.timestamp).toLocaleString('zh-CN')}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)' }}>状态</Typography>
                  <Chip
                    label={selectedAlert.resolved ? '已处理' : '未处理'}
                    sx={{
                      background: selectedAlert.resolved ? 'rgba(76,175,80,0.2)' : 'rgba(244,67,54,0.2)',
                      color: selectedAlert.resolved ? '#4caf50' : '#f44336'
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)' }}>告警详情</Typography>
                  <Typography variant="body1" sx={{ color: '#ffffff', mt: 1 }}>{selectedAlert.message}</Typography>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions sx={{ p: 2 }}>
              {!selectedAlert.resolved && (
                <Button
                  onClick={() => {
                    handleResolveAlert(selectedAlert.id)
                    setDetailDialog(false)
                  }}
                  variant="contained"
                  sx={{ background: '#4caf50', '&:hover': { background: '#45a049' } }}
                >
                  标记已处理
                </Button>
              )}
              <Button
                onClick={() => setDetailDialog(false)}
                sx={{ color: 'rgba(255,255,255,0.7)' }}
              >
                关闭
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  )
}

export default AlertCenterPage
