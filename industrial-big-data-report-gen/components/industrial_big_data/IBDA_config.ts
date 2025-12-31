import { StudentConfig, BaseStats } from '../../types';

export const BASE_STATS: BaseStats = {
  totalRecords: 10000,
  typeDistribution: { L: 6000, M: 2997, H: 1003 },
  totalFailures: 339,
  failureRate: 3.39,
  faultCounts: { TWF: 46, HDF: 115, PWF: 95, OSF: 98, RNF: 19 },
  avgByType: {
    L: { temp: 300.02, rpm: 1539, torque: 40.00, failureRate: 3.92 },
    M: { temp: 300.03, rpm: 1538, torque: 40.02, failureRate: 2.77 },
    H: { temp: 299.87, rpm: 1538, torque: 39.84, failureRate: 2.09 }
  }
};

export const STUDENTS: Record<number, StudentConfig> = {
  1: {
    id: 1, name: "张明", studentId: "20240101", className: "大数据2101",
    personalizedData: {
      customField: "Maintenance_Cycle", addedRecords: 600, udiRange: [10001, 10600],
      customFieldLogic: "根据设备类型分配维护周期：L型设备30天、M型设备45天、H型设备60天。"
    },
    analysisFocus: {
      focusArea: "散热系统故障(HDF)分析", topFaultTypes: ["HDF", "OSF", "PWF"],
      insightType: "温度与转速的非线性关系"
    },
    techStack: { 
      database: 'HBase', tableName: 'uci_industrial_device', 
      rowKeyDesign: "UDI-Type", mapReduceAlgorithm: "WordCount故障统计" 
    },
    visualTheme: { terminal: 'kali', chartColors: ['#e74c3c', '#f39c12', '#3498db'] },
    terminalConfig: { user: 'zhangming', host: 'kali', path: '~/data', promptChar: '$' },
    writingStyle: 'detailed'
  },
  2: {
    id: 2, name: "李华", studentId: "20240102", className: "大数据2102",
    personalizedData: {
      customField: "Load_Level", addedRecords: 700, udiRange: [10601, 11300],
      customFieldLogic: "根据扭矩值划分负载等级：≤30Nm为轻负载，30-50Nm为中负载，>50Nm为重负载。"
    },
    analysisFocus: {
      focusArea: "负载与故障关联", topFaultTypes: ["HDF", "PWF", "OSF"],
      insightType: "高负载下的电力失效模式"
    },
    techStack: { 
      database: 'HBase', tableName: 'industrial_maintenance', 
      rowKeyDesign: "Type-UDI", mapReduceAlgorithm: "负载聚合分析" 
    },
    visualTheme: { terminal: 'putty', chartColors: ['#0088FE', '#00C49F', '#FFBB28'] },
    terminalConfig: { user: 'lihua', host: 'server', path: '/home/lihua', promptChar: '#' },
    writingStyle: 'concise'
  },
  3: {
    id: 3, name: "王芳", studentId: "20240103", className: "大数据2101",
    personalizedData: {
      customField: "Temperature_Risk", addedRecords: 650, udiRange: [11301, 11950],
      customFieldLogic: "温差<10K为低风险，10-15K为中风险，>15K为高风险。"
    },
    analysisFocus: {
      focusArea: "温度风险与故障预测", topFaultTypes: ["OSF", "PWF", "HDF"],
      insightType: "温差对加工精度的影响"
    },
    techStack: { 
      database: 'MongoDB', tableName: 'device_collection', 
      rowKeyDesign: "UDI", mapReduceAlgorithm: "温度序列异常检测" 
    },
    visualTheme: { terminal: 'ubuntu', chartColors: ['#ff7300', '#387908', '#38abc8'] },
    terminalConfig: { user: 'wangfang', host: 'ubuntu', path: '~', promptChar: '$' },
    writingStyle: 'technical'
  },
  4: {
    id: 4, name: "赵强", studentId: "20240104", className: "大数据2103",
    personalizedData: {
      customField: "Efficiency_Score", addedRecords: 800, udiRange: [11951, 12750],
      customFieldLogic: "综合转速、扭矩和温度计算效率评分。"
    },
    analysisFocus: {
      focusArea: "多因素综合分析", topFaultTypes: ["PWF", "HDF", "OSF"],
      insightType: "L型设备的优化空间最大"
    },
    techStack: { 
      database: 'MongoDB', tableName: 'industrial_monitor', 
      rowKeyDesign: "Type+UDI", mapReduceAlgorithm: "多变量相关性分析" 
    },
    visualTheme: { terminal: 'macos', chartColors: ['#413ea0', '#ff0000', '#00ff00'] },
    terminalConfig: { user: 'zhaoqiang', host: 'cluster-node1', path: '~/code', promptChar: '$' },
    writingStyle: 'practical'
  }
};