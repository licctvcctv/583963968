// 真实CSV数据加载工具
import Papa from 'papaparse';

// CSV文件路径（相对public目录）
const CSV_PATH = '/ai4i2020.csv';

// 加载真实CSV数据
export const loadRealCSVData = () => {
  return new Promise((resolve, reject) => {
    Papa.parse(CSV_PATH, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      download: true,
      complete: (results) => {
        resolve(results.data);
      },
      error: (error) => {
        console.error('CSV加载失败:', error);
        reject(error);
      }
    });
  });
};

// 从后端API加载数据
export const loadFromBackend = async (apiUrl = 'http://localhost:8004/api/data/all') => {
  try {
    const token = localStorage.getItem('token');
    const headers = {};
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(apiUrl, { headers });
    if (!response.ok) {
      throw new Error(`API请求失败: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('后端API加载失败:', error);
    throw error;
  }
};

// 生成告警（基于真实数据）
export const getAlertsFromData = (data) => {
  const alerts = [];
  const maxAlerts = 50; // 最多显示50条告警

  for (let i = 0; i < Math.min(data.length, maxAlerts); i++) {
    const record = data[i];
    const toolWear = record['Tool wear [min]'] || 0;
    const airTemp = record['Air temperature [K]'] || 0;
    const torque = record['Torque [Nm]'] || 0;
    const machineFailure = record['Machine failure'] || 0;

    let severity = 'info';
    let message = '设备运行正常';
    let title = '正常';

    // 根据真实数据判断告警级别
    if (machineFailure === 1) {
      severity = 'critical';
      title = '设备故障';
      message = `UDI ${record.UDI}: 设备发生故障，请立即检查！`;
    } else if (toolWear > 200) {
      severity = 'warning';
      title = '刀具磨损严重';
      message = `UDI ${record.UDI}: 刀具磨损 ${toolWear}分钟，建议更换`;
    } else if (airTemp > 302) {
      severity = 'warning';
      title = '温度过高';
      message = `UDI ${record.UDI}: 空气温度 ${airTemp}K，超过正常范围`;
    } else if (torque > 60) {
      severity = 'warning';
      title = '扭矩过大';
      message = `UDI ${record.UDI}: 扭矩 ${torque}Nm，超出正常范围`;
    } else if (toolWear > 150) {
      severity = 'info';
      title = '刀具磨损提示';
      message = `UDI ${record.UDI}: 刀具磨损 ${toolWear}分钟，需要注意`;
    }

    if (severity !== 'info' || i < 10) {
      alerts.push({
        id: `alert-${record.UDI || i}`,
        severity,
        title,
        message,
        deviceId: record.UDI || `EQ-${i}`,
        productId: record['Product ID'] || `P${i}`,
        timestamp: new Date(Date.now() - i * 60000),
        resolved: severity === 'info'
      });
    }
  }

  return alerts;
};

// 获取统计数据（基于真实数据）
export const getStatsFromData = (data) => {
  if (!data || data.length === 0) {
    return {
      totalRecords: 0,
      failureCount: 0,
      failureRate: 0,
      typeStats: { L: 0, M: 0, H: 0 },
      avgToolWear: 0,
      avgAirTemp: 0,
      avgTorque: 0
    };
  }

  const failureCount = data.filter(d => d['Machine failure'] === 1).length;
  const typeStats = { L: 0, M: 0, H: 0 };
  let totalToolWear = 0;
  let totalAirTemp = 0;
  let totalTorque = 0;

  data.forEach(d => {
    typeStats[d.Type] = (typeStats[d.Type] || 0) + 1;
    totalToolWear += d['Tool wear [min]'] || 0;
    totalAirTemp += d['Air temperature [K]'] || 0;
    totalTorque += d['Torque [Nm]'] || 0;
  });

  return {
    totalRecords: data.length,
    failureCount,
    failureRate: ((failureCount / data.length) * 100).toFixed(2),
    typeStats,
    avgToolWear: (totalToolWear / data.length).toFixed(1),
    avgAirTemp: (totalAirTemp / data.length).toFixed(1),
    avgTorque: (totalTorque / data.length).toFixed(1)
  };
};

// 按类型分组数据
export const getDataByType = (data) => {
  const grouped = { L: [], M: [], H: [] };
  data.forEach(d => {
    if (grouped[d.Type]) {
      grouped[d.Type].push(d);
    }
  });
  return grouped;
};

// 获取故障类型统计
export const getFaultTypeStats = (data) => {
  const stats = {
    TWF: { name: '工具磨损故障', count: 0 },
    HDF: { name: '散热故障', count: 0 },
    PWF: { name: '功率故障', count: 0 },
    OSF: { name: '过载故障', count: 0 },
    RNF: { name: '随机故障', count: 0 }
  };

  data.forEach(d => {
    if (d['TWF'] === 1) stats.TWF.count++;
    if (d['HDF'] === 1) stats.HDF.count++;
    if (d['PWF'] === 1) stats.PWF.count++;
    if (d['OSF'] === 1) stats.OSF.count++;
    if (d['RNF'] === 1) stats.RNF.count++;
  });

  return Object.entries(stats)
    .filter(([_, v]) => v.count > 0)
    .map(([k, v]) => ({ type: k, ...v }));
};

export default {
  loadRealCSVData,
  loadFromBackend,
  getAlertsFromData,
  getStatsFromData,
  getDataByType,
  getFaultTypeStats
};
