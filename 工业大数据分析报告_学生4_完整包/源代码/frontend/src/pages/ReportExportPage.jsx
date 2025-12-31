import React, { useState, useEffect } from 'react'
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Checkbox,
  FormControlLabel,
  Divider,
  CircularProgress,
  Alert,
  Tab,
  Tabs,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton
} from '@mui/material'
import {
  Download,
  PictureAsPdf,
  Description,
  TableChart,
  CheckCircle,
  Schedule,
  Analytics,
  Assessment,
  Dashboard,
  FileDownload,
  Visibility,
  Close
} from '@mui/icons-material'
import ReactECharts from 'echarts-for-react'
import { loadEquipmentData, getAggregatedStats } from '../utils/dataUtils'

const ReportExportPage = () => {
  const [data, setData] = useState([])
  const [stats, setStats] = useState(null)
  const [currentTab, setCurrentTab] = useState(0)
  const [reportType, setReportType] = useState('summary')
  const [format, setFormat] = useState('pdf')
  const [includeCharts, setIncludeCharts] = useState(true)
  const [includeTables, setIncludeTables] = useState(true)
  const [includeStats, setIncludeStats] = useState(true)
  const [generating, setGenerating] = useState(false)
  const [previewDialog, setPreviewDialog] = useState(false)
  const [reportName, setReportName] = useState('')

  useEffect(() => {
    void loadData()
  }, [])

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

  const handleGenerateReport = async () => {
    setGenerating(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    setGenerating(false)

    const filename = `${reportName || '设备监控报告'}_${new Date().toISOString().split('T')[0]}`

    if (format === 'pdf') {
      alert(`正在生成 PDF 报告: ${filename}.pdf\n\n实际项目中将调用后端 API 生成 PDF 文件`)
    } else if (format === 'excel') {
      alert(`正在生成 Excel 报告: ${filename}.xlsx\n\n实际项目中将调用后端 API 生成 Excel 文件`)
    } else {
      alert(`正在生成 Word 报告: ${filename}.docx\n\n实际项目中将调用后端 API 生成 Word 文件`)
    }
  }

  const reportTemplates = [
    {
      id: 'summary',
      name: '综合概览报告',
      description: '包含关键指标、图表摘要和数据统计',
      icon: <Dashboard />,
      sections: ['概览', '关键指标', '趋势分析']
    },
    {
      id: 'detailed',
      name: '详细数据报告',
      description: '完整的数据表格、多维度分析和原始数据',
      icon: <TableChart />,
      sections: ['数据表格', '统计分析', '原始数据']
    },
    {
      id: 'failure',
      name: '故障分析报告',
      description: '故障统计、类型分布和趋势分析',
      icon: <Assessment />,
      sections: ['故障统计', '类型分析', '趋势图']
    },
    {
      id: 'performance',
      name: '性能评估报告',
      description: '设备性能指标、温度、扭矩等参数分析',
      icon: <Analytics />,
      sections: ['性能指标', '参数分析', '对比图表']
    },
    {
      id: 'maintenance',
      name: '维护计划报告',
      description: '设备维护周期、工具磨损预测',
      icon: <Schedule />,
      sections: ['维护计划', '磨损预测', '建议措施']
    }
  ]

  // Sample report preview chart
  const getPreviewChart = () => {
    const bucketCount = 7
    const labels = Array.from({ length: bucketCount }, (_, i) => `批次${i + 1}`)
    const buckets = Array.from({ length: bucketCount }, () => ({
      count: 0,
      failures: 0,
      torqueSum: 0,
      tempSum: 0
    }))
    const bucketSize = Math.max(1, Math.ceil(data.length / bucketCount))

    data.forEach((row, index) => {
      const bucketIndex = Math.min(Math.floor(index / bucketSize), bucketCount - 1)
      const bucket = buckets[bucketIndex]
      bucket.count += 1
      bucket.failures += Number(row['Machine failure']) === 1 ? 1 : 0
      bucket.torqueSum += Number(row['Torque [Nm]']) || 0
      bucket.tempSum += Number(row['Process temperature [K]']) || 0
    })

    const availability = buckets.map(bucket => (
      bucket.count
        ? Number(((1 - bucket.failures / bucket.count) * 100).toFixed(1))
        : 100
    ))
    const avgTorque = buckets.map(bucket => (
      bucket.count ? Number((bucket.torqueSum / bucket.count).toFixed(1)) : 0
    ))
    const avgTemp = buckets.map(bucket => (
      bucket.count ? Number((bucket.tempSum / bucket.count).toFixed(1)) : 0
    ))

    return {
      backgroundColor: 'transparent',
      title: {
        text: '报告预览 - 设备运行趋势',
        left: 'center',
        textStyle: { color: '#ffffff', fontSize: 16 }
      },
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(45, 45, 45, 0.95)',
        borderColor: '#fa8c16',
        textStyle: { color: '#ffffff' }
      },
      legend: {
        data: ['设备可用率', '平均扭矩', '平均温度'],
        top: 30,
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
        data: labels,
        axisLine: { lineStyle: { color: 'rgba(255,255,255,0.2)' } },
        axisLabel: { color: 'rgba(255,255,255,0.6)' }
      },
      yAxis: [
        {
          type: 'value',
          position: 'left',
          axisLine: { lineStyle: { color: 'rgba(255,255,255,0.2)' } },
          axisLabel: { color: 'rgba(255,255,255,0.6)' },
          splitLine: { lineStyle: { color: 'rgba(255,255,255,0.1)' } }
        },
        {
          type: 'value',
          position: 'right',
          axisLine: { lineStyle: { color: 'rgba(255,255,255,0.2)' } },
          axisLabel: { color: 'rgba(255,255,255,0.6)' },
          splitLine: { show: false }
        }
      ],
      series: [
        {
          name: '设备可用率',
          type: 'line',
          smooth: true,
          lineStyle: { color: '#4caf50', width: 3 },
          itemStyle: { color: '#4caf50' },
          data: availability
        },
        {
          name: '平均扭矩',
          type: 'bar',
          yAxisIndex: 1,
          itemStyle: { color: '#fa8c16', borderRadius: [4, 4, 0, 0] },
          data: avgTorque
        },
        {
          name: '平均温度',
          type: 'line',
          smooth: true,
          yAxisIndex: 1,
          lineStyle: { color: '#2196f3', width: 2 },
          itemStyle: { color: '#2196f3' },
          data: avgTemp
        }
      ]
    }
  }

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(180deg, #1a1a1a 0%, #0d0d0d 100%)', p: 3 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Assessment sx={{ fontSize: 36, color: '#fa8c16' }} />
          <Box>
            <Typography variant="h4" sx={{ color: '#fa8c16', fontWeight: 700 }}>
              报告导出中心
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)' }}>
              生成和导出各类数据分析报告
            </Typography>
          </Box>
        </Box>
      </Box>

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
          <Tab label="快速报告" />
          <Tab label="自定义报告" />
          <Tab label="报告历史" />
        </Tabs>
      </Box>

      {/* Quick Report Tab */}
      {currentTab === 0 && (
        <Grid container spacing={3}>
          {/* Report Templates */}
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ color: '#ffffff', mb: 2 }}>选择报告模板</Typography>
            <Grid container spacing={2}>
              {reportTemplates.map((template) => (
                <Grid item xs={12} sm={6} md={2.4} key={template.id}>
                  <Card
                    onClick={() => setReportType(template.id)}
                    sx={{
                      height: '100%',
                      cursor: 'pointer',
                      background: reportType === template.id
                        ? 'linear-gradient(135deg, rgba(250, 140, 22, 0.2) 0%, rgba(250, 140, 22, 0.05) 100%)'
                        : 'rgba(45, 45, 45, 0.6)',
                      border: reportType === template.id
                        ? '2px solid #fa8c16'
                        : '1px solid rgba(250, 140, 22, 0.2)',
                      transition: 'all 0.3s',
                      '&:hover': {
                        border: '2px solid #fa8c16',
                        transform: 'translateY(-4px)'
                      }
                    }}
                  >
                    <CardContent>
                      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                        <Box sx={{
                          p: 2,
                          borderRadius: 2,
                          background: 'rgba(250, 140, 22, 0.1)',
                          mb: 2
                        }}>
                          {template.icon}
                        </Box>
                        <Typography variant="subtitle1" sx={{ color: '#ffffff', fontWeight: 600, mb: 1 }}>
                          {template.name}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem' }}>
                          {template.description}
                        </Typography>
                        {reportType === template.id && (
                          <Chip
                            icon={<CheckCircle />}
                            label="已选择"
                            size="small"
                            sx={{ mt: 2, background: 'rgba(250,140,22,0.2)', color: '#fa8c16' }}
                          />
                        )}
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/* Export Options */}
          <Grid item xs={12} md={6}>
            <Card sx={{ background: 'rgba(45,45,45,0.6)', border: '1px solid rgba(250,140,22,0.2)', height: '100%' }}>
              <CardContent>
                <Typography variant="h6" sx={{ color: '#fa8c16', mb: 3 }}>导出选项</Typography>

                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="报告名称"
                      value={reportName}
                      onChange={(e) => setReportName(e.target.value)}
                      placeholder="设备监控报告"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          color: '#fff',
                          '& fieldset': { borderColor: 'rgba(250,140,22,0.3)' }
                        },
                        '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.7)' }
                      }}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <FormControl fullWidth>
                      <InputLabel sx={{ color: 'rgba(255,255,255,0.7)' }}>文件格式</InputLabel>
                      <Select
                        value={format}
                        onChange={(e) => setFormat(e.target.value)}
                        label="文件格式"
                        sx={{ color: '#fff' }}
                      >
                        <MenuItem value="pdf">
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <PictureAsPdf sx={{ color: '#f44336', fontSize: 18 }} />
                            PDF
                          </Box>
                        </MenuItem>
                        <MenuItem value="excel">
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <TableChart sx={{ color: '#4caf50', fontSize: 18 }} />
                            Excel
                          </Box>
                        </MenuItem>
                        <MenuItem value="word">
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Description sx={{ color: '#2196f3', fontSize: 18 }} />
                            Word
                          </Box>
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12}>
                    <Typography variant="subtitle2" sx={{ color: '#ffffff', mb: 1 }}>包含内容</Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={includeStats}
                            onChange={(e) => setIncludeStats(e.target.checked)}
                            sx={{ color: '#fa8c16', '&.Mui-checked': { color: '#fa8c16' } }}
                          />
                        }
                        label={<Typography sx={{ color: 'rgba(255,255,255,0.8)' }}>统计摘要</Typography>}
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={includeCharts}
                            onChange={(e) => setIncludeCharts(e.target.checked)}
                            sx={{ color: '#fa8c16', '&.Mui-checked': { color: '#fa8c16' } }}
                          />
                        }
                        label={<Typography sx={{ color: 'rgba(255,255,255,0.8)' }}>图表分析</Typography>}
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={includeTables}
                            onChange={(e) => setIncludeTables(e.target.checked)}
                            sx={{ color: '#fa8c16', '&.Mui-checked': { color: '#fa8c16' } }}
                          />
                        }
                        label={<Typography sx={{ color: 'rgba(255,255,255,0.8)' }}>数据表格</Typography>}
                      />
                    </Box>
                  </Grid>
                </Grid>

                <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<Visibility />}
                    onClick={() => setPreviewDialog(true)}
                    sx={{ borderColor: '#fa8c16', color: '#fa8c16' }}
                  >
                    预览
                  </Button>
                  <Button
                    fullWidth
                    variant="contained"
                    startIcon={generating ? <CircularProgress size={20} color="inherit" /> : <Download />}
                    onClick={handleGenerateReport}
                    disabled={generating}
                    sx={{ background: '#fa8c16', '&:hover': { background: '#e58520' } }}
                  >
                    {generating ? '生成中...' : '生成报告'}
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Report Preview */}
          <Grid item xs={12} md={6}>
            <Card sx={{ background: 'rgba(45,45,45,0.6)', border: '1px solid rgba(250,140,22,0.2)', height: '100%' }}>
              <CardContent>
                <Typography variant="h6" sx={{ color: '#fa8c16', mb: 2 }}>报告预览</Typography>
                <Box sx={{
                  p: 3,
                  background: 'rgba(0,0,0,0.3)',
                  borderRadius: 2,
                  border: '1px solid rgba(250,140,22,0.1)'
                }}>
                  <Typography variant="h5" sx={{ color: '#ffffff', mb: 1, textAlign: 'center' }}>
                    工业设备综合监控报告
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)', mb: 3, textAlign: 'center' }}>
                    Student 4 System - {new Date().toLocaleDateString('zh-CN')}
                  </Typography>

                  <Divider sx={{ borderColor: 'rgba(250,140,22,0.2)', mb: 2 }} />

                  <Grid container spacing={2} sx={{ mb: 2 }}>
                    <Grid item xs={6}>
                      <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)' }}>总记录数</Typography>
                      <Typography variant="h4" sx={{ color: '#fa8c16' }}>{stats?.totalRecords || 0}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)' }}>设备可用率</Typography>
                      <Typography variant="h4" sx={{ color: '#4caf50' }}>
                        {stats?.failureRate ? (100 - parseFloat(stats.failureRate)).toFixed(1) : 100}%
                      </Typography>
                    </Grid>
                  </Grid>

                  <Box sx={{ height: 200 }}>
                    <ReactECharts option={getPreviewChart()} style={{ height: '100%', width: '100%' }} />
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {/* Custom Report Tab */}
      {currentTab === 1 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card sx={{ background: 'rgba(45,45,45,0.6)', border: '1px solid rgba(250,140,22,0.2)' }}>
              <CardContent>
                <Typography variant="h6" sx={{ color: '#fa8c16', mb: 3 }}>自定义报告配置</Typography>

                <Typography variant="subtitle2" sx={{ color: '#ffffff', mb: 2 }}>选择数据指标</Typography>
                <Grid container spacing={1}>
                  {['温度数据', '扭矩转速', '工具磨损', '故障统计', '设备类型', '负载等级'].map((item) => (
                    <Grid item xs={6} key={item}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            defaultChecked
                            sx={{ color: '#fa8c16', '&.Mui-checked': { color: '#fa8c16' } }}
                          />
                        }
                        label={<Typography sx={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.875rem' }}>{item}</Typography>}
                      />
                    </Grid>
                  ))}
                </Grid>

                <Divider sx={{ my: 3, borderColor: 'rgba(250,140,22,0.2)' }} />

                <Box sx={{ mt: 3 }}>
                  <Button
                    fullWidth
                    variant="contained"
                    startIcon={<FileDownload />}
                    onClick={handleGenerateReport}
                    sx={{ background: '#fa8c16', '&:hover': { background: '#e58520' } }}
                  >
                    生成自定义报告
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card sx={{ background: 'rgba(45,45,45,0.6)', border: '1px solid rgba(250,140,22,0.2)' }}>
              <CardContent>
                <Typography variant="h6" sx={{ color: '#fa8c16', mb: 3 }}>快速导出</Typography>

                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Button
                      fullWidth
                      variant="outlined"
                      startIcon={<PictureAsPdf />}
                      sx={{
                        height: 80,
                        flexDirection: 'column',
                        gap: 1,
                        borderColor: '#f44336',
                        color: '#f44336',
                        '&:hover': { background: 'rgba(244,67,54,0.1)' }
                      }}
                    >
                      PDF报告
                      <Typography variant="caption">标准格式</Typography>
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      fullWidth
                      variant="outlined"
                      startIcon={<TableChart />}
                      sx={{
                        height: 80,
                        flexDirection: 'column',
                        gap: 1,
                        borderColor: '#4caf50',
                        color: '#4caf50',
                        '&:hover': { background: 'rgba(76,175,80,0.1)' }
                      }}
                    >
                      Excel报告
                      <Typography variant="caption">数据分析</Typography>
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      fullWidth
                      variant="outlined"
                      startIcon={<Description />}
                      sx={{
                        height: 80,
                        flexDirection: 'column',
                        gap: 1,
                        borderColor: '#2196f3',
                        color: '#2196f3',
                        '&:hover': { background: 'rgba(33,150,243,0.1)' }
                      }}
                    >
                      Word报告
                      <Typography variant="caption">文档格式</Typography>
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      fullWidth
                      variant="outlined"
                      startIcon={<Analytics />}
                      sx={{
                        height: 80,
                        flexDirection: 'column',
                        gap: 1,
                        borderColor: '#fa8c16',
                        color: '#fa8c16',
                        '&:hover': { background: 'rgba(250,140,22,0.1)' }
                      }}
                    >
                      CSV导出
                      <Typography variant="caption">原始数据</Typography>
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {/* Report History Tab */}
      {currentTab === 2 && (
        <Card sx={{ background: 'rgba(45,45,45,0.6)', border: '1px solid rgba(250,140,22,0.2)' }}>
          <CardContent>
            <Typography variant="h6" sx={{ color: '#fa8c16', mb: 3 }}>历史报告</Typography>

            <Alert severity="info" sx={{ mb: 3, background: 'rgba(33,150,243,0.1)', borderLeft: '4px solid #2196f3' }}>
              暂无历史报告记录。生成报告后，历史记录将显示在此处。
            </Alert>

            {/* Sample history items */}
            {[1, 2, 3].map((item) => (
              <Box
                key={item}
                sx={{
                  p: 2,
                  mb: 2,
                  background: 'rgba(0,0,0,0.2)',
                  border: '1px solid rgba(250,140,22,0.1)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderRadius: 1
                }}
              >
                <Box>
                  <Typography variant="subtitle1" sx={{ color: '#ffffff' }}>
                    设备监控报告 - {item}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)' }}>
                    生成时间: {new Date(Date.now() - item * 86400000).toLocaleString('zh-CN')}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                  <Chip label="PDF" size="small" sx={{ background: 'rgba(244,67,54,0.2)', color: '#f44336' }} />
                  <Button
                    size="small"
                    variant="outlined"
                    startIcon={<Download />}
                    sx={{ borderColor: '#fa8c16', color: '#fa8c16' }}
                  >
                    下载
                  </Button>
                </Box>
              </Box>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Preview Dialog */}
      <Dialog
        open={previewDialog}
        onClose={() => setPreviewDialog(false)}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          sx: {
            background: 'rgba(45, 45, 45, 0.95)',
            border: '1px solid rgba(250, 140, 22, 0.3)',
            borderRadius: 2
          }
        }}
      >
        <DialogTitle sx={{ color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          报告预览
          <IconButton onClick={() => setPreviewDialog(false)} sx={{ color: 'rgba(255,255,255,0.7)' }}>
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ height: 500 }}>
            <ReactECharts option={getPreviewChart()} style={{ height: '100%', width: '100%' }} />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPreviewDialog(false)} sx={{ color: 'rgba(255,255,255,0.7)' }}>
            关闭
          </Button>
          <Button
            variant="contained"
            startIcon={<Download />}
            onClick={handleGenerateReport}
            sx={{ background: '#fa8c16', '&:hover': { background: '#e58520' } }}
          >
            下载报告
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default ReportExportPage
