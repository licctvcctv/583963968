import React, { useState, useEffect } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Alert,
  CircularProgress
} from '@mui/material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { deviceApi } from '../api';

const ParameterMonitorPage = () => {
  const [devices, setDevices] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState('');
  const [parameters, setParameters] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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
    const fetchData = async () => {
      if (!selectedDevice) return;

      setLoading(true);
      setError('');

      try {
        // 获取设备参数
        const paramsResponse = await deviceApi.getDeviceParams(selectedDevice);
        setParameters(paramsResponse);

        // 获取设备数据
        const dataResponse = await deviceApi.getDeviceData(selectedDevice, {
          limit: 20,
          order: 'desc'
        });

        // 格式化图表数据
        const formattedData = dataResponse.map(item => {
          const dataPoint = { timestamp: item.timestamp };
          item.parameters.forEach(param => {
            dataPoint[param.name] = param.value;
          });
          return dataPoint;
        }).reverse();

        setChartData(formattedData);
      } catch (err) {
        setError('获取数据失败');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedDevice]);

  const getParameterCard = (param) => {
    const latestValue = chartData.length > 0 ? chartData[chartData.length - 1][param.name] : 0;
    const previousValue = chartData.length > 1 ? chartData[chartData.length - 2][param.name] : latestValue;
    const change = latestValue - previousValue;
    const changePercent = previousValue !== 0 ? ((change / previousValue) * 100).toFixed(2) : 0;

    // 根据参数类型生成随机值
    const generateRandomValue = () => {
      const base = Math.random() * 100;
      return param.type === 'temperature' ? base + 20 :
             param.type === 'pressure' ? base * 2 + 100 :
             param.type === 'vibration' ? base * 5 + 10 : base;
    };

    return (
      <Card key={param.name} sx={{ height: '100%' }}>
        <CardContent>
          <Typography variant="h6" component="div" gutterBottom>
            {param.name}
          </Typography>
          <Typography variant="h4" color="primary" gutterBottom>
            {latestValue !== null ? latestValue.toFixed(2) : 'N/A'}
            <Typography variant="body2" component="span" color="text.secondary">
              {param.unit}
            </Typography>
          </Typography>
          <Typography
            variant="body2"
            color={change > 0 ? 'error' : change < 0 ? 'success' : 'text.secondary'}
          >
            {changePercent > 0 ? '+' : ''}{changePercent}% 较上次
          </Typography>
          <Box sx={{ mt: 2, height: 60 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData.slice(-10)}>
                <CartesianGrid strokeDasharray="3 3" />
                <Line
                  type="monotone"
                  dataKey={param.name}
                  stroke="#52c41a"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </Box>
        </CardContent>
      </Card>
    );
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        参数监控
      </Typography>

      <FormControl fullWidth sx={{ mb: 3 }}>
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

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {!loading && devices.length > 0 && (
        <>
          <Grid container spacing={3} sx={{ mb: 4 }}>
            {parameters.map(getParameterCard)}
          </Grid>

          {chartData.length > 0 && (
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  实时趋势图
                </Typography>
                <Box sx={{ height: 400 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="timestamp"
                        tickFormatter={(value) => new Date(value).toLocaleTimeString()}
                      />
                      <YAxis />
                      <Tooltip
                        labelFormatter={(value) => new Date(value).toLocaleString()}
                      />
                      <Legend />
                      {parameters.map((param, index) => (
                        <Line
                          key={param.name}
                          type="monotone"
                          dataKey={param.name}
                          stroke={['#52c41a', '#1890ff', '#faad14', '#f5222d'][index % 4]}
                          strokeWidth={2}
                        />
                      ))}
                    </LineChart>
                  </ResponsiveContainer>
                </Box>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </Box>
  );
};

export default ParameterMonitorPage;