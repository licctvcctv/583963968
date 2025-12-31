import React, { useEffect, useState } from 'react';
import {
  Container,
  Box,
  Paper,
  Grid,
  Card,
  CardContent,
  Chip,
  Typography,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Tooltip,
  CircularProgress
} from '@mui/material';
import {
  Info,
  Warning,
  Error,
  CheckCircle,
  TrendingUp,
  TrendingDown,
  Speed,
  Build,
  AccessTime,
  Refresh,
  PrecisionManufacturing
} from '@mui/icons-material';
import ReactECharts from 'echarts-for-react';
import { styled } from "@mui/material/styles";

const API_BASE = 'http://localhost:8003';

const MainContainer = styled(Container)`
  padding-top: 24px;
  padding-bottom: 40px;
`;

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
    border-color: rgba(114, 46, 209, 0.2);
  }
`;

const ChartCard = styled(Paper)`
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  height: 100%;
`;

const StatusChip = ({ status }) => {
  const getStatus = () => {
    switch (status) {
      case '良好':
        return { color: '#52c41a', bgcolor: '#f6ffed', icon: <CheckCircle />, label: '良好' };
      case '正常':
        return { color: '#1890ff', bgcolor: '#e6f7ff', icon: <CheckCircle />, label: '正常' };
      case '警告':
        return { color: '#faad14', bgcolor: '#fffbe6', icon: <Warning />, label: '警告' };
      case '危险':
        return { color: '#ff4d4f', bgcolor: '#fff1f0', icon: <Error />, label: '危险' };
      default:
        return { color: '#8c8c8c', bgcolor: '#f5f5f5', icon: <Info />, label: status };
    }
  };

  const s = getStatus();
  return (
    <Chip
      icon={s.icon}
      label={s.label}
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

const HealthScoreBar = ({ score }) => {
  const getColor = () => {
    if (score >= 80) return '#52c41a';
    if (score >= 60) return '#faad14';
    return '#ff4d4f';
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Box sx={{ flex: 1 }}>
        <LinearProgress
          variant="determinate"
          value={score}
          sx={{
            height: 8,
            borderRadius: 4,
            bgcolor: '#f0f0f0',
            '& .MuiLinearProgress-bar': {
              bgcolor: getColor(),
              borderRadius: 4,
            }
          }}
        />
      </Box>
      <Typography variant="body2" sx={{ fontWeight: 600, minWidth: 35, color: getColor() }}>
        {score}
      </Typography>
    </Box>
  );
};

const MaintenanceAssessmentPage = () => {
  const [machineData, setMachineData] = useState([]);
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [machineRes, healthRes] = await Promise.all([
        fetch(`${API_BASE}/api/data/machine-data`),
        fetch(`${API_BASE}/api/data/equipment-health`)
      ]);
      
      if (!machineRes.ok || !healthRes.ok) {
        throw new Error('API 请求失败');
      }
      
      const machineDataResult = await machineRes.json();
      const healthData = await healthRes.json();
      
      setMachineData(machineDataResult);
      setStatistics({
        totalEquipment: healthData.totalRecords,
        healthyEquipment: healthData.normalRecords,
        warningEquipment: healthData.statusDistribution.warning,
        criticalEquipment: healthData.failureRecords,
        availability: (100 - parseFloat(healthData.failureRate)).toFixed(1),
        mtbf: Math.round(10000 / healthData.failureRecords),
        typeStats: healthData.typeStats,
        faultStats: healthData.faultStats
      });
      setError(null);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('无法加载数据，请检查后端服务');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Prepare chart data based on real data
  const healthScoreOption = {
    title: {
      text: '产品类型分布',
      left: 'center',
      textStyle: { fontSize: 16, fontWeight: 600, color: '#262626' }
    },
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c} ({d}%)'
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      top: 'middle'
    },
    series: [{
      name: '产品类型',
      type: 'pie',
      radius: ['40%', '70%'],
      center: ['60%', '50%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 2
      },
      label: { show: false },
      emphasis: {
        label: { show: true, fontSize: 14, fontWeight: 'bold' }
      },
      data: statistics ? [
        { value: statistics.typeStats?.L || 0, name: 'L型 - 低质量', itemStyle: { color: '#1890ff' } },
        { value: statistics.typeStats?.M || 0, name: 'M型 - 中等质量', itemStyle: { color: '#52c41a' } },
        { value: statistics.typeStats?.H || 0, name: 'H型 - 高质量', itemStyle: { color: '#faad14' } }
      ] : []
    }],
    grid: { left: 60, right: 30, bottom: 60, top: 60 }
  };

  const statusDistributionOption = {
    title: {
      text: '设备状态分布',
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
      name: '设备状态',
      type: 'pie',
      radius: ['40%', '70%'],
      center: ['60%', '50%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 2
      },
      label: { show: false },
      emphasis: {
        label: { show: true, fontSize: 14, fontWeight: 'bold' }
      },
      data: statistics ? [
        { value: statistics.healthyEquipment, name: '正常运行', itemStyle: { color: '#52c41a' } },
        { value: statistics.warningEquipment, name: '需要关注', itemStyle: { color: '#faad14' } },
        { value: statistics.criticalEquipment, name: '故障', itemStyle: { color: '#ff4d4f' } }
      ] : []
    }]
  };

  const temperatureTrendOption = {
    title: {
      text: '温度趋势监控',
      left: 'center',
      textStyle: { fontSize: 16, fontWeight: 600, color: '#262626' }
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['空气温度', '工艺温度'],
      top: 30
    },
    xAxis: {
      type: 'category',
      data: machineData.slice(0, 50).map((_, i) => `${i + 1}`),
      boundaryGap: false
    },
    yAxis: {
      type: 'value',
      name: '温度 (K)',
      axisLabel: { formatter: '{value} K' }
    },
    series: [
      {
        name: '空气温度',
        type: 'line',
        smooth: true,
        data: machineData.slice(0, 50).map(d => d['Air temperature [K]']),
        itemStyle: { color: '#722ed1' },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(114, 46, 209, 0.3)' },
              { offset: 1, color: 'rgba(114, 46, 209, 0.05)' }
            ]
          }
        }
      },
      {
        name: '工艺温度',
        type: 'line',
        smooth: true,
        data: machineData.slice(0, 50).map(d => d['Process temperature [K]']),
        itemStyle: { color: '#13c2c2' },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(19, 194, 194, 0.3)' },
              { offset: 1, color: 'rgba(19, 194, 194, 0.05)' }
            ]
          }
        }
      }
    ],
    grid: { left: 60, right: 30, bottom: 30, top: 80 }
  };

  const faultDistributionOption = {
    title: {
      text: '故障类型分布',
      left: 'center',
      textStyle: { fontSize: 16, fontWeight: 600, color: '#262626' }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' }
    },
    xAxis: {
      type: 'category',
      data: ['工具磨损', '散热故障', '功率故障', '过载故障', '随机故障']
    },
    yAxis: {
      type: 'value',
      name: '故障次数'
    },
    series: [{
      data: statistics ? [
        { value: statistics.faultStats?.TWF || 0, itemStyle: { color: '#722ed1' } },
        { value: statistics.faultStats?.HDF || 0, itemStyle: { color: '#eb2f96' } },
        { value: statistics.faultStats?.PWF || 0, itemStyle: { color: '#fa8c16' } },
        { value: statistics.faultStats?.OSF || 0, itemStyle: { color: '#f5222d' } },
        { value: statistics.faultStats?.RNF || 0, itemStyle: { color: '#13c2c2' } }
      ] : [],
      type: 'bar',
      barWidth: '40%',
      itemStyle: { borderRadius: [8, 8, 0, 0] }
    }],
    grid: { left: 60, right: 30, bottom: 30, top: 60 }
  };

  // 从真实数据生成设备列表
  const equipmentData = machineData.slice(0, 20).map((d, index) => {
    const toolWear = d['Tool wear [min]'];
    const hasFault = d['Machine failure'] === 1;
    let healthScore = 100 - (toolWear / 250 * 50);
    if (hasFault) healthScore -= 30;
    healthScore = Math.max(0, Math.min(100, Math.round(healthScore)));
    
    let status = '良好';
    if (healthScore < 60) status = '危险';
    else if (healthScore < 80) status = '警告';
    else if (healthScore < 90) status = '正常';
    
    return {
      id: `EQ-${String(index + 1).padStart(3, '0')}`,
      name: `设备 ${d['Product ID']}`,
      type: d.Type,
      healthScore,
      status,
      toolWear,
      airTemp: d['Air temperature [K]'],
      processTemp: d['Process temperature [K]']
    };
  });

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
        <Typography sx={{ ml: 2 }}>加载数据中...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <MainContainer maxWidth="xl">
      <Box mb={4}>
        <Typography variant="h4" fontWeight={700} gutterBottom sx={{ color: '#262626' }}>
          设备维护风险评估
        </Typography>
        <Typography variant="body1" color="text.secondary">
          基于 AI4I 2020 数据集的实时设备健康状态监控与风险分析
        </Typography>
      </Box>

      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard>
            <Box display="flex" alignItems="center" mb={2}>
              <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: 'rgba(114, 46, 209, 0.1)', mr: 2 }}>
                <PrecisionManufacturing sx={{ color: '#722ed1', fontSize: 28 }} />
              </Box>
              <Box>
                <Typography variant="h4" fontWeight={700} sx={{ color: '#722ed1' }}>
                  {statistics.totalEquipment}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  设备总数
                </Typography>
              </Box>
            </Box>
          </StatCard>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <StatCard>
            <Box display="flex" alignItems="center" mb={2}>
              <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: 'rgba(82, 196, 26, 0.1)', mr: 2 }}>
                <CheckCircle sx={{ color: '#52c41a', fontSize: 28 }} />
              </Box>
              <Box>
                <Typography variant="h4" fontWeight={700} sx={{ color: '#52c41a' }}>
                  {statistics.healthyEquipment}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  运行正常
                </Typography>
              </Box>
            </Box>
          </StatCard>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <StatCard>
            <Box display="flex" alignItems="center" mb={2}>
              <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: 'rgba(250, 173, 20, 0.1)', mr: 2 }}>
                <Warning sx={{ color: '#faad14', fontSize: 28 }} />
              </Box>
              <Box>
                <Typography variant="h4" fontWeight={700} sx={{ color: '#faad14' }}>
                  {statistics.warningEquipment}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  需要关注
                </Typography>
              </Box>
            </Box>
          </StatCard>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <StatCard>
            <Box display="flex" alignItems="center" mb={2}>
              <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: 'rgba(255, 77, 79, 0.1)', mr: 2 }}>
                <Error sx={{ color: '#ff4d4f', fontSize: 28 }} />
              </Box>
              <Box>
                <Typography variant="h4" fontWeight={700} sx={{ color: '#ff4d4f' }}>
                  {statistics.criticalEquipment}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  危险状态
                </Typography>
              </Box>
            </Box>
          </StatCard>
        </Grid>
      </Grid>

      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} md={6}>
          <ChartCard>
            <ReactECharts option={healthScoreOption} style={{ height: 350 }} />
          </ChartCard>
        </Grid>

        <Grid item xs={12} md={6}>
          <ChartCard>
            <ReactECharts option={statusDistributionOption} style={{ height: 350 }} />
          </ChartCard>
        </Grid>
      </Grid>

      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} md={6}>
          <ChartCard>
            <ReactECharts option={temperatureTrendOption} style={{ height: 350 }} />
          </ChartCard>
        </Grid>

        <Grid item xs={12} md={6}>
          <ChartCard>
            <ReactECharts option={faultDistributionOption} style={{ height: 350 }} />
          </ChartCard>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <ChartCard>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
              <Typography variant="h6" fontWeight={600}>
                设备健康状态详情 (基于真实数据)
              </Typography>
              <IconButton sx={{ color: '#722ed1' }} onClick={fetchData}>
                <Refresh />
              </IconButton>
            </Box>

            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow sx={{ bgcolor: 'rgba(114, 46, 209, 0.05)' }}>
                    <TableCell sx={{ fontWeight: 600 }}>设备ID</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>产品编号</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>类型</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>健康评分</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>状态</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>刀具磨损</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>空气温度</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {equipmentData.map((equipment) => (
                    <TableRow key={equipment.id} hover>
                      <TableCell>
                        <Typography variant="body2" fontWeight={600} sx={{ color: '#722ed1' }}>
                          {equipment.id}
                        </Typography>
                      </TableCell>
                      <TableCell>{equipment.name}</TableCell>
                      <TableCell>
                        <Chip
                          label={equipment.type}
                          size="small"
                          sx={{
                            bgcolor: equipment.type === 'L' ? '#e6f7ff' : equipment.type === 'M' ? '#f6ffed' : '#fff7e6',
                            color: equipment.type === 'L' ? '#1890ff' : equipment.type === 'M' ? '#52c41a' : '#fa8c16',
                            fontWeight: 500
                          }}
                        />
                      </TableCell>
                      <TableCell sx={{ minWidth: 150 }}>
                        <HealthScoreBar score={equipment.healthScore} />
                      </TableCell>
                      <TableCell>
                        <StatusChip status={equipment.status} />
                      </TableCell>
                      <TableCell>{equipment.toolWear} min</TableCell>
                      <TableCell>{equipment.airTemp?.toFixed(1)} K</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </ChartCard>
        </Grid>
      </Grid>

      <Box mt={4} p={3} sx={{ bgcolor: 'rgba(114, 46, 209, 0.05)', borderRadius: 3, border: '1px solid rgba(114, 46, 209, 0.1)' }}>
        <Typography variant="subtitle1" fontWeight={600} gutterBottom sx={{ color: '#722ed1' }}>
          评估摘要 (基于 AI4I 2020 真实数据)
        </Typography>
        <Typography variant="body2" color="text.secondary">
          当前系统共监控 {statistics.totalEquipment.toLocaleString()} 条设备记录，其中 {statistics.healthyEquipment.toLocaleString()} 条正常运行，
          {statistics.warningEquipment.toLocaleString()} 条需要关注，{statistics.criticalEquipment} 条发生故障。
          整体设备可用率为 {statistics.availability}%，
          平均故障间隔时间 (MTBF) 约为 {statistics.mtbf} 条记录。
          故障类型分布：工具磨损 {statistics.faultStats?.TWF || 0} 次，散热故障 {statistics.faultStats?.HDF || 0} 次，
          功率故障 {statistics.faultStats?.PWF || 0} 次，过载故障 {statistics.faultStats?.OSF || 0} 次。
        </Typography>
      </Box>
    </MainContainer>
  );
};

export default MaintenanceAssessmentPage;
