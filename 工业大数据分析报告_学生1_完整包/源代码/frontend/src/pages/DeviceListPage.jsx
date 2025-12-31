import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  useTheme,
  useMediaQuery,
  Chip
} from '@mui/material';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TableSortLabel
} from '@mui/material';
import {
  Search as SearchIcon,
  Edit as EditIcon,
  Info as InfoIcon
} from '@mui/icons-material';

const DeviceListPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [devices, setDevices] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orderBy, setOrderBy] = useState('deviceId');
  const [order, setOrder] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Mock data - replace with actual API calls
    const mockDevices = [
      {
        deviceId: 'DEV001',
        name: '主电机',
        type: '电机',
        status: 'online',
        location: '车间A-1',
        installationDate: '2023-01-15',
        lastMaintenance: '2024-11-20',
        operatingHours: 2450,
        efficiency: 92,
        failureCount: 3,
        lastFailure: '2024-12-15'
      },
      {
        deviceId: 'DEV002',
        name: '冷却泵',
        type: '泵',
        status: 'offline',
        location: '车间B-2',
        installationDate: '2023-03-20',
        lastMaintenance: '2024-10-15',
        operatingHours: 1980,
        efficiency: 88,
        failureCount: 2,
        lastFailure: '2024-12-10'
      },
      {
        deviceId: 'DEV003',
        name: '空压机',
        type: '压缩机',
        status: 'maintenance',
        location: '车间C-1',
        installationDate: '2022-11-10',
        lastMaintenance: '2024-12-01',
        operatingHours: 3200,
        efficiency: 85,
        failureCount: 1,
        lastFailure: '2024-11-25'
      },
      {
        deviceId: 'DEV004',
        name: '控制阀',
        type: '阀门',
        status: 'online',
        location: '车间A-3',
        installationDate: '2023-06-01',
        lastMaintenance: '2024-12-15',
        operatingHours: 1560,
        efficiency: 95,
        failureCount: 0,
        lastFailure: '-'
      },
      {
        deviceId: 'DEV005',
        name: '温度传感器',
        type: '传感器',
        status: 'online',
        location: '车间B-1',
        installationDate: '2023-09-15',
        lastMaintenance: '2024-12-10',
        operatingHours: 980,
        efficiency: 98,
        failureCount: 4,
        lastFailure: '2024-12-18'
      },
      {
        deviceId: 'DEV006',
        name: 'PLC控制器',
        type: '控制器',
        status: 'online',
        location: '中央控制室',
        installationDate: '2022-08-20',
        lastMaintenance: '2024-11-30',
        operatingHours: 3850,
        efficiency: 99,
        failureCount: 1,
        lastFailure: '2024-09-15'
      },
      {
        deviceId: 'DEV007',
        name: '循环泵',
        type: '泵',
        status: 'online',
        location: '车间C-2',
        installationDate: '2023-04-10',
        lastMaintenance: '2024-12-05',
        operatingHours: 2100,
        efficiency: 90,
        failureCount: 1,
        lastFailure: '2024-11-20'
      },
      {
        deviceId: 'DEV008',
        name: '变频器',
        type: '控制器',
        status: 'offline',
        location: '车间A-2',
        installationDate: '2023-02-28',
        lastMaintenance: '2024-09-15',
        operatingHours: 2300,
        efficiency: 87,
        failureCount: 2,
        lastFailure: '2024-10-25'
      }
    ];
    setDevices(mockDevices);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'online':
        return 'success';
      case 'offline':
        return 'error';
      case 'maintenance':
        return 'warning';
      default:
        return 'default';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'online':
        return '在线';
      case 'offline':
        return '离线';
      case 'maintenance':
        return '维护中';
      default:
        return '未知';
    }
  };

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedDevices = [...devices].sort((a, b) => {
    const aValue = a[orderBy];
    const bValue = b[orderBy];

    if (aValue < bValue) {
      return order === 'asc' ? -1 : 1;
    }
    if (aValue > bValue) {
      return order === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const filteredDevices = sortedDevices.filter(device =>
    device.deviceId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    device.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    device.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    device.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, filteredDevices.length - page * rowsPerPage);

  return (
    <Box sx={{ p: isMobile ? 1 : 3 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 3 }}>
        设备列表
      </Typography>

      <Card sx={{ boxShadow: 2 }}>
        <CardContent>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 3,
              flexWrap: 'wrap',
              gap: isMobile ? 1 : 0
            }}
          >
            <TextField
              variant="outlined"
              placeholder="搜索设备..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                sx: { maxWidth: isMobile ? '100%' : 400 }
              }}
              size={isMobile ? 'small' : 'medium'}
              fullWidth={isMobile}
            />
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton size="small" color="primary">
                <EditIcon />
              </IconButton>
              <IconButton size="small" color="info">
                <InfoIcon />
              </IconButton>
            </Box>
          </Box>

          <TableContainer>
            <Table
              sx={{ minWidth: isMobile ? 650 : 1200 }}
              aria-label="设备列表"
            >
              <TableHead>
                <TableRow>
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === 'deviceId'}
                      direction={orderBy === 'deviceId' ? order : 'asc'}
                      onClick={() => handleSort('deviceId')}
                    >
                      设备ID
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === 'name'}
                      direction={orderBy === 'name' ? order : 'asc'}
                      onClick={() => handleSort('name')}
                    >
                      设备名称
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>设备类型</TableCell>
                  <TableCell>位置</TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === 'status'}
                      direction={orderBy === 'status' ? order : 'asc'}
                      onClick={() => handleSort('status')}
                    >
                      状态
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === 'operatingHours'}
                      direction={orderBy === 'operatingHours' ? order : 'asc'}
                      onClick={() => handleSort('operatingHours')}
                    >
                      运行时长
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>效率</TableCell>
                  <TableCell>故障次数</TableCell>
                  <TableCell>最后维护</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredDevices.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((device) => (
                  <TableRow hover key={device.deviceId}>
                    <TableCell sx={{ fontSize: isMobile ? 12 : 14 }}>
                      {device.deviceId}
                    </TableCell>
                    <TableCell sx={{ fontSize: isMobile ? 12 : 14 }}>
                      {device.name}
                    </TableCell>
                    <TableCell sx={{ fontSize: isMobile ? 12 : 14 }}>
                      {device.type}
                    </TableCell>
                    <TableCell sx={{ fontSize: isMobile ? 12 : 14 }}>
                      {device.location}
                    </TableCell>
                    <TableCell sx={{ fontSize: isMobile ? 12 : 14 }}>
                      <Chip
                        label={getStatusText(device.status)}
                        color={getStatusColor(device.status)}
                        size={isMobile ? 'small' : 'medium'}
                      />
                    </TableCell>
                    <TableCell sx={{ fontSize: isMobile ? 12 : 14 }}>
                      {device.operatingHours} h
                    </TableCell>
                    <TableCell sx={{ fontSize: isMobile ? 12 : 14 }}>
                      <Box
                        sx={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 0.5,
                          color: device.efficiency >= 90 ? '#52c41a' :
                                 device.efficiency >= 80 ? '#faad14' : '#ff4d4f'
                        }}
                      >
                        {device.efficiency}%
                      </Box>
                    </TableCell>
                    <TableCell sx={{ fontSize: isMobile ? 12 : 14 }}>
                      <Box
                        sx={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 0.5,
                          color: device.failureCount === 0 ? '#52c41a' :
                                 device.failureCount <= 2 ? '#faad14' : '#ff4d4f'
                        }}
                      >
                        {device.failureCount}
                      </Box>
                    </TableCell>
                    <TableCell sx={{ fontSize: isMobile ? 12 : 14 }}>
                      {device.lastMaintenance}
                    </TableCell>
                  </TableRow>
                ))}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={9} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredDevices.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage={isMobile ? '每页行数' : '每页显示行数'}
            labelDisplayedRows={({ from, to, count }) => `${from}-${to} 条，共 ${count} 条`}
            sx={{
              '& .MuiTablePagination-select': {
                fontSize: isMobile ? 12 : 14
              },
              '& .MuiTablePagination-displayedRows': {
                fontSize: isMobile ? 12 : 14
              }
            }}
          />
        </CardContent>
      </Card>
    </Box>
  );
};

export default DeviceListPage;