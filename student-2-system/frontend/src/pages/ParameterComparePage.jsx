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
  ToggleButton,
  ToggleButtonGroup,
  CircularProgress
} from '@mui/material';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts';
import { deviceApi } from '../api';

const ParameterComparePage = () => {
  const [devices, setDevices] = useState([]);
  const [selectedDevices, setSelectedDevices] = useState([]);
  const [parameters, setParameters] = useState([]);
  const [comparisonData, setComparisonData] = useState([]);
  const [chartType, setChartType] = useState('radar');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await deviceApi.getDevices();
        setDevices(response);
      } catch (err) {
        setError('获取设备列表失败');
      }
    };
    fetchDevices();
  }, []);

  const handleDeviceChange = (event) => {
    setSelectedDevices(event.target.value);
  };

  const generateComparisonData = () => {
    if (!parameters.length || selectedDevices.length < 2) return;

    setLoading(true);
    setError('');

    // 模拟生成对比数据
    const data = [];
    const deviceNames = devices.filter(d => selectedDevices.includes(d.id)).map(d => d.name);

    parameters.forEach(param => {
      const dataPoint = {
        parameter: param.name,
        unit: param.unit
      };

      // 为每个设备生成随机值（模拟实际数据）
      selectedDevices.forEach((deviceId, index) => {
        const baseValue = Math.random() * 100;
        dataPoint[deviceNames[index]] = baseValue + (param.type === 'temperature' ? 20 : 0);
      });

      data.push(dataPoint);
    });

    setComparisonData(data);
    setLoading(false);
  };

  useEffect(() => {
    if (selectedDevices.length >= 2) {
      // 获取第一个设备的参数作为基准
      const fetchParameters = async () => {
        try {
          const response = await deviceApi.getDeviceParams(selectedDevices[0]);
          setParameters(response);
        } catch (err) {
          setError('获取参数列表失败');
        }
      };
      fetchParameters();
    }
  }, [selectedDevices]);

  const renderRadarChart = () => {
    if (!comparisonData.length) return null;

    const deviceColors = ['#52c41a', '#1890ff', '#faad14', '#f5222d', '#722ed1'];
    const deviceNames = devices.filter(d => selectedDevices.includes(d.id)).map(d => d.name);

    return (
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            参数雷达图对比
          </Typography>
          <Box sx={{ height: 500 }}>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={comparisonData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="parameter" />
                <PolarRadiusAxis />
                {deviceNames.map((name, index) => (
                  <Radar
                    key={name}
                    name={name}
                    dataKey={name}
                    stroke={deviceColors[index % deviceColors.length]}
                    fill={deviceColors[index % deviceColors.length]}
                    fillOpacity={0.1}
                  />
                ))}
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </Box>
        </CardContent>
      </Card>
    );
  };

  const renderBarChart = () => {
    if (!comparisonData.length) return null;

    const deviceNames = devices.filter(d => selectedDevices.includes(d.id)).map(d => d.name);

    return (
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            参数柱状图对比
          </Typography>
          <Box sx={{ height: 500 }}>
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={comparisonData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="parameter" />
                <YAxis />
                <Tooltip />
                <Legend />
                {deviceNames.map((name, index) => (
                  <Bar
                    key={name}
                    dataKey={name}
                    fill={['#52c41a', '#1890ff', '#faad14', '#f5222d', '#722ed1'][index % 5]}
                  />
                ))}
              </ComposedChart>
            </ResponsiveContainer>
          </Box>
        </CardContent>
      </Card>
    );
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        参数对比
      </Typography>

      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel>选择设备（至少选择2个）</InputLabel>
        <Select
          multiple
          value={selectedDevices}
          onChange={handleDeviceChange}
          label="选择设备"
        >
          {devices.map(device => (
            <MenuItem key={device.id} value={device.id}>
              {device.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box sx={{ mb: 3, display: 'flex', gap: 2, alignItems: 'center' }}>
        <Typography>图表类型：</Typography>
        <ToggleButtonGroup
          value={chartType}
          exclusive
          onChange={(e, newType) => setChartType(newType)}
        >
          <ToggleButton value="radar">雷达图</ToggleButton>
          <ToggleButton value="bar">柱状图</ToggleButton>
        </ToggleButtonGroup>
        <Button
          variant="contained"
          onClick={generateComparisonData}
          disabled={selectedDevices.length < 2 || loading}
        >
          {loading ? <CircularProgress size={20} /> : '生成对比'}
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {selectedDevices.length < 2 && (
        <Alert severity="info" sx={{ mb: 2 }}>
          请至少选择2个设备进行对比
        </Alert>
      )}

      {comparisonData.length > 0 && (
        <Box sx={{ mb: 3 }}>
          {chartType === 'radar' ? renderRadarChart() : renderBarChart()}
        </Box>
      )}

      {comparisonData.length > 0 && (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              对比数据表
            </Typography>
            <Box sx={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>参数</th>
                    {devices
                      .filter(d => selectedDevices.includes(d.id))
                      .map(device => (
                        <th key={device.id} style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>
                          {device.name}
                        </th>
                      ))}
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                        {row.parameter} ({row.unit})
                      </td>
                      {devices
                        .filter(d => selectedDevices.includes(d.id))
                        .map(device => (
                          <td key={device.id} style={{ border: '1px solid #ddd', padding: '8px' }}>
                            {row[device.name] !== undefined ? row[device.name].toFixed(2) : 'N/A'}
                          </td>
                        ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </Box>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default ParameterComparePage;