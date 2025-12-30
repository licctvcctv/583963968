// Mock data generator for AI4I 2020 Predictive Maintenance Dataset
// Based on the real dataset structure with 10,000 data points

export const generateMaintenanceData = (count = 100) => {
  const data = [];
  const types = ['L', 'M', 'H'];
  const loadLevels = ['轻负载', '中负载', '重负载'];

  for (let i = 0; i < count; i++) {
    const type = types[Math.floor(Math.random() * types.length)];
    const loadLevel = loadLevels[Math.floor(Math.random() * loadLevels.length)];

    // Generate realistic values based on type
    let airTemp, processTemp, rotationalSpeed, torque;

    switch(type) {
      case 'L':
        airTemp = 298 + Math.random() * 2;
        processTemp = 308 + Math.random() * 2;
        rotationalSpeed = 1400 + Math.random() * 600;
        torque = 30 + Math.random() * 40;
        break;
      case 'M':
        airTemp = 298 + Math.random() * 2;
        processTemp = 308 + Math.random() * 2;
        rotationalSpeed = 1300 + Math.random() * 500;
        torque = 30 + Math.random() * 30;
        break;
      case 'H':
        airTemp = 298 + Math.random() * 2;
        processTemp = 308 + Math.random() * 2;
        rotationalSpeed = 1200 + Math.random() * 700;
        torque = 20 + Math.random() * 50;
        break;
    }

    const toolWear = Math.floor(Math.random() * 250);
    const maintenanceCycle = type === 'L' ? 30 : type === 'M' ? 45 : 60;

    // Calculate failure probability based on conditions
    let failureProbability = 0;
    if (toolWear > 200) failureProbability += 0.3;
    if (airTemp > 299.5) failureProbability += 0.2;
    if (torque > 60) failureProbability += 0.2;
    if (rotationalSpeed > 1800) failureProbability += 0.15;

    const machineFailure = Math.random() < failureProbability;

    data.push({
      udi: i + 1,
      productId: `${type}${Math.random().toString(36).substring(7).toUpperCase()}`,
      type,
      airTemperature: parseFloat(airTemp.toFixed(1)),
      processTemperature: parseFloat(processTemp.toFixed(1)),
      rotationalSpeed: Math.floor(rotationalSpeed),
      torque: parseFloat(torque.toFixed(1)),
      toolWear,
      machineFailure: machineFailure ? 1 : 0,
      twf: toolWear > 200 && machineFailure ? 1 : 0,
      hdf: airTemp > 299.5 && machineFailure ? 1 : 0,
      pwf: torque > 60 && machineFailure ? 1 : 0,
      osf: rotationalSpeed > 1800 && machineFailure ? 1 : 0,
      rnf: Math.random() < 0.001 && machineFailure ? 1 : 0,
      maintenanceCycle,
      loadLevel
    });
  }

  return data;
};

export const getEquipmentHealthData = () => {
  return [
    { id: 'EQ-001', name: '数控机床 CNC-01', type: 'M', healthScore: 85, status: '正常', lastMaintenance: '2024-12-20', nextMaintenance: '2025-01-20' },
    { id: 'EQ-002', name: '数控机床 CNC-02', type: 'L', healthScore: 92, status: '良好', lastMaintenance: '2024-12-22', nextMaintenance: '2025-01-22' },
    { id: 'EQ-003', name: '数控机床 CNC-03', type: 'H', healthScore: 68, status: '警告', lastMaintenance: '2024-12-10', nextMaintenance: '2025-01-10' },
    { id: 'EQ-004', name: '激光切割机 L-01', type: 'H', healthScore: 45, status: '危险', lastMaintenance: '2024-11-28', nextMaintenance: '2024-12-28' },
    { id: 'EQ-005', name: '激光切割机 L-02', type: 'M', healthScore: 78, status: '正常', lastMaintenance: '2024-12-18', nextMaintenance: '2025-01-18' },
    { id: 'EQ-006', name: '冲压机 P-01', type: 'L', healthScore: 88, status: '良好', lastMaintenance: '2024-12-25', nextMaintenance: '2025-01-25' },
    { id: 'EQ-007', name: '冲压机 P-02', type: 'M', healthScore: 55, status: '警告', lastMaintenance: '2024-12-05', nextMaintenance: '2025-01-05' },
    { id: 'EQ-008', name: '注塑机 INJ-01', type: 'H', healthScore: 72, status: '正常', lastMaintenance: '2024-12-15', nextMaintenance: '2025-01-15' },
  ];
};

