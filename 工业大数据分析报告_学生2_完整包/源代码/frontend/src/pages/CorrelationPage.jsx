import React, { useState, useEffect } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Button,
  Slider,
  Chip,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Line
} from 'recharts';
import { deviceApi } from '../api';

const CorrelationPage = () => {
  const [devices, setDevices] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState('');
  const [parameters, setParameters] = useState([]);
  const [selectedParamX, setSelectedParamX] = useState('');
  const [selectedParamY, setSelectedParamY] = useState('');
  const [correlationData, setCorrelationData] = useState([]);
  const [correlationCoefficient, setCorrelationCoefficient] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [dataPoints, setDataPoints] = useState(50);

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await deviceApi.getDevices();
        setDevices(response);
        if (response.length > 0) {
          setSelectedDevice(response[0].id);
        }
      } catch (err) {
        setError('获取设备列表失败');
      }
    };
    fetchDevices();
  }, []);

  useEffect(() => {
    if (selectedDevice) {
      const fetchParameters = async () => {
        try {
          const response = await deviceApi.getDeviceParams(selectedDevice);
          setParameters(response);
          if (response.length >= 2) {
            setSelectedParamX(response[0].name);
            setSelectedParamY(response[1].name);
          }
        } catch (err) {
          setError('获取参数列表失败');
        }
      };
      fetchParameters();
    }
  }, [selectedDevice]);

  const generateCorrelationData = () => {
    if (!selectedParamX || !selectedParamY) return;

    setLoading(true);
    setError('');

    // 生成相关性数据
    const data = [];
    let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0, sumY2 = 0;

    for (let i = 0; i < dataPoints; i++) {
      // 生成具有相关性的数据
      const baseX = Math.random() * 100;
      const correlation = 0.7; // 设置相关性系数
      const noise = (Math.random() - 0.5) * 20;
      const y = baseX * correlation + noise;

      const dataPoint = {
        x: baseX,
        y: y,
        timestamp: new Date(Date.now() - (dataPoints - i) * 60000).toISOString()
      };

      data.push(dataPoint);

      // 计算相关系数
      sumX += baseX;
      sumY += y;
      sumXY += baseX * y;
      sumX2 += baseX * baseX;
      sumY2 += y * y;
    }

    // 计算皮尔逊相关系数
    const n = dataPoints;
    const numerator = n * sumXY - sumX * sumY;
    const denominator = Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY));
    const coeff = denominator !== 0 ? numerator / denominator : 0;

    setCorrelationData(data);
    setCorrelationCoefficient(coeff);
    setLoading(false);
  };

  const getCorrelationStrength = (coeff) => {
    const abs = Math.abs(coeff);
    if (abs >= 0.9) return { strength: '极强', color: 'error' };
    if (abs >= 0.7) return { strength: '强', color: 'warning' };
    if (abs >= 0.5) return { strength: '中等', color: 'info' };
    if (abs >= 0.3) return { strength: '弱', color: 'success' };
    return { strength: '极弱', color: 'disabled' };
  };

  const getCorrelationDirection = (coeff) => {
    return coeff > 0 ? '正相关' : '负相关';
  };

  const renderScatterChart = () => {
    if (!correlationData.length) return null;

    const paramX = parameters.find(p => p.name === selectedParamX);
    const paramY = parameters.find(p => p.name === selectedParamY);

    return (
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                散点图分析
              </Typography>
              <Box sx={{ height: 400 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                    <CartesianGrid />
                    <XAxis
                      type="number"
                      dataKey="x"
                      name={selectedParamX}
                      label={{ value: `${selectedParamX} (${paramX?.unit})`, position: 'insideBottom', offset: -5 }}
                    />
                    <YAxis
                      type="number"
                      dataKey="y"
                      name={selectedParamY}
                      label={{ value: `${selectedParamY} (${paramY?.unit})`, angle: -90, position: 'insideLeft' }}
                    />
                    <Tooltip
                      formatter={(value, name) => [
                        `${Number(value).toFixed(2)} ${name === selectedParamX ? paramX?.unit : paramY?.unit}`,
                        name === selectedParamX ? selectedParamX : selectedParamY
                      ]}
                      labelFormatter={(label) => `时间: ${new Date(label).toLocaleString()}`}
                    />
                    <Legend />
                    <Scatter
                      name="数据点"
                      data={correlationData}
                      fill="#52c41a"
                    />
                    {/* 添加趋势线 */}
                    {correlationCoefficient !== 0 && (
                      <Line
                        type="monotone"
                        dataKey="trend"
                        stroke="#ff4d4f"
                        strokeWidth={2}
                        dot={false}
                        name="趋势线"
                      />
                    )}
                  </ScatterChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                相关性分析结果
              </Typography>

              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  相关系数
                </Typography>
                <Typography variant="h4" color="primary">
                  {correlationCoefficient.toFixed(4)}
                </Typography>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  相关强度
                </Typography>
                <Chip
                  label={getCorrelationStrength(correlationCoefficient).strength}
                  sx={{ bgcolor: getCorrelationStrength(correlationCoefficient).color, color: '#fff' }}
                  size="small"
                />
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  相关方向
                </Typography>
                <Typography variant="body1">
                  {getCorrelationDirection(correlationCoefficient)}
                </Typography>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  数据点数
                </Typography>
                <Typography variant="body1">
                  {dataPoints}
                </Typography>
              </Box>

              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  解释
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  {Math.abs(correlationCoefficient) >= 0.7 && (
                    <>
                      两个参数之间存在{getCorrelationDirection(correlationCoefficient)}，
                      相关系数为 {correlationCoefficient.toFixed(4)}，表明它们之间存在{getCorrelationStrength(correlationCoefficient).strength}的相关性。
                    </>
                  )}
                  {Math.abs(correlationCoefficient) < 0.7 && Math.abs(correlationCoefficient) >= 0.3 && (
                    <>
                      两个参数之间存在{getCorrelationDirection(correlationCoefficient)}，
                      相关系数为 {correlationCoefficient.toFixed(4)}，表明它们之间存在{getCorrelationStrength(correlationCoefficient).strength}的相关性。
                    </>
                  )}
                  {Math.abs(correlationCoefficient) < 0.3 && (
                    <>
                      两个参数之间的相关系数为 {correlationCoefficient.toFixed(4)}，
                      表明它们之间{getCorrelationStrength(correlationCoefficient).strength}的相关性。
                    </>
                  )}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        相关性分析
      </Typography>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={3}>
          <FormControl fullWidth>
            <InputLabel>选择设备</InputLabel>
            <Select
              value={selectedDevice}
              label="选择设备"
              onChange={(e) => setSelectedDevice(e.target.value)}
            >
              {devices.map(device => (
                <MenuItem key={device.id} value={device.id}>
                  {device.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={3}>
          <FormControl fullWidth>
            <InputLabel>X轴参数</InputLabel>
            <Select
              value={selectedParamX}
              label="X轴参数"
              onChange={(e) => setSelectedParamX(e.target.value)}
            >
              {parameters.map(param => (
                <MenuItem key={param.name} value={param.name}>
                  {param.name} ({param.unit})
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={3}>
          <FormControl fullWidth>
            <InputLabel>Y轴参数</InputLabel>
            <Select
              value={selectedParamY}
              label="Y轴参数"
              onChange={(e) => setSelectedParamY(e.target.value)}
            >
              {parameters.map(param => (
                <MenuItem key={param.name} value={param.name}>
                  {param.name} ({param.unit})
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={3}>
          <Box sx={{ mt: 1 }}>
            <Typography variant="body2" gutterBottom>
              数据点数: {dataPoints}
            </Typography>
            <Slider
              value={dataPoints}
              onChange={(e, newValue) => setDataPoints(newValue)}
              min={20}
              max={200}
              step={10}
              marks={[
                { value: 20, label: '20' },
                { value: 100, label: '100' },
                { value: 200, label: '200' }
              ]}
              sx={{ width: '100%' }}
            />
          </Box>
        </Grid>
      </Grid>

      <Button
        variant="contained"
        onClick={generateCorrelationData}
        disabled={!selectedParamX || !selectedParamY || loading}
        sx={{ mb: 3 }}
      >
        {loading ? <CircularProgress size={20} /> : '生成相关性分析'}
      </Button>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {correlationData.length > 0 && (
        <Box sx={{ mb: 3 }}>
          {renderScatterChart()}
        </Box>
      )}

      {correlationData.length > 0 && (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              数据样本（前10条）
            </Typography>
            <TableContainer component={Paper}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>序号</TableCell>
                    <TableCell>{selectedParamX} ({parameters.find(p => p.name === selectedParamX)?.unit})</TableCell>
                    <TableCell>{selectedParamY} ({parameters.find(p => p.name === selectedParamY)?.unit})</TableCell>
                    <TableCell>时间</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {correlationData.slice(0, 10).map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{row.x.toFixed(2)}</TableCell>
                      <TableCell>{row.y.toFixed(2)}</TableCell>
                      <TableCell>{new Date(row.timestamp).toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default CorrelationPage;