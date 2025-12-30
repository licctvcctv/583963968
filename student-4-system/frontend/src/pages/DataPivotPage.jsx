import React, { useState, useEffect, useMemo } from 'react'
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  Chip,
  IconButton,
  InputAdornment,
  Tab,
  Tabs
} from '@mui/material'
import {
  Search,
  FilterList,
  Download,
  Refresh,
  Sort,
  GetApp,
  Analytics
} from '@mui/icons-material'
import ReactECharts from 'echarts-for-react'
import { loadEquipmentData } from '../utils/dataUtils'

const DataPivotPage = () => {
  const [allData, setAllData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(25)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [filterLoadLevel, setFilterLoadLevel] = useState('all')
  const [filterFailure, setFilterFailure] = useState('all')
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' })
  const [currentTab, setCurrentTab] = useState(0)
  const [selectedColumns, setSelectedColumns] = useState([
    'UDI', 'Product ID', 'Type', 'Air temperature [K]',
    'Process temperature [K]', 'Rotational speed [rpm]',
    'Torque [Nm]', 'Tool wear [min]', 'Machine failure'
  ])

  useEffect(() => {
    void loadData()
  }, [])

  useEffect(() => {
    applyFilters()
  }, [allData, searchTerm, filterType, filterLoadLevel, filterFailure, sortConfig])

  const loadData = async () => {
    try {
      const data = await loadEquipmentData()
      setAllData(data)
    } catch (error) {
      console.error('加载数据失败:', error)
      setAllData([])
    }
  }

  const applyFilters = () => {
    let filtered = [...allData]

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(row =>
        Object.values(row).some(val =>
          String(val).toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    }

    // Type filter
    if (filterType !== 'all') {
      filtered = filtered.filter(row => row.Type === filterType)
    }

    // Load level filter
    if (filterLoadLevel !== 'all') {
      filtered = filtered.filter(row => row['Load_Level'] === filterLoadLevel)
    }

    // Failure filter
    if (filterFailure === 'failed') {
      filtered = filtered.filter(row => row['Machine failure'] === 1)
    } else if (filterFailure === 'normal') {
      filtered = filtered.filter(row => row['Machine failure'] === 0)
    }

    // Sorting
    if (sortConfig.key) {
      filtered.sort((a, b) => {
        const aVal = a[sortConfig.key]
        const bVal = b[sortConfig.key]

        if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1
        if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1
        return 0
      })
    }

    setFilteredData(filtered)
    setPage(0)
  }

  const handleSort = (key) => {
    let direction = 'asc'
    if (sortConfig.key === key) {
      direction = sortConfig.direction === 'asc' ? 'desc' : 'asc'
    }
    setSortConfig({ key, direction })
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const exportToCSV = () => {
    const headers = selectedColumns
    const csvContent = [
      headers.join(','),
      ...filteredData.slice(page * rowsPerPage, (page + 1) * rowsPerPage).map(row =>
        headers.map(col => row[col]).join(',')
      )
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `equipment_data_${new Date().toISOString().split('T')[0]}.csv`
    link.click()
  }

  // Aggregated data for pivot table
  const pivotData = useMemo(() => {
    const pivot = {}
    filteredData.forEach(item => {
      const type = item.Type
      const load = item['Load_Level']

      if (!pivot[type]) pivot[type] = {}
      if (!pivot[type][load]) pivot[type][load] = { count: 0, failures: 0, avgTorque: 0, avgTemp: 0 }

      pivot[type][load].count++
      pivot[type][load].failures += item['Machine failure']
      pivot[type][load].avgTorque += item['Torque [Nm]']
      pivot[type][load].avgTemp += item['Air temperature [K]']
    })

    Object.keys(pivot).forEach(type => {
      Object.keys(pivot[type]).forEach(load => {
        const data = pivot[type][load]
        data.avgTorque = (data.avgTorque / data.count).toFixed(2)
        data.avgTemp = (data.avgTemp / data.count).toFixed(2)
        data.failureRate = ((data.failures / data.count) * 100).toFixed(1)
      })
    })

    return pivot
  }, [filteredData])

  // Scatter plot for correlation analysis
  const getScatterOption = () => {
    return {
      backgroundColor: 'transparent',
      title: {
        text: '扭矩 vs 工具磨损散点分析',
        left: 'center',
        textStyle: { color: '#ffffff', fontSize: 18 }
      },
      tooltip: {
        trigger: 'item',
        backgroundColor: 'rgba(45, 45, 45, 0.95)',
        borderColor: '#fa8c16',
        textStyle: { color: '#ffffff' },
        formatter: (params) => {
          return `扭矩: ${params.data[0]} Nm<br/>工具磨损: ${params.data[1]} min<br/>${params.data[2] ? '故障' : '正常'}`
        }
      },
      grid: {
        left: '10%',
        right: '5%',
        bottom: '10%',
        top: '15%'
      },
      xAxis: {
        name: '扭矩 (Nm)',
        nameTextStyle: { color: 'rgba(255,255,255,0.7)' },
        axisLine: { lineStyle: { color: 'rgba(255,255,255,0.2)' } },
        axisLabel: { color: 'rgba(255,255,255,0.6)' },
        splitLine: { lineStyle: { color: 'rgba(255,255,255,0.1)' } }
      },
      yAxis: {
        name: '工具磨损 (min)',
        nameTextStyle: { color: 'rgba(255,255,255,0.7)' },
        axisLine: { lineStyle: { color: 'rgba(255,255,255,0.2)' } },
        axisLabel: { color: 'rgba(255,255,255,0.6)' },
        splitLine: { lineStyle: { color: 'rgba(255,255,255,0.1)' } }
      },
      series: [{
        type: 'scatter',
        symbolSize: (data) => data[2] ? 20 : 10,
        itemStyle: {
          color: (params) => params.data[2] ? '#f44336' : '#fa8c16',
          opacity: 0.7
        },
        data: filteredData.slice(0, 500).map(item => [
          item['Torque [Nm]'],
          item['Tool wear [min]'],
          item['Machine failure']
        ])
      }]
    }
  }

  // Heatmap for failure analysis
  const getHeatmapOption = () => {
    const types = ['L', 'M', 'H']
    const loads = ['轻负载', '中负载', '重负载']
    const data = []

    types.forEach((type, i) => {
      loads.forEach((load, j) => {
        const key = `${type}-${load}`
        const count = filteredData.filter(d => d.Type === type && d['Load_Level'] === load).length
        const failures = filteredData.filter(d => d.Type === type && d['Load_Level'] === load && d['Machine failure'] === 1).length
        data.push([i, j, failures])
      })
    })

    return {
      backgroundColor: 'transparent',
      title: {
        text: '故障分布热力图',
        left: 'center',
        textStyle: { color: '#ffffff', fontSize: 18 }
      },
      tooltip: {
        position: 'top',
        backgroundColor: 'rgba(45, 45, 45, 0.95)',
        borderColor: '#fa8c16',
        textStyle: { color: '#ffffff' }
      },
      grid: {
        height: '70%',
        top: '15%'
      },
      xAxis: {
        type: 'category',
        data: types,
        axisLine: { lineStyle: { color: 'rgba(255,255,255,0.2)' } },
        axisLabel: { color: 'rgba(255,255,255,0.8)', fontSize: 14 },
        splitArea: { show: true }
      },
      yAxis: {
        type: 'category',
        data: loads,
        axisLine: { lineStyle: { color: 'rgba(255,255,255,0.2)' } },
        axisLabel: { color: 'rgba(255,255,255,0.8)', fontSize: 14 },
        splitArea: { show: true }
      },
      visualMap: {
        min: 0,
        max: Math.max(...data.map(d => d[2])),
        calculable: true,
        orient: 'horizontal',
        left: 'center',
        bottom: '5%',
        textStyle: { color: '#ffffff' },
        inRange: {
          color: ['#4caf50', '#ffeb3b', '#ff9800', '#f44336']
        }
      },
      series: [{
        type: 'heatmap',
        data: data.map(item => ({ value: item })),
        label: {
          show: true,
          color: '#ffffff',
          fontSize: 14,
          fontWeight: 'bold'
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }]
    }
  }

  // Column visibility toggle
  const toggleColumn = (col) => {
    if (selectedColumns.includes(col)) {
      setSelectedColumns(selectedColumns.filter(c => c !== col))
    } else {
      setSelectedColumns([...selectedColumns, col])
    }
  }

  const allColumns = [
    'UDI', 'Product ID', 'Type', 'Air temperature [K]',
    'Process temperature [K]', 'Rotational speed [rpm]',
    'Torque [Nm]', 'Tool wear [min]', 'Machine failure',
    'TWF', 'HDF', 'PWF', 'OSF', 'RNF', 'Maintenance_Cycle', 'Load_Level'
  ]

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(180deg, #1a1a1a 0%, #0d0d0d 100%)', p: 3 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Analytics sx={{ fontSize: 36, color: '#fa8c16' }} />
          <Box>
            <Typography variant="h4" sx={{ color: '#fa8c16', fontWeight: 700 }}>
              数据透视分析
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)' }}>
              多维度数据探索与分析
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<Refresh />}
            onClick={loadData}
            sx={{ borderColor: '#fa8c16', color: '#fa8c16' }}
          >
            刷新数据
          </Button>
          <Button
            variant="contained"
            startIcon={<Download />}
            onClick={exportToCSV}
            sx={{ background: '#fa8c16', '&:hover': { background: '#e58520' } }}
          >
            导出CSV
          </Button>
        </Box>
      </Box>

      {/* Summary Stats */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: 'rgba(45,45,45,0.6)', border: '1px solid rgba(250,140,22,0.2)' }}>
            <CardContent>
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)' }}>总记录数</Typography>
              <Typography variant="h3" sx={{ color: '#fa8c16', fontWeight: 700 }}>{filteredData.length}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: 'rgba(45,45,45,0.6)', border: '1px solid rgba(250,140,22,0.2)' }}>
            <CardContent>
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)' }}>筛选结果</Typography>
              <Typography variant="h3" sx={{ color: '#4caf50', fontWeight: 700 }}>{filteredData.length}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: 'rgba(45,45,45,0.6)', border: '1px solid rgba(250,140,22,0.2)' }}>
            <CardContent>
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)' }}>故障记录</Typography>
              <Typography variant="h3" sx={{ color: '#f44336', fontWeight: 700 }}>
                {filteredData.filter(d => d['Machine failure'] === 1).length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: 'rgba(45,45,45,0.6)', border: '1px solid rgba(250,140,22,0.2)' }}>
            <CardContent>
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)' }}>故障率</Typography>
              <Typography variant="h3" sx={{ color: '#ff9800', fontWeight: 700 }}>
                {((filteredData.filter(d => d['Machine failure'] === 1).length / filteredData.length) * 100 || 0).toFixed(1)}%
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Filters */}
      <Card sx={{ mb: 3, background: 'rgba(45,45,45,0.6)', border: '1px solid rgba(250,140,22,0.2)' }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                size="small"
                placeholder="搜索数据..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search sx={{ color: 'rgba(255,255,255,0.5)' }} />
                    </InputAdornment>
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
            <Grid item xs={12} sm={4} md={2}>
              <FormControl fullWidth size="small">
                <InputLabel sx={{ color: 'rgba(255,255,255,0.7)' }}>产品类型</InputLabel>
                <Select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  label="产品类型"
                  sx={{ color: '#fff' }}
                >
                  <MenuItem value="all">全部</MenuItem>
                  <MenuItem value="L">L型</MenuItem>
                  <MenuItem value="M">M型</MenuItem>
                  <MenuItem value="H">H型</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4} md={2}>
              <FormControl fullWidth size="small">
                <InputLabel sx={{ color: 'rgba(255,255,255,0.7)' }}>负载等级</InputLabel>
                <Select
                  value={filterLoadLevel}
                  onChange={(e) => setFilterLoadLevel(e.target.value)}
                  label="负载等级"
                  sx={{ color: '#fff' }}
                >
                  <MenuItem value="all">全部</MenuItem>
                  <MenuItem value="轻负载">轻负载</MenuItem>
                  <MenuItem value="中负载">中负载</MenuItem>
                  <MenuItem value="重负载">重负载</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4} md={2}>
              <FormControl fullWidth size="small">
                <InputLabel sx={{ color: 'rgba(255,255,255,0.7)' }}>状态</InputLabel>
                <Select
                  value={filterFailure}
                  onChange={(e) => setFilterFailure(e.target.value)}
                  label="状态"
                  sx={{ color: '#fff' }}
                >
                  <MenuItem value="all">全部</MenuItem>
                  <MenuItem value="normal">正常</MenuItem>
                  <MenuItem value="failed">故障</MenuItem>
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
          <Tab label="数据表格" />
          <Tab label="透视表" />
          <Tab label="散点分析" />
          <Tab label="热力图" />
        </Tabs>
      </Box>

      {/* Tab Content */}
      {currentTab === 0 && (
        <Card sx={{ background: 'rgba(45,45,45,0.6)', border: '1px solid rgba(250,140,22,0.2)' }}>
          <TableContainer component={Paper} sx={{ background: 'transparent', maxHeight: 600 }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  {selectedColumns.map(col => (
                    <TableCell
                      key={col}
                      onClick={() => handleSort(col)}
                      sx={{
                        color: '#fa8c16',
                        fontWeight: 600,
                        cursor: 'pointer',
                        background: 'rgba(250,140,22,0.1)',
                        '&:hover': { background: 'rgba(250,140,22,0.2)' }
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {col}
                        {sortConfig.key === col && (
                          <Sort sx={{ fontSize: 16 }} />
                        )}
                      </Box>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData
                  .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
                  .map((row, idx) => (
                    <TableRow
                      key={idx}
                      sx={{
                        '&:hover': { background: 'rgba(250,140,22,0.1)' },
                        '& td': { color: 'rgba(255,255,255,0.9)', borderBottom: '1px solid rgba(255,255,255,0.05)' }
                      }}
                    >
                      {selectedColumns.map(col => (
                        <TableCell key={col}>
                          {col === 'Machine failure' ? (
                            row[col] === 1 ? (
                              <Chip label="故障" size="small" sx={{ background: 'rgba(244,67,54,0.2)', color: '#f44336' }} />
                            ) : (
                              <Chip label="正常" size="small" sx={{ background: 'rgba(76,175,80,0.2)', color: '#4caf50' }} />
                            )
                          ) : col === 'Type' ? (
                            <Chip
                              label={row[col]}
                              size="small"
                              sx={{
                                background: row[col] === 'L' ? 'rgba(76,175,80,0.2)' :
                                        row[col] === 'M' ? 'rgba(250,140,22,0.2)' :
                                        'rgba(244,67,54,0.2)',
                                color: row[col] === 'L' ? '#4caf50' :
                                       row[col] === 'M' ? '#fa8c16' :
                                       '#f44336'
                              }}
                            />
                          ) : (
                            String(row[col])
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 50, 100]}
            component="div"
            count={filteredData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{
              color: 'rgba(255,255,255,0.7)',
              '& .MuiSelect-icon': { color: 'rgba(255,255,255,0.7)' }
            }}
          />
        </Card>
      )}

      {currentTab === 1 && (
        <Card sx={{ background: 'rgba(45,45,45,0.6)', border: '1px solid rgba(250,140,22,0.2)' }}>
          <CardContent>
            <Typography variant="h6" sx={{ color: '#fa8c16', mb: 2 }}>产品类型 x 负载等级 透视表</Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ color: '#fa8c16', fontWeight: 600 }}>产品类型</TableCell>
                    <TableCell sx={{ color: '#fa8c16', fontWeight: 600 }}>负载等级</TableCell>
                    <TableCell sx={{ color: '#fa8c16', fontWeight: 600 }}>数量</TableCell>
                    <TableCell sx={{ color: '#fa8c16', fontWeight: 600 }}>故障数</TableCell>
                    <TableCell sx={{ color: '#fa8c16', fontWeight: 600 }}>故障率</TableCell>
                    <TableCell sx={{ color: '#fa8c16', fontWeight: 600 }}>平均扭矩</TableCell>
                    <TableCell sx={{ color: '#fa8c16', fontWeight: 600 }}>平均温度</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Object.entries(pivotData).map(([type, loads]) =>
                    Object.entries(loads).map(([load, data]) => (
                      <TableRow
                        key={`${type}-${load}`}
                        sx={{ '&:hover': { background: 'rgba(250,140,22,0.1)' }, '& td': { color: 'rgba(255,255,255,0.9)' } }}
                      >
                        <TableCell>
                          <Chip
                            label={type}
                            size="small"
                            sx={{
                              background: type === 'L' ? 'rgba(76,175,80,0.2)' :
                                      type === 'M' ? 'rgba(250,140,22,0.2)' :
                                      'rgba(244,67,54,0.2)',
                              color: type === 'L' ? '#4caf50' :
                                     type === 'M' ? '#fa8c16' :
                                     '#f44336'
                            }}
                          />
                        </TableCell>
                        <TableCell>{load}</TableCell>
                        <TableCell>{data.count}</TableCell>
                        <TableCell>{data.failures}</TableCell>
                        <TableCell>
                          <Chip
                            label={`${data.failureRate}%`}
                            size="small"
                            sx={{
                              background: data.failureRate > 5 ? 'rgba(244,67,54,0.2)' : 'rgba(76,175,80,0.2)',
                              color: data.failureRate > 5 ? '#f44336' : '#4caf50'
                            }}
                          />
                        </TableCell>
                        <TableCell>{data.avgTorque} Nm</TableCell>
                        <TableCell>{data.avgTemp} K</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      )}

      {currentTab === 2 && (
        <Card sx={{ background: 'rgba(45,45,45,0.6)', border: '1px solid rgba(250,140,22,0.2)', height: 600 }}>
          <ReactECharts option={getScatterOption()} style={{ height: '100%', width: '100%' }} />
        </Card>
      )}

      {currentTab === 3 && (
        <Card sx={{ background: 'rgba(45,45,45,0.6)', border: '1px solid rgba(250,140,22,0.2)', height: 600 }}>
          <ReactECharts option={getHeatmapOption()} style={{ height: '100%', width: '100%' }} />
        </Card>
      )}
    </Box>
  )
}

export default DataPivotPage
