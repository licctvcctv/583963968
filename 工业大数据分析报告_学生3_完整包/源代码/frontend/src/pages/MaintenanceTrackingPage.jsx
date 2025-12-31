import React, { useEffect, useState } from 'react';
import {
  Container,
  Box,
  Paper,
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Button,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  LinearProgress,
  Card,
  CardContent
} from '@mui/material';
import {
  Event,
  Schedule,
  CheckCircle,
  Pending,
  AccessTime,
  Engineering,
  Warning,
  Info,
  Edit,
  Delete,
  Add,
  FilterList
} from '@mui/icons-material';
import ReactECharts from 'echarts-for-react';
import { styled } from "@mui/material/styles";
import { getMaintenanceSchedule, getStatisticsData, getEquipmentHealthData } from '../data/maintenanceData';

const MainContainer = styled(Container)`
  padding-top: 24px;
  padding-bottom: 40px;
`;

const StatusChip = ({ status }) => {
  const getStatus = () => {
    switch (status) {
      case '待执行':
        return { color: '#ff4d4f', bgcolor: '#fff1f0', icon: <Warning fontSize="small" /> };
      case '已安排':
        return { color: '#faad14', bgcolor: '#fffbe6', icon: <Pending fontSize="small" /> };
      case '计划中':
        return { color: '#722ed1', bgcolor: '#f9f0ff', icon: <Event fontSize="small" /> };
      case '已完成':
        return { color: '#52c41a', bgcolor: '#f6ffed', icon: <CheckCircle fontSize="small" /> };
      default:
        return { color: '#8c8c8c', bgcolor: '#f5f5f5', icon: <Info fontSize="small" /> };
    }
  };

  const s = getStatus();
  return (
    <Chip
      icon={s.icon}
      label={status}
      sx={{
        color: s.color,
        bgcolor: s.bgcolor,
        border: `1px solid ${s.color}`,
        fontWeight: 500,
        '& .MuiChip-icon': { color: s.color }
      }}
    />
  );
};

const PriorityChip = ({ priority }) => {
  const getPriority = () => {
    switch (priority) {
      case '紧急':
        return { color: '#ff4d4f', bgcolor: '#fff1f0' };
      case '高':
        return { color: '#faad14', bgcolor: '#fffbe6' };
      case '中':
        return { color: '#722ed1', bgcolor: '#f9f0ff' };
      case '低':
        return { color: '#52c41a', bgcolor: '#f6ffed' };
      default:
        return { color: '#8c8c8c', bgcolor: '#f5f5f5' };
    }
  };

  const p = getPriority();
  return (
    <Chip
      label={priority}
      size="small"
      sx={{
        color: p.color,
        bgcolor: p.bgcolor,
        border: `1px solid ${p.color}`,
        fontWeight: 500
      }}
    />
  );
};

const StatCard = styled(Paper)`
  padding: 24px;
  border-radius: 16px;
  background: linear-gradient(135deg, rgba(114, 46, 209, 0.05) 0%, rgba(114, 46, 209, 0.02) 100%);
  border: 1px solid rgba(114, 46, 209, 0.1);
  transition: all 0.3s ease;
  height: 100%;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(114, 46, 209, 0.15);
  }
`;

