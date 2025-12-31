import React, { useEffect, useState } from 'react';
import {
  Container,
  Box,
  Paper,
  Grid,
  Card,
  CardContent,
  Typography,
  Chip,
  Button,
  IconButton,
  Collapse,
  Alert,
  AlertTitle,
  LinearProgress,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import {
  Lightbulb,
  Warning,
  Error,
  Info,
  ExpandMore,
  ExpandLess,
  Schedule,
  AttachMoney,
  AccessTime,
  Build,
  CheckCircle,
  PriorityHigh,
  TrendingUp,
  Psychology,
  ThumbUp,
  Close
} from '@mui/icons-material';
import ReactECharts from 'echarts-for-react';
import { styled } from "@mui/material/styles";
import { getMaintenanceSuggestions, getStatisticsData, getPredictionData } from '../data/maintenanceData';

const MainContainer = styled(Container)`
  padding-top: 24px;
  padding-bottom: 40px;
`;

const SuggestionCard = styled(Paper)`
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.3s ease;
  border: 1px solid;
  border-color: ${props => {
    if (props.priority === 'urgent') return 'rgba(255, 77, 79, 0.3)';
    if (props.priority === 'high') return 'rgba(250, 173, 20, 0.3)';
    return 'rgba(114, 46, 209, 0.2)';
  }};

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${props => {
      if (props.priority === 'urgent') return '0 12px 32px rgba(255, 77, 79, 0.2)';
      if (props.priority === 'high') return '0 12px 32px rgba(250, 173, 20, 0.2)';
      return '0 12px 32px rgba(114, 46, 209, 0.15)';
    }};
  }
`;

const PriorityCard = styled(Paper)`
  padding: 20px;
  border-radius: 12px;
  text-align: center;
  height: 100%;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
  }
`;

const MaintenanceSuggestionPage = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [statistics, setStatistics] = useState(null);
  const [predictions, setPredictions] = useState(null);
  const [expandedCard, setExpandedCard] = useState(null);
  const [selectedSuggestion, setSelectedSuggestion] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    setSuggestions(getMaintenanceSuggestions());
    setStatistics(getStatisticsData());
    setPredictions(getPredictionData());
  }, []);

  const handleExpand = (id) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  const handleViewDetails = (suggestion) => {
    setSelectedSuggestion(suggestion);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedSuggestion(null);
  };

  const getPriorityConfig = (priority) => {
    switch (priority) {
      case '紧急':
        return {
          color: '#ff4d4f',
          bgcolor: '#fff1f0',
          icon: <Error />,
          label: '紧急'
        };
      case '高':
        return {
          color: '#faad14',
          bgcolor: '#fffbe6',
          icon: <Warning />,
          label: '高优先级'
        };
      case '中':
        return {
          color: '#722ed1',
          bgcolor: '#f9f0ff',
          icon: <Info />,
          label: '中优先级'
        };
      default:
        return {
          color: '#52c41a',
          bgcolor: '#f6ffed',
          icon: <CheckCircle />,
          label: '正常'
        };
    }
  };

  // Suggestion Distribution Chart
  const suggestionDistributionOption = {
    title: {
      text: '建议类型分布',
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
      name: '建议类型',
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
        { value: 1, name: '刀具更换', itemStyle: { color: '#ff4d4f' } },
        { value: 1, name: '散热系统', itemStyle: { color: '#faad14' } },
        { value: 1, name: '负载优化', itemStyle: { color: '#722ed1' } },
        { value: 1, name: '定期保养', itemStyle: { color: '#52c41a' } }
      ]
    }]
  };

  // Cost Analysis Chart
  const costAnalysisOption = {
    title: {
      text: '维护成本分析',
      left: 'center',
      textStyle: { fontSize: 16, fontWeight: 600, color: '#262626' }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' }
    },
    legend: {
      data: ['预防性维护', '纠正性维护', '停机损失'],
      top: 30
    },
    xAxis: {
      type: 'category',
      data: ['1月', '2月', '3月', '4月', '5月', '6月']
    },
    yAxis: {
      type: 'value',
      name: '成本 (元)',
      axisLabel: { formatter: '¥{value}' }
    },
    series: [
      {
        name: '预防性维护',
        type: 'bar',
        stack: 'cost',
        data: [8000, 9500, 11000, 10500, 12000, 11500],
        itemStyle: { color: '#52c41a', borderRadius: [4, 4, 0, 0] }
      },
      {
        name: '纠正性维护',
        type: 'bar',
        stack: 'cost',
        data: [15000, 12000, 8000, 6000, 4000, 3000],
        itemStyle: { color: '#faad14' }
      },
      {
        name: '停机损失',
        type: 'bar',
        stack: 'cost',
        data: [25000, 20000, 12000, 8000, 5000, 2000],
        itemStyle: { color: '#ff4d4f', borderRadius: [0, 0, 4, 4] }
      }
    ],
    grid: { left: 70, right: 30, bottom: 30, top: 80 }
  };

  if (!statistics) return null;

  return (
    <MainContainer maxWidth="xl">
      <Box mb={4}>
        <Typography variant="h4" fontWeight={700} gutterBottom sx={{ color: '#262626' }}>
          AI 智能维护建议
        </Typography>
        <Typography variant="body1" color="text.secondary">
          基于机器学习的智能维护决策支持系统
        </Typography>
      </Box>

      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} sm={6} md={3}>
          <PriorityCard sx={{ bgcolor: 'rgba(255, 77, 79, 0.08)', border: '1px solid rgba(255, 77, 79, 0.2)' }}>
            <Error sx={{ fontSize: 36, color: '#ff4d4f', mb: 1 }} />
            <Typography variant="h3" fontWeight={700} sx={{ color: '#ff4d4f' }}>
              {suggestions.filter(s => s.priority === '紧急').length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              紧急处理
            </Typography>
          </PriorityCard>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <PriorityCard sx={{ bgcolor: 'rgba(250, 173, 20, 0.08)', border: '1px solid rgba(250, 173, 20, 0.2)' }}>
            <Warning sx={{ fontSize: 36, color: '#faad14', mb: 1 }} />
            <Typography variant="h3" fontWeight={700} sx={{ color: '#faad14' }}>
              {suggestions.filter(s => s.priority === '高').length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              高优先级
            </Typography>
          </PriorityCard>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <PriorityCard sx={{ bgcolor: 'rgba(114, 46, 209, 0.08)', border: '1px solid rgba(114, 46, 209, 0.2)' }}>
            <Info sx={{ fontSize: 36, color: '#722ed1', mb: 1 }} />
            <Typography variant="h3" fontWeight={700} sx={{ color: '#722ed1' }}>
              {suggestions.filter(s => s.priority === '中').length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              中优先级
            </Typography>
          </PriorityCard>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <PriorityCard sx={{ bgcolor: 'rgba(82, 196, 26, 0.08)', border: '1px solid rgba(82, 196, 26, 0.2)' }}>
            <Psychology sx={{ fontSize: 36, color: '#52c41a', mb: 1 }} />
            <Typography variant="h3" fontWeight={700} sx={{ color: '#52c41a' }}>
              {predictions ? predictions.overallAccuracy : 0}%
            </Typography>
            <Typography variant="body2" color="text.secondary">
              AI 置信度
            </Typography>
          </PriorityCard>
        </Grid>
      </Grid>

      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, borderRadius: 3, height: '100%' }}>
            <ReactECharts option={suggestionDistributionOption} style={{ height: 320 }} />
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, borderRadius: 3, height: '100%' }}>
            <ReactECharts option={costAnalysisOption} style={{ height: 320 }} />
          </Paper>
        </Grid>
      </Grid>

      <Box mb={3}>
        <Typography variant="h5" fontWeight={600} gutterBottom sx={{ color: '#262626' }}>
          <Lightbulb sx={{ verticalAlign: 'middle', mr: 1, color: '#722ed1' }} />
          智能维护建议列表
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {suggestions.map((suggestion) => {
          const config = getPriorityConfig(suggestion.priority);
          const isExpanded = expandedCard === suggestion.id;

          return (
            <Grid item xs={12} md={6} key={suggestion.id}>
              <SuggestionCard priority={suggestion.priority.toLowerCase()}>
                <Box p={3}>
                  <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                    <Box display="flex" alignItems="center" gap={1}>
                      <Box sx={{ p: 1, borderRadius: 1, bgcolor: config.bgcolor, color: config.color }}>
                        {config.icon}
                      </Box>
                      <Box>
                        <Typography variant="h6" fontWeight={600}>
                          {suggestion.equipment}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {suggestion.type}
                        </Typography>
                      </Box>
                    </Box>
                    <Chip
                      label={config.label}
                      sx={{
                        bgcolor: config.bgcolor,
                        color: config.color,
                        border: `1px solid ${config.color}`,
                        fontWeight: 600
                      }}
                    />
                  </Box>

                  <Box mb={2}>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      原因分析
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#262626' }}>
                      {suggestion.reason}
                    </Typography>
                  </Box>

                  <Box mb={2}>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      AI 置信度
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={suggestion.confidence}
                      sx={{
                        height: 8,
                        borderRadius: 4,
                        bgcolor: '#f0f0f0',
                        '& .MuiLinearProgress-bar': {
                          bgcolor: suggestion.confidence >= 90 ? '#52c41a' : suggestion.confidence >= 70 ? '#faad14' : '#722ed1',
                          borderRadius: 4,
                        }
                      }}
                    />
                    <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
                      {suggestion.confidence}% 置信度
                    </Typography>
                  </Box>

                  <Collapse in={isExpanded}>
                    <Box p={2} sx={{ bgcolor: 'rgba(114, 46, 209, 0.03)', borderRadius: 2, mb: 2 }}>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        影响评估
                      </Typography>
                      <Typography variant="body2" paragraph>
                        {suggestion.impact}
                      </Typography>

                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        维护建议
                      </Typography>
                      <Typography variant="body2" paragraph>
                        {suggestion.recommendation}
                      </Typography>

                      <Divider sx={{ my: 2 }} />

                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <Box display="flex" alignItems="center" gap={1}>
                            <AttachMoney sx={{ fontSize: 20, color: '#722ed1' }} />
                            <Box>
                              <Typography variant="caption" color="text.secondary">预估成本</Typography>
                              <Typography variant="body2" fontWeight={600}>¥{suggestion.estimatedCost.toLocaleString()}</Typography>
                            </Box>
                          </Box>
                        </Grid>
                        <Grid item xs={6}>
                          <Box display="flex" alignItems="center" gap={1}>
                            <AccessTime sx={{ fontSize: 20, color: '#722ed1' }} />
                            <Box>
                              <Typography variant="caption" color="text.secondary">预估停机</Typography>
                              <Typography variant="body2" fontWeight={600}>{suggestion.estimatedDowntime}小时</Typography>
                            </Box>
                          </Box>
                        </Grid>
                      </Grid>
                    </Box>
                  </Collapse>

                  <Box display="flex" gap={1}>
                    <Button
                      fullWidth
                      variant="outlined"
                      size="small"
                      onClick={() => handleExpand(suggestion.id)}
                      startIcon={isExpanded ? <ExpandLess /> : <ExpandMore />}
                      sx={{
                        borderColor: '#722ed1',
                        color: '#722ed1',
                        '&:hover': {
                          borderColor: '#531db8',
                          bgcolor: 'rgba(114, 46, 209, 0.05)'
                        }
                      }}
                    >
                      {isExpanded ? '收起详情' : '查看详情'}
                    </Button>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => handleViewDetails(suggestion)}
                      sx={{
                        bgcolor: '#722ed1',
                        '&:hover': { bgcolor: '#531db8' }
                      }}
                    >
                      处理
                    </Button>
                  </Box>
                </Box>
              </SuggestionCard>
            </Grid>
          );
        })}
      </Grid>

      <Alert severity="success" sx={{ mt: 4, borderRadius: 3 }}>
        <AlertTitle>AI 分析摘要</AlertTitle>
        <Typography variant="body2">
          当前共有 <strong>{suggestions.length}</strong> 项维护建议，
          其中 <strong>{suggestions.filter(s => s.priority === '紧急').length}</strong> 项紧急处理，
          <strong> {suggestions.filter(s => s.priority === '高').length}</strong> 项高优先级。
          预计可避免停机损失 <strong>¥{(statistics.maintenanceCost * 0.23).toLocaleString()}</strong>。
        </Typography>
      </Alert>

      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
        PaperProps={{ sx: { borderRadius: 3 } }}
      >
        {selectedSuggestion && (
          <>
            <DialogTitle sx={{ bgcolor: 'rgba(114, 46, 209, 0.05)', pb: 2 }}>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box display="flex" alignItems="center" gap={1}>
                  <Build sx={{ color: '#722ed1' }} />
                  <Typography variant="h6" fontWeight={600}>
                    {selectedSuggestion.equipment} - {selectedSuggestion.type}
                  </Typography>
                </Box>
                <IconButton onClick={handleCloseDialog} size="small">
                  <Close />
                </IconButton>
              </Box>
            </DialogTitle>

            <DialogContent sx={{ mt: 2 }}>
              <List>
                <ListItem>
                  <ListItemIcon><PriorityHigh sx={{ color: '#722ed1' }} /></ListItemIcon>
                  <ListItemText
                    primary="优先级"
                    secondary={selectedSuggestion.priority}
                  />
                </ListItem>

                <ListItem>
                  <ListItemIcon><Info sx={{ color: '#722ed1' }} /></ListItemIcon>
                  <ListItemText
                    primary="原因"
                    secondary={selectedSuggestion.reason}
                  />
                </ListItem>

                <ListItem>
                  <ListItemIcon><TrendingUp sx={{ color: '#722ed1' }} /></ListItemIcon>
                  <ListItemText
                    primary="影响"
                    secondary={selectedSuggestion.impact}
                  />
                </ListItem>

                <ListItem>
                  <ListItemIcon><Lightbulb sx={{ color: '#722ed1' }} /></ListItemIcon>
                  <ListItemText
                    primary="建议措施"
                    secondary={selectedSuggestion.recommendation}
                  />
                </ListItem>

                <ListItem>
                  <ListItemIcon><AttachMoney sx={{ color: '#722ed1' }} /></ListItemIcon>
                  <ListItemText
                    primary="预估成本"
                    secondary={`¥${selectedSuggestion.estimatedCost.toLocaleString()}`}
                  />
                </ListItem>

                <ListItem>
                  <ListItemIcon><AccessTime sx={{ color: '#722ed1' }} /></ListItemIcon>
                  <ListItemText
                    primary="预估停机时间"
                    secondary={`${selectedSuggestion.estimatedDowntime} 小时`}
                  />
                </ListItem>

                <ListItem>
                  <ListItemIcon><Psychology sx={{ color: '#722ed1' }} /></ListItemIcon>
                  <ListItemText
                    primary="AI 置信度"
                    secondary={`${selectedSuggestion.confidence}%`}
                  />
                </ListItem>
              </List>

              <Box mt={2} p={2} sx={{ bgcolor: 'rgba(82, 196, 26, 0.1)', borderRadius: 2 }}>
                <Box display="flex" alignItems="center" gap={1}>
                  <ThumbUp sx={{ color: '#52c41a', fontSize: 20 }} />
                  <Typography variant="body2" fontWeight={600} sx={{ color: '#52c41a' }}>
                    采纳此建议预计可减少 {selectedSuggestion.confidence * 0.8}% 的故障风险
                  </Typography>
                </Box>
              </Box>
            </DialogContent>

            <DialogActions sx={{ p: 3, bgcolor: 'rgba(114, 46, 209, 0.02)' }}>
              <Button onClick={handleCloseDialog} variant="outlined" sx={{ borderColor: '#722ed1', color: '#722ed1' }}>
                稍后处理
              </Button>
              <Button
                variant="contained"
                sx={{ bgcolor: '#722ed1', '&:hover': { bgcolor: '#531db8' } }}
                onClick={handleCloseDialog}
              >
                创建维护工单
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </MainContainer>
  );
};

export default MaintenanceSuggestionPage;
