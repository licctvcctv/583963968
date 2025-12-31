// 真实数据基准（基于ai4i2020数据集）
// 原始UCI数据集：10000条，这是所有学生的共同基础
export const BASE_STATS = {
  uciRecords: 10000,  // UCI原始数据集条数
  features: 8,
  typeDistribution: { L: 6000, M: 3000, H: 1000 },
  totalFailures: 339,
  failureRate: 3.39,
  faultCounts: { TWF: 46, HDF: 115, PWF: 95, OSF: 83, RNF: 0 },
  avgByType: {
    L: { temp: 299.8, rpm: 1502, torque: 40.1, failureRate: 3.4 },
    M: { temp: 300.1, rpm: 1478, torque: 40.3, failureRate: 3.2 },
    H: { temp: 300.3, rpm: 1518, torque: 39.9, failureRate: 3.5 }
  }
};

// 每个学生独特的终端输出样本数据
export const STUDENT_SAMPLE_DATA = {
  1: {
    headSample: `   UDI Product ID Type  Air temperature [K]  Process temperature [K]  Rotational speed [rpm]  Torque [Nm]  Tool wear [min]  Machine failure
      1     M14874    M                298.1                    308.6                    1558         42.8               0                0
      2     L50690    L                298.7                    308.8                    1422         21.1              33                0
      3     M11078    M                298.8                    309.0                    1490         34.0              27                0
      4     L83721    L                298.6                    308.7                    1439         41.1              19                0`,
    faultOutput: `HDF	115
PWF	95
OSF	83
TWF	46
RNF	0`,
    totalRecords: 10050,
    cleanedRecords: 9938,
    udiStart: 1,
    udiEnd: 10050,
    addedRecords: 50
  },
  2: {
    headSample: `   UDI Product ID Type  Air temperature [K]  Process temperature [K]  Rotational speed [rpm]  Torque [Nm]  Tool wear [min]  Machine failure
  10051     M14622    M                298.4                    308.9                    1454         28.6               0                0
  10052     L59479    L                298.7                    308.7                    1438         20.8              58                0
  10053     M18672    M                298.5                    308.6                    1496         41.4              12                0
  10054     M25499    M                298.9                    309.2                    1409         21.8              45                0`,
    faultOutput: `HDF	118
PWF	98
OSF	86
TWF	48
RNF	0`,
    totalRecords: 10100,
    cleanedRecords: 9988,
    udiStart: 1,
    udiEnd: 10100,
    addedRecords: 100
  },
  3: {
    headSample: `   UDI Product ID Type  Air temperature [K]  Process temperature [K]  Rotational speed [rpm]  Torque [Nm]  Tool wear [min]  Machine failure
  10101     M21707    M                298.6                    308.9                    1478         32.7               0                0
  10102     M66035    M                298.5                    308.7                    1512         36.6               8                0
  10103     M21714    M                298.8                    309.1                    1396         31.7              13                0
  10104     L86496    L                298.7                    308.7                    1505         37.7              0                0`,
    faultOutput: `HDF	121
PWF	101
OSF	89
TWF	50
RNF	0`,
    totalRecords: 10150,
    cleanedRecords: 10038,
    udiStart: 1,
    udiEnd: 10150,
    addedRecords: 150
  },
  4: {
    headSample: `   UDI Product ID Type  Air temperature [K]  Process temperature [K]  Rotational speed [rpm]  Torque [Nm]  Tool wear [min]  Machine failure
  10151     M16628    M                298.6                    308.7                    1493         30.9               0                0
  10152     L84331    L                298.8                    308.9                    1445         24.4              48                0
  10153     M66835    M                298.5                    308.6                    1538         40.7               3                0
  10154     M86062    M                298.7                    308.9                    1474         35.0               0                0`,
    faultOutput: `HDF	124
PWF	104
OSF	92
TWF	52
RNF	0`,
    totalRecords: 10200,
    cleanedRecords: 10088,
    udiStart: 1,
    udiEnd: 10200,
    addedRecords: 200
  }
};

export interface StudentConfig {
  id: number;
  name: string;
  studentId: string;
  className: string;
  personalizedData: {
    customField: string;
    addedRecords: number;
    udiRange: [number, number];
    customFieldLogic: string;
  };
  analysisFocus: {
    focusArea: string;
    topFaultTypes: string[];
    insightType: string;
  };
  techStack: {
    database: 'HBase' | 'MongoDB';
    tableName: string;
    rowKeyDesign: string;
    mapReduceAlgorithm: string;
  };
  visualTheme: {
    terminal: 'ubuntu' | 'putty' | 'kali' | 'macos';
    chartColors: string[];
  };
  terminalConfig: {
    user: string;
    host: string;
    path: string;
    promptChar: string;
  };
  writingStyle: 'detailed' | 'concise' | 'technical' | 'practical';
}