const MaintenanceTrackingPage = () => {
  const [schedules, setSchedules] = useState([]);
  const [statistics, setStatistics] = useState(null);
  const [equipment, setEquipment] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [editForm, setEditForm] = useState({});

  useEffect(() => {
    setSchedules(getMaintenanceSchedule());
    setStatistics(getStatisticsData());
    setEquipment(getEquipmentHealthData());
  }, []);

  const handleEdit = (schedule) => {
    setSelectedSchedule(schedule);
    setEditForm(schedule);
    setEditDialogOpen(true);
  };

  const handleSaveEdit = () => {
    setSchedules(schedules.map(s =>
      s.id === selectedSchedule.id ? { ...editForm, id: s.id } : s
    ));
    setEditDialogOpen(false);
    setSelectedSchedule(null);
  };

  const handleDelete = (id) => {
    if (confirm('确定要删除这个维护计划吗？')) {
      setSchedules(schedules.filter(s => s.id !== id));
    }
  };

  const handleStatusChange = (id, newStatus) => {
    setSchedules(schedules.map(s =>
      s.id === id ? { ...s, status: newStatus } : s
    ));
  };

  const filteredSchedules = schedules.filter(schedule => {
    if (filterStatus !== 'all' && schedule.status !== filterStatus) return false;
    if (filterPriority !== 'all' && schedule.priority !== filterPriority) return false;
    return true;
  });

  // Maintenance Status Distribution
  const statusDistributionOption = {
    title: {
      text: '维护状态分布',
      left: 'center',
      textStyle: { fontSize: 16, fontWeight: 600, color: '#262626' }
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      top: 'middle'
    },
    series: [{
      name: '维护状态',
      type: 'pie',
      radius: ['40%', '70%'],
      center: ['60%', '50%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 2
      },
      label: {
        show: true,
        formatter: '{b}\n{c}项'
      },
      data: [
        { value: schedules.filter(s => s.status === '待执行').length, name: '待执行', itemStyle: { color: '#ff4d4f' } },
        { value: schedules.filter(s => s.status === '已安排').length, name: '已安排', itemStyle: { color: '#faad14' } },
        { value: schedules.filter(s => s.status === '计划中').length, name: '计划中', itemStyle: { color: '#722ed1' } },
        { value: schedules.filter(s => s.status === '已完成').length, name: '已完成', itemStyle: { color: '#52c41a' } }
      ]
    }]
  };

  // Weekly Schedule Chart
  const weeklyScheduleOption = {
    title: {
      text: '本周维护计划',
      left: 'center',
      textStyle: { fontSize: 16, fontWeight: 600, color: '#262626' }
    },
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    },
    yAxis: {
      type: 'value',
      name: '工时 (小时)'
    },
    series: [{
      name: '预计工时',
      type: 'bar',
      data: [4, 6, 3, 5, 0, 2, 0],
      itemStyle: {
        color: new Array(7).fill(0).map((_, i) => {
          const colors = ['#722ed1', '#9254de', '#b37feb', '#d3adf7', '#efdbff', '#f9f0ff', '#f9f0ff'];
          return colors[i];
        }),
        borderRadius: [8, 8, 0, 0]
      },
      label: {
        show: true,
        position: 'top',
        formatter: '{c}h',
        color: '#722ed1',
        fontWeight: 600
      }
    }],
    grid: { left: 60, right: 30, bottom: 30, top: 60 }
  };

  // Type Distribution
  const typeDistributionOption = {
    title: {
      text: '维护类型分布',
      left: 'center',
      textStyle: { fontSize: 16, fontWeight: 600, color: '#262626' }
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
      bottom: 10,
      left: 'center'
    },
    series: [{
      name: '维护类型',
      type: 'pie',
      radius: ['30%', '60%'],
      center: ['50%', '45%'],
      data: [
        { value: schedules.filter(s => s.type === '预防性维护').length, name: '预防性维护', itemStyle: { color: '#52c41a' } },
        { value: schedules.filter(s => s.type === '预测性维护').length, name: '预测性维护', itemStyle: { color: '#722ed1' } },
        { value: schedules.filter(s => s.type === '纠正性维护').length, name: '纠正性维护', itemStyle: { color: '#faad14' } },
        { value: schedules.filter(s => s.type === '检查维护').length, name: '检查维护', itemStyle: { color: '#13c2c2' } }
      ],
      itemStyle: {
        borderRadius: 8,
        borderColor: '#fff',
        borderWidth: 2
      },
      label: {
        show: true,
        formatter: '{b}\n{c}项'
      }
    }]
  };

  if (!statistics) return null;

  return (
    <MainContainer maxWidth="xl">
      <Box mb={4}>
        <Typography variant="h4" fontWeight={700} gutterBottom sx={{ color: '#262626' }}>
          维护计划跟踪
        </Typography>
        <Typography variant="body1" color="text.secondary">
          设备维护计划管理、调度与执行跟踪
        </Typography>
      </Box>

      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard>
            <Box display="flex" alignItems="center">
              <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: 'rgba(114, 46, 209, 0.1)', mr: 2 }}>
                <Schedule sx={{ color: '#722ed1', fontSize: 28 }} />
              </Box>
              <Box>
                <Typography variant="h4" fontWeight={700} sx={{ color: '#722ed1' }}>
                  {schedules.length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  总计划数
                </Typography>
              </Box>
            </Box>
          </StatCard>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <StatCard>
            <Box display="flex" alignItems="center">
              <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: 'rgba(255, 77, 79, 0.1)', mr: 2 }}>
                <Warning sx={{ color: '#ff4d4f', fontSize: 28 }} />
              </Box>
              <Box>
                <Typography variant="h4" fontWeight={700} sx={{ color: '#ff4d4f' }}>
                  {schedules.filter(s => s.status === '待执行').length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  待执行
                </Typography>
              </Box>
            </Box>
          </StatCard>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <StatCard>
            <Box display="flex" alignItems="center">
              <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: 'rgba(82, 196, 26, 0.1)', mr: 2 }}>
                <CheckCircle sx={{ color: '#52c41a', fontSize: 28 }} />
              </Box>
              <Box>
                <Typography variant="h4" fontWeight={700} sx={{ color: '#52c41a' }}>
                  {schedules.filter(s => s.status === '已完成').length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  已完成
                </Typography>
              </Box>
            </Box>
          </StatCard>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <StatCard>
            <Box display="flex" alignItems="center">
              <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: 'rgba(19, 194, 194, 0.1)', mr: 2 }}>
                <Engineering sx={{ color: '#13c2c2', fontSize: 28 }} />
              </Box>
              <Box>
                <Typography variant="h4" fontWeight={700} sx={{ color: '#13c2c2' }}>
                  {schedules.reduce((sum, s) => sum + s.estimatedDuration, 0)}h
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  总工时预估
                </Typography>
              </Box>
            </Box>
          </StatCard>
        </Grid>
      </Grid>

      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, borderRadius: 3, height: '100%' }}>
            <ReactECharts option={statusDistributionOption} style={{ height: 280 }} />
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, borderRadius: 3, height: '100%' }}>
            <ReactECharts option={weeklyScheduleOption} style={{ height: 280 }} />
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, borderRadius: 3, height: '100%' }}>
            <ReactECharts option={typeDistributionOption} style={{ height: 280 }} />
          </Paper>
        </Grid>
      </Grid>

      <Paper sx={{ p: 3, borderRadius: 3, mb: 4 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h6" fontWeight={600}>
            维护计划列表
          </Typography>
          <Box display="flex" gap={2}>
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>状态筛选</InputLabel>
              <Select
                value={filterStatus}
                label="状态筛选"
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <MenuItem value="all">全部</MenuItem>
                <MenuItem value="待执行">待执行</MenuItem>
                <MenuItem value="已安排">已安排</MenuItem>
                <MenuItem value="计划中">计划中</MenuItem>
                <MenuItem value="已完成">已完成</MenuItem>
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>优先级</InputLabel>
              <Select
                value={filterPriority}
                label="优先级"
                onChange={(e) => setFilterPriority(e.target.value)}
              >
                <MenuItem value="all">全部</MenuItem>
                <MenuItem value="紧急">紧急</MenuItem>
                <MenuItem value="高">高</MenuItem>
                <MenuItem value="中">中</MenuItem>
                <MenuItem value="低">低</MenuItem>
              </Select>
            </FormControl>

            <Button
              variant="contained"
              startIcon={<Add />}
              sx={{ bgcolor: '#722ed1', '&:hover': { bgcolor: '#531db8' } }}
            >
              新增计划
            </Button>
          </Box>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: 'rgba(114, 46, 209, 0.05)' }}>
                <TableCell sx={{ fontWeight: 600 }}>ID</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>设备</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>维护类型</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>优先级</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>计划日期</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>负责人</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>预估工时</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>状态</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>操作</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredSchedules.map((schedule) => (
                <TableRow key={schedule.id} hover>
                  <TableCell>
                    <Typography variant="body2" fontWeight={600} sx={{ color: '#722ed1' }}>
                      #{schedule.id}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" fontWeight={600}>
                      {schedule.equipment}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={schedule.type}
                      size="small"
                      sx={{
                        bgcolor: schedule.type === '预防性维护' ? '#f6ffed' :
                                schedule.type === '预测性维护' ? '#f9f0ff' :
                                schedule.type === '纠正性维护' ? '#fffbe6' : '#e6f7ff',
                        color: schedule.type === '预防性维护' ? '#52c41a' :
                               schedule.type === '预测性维护' ? '#722ed1' :
                               schedule.type === '纠正性维护' ? '#faad14' : '#13c2c2',
                        fontWeight: 500
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <PriorityChip priority={schedule.priority} />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {schedule.scheduledDate}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box display="flex" alignItems="center" gap={1}>
                      <Engineering sx={{ fontSize: 18, color: '#722ed1' }} />
                      <Typography variant="body2">{schedule.assignedTo}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box display="flex" alignItems="center" gap={1}>
                      <AccessTime sx={{ fontSize: 16, color: '#722ed1' }} />
                      <Typography variant="body2">{schedule.estimatedDuration}h</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <StatusChip status={schedule.status} />
                  </TableCell>
                  <TableCell>
                    <Box display="flex" gap={0.5}>
                      <IconButton
                        size="small"
                        onClick={() => handleEdit(schedule)}
                        sx={{ color: '#722ed1' }}
                      >
                        <Edit fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleDelete(schedule.id)}
                        sx={{ color: '#ff4d4f' }}
                      >
                        <Delete fontSize="small" />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Box mt={4} p={3} sx={{ bgcolor: 'rgba(114, 46, 209, 0.05)', borderRadius: 3, border: '1px solid rgba(114, 46, 209, 0.1)' }}>
        <Typography variant="subtitle1" fontWeight={600} gutterBottom sx={{ color: '#722ed1' }}>
          计划摘要
        </Typography>
        <Typography variant="body2" color="text.secondary">
          当前共有 {schedules.length} 个维护计划，其中 {schedules.filter(s => s.status === '待执行').length} 个待执行，
          {schedules.filter(s => s.status === '已安排').length} 个已安排，{schedules.filter(s => s.status === '计划中').length} 个在计划中。
          预计总工时 {schedules.reduce((sum, s) => sum + s.estimatedDuration, 0)} 小时。
          本周重点处理紧急和高优先级任务，确保设备正常运行。
        </Typography>
      </Box>

      <Dialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: { borderRadius: 3 } }}
      >
        <DialogTitle sx={{ bgcolor: 'rgba(114, 46, 209, 0.05)' }}>
          编辑维护计划
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="设备"
            value={editForm.equipment || ''}
            onChange={(e) => setEditForm({ ...editForm, equipment: e.target.value })}
            margin="normal"
          />
          <TextField
            fullWidth
            label="维护类型"
            value={editForm.type || ''}
            onChange={(e) => setEditForm({ ...editForm, type: e.target.value })}
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>优先级</InputLabel>
            <Select
              value={editForm.priority || ''}
              label="优先级"
              onChange={(e) => setEditForm({ ...editForm, priority: e.target.value })}
            >
              <MenuItem value="紧急">紧急</MenuItem>
              <MenuItem value="高">高</MenuItem>
              <MenuItem value="中">中</MenuItem>
              <MenuItem value="低">低</MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            type="date"
            label="计划日期"
            value={editForm.scheduledDate || ''}
            onChange={(e) => setEditForm({ ...editForm, scheduledDate: e.target.value })}
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>状态</InputLabel>
            <Select
              value={editForm.status || ''}
              label="状态"
              onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
            >
              <MenuItem value="待执行">待执行</MenuItem>
              <MenuItem value="已安排">已安排</MenuItem>
              <MenuItem value="计划中">计划中</MenuItem>
              <MenuItem value="已完成">已完成</MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="负责人"
            value={editForm.assignedTo || ''}
            onChange={(e) => setEditForm({ ...editForm, assignedTo: e.target.value })}
            margin="normal"
          />
          <TextField
            fullWidth
            type="number"
            label="预估工时 (小时)"
            value={editForm.estimatedDuration || ''}
            onChange={(e) => setEditForm({ ...editForm, estimatedDuration: parseInt(e.target.value) })}
            margin="normal"
          />
        </DialogContent>
        <DialogActions sx={{ p: 3, bgcolor: 'rgba(114, 46, 209, 0.02)' }}>
          <Button onClick={() => setEditDialogOpen(false)} variant="outlined" sx={{ borderColor: '#722ed1', color: '#722ed1' }}>
            取消
          </Button>
          <Button
            variant="contained"
            onClick={handleSaveEdit}
            sx={{ bgcolor: '#722ed1', '&:hover': { bgcolor: '#531db8' } }}
          >
            保存
          </Button>
        </DialogActions>
      </Dialog>
    </MainContainer>
  );
};

export default MaintenanceTrackingPage;