export const getPredictionData = () => {
  return {
    overallAccuracy: 94.5,
    modelPerformance: [
      { model: '随机森林', accuracy: 94.5, precision: 93.2, recall: 92.8, f1Score: 93.0 },
      { model: '逻辑回归', accuracy: 89.3, precision: 87.5, recall: 86.2, f1Score: 86.8 },
      { model: '支持向量机', accuracy: 91.2, precision: 90.1, recall: 89.5, f1Score: 89.8 },
      { model: '神经网络', accuracy: 92.8, precision: 91.5, recall: 91.0, f1Score: 91.2 },
    ],
    featureImportance: [
      { feature: '刀具磨损', importance: 0.35 },
      { feature: '空气温度', importance: 0.22 },
      { feature: '扭矩', importance: 0.18 },
      { feature: '转速', importance: 0.12 },
      { feature: '工艺温度', importance: 0.08 },
      { feature: '设备类型', importance: 0.05 },
    ],
    predictions: [
      { equipment: 'CNC-01', failureProb: 0.15, predictedFailure: '无', timeframe: '>30天' },
      { equipment: 'CNC-02', failureProb: 0.08, predictedFailure: '无', timeframe: '>30天' },
      { equipment: 'CNC-03', failureProb: 0.65, predictedFailure: '散热系统', timeframe: '7-14天' },
      { equipment: 'L-01', failureProb: 0.82, predictedFailure: '刀具磨损', timeframe: '3-7天' },
      { equipment: 'L-02', failureProb: 0.25, predictedFailure: '无', timeframe: '15-30天' },
      { equipment: 'P-01', failureProb: 0.12, predictedFailure: '无', timeframe: '>30天' },
      { equipment: 'P-02', failureProb: 0.58, predictedFailure: '过载', timeframe: '7-14天' },
      { equipment: 'INJ-01', failureProb: 0.35, predictedFailure: '无', timeframe: '15-30天' },
    ]
  };
};

export const getMaintenanceSchedule = () => {
  return [
    { id: 1, equipment: '激光切割机 L-01', type: '预防性维护', priority: '紧急', scheduledDate: '2024-12-30', status: '待执行', assignedTo: '张工', estimatedDuration: 4 },
    { id: 2, equipment: 'CNC-03', type: '纠正性维护', priority: '高', scheduledDate: '2024-12-31', status: '待执行', assignedTo: '李工', estimatedDuration: 6 },
    { id: 3, equipment: 'P-02', type: '预测性维护', priority: '中', scheduledDate: '2025-01-05', status: '已安排', assignedTo: '王工', estimatedDuration: 3 },
    { id: 4, equipment: 'CNC-01', type: '预防性维护', priority: '正常', scheduledDate: '2025-01-20', status: '已安排', assignedTo: '赵工', estimatedDuration: 4 },
    { id: 5, equipment: 'INJ-01', type: '预防性维护', priority: '正常', scheduledDate: '2025-01-15', status: '计划中', assignedTo: '刘工', estimatedDuration: 5 },
    { id: 6, equipment: 'L-02', type: '检查维护', priority: '低', scheduledDate: '2025-01-22', status: '计划中', assignedTo: '张工', estimatedDuration: 2 },
  ];
};

export const getMaintenanceSuggestions = () => {
  return [
    {
      id: 1,
      equipment: '激光切割机 L-01',
      priority: '紧急',
      type: '刀具更换',
      reason: '刀具磨损已达242分钟，超过200分钟阈值，断裂风险极高',
      impact: '可能导致设备停机2-4小时，影响生产进度',
      recommendation: '立即停止使用，更换刀具并进行全面检查',
      estimatedCost: 2500,
      estimatedDowntime: 4,
      confidence: 95
    },
    {
      id: 2,
      equipment: 'CNC-03',
      priority: '高',
      type: '散热系统维护',
      reason: '空气温度持续偏高(>299.5K)，散热效率下降',
      impact: '可能导致热故障，影响加工精度',
      recommendation: '检查并清洁散热器，更换冷却液，校准温度传感器',
      estimatedCost: 1500,
      estimatedDowntime: 6,
      confidence: 88
    },
    {
      id: 3,
      equipment: 'P-02',
      priority: '中',
      type: '负载优化',
      reason: '运行在重负载状态，扭矩超过60Nm，机械磨损加快',
      impact: '预计15天后故障概率58%',
      recommendation: '调整生产计划，降低负载水平，检查传动系统',
      estimatedCost: 800,
      estimatedDowntime: 3,
      confidence: 76
    },
    {
      id: 4,
      equipment: 'INJ-01',
      priority: '正常',
      type: '定期保养',
      reason: '已运行45天，到达预防性维护周期',
      impact: '保持设备良好运行状态',
      recommendation: '按计划进行常规保养，润滑、清洁、校准',
      estimatedCost: 500,
      estimatedDowntime: 5,
      confidence: 92
    }
  ];
};

export const getStatisticsData = () => {
  return {
    totalEquipment: 8,
    healthyEquipment: 5,
    warningEquipment: 2,
    criticalEquipment: 1,
    totalMaintenance: 156,
    completedMaintenance: 142,
    pendingMaintenance: 14,
    mtbf: 245, // Mean Time Between Failures (hours)
    mttr: 4.2, // Mean Time To Repair (hours)
    availability: 98.3,
    maintenanceCost: 128500,
    failureReduction: 23
  };
};