export const STUDENT_CONFIGS: Record<number, StudentConfig> = {
  1: {
    id: 1,
    name: '张明',
    studentId: '20240101',
    className: '2024级计算机科学与技术1班',
    personalizedData: {
      customField: 'Maintenance_Cycle (维护周期，单位：天)',
      addedRecords: 50,
      udiRange: [10001, 10050],
      customFieldLogic: '根据设备类型分配维护周期：L型设备30天、M型设备45天、H型设备60天'
    },
    analysisFocus: {
      focusArea: '散热系统故障分析',
      topFaultTypes: ['HDF', 'OSF', 'PWF'],
      insightType: '温度与散热故障关联分析'
    },
    techStack: {
      database: 'HBase',
      tableName: 'uci_industrial_device',
      rowKeyDesign: 'UDI-Type（确保唯一性，便于按设备查询）',
      mapReduceAlgorithm: '故障类型统计WordCount算法'
    },
    visualTheme: {
      terminal: 'kali',
      chartColors: ['#e74c3c', '#f39c12', '#3498db']
    },
    terminalConfig: {
      user: 'zhangming',
      host: 'kali',
      path: '~/data',
      promptChar: '$'
    },
    writingStyle: 'detailed'
  },
  2: {
    id: 2,
    name: '李华',
    studentId: '20240102',
    className: '2024级计算机科学与技术2班',
    personalizedData: {
      customField: 'Load_Level (负载等级：轻/中/重)',
      addedRecords: 100,
      udiRange: [10051, 10100],
      customFieldLogic: '根据扭矩值划分：≤30Nm为轻负载，30-50Nm为中负载，>50Nm为重负载'
    },
    analysisFocus: {
      focusArea: '负载与故障关联分析',
      topFaultTypes: ['HDF', 'PWF', 'OSF'],
      insightType: '高负载条件下故障模式研究'
    },
    techStack: {
      database: 'HBase',
      tableName: 'industrial_maintenance',
      rowKeyDesign: 'Type-UDI（便于按设备类型扫描）',
      mapReduceAlgorithm: '设备参数聚合分析'
    },
    visualTheme: {
      terminal: 'putty',
      chartColors: ['#0088FE', '#00C49F', '#FFBB28']
    },
    terminalConfig: {
      user: 'lihua',
      host: 'server',
      path: '/home/lihua',
      promptChar: '#'
    },
    writingStyle: 'concise'
  },
  3: {
    id: 3,
    name: '王芳',
    studentId: '20240103',
    className: '2024级计算机科学与技术3班',
    personalizedData: {
      customField: 'Temperature_Risk (温度风险等级：低/中/高)',
      addedRecords: 150,
      udiRange: [10101, 10150],
      customFieldLogic: '根据空气温度和工艺温度差值划分：温差<10K为低风险，10-15K为中风险，>15K为高风险'
    },
    analysisFocus: {
      focusArea: '温度风险与故障预测',
      topFaultTypes: ['OSF', 'PWF', 'HDF'],
      insightType: '温度异常对设备稳定性影响'
    },
    techStack: {
      database: 'MongoDB',
      tableName: 'device_collection',
      rowKeyDesign: 'UDI（文档主键）',
      mapReduceAlgorithm: '温度序列异常检测'
    },
    visualTheme: {
      terminal: 'ubuntu',
      chartColors: ['#ff7300', '#387908', '#38abc8']
    },
    terminalConfig: {
      user: 'wangfang',
      host: 'ubuntu',
      path: '~',
      promptChar: '$'
    },
    writingStyle: 'technical'
  },
  4: {
    id: 4,
    name: '赵强',
    studentId: '20240104',
    className: '2024级计算机科学与技术4班',
    personalizedData: {
      customField: 'Efficiency_Score (效率评分：0-100)',
      addedRecords: 200,
      udiRange: [10151, 10200],
      customFieldLogic: '综合转速、扭矩和温度计算效率：Score = (转速/2886 × 0.4 + 扭矩/76.6 × 0.4 + (310-工艺温度)/5 × 0.2) × 100'
    },
    analysisFocus: {
      focusArea: '多因素综合分析',
      topFaultTypes: ['PWF', 'HDF', 'OSF'],
      insightType: '综合参数对设备性能影响评估'
    },
    techStack: {
      database: 'MongoDB',
      tableName: 'industrial_monitor',
      rowKeyDesign: '复合键：Type+UDI（支持多维度查询）',
      mapReduceAlgorithm: '多变量相关性分析'
    },
    visualTheme: {
      terminal: 'macos',
      chartColors: ['#413ea0', '#ff0000', '#00ff00']
    },
    terminalConfig: {
      user: 'zhaoqiang',
      host: 'cluster-node1',
      path: '~/code',
      promptChar: '$'
    },
    writingStyle: 'practical'
  }
};
