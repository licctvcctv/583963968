import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  IconButton,
  Tooltip,
  useTheme,
  useMediaQuery,
  Grid,
  Card,
  CardContent,
  Button
} from '@mui/material';
import {
  Search,
  FilterList,
  History,
  Warning,
  CheckCircle,
  Info,
  GetApp,
  Visibility
} from '@mui/icons-material';
import ReactECharts from 'echarts-for-react';

const FailureHistoryPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [csvData, setCsvData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);

  const [filters, setFilters] = useState({
    type: 'all',
    failureStatus: 'all',
    loadLevel: 'all',
    searchQuery: ''
  });

  const [selectedRow, setSelectedRow] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  useEffect(() => {
    loadCSVData();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [csvData, filters]);

  const loadCSVData = async () => {
    try {
      const response = await fetch('http://localhost:8001/api/data/machine-data');
      if (response.ok) {
        const data = await response.json();
        setCsvData(data);
        setLoading(false);
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
      setCsvData(result.data);
    } catch (error) {
      console.error('Error loading CSV:', error);
    }
    setLoading(false);
  };

  const applyFilters = () => {
    let filtered = [...csvData];

    // Type filter
    if (filters.type !== 'all') {
      filtered = filtered.filter(row => row.Type === filters.type);
    }

    // Failure status filter
    if (filters.failureStatus === 'failed') {
      filtered = filtered.filter(row => row['Machine failure'] === 1);
    } else if (filters.failureStatus === 'normal') {
      filtered = filtered.filter(row => row['Machine failure'] === 0);
    }

    // Load level filter
    if (filters.loadLevel !== 'all') {
      filtered = filtered.filter(row => row['Load_Level'] === filters.loadLevel);
    }

    // Search query
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.filter(row =>
        String(row.UDI).includes(query) ||
        String(row['Product ID']).toLowerCase().includes(query)
      );
    }

    setFilteredData(filtered);
  };

  const handleFilterChange = (field, value) => {
    setFilters({
      ...filters,
      [field]: value
    });
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRowClick = (row) => {
    setSelectedRow(row);
    setDetailsOpen(true);
  };

  const getFailureTypes = (row) => {
    const types = [];
    if (row.TWF === 1) types.push({ name: 'TWF', label: '工具磨损', color: '#722ed1' });
    if (row.HDF === 1) types.push({ name: 'HDF', label: '散热故障', color: '#eb2f96' });
    if (row.PWF === 1) types.push({ name: 'PWF', label: '功率故障', color: '#fa8c16' });
    if (row.OSF === 1) types.push({ name: 'OSF', label: '过载故障', color: '#f5222d' });
    if (row.RNF === 1) types.push({ name: 'RNF', label: '随机故障', color: '#13c2c2' });
    return types;
  };

  const getTimelineOption = () => {
    // Sample first 100 records for timeline
    const sampleData = filteredData.slice(0, 100);

    const failures = sampleData.map((row, index) => ({
      name: `记录 ${row.UDI}`,
      value: [
        index,
        row['Machine failure'] === 1 ? 1 : 0,
        row['Air temperature [K]'],
        row['Torque [Nm]'],
        row['Tool wear [min]']
      ],
      itemStyle: {
        color: row['Machine failure'] === 1 ? '#ff4d4f' : '#52c41a'
      }
    }));

    return {
      title: {
        text: '故障时间线',
        left: 'center',
        textStyle: {
          fontSize: isMobile ? 14 : 16,
          fontWeight: 'bold',
          color: '#fff'
        }
      },
      tooltip: {
        trigger: 'axis',
        formatter: (params) => {
          const data = params[0].data;
          return `
            <strong>${data.name}</strong><br/>
            状态: ${data.value[1] === 1 ? '故障' : '正常'}<br/>
            空气温度: ${data.value[2]} K<br/>
            扭矩: ${data.value[3]} Nm<br/>
            工具磨损: ${data.value[4]} min
          `;
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '10%',
        top: '15%',
        containLabel: true
      },
      xAxis: {
        type: 'value',
        name: '记录序号',
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
        name: '状态',
        nameTextStyle: {
          color: '#999'
        },
        min: -0.2,
        max: 1.2,
        axisLabel: {
          formatter: (value) => value === 1 ? '故障' : value === 0 ? '正常' : '',
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
          name: '状态',
          type: 'scatter',
          symbolSize: 8,
          data: failures
        }
      ]
    };
  };

  const getFailureDistributionOption = () => {
    const failureByType = {
      'L型': filteredData.filter(row => row.Type === 'L' && row['Machine failure'] === 1).length,
      'M型': filteredData.filter(row => row.Type === 'M' && row['Machine failure'] === 1).length,
      'H型': filteredData.filter(row => row.Type === 'H' && row['Machine failure'] === 1).length
    };

    return {
      title: {
        text: '各类型故障分布',
        left: 'center',
        textStyle: {
          fontSize: isMobile ? 14 : 16,
          fontWeight: 'bold',
          color: '#fff'
        }
      },
      tooltip: {
        trigger: 'item'
      },
      series: [{
        type: 'pie',
        radius: ['40%', '65%'],
        center: ['50%', '50%'],
        data: [
          { value: failureByType['L型'], name: 'L型', itemStyle: { color: '#1890ff' } },
          { value: failureByType['M型'], name: 'M型', itemStyle: { color: '#52c41a' } },
          { value: failureByType['H型'], name: 'H型', itemStyle: { color: '#faad14' } }
        ],
        label: {
          fontSize: 12,
          color: '#ccc',
          formatter: '{b}\n{c} 次\n({d}%)'
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }]
    };
  };

  const exportToCSV = () => {
    const headers = Object.keys(filteredData[0] || {}).join(',');
    const rows = filteredData.map(row =>
      Object.values(row).map(v => `"${v}"`).join(',')
    ).join('\n');

    const csvContent = headers + '\n' + rows;
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'failure_history.csv';
    link.click();
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography sx={{ color: '#fff' }}>加载历史数据...</Typography>
      </Box>
    );
  }

  const failureCount = filteredData.filter(row => row['Machine failure'] === 1).length;
  const normalCount = filteredData.length - failureCount;

  return (
    <Box sx={{ p: isMobile ? 1 : 3 }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant={isMobile ? 'h5' : 'h4'} component="h1" sx={{ fontWeight: 700, color: '#fff', mb: 0.5 }}>
          <History sx={{ verticalAlign: 'middle', mr: 1, color: '#1890ff' }} />
          故障历史记录
        </Typography>
        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)' }}>
          完整的设备运行与故障历史数据
        </Typography>
      </Box>

      {/* Statistics */}
      <Grid container spacing={isMobile ? 2 : 3} sx={{ mb: 3 }}>
        <Grid item xs={6} sm={3}>
          <Paper sx={{ p: 2, borderRadius: 2, bgcolor: 'rgba(26,26,46,0.8)', borderLeft: '3px solid #1890ff' }}>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)', mb: 1 }}>总记录数</Typography>
            <Typography variant="h5" sx={{ color: '#fff', fontWeight: 700 }}>
              {filteredData.length.toLocaleString()}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper sx={{ p: 2, borderRadius: 2, bgcolor: 'rgba(26,26,46,0.8)', borderLeft: '3px solid #ff4d4f' }}>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)', mb: 1 }}>故障记录</Typography>
            <Typography variant="h5" sx={{ color: '#ff4d4f', fontWeight: 700 }}>
              {failureCount}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper sx={{ p: 2, borderRadius: 2, bgcolor: 'rgba(26,26,46,0.8)', borderLeft: '3px solid #52c41a' }}>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)', mb: 1 }}>正常运行</Typography>
            <Typography variant="h5" sx={{ color: '#52c41a', fontWeight: 700 }}>
              {normalCount.toLocaleString()}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper sx={{ p: 2, borderRadius: 2, bgcolor: 'rgba(26,26,46,0.8)', borderLeft: '3px solid #faad14' }}>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)', mb: 1 }}>故障率</Typography>
            <Typography variant="h5" sx={{ color: '#faad14', fontWeight: 700 }}>
              {((failureCount / filteredData.length) * 100).toFixed(2)}%
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Filters */}
      <Paper sx={{ p: 2, borderRadius: 2, bgcolor: 'rgba(26,26,46,0.8)', border: '1px solid rgba(24,144,255,0.2)', mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              size="small"
              placeholder="搜索 UDI 或产品ID..."
              value={filters.searchQuery}
              onChange={(e) => handleFilterChange('searchQuery', e.target.value)}
              InputProps={{
                startAdornment: <Search sx={{ mr: 1, color: 'rgba(255,255,255,0.5)' }} />,
                sx: { color: '#fff' }
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: 'rgba(24,144,255,0.3)' },
                  '&:hover fieldset': { borderColor: '#1890ff' },
                  '&.Mui-focused fieldset': { borderColor: '#1890ff' }
                }
              }}
            />
          </Grid>
          <Grid item xs={6} sm={3} md={2}>
            <FormControl fullWidth size="small">
              <InputLabel sx={{ color: 'rgba(255,255,255,0.7)' }}>产品类型</InputLabel>
              <Select
                value={filters.type}
                label="产品类型"
                onChange={(e) => handleFilterChange('type', e.target.value)}
                sx={{ color: '#fff' }}
              >
                <MenuItem value="all">全部</MenuItem>
                <MenuItem value="L">L型</MenuItem>
                <MenuItem value="M">M型</MenuItem>
                <MenuItem value="H">H型</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={3} md={2}>
            <FormControl fullWidth size="small">
              <InputLabel sx={{ color: 'rgba(255,255,255,0.7)' }}>故障状态</InputLabel>
              <Select
                value={filters.failureStatus}
                label="故障状态"
                onChange={(e) => handleFilterChange('failureStatus', e.target.value)}
                sx={{ color: '#fff' }}
              >
                <MenuItem value="all">全部</MenuItem>
                <MenuItem value="failed">故障</MenuItem>
                <MenuItem value="normal">正常</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={3} md={2}>
            <FormControl fullWidth size="small">
              <InputLabel sx={{ color: 'rgba(255,255,255,0.7)' }}>负载等级</InputLabel>
              <Select
                value={filters.loadLevel}
                label="负载等级"
                onChange={(e) => handleFilterChange('loadLevel', e.target.value)}
                sx={{ color: '#fff' }}
              >
                <MenuItem value="all">全部</MenuItem>
                <MenuItem value="轻负载">轻负载</MenuItem>
                <MenuItem value="中负载">中负载</MenuItem>
                <MenuItem value="重负载">重负载</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={3} md={3}>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                variant="outlined"
                size="small"
                startIcon={<FilterList />}
                onClick={() => setFilters({ type: 'all', failureStatus: 'all', loadLevel: 'all', searchQuery: '' })}
                sx={{
                  color: '#1890ff',
                  borderColor: 'rgba(24,144,255,0.3)',
                  '&:hover': { borderColor: '#1890ff', bgcolor: 'rgba(24,144,255,0.1)' }
                }}
              >
                重置
              </Button>
              <Button
                variant="outlined"
                size="small"
                startIcon={<GetApp />}
                onClick={exportToCSV}
                sx={{
                  color: '#52c41a',
                  borderColor: 'rgba(82,196,26,0.3)',
                  '&:hover': { borderColor: '#52c41a', bgcolor: 'rgba(82,196,26,0.1)' }
                }}
              >
                导出
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Charts */}
      <Grid container spacing={isMobile ? 2 : 3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2, borderRadius: 3, bgcolor: 'rgba(26,26,46,0.8)', border: '1px solid rgba(24,144,255,0.2)' }}>
            <ReactECharts option={getTimelineOption()} style={{ height: 250, width: '100%' }} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, borderRadius: 3, bgcolor: 'rgba(26,26,46,0.8)', border: '1px solid rgba(24,144,255,0.2)' }}>
            <ReactECharts option={getFailureDistributionOption()} style={{ height: 250, width: '100%' }} />
          </Paper>
        </Grid>
      </Grid>

      {/* Data Table */}
      <Paper sx={{ borderRadius: 3, bgcolor: 'rgba(26,26,46,0.8)', border: '1px solid rgba(24,144,255,0.2)' }}>
        <TableContainer>
          <Table size={isMobile ? 'small' : 'medium'}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>UDI</TableCell>
                <TableCell sx={{ color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>产品ID</TableCell>
                <TableCell sx={{ color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>类型</TableCell>
                <TableCell sx={{ color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>空气温度</TableCell>
                <TableCell sx={{ color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>工艺温度</TableCell>
                <TableCell sx={{ color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>转速</TableCell>
                <TableCell sx={{ color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>扭矩</TableCell>
                <TableCell sx={{ color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>工具磨损</TableCell>
                <TableCell sx={{ color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>负载</TableCell>
                <TableCell sx={{ color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>状态</TableCell>
                <TableCell sx={{ color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>故障类型</TableCell>
                {!isMobile && <TableCell sx={{ color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>操作</TableCell>}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData
                .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
                .map((row, index) => (
                  <TableRow
                    key={index}
                    hover
                    sx={{
                      '&:hover': { bgcolor: 'rgba(24,144,255,0.1)' },
                      cursor: 'pointer'
                    }}
                    onClick={() => handleRowClick(row)}
                  >
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
                          fontWeight: 600,
                          fontSize: 11
                        }}
                      />
                    </TableCell>
                    <TableCell sx={{ color: '#ccc', fontSize: isMobile ? 11 : 13 }}>
                      {row['Air temperature [K]']} K
                    </TableCell>
                    <TableCell sx={{ color: '#ccc', fontSize: isMobile ? 11 : 13 }}>
                      {row['Process temperature [K]']} K
                    </TableCell>
                    <TableCell sx={{ color: '#ccc', fontSize: isMobile ? 11 : 13 }}>
                      {row['Rotational speed [rpm]']}
                    </TableCell>
                    <TableCell sx={{ color: '#ccc', fontSize: isMobile ? 11 : 13 }}>
                      {row['Torque [Nm]']}
                    </TableCell>
                    <TableCell sx={{ color: '#ccc', fontSize: isMobile ? 11 : 13 }}>
                      {row['Tool wear [min]']}
                    </TableCell>
                    <TableCell sx={{ color: '#ccc', fontSize: isMobile ? 11 : 13 }}>
                      {row['Load_Level']}
                    </TableCell>
                    <TableCell>
                      <Chip
                        icon={row['Machine failure'] === 1 ? <Warning /> : <CheckCircle />}
                        label={row['Machine failure'] === 1 ? '故障' : '正常'}
                        size="small"
                        sx={{
                          bgcolor: row['Machine failure'] === 1 ? 'rgba(255,77,79,0.15)' : 'rgba(82,196,26,0.15)',
                          color: row['Machine failure'] === 1 ? '#ff4d4f' : '#52c41a',
                          fontWeight: 600,
                          fontSize: 11,
                          '& .MuiChip-icon': {
                            fontSize: 14
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                        {getFailureTypes(row).map((ft, idx) => (
                          <Tooltip key={idx} title={ft.label}>
                            <Chip
                              label={ft.name}
                              size="small"
                              sx={{
                                bgcolor: `${ft.color}20`,
                                color: ft.color,
                                fontSize: 10,
                                height: 20
                              }}
                            />
                          </Tooltip>
                        ))}
                      </Box>
                    </TableCell>
                    {!isMobile && (
                      <TableCell>
                        <Tooltip title="查看详情">
                          <IconButton
                            size="small"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRowClick(row);
                            }}
                            sx={{ color: '#1890ff' }}
                          >
                            <Visibility fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    )}
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
          labelRowsPerPage="每页行数:"
          labelDisplayedRows={({ from, to, count }) => `${from}-${to} 共 ${count}`}
          sx={{
            color: 'rgba(255,255,255,0.7)',
            borderTop: '1px solid rgba(24,144,255,0.2)',
            '& .MuiTablePagination-select': { color: 'rgba(255,255,255,0.7)' },
            '& .MuiTablePagination-selectIcon': { color: 'rgba(255,255,255,0.7)' },
            '& .MuiTablePagination-actions': { color: '#1890ff' }
          }}
        />
      </Paper>

      {/* Details Dialog */}
      {detailsOpen && selectedRow && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            bgcolor: 'rgba(0,0,0,0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999
          }}
          onClick={() => setDetailsOpen(false)}
        >
          <Paper
            sx={{
              maxWidth: 600,
              width: '90%',
              maxHeight: '80vh',
              borderRadius: 3,
              p: 3,
              bgcolor: 'rgba(26,26,46,0.95)',
              border: '1px solid rgba(24,144,255,0.3)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6" sx={{ color: '#fff' }}>
                记录详情 - UDI: {selectedRow.UDI}
              </Typography>
              <IconButton onClick={() => setDetailsOpen(false)} sx={{ color: 'rgba(255,255,255,0.7)' }}>
                ✕
              </IconButton>
            </Box>

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)' }}>产品ID</Typography>
                <Typography variant="body1" sx={{ color: '#fff', fontWeight: 600 }}>{selectedRow['Product ID']}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)' }}>产品类型</Typography>
                <Chip
                  label={selectedRow.Type}
                  size="small"
                  sx={{
                    bgcolor: selectedRow.Type === 'L' ? 'rgba(24,144,255,0.2)' :
                           selectedRow.Type === 'M' ? 'rgba(82,196,26,0.2)' : 'rgba(250,173,20,0.2)',
                    color: selectedRow.Type === 'L' ? '#1890ff' :
                           selectedRow.Type === 'M' ? '#52c41a' : '#faad14',
                    fontWeight: 600
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)' }}>空气温度</Typography>
                <Typography variant="body1" sx={{ color: '#fff', fontWeight: 600 }}>{selectedRow['Air temperature [K]']} K</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)' }}>工艺温度</Typography>
                <Typography variant="body1" sx={{ color: '#fff', fontWeight: 600 }}>{selectedRow['Process temperature [K]']} K</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)' }}>转速</Typography>
                <Typography variant="body1" sx={{ color: '#fff', fontWeight: 600 }}>{selectedRow['Rotational speed [rpm]']} rpm</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)' }}>扭矩</Typography>
                <Typography variant="body1" sx={{ color: '#fff', fontWeight: 600 }}>{selectedRow['Torque [Nm]']} Nm</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)' }}>工具磨损</Typography>
                <Typography variant="body1" sx={{ color: '#fff', fontWeight: 600 }}>{selectedRow['Tool wear [min]']} min</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)' }}>负载等级</Typography>
                <Typography variant="body1" sx={{ color: '#fff', fontWeight: 600 }}>{selectedRow['Load_Level']}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Divider sx={{ my: 1, bgcolor: 'rgba(24,144,255,0.2)' }} />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)', mb: 1 }}>故障状态</Typography>
                <Chip
                  icon={selectedRow['Machine failure'] === 1 ? <Warning /> : <CheckCircle />}
                  label={selectedRow['Machine failure'] === 1 ? '发生故障' : '正常运行'}
                  sx={{
                    bgcolor: selectedRow['Machine failure'] === 1 ? 'rgba(255,77,79,0.15)' : 'rgba(82,196,26,0.15)',
                    color: selectedRow['Machine failure'] === 1 ? '#ff4d4f' : '#52c41a',
                    fontWeight: 600
                  }}
                />
              </Grid>
              {selectedRow['Machine failure'] === 1 && (
                <Grid item xs={12}>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)', mb: 1 }}>故障类型</Typography>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {getFailureTypes(selectedRow).map((ft, idx) => (
                      <Chip
                        key={idx}
                        label={`${ft.name} - ${ft.label}`}
                        sx={{
                          bgcolor: `${ft.color}20`,
                          color: ft.color,
                          fontWeight: 600
                        }}
                      />
                    ))}
                  </Box>
                </Grid>
              )}
            </Grid>
          </Paper>
        </Box>
      )}
    </Box>
  );
};

export default FailureHistoryPage;
