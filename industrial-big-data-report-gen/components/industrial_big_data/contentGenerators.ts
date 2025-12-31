import { StudentConfig, BaseStats } from '../../types';

export const generateOverview = (config: StudentConfig): string => {
  const mapping = {
    detailed: `本报告旨在深入探讨工业4.0背景下，利用大数据技术对大规模工业设备传感器数据进行全流程处理与分析的方法。`,
    concise: `本作业针对工业设备预测性维护场景，完成了从数据清洗、存储到挖掘分析的全链路实现。`,
    technical: `基于 ai4i2020 数据集，本项目构建了一个包含 ${config.techStack.database} 存储层和 MapReduce 计算层的大数据处理架构。`,
    practical: `为了解决工厂设备非计划停机问题，本研究通过分析10000+条真实设备运行数据，提出了一套切实可行的故障预警方案。`
  };
  return mapping[config.writingStyle];
};

export const generateTerminalOutput = (config: StudentConfig, type: 'db' | 'mapreduce'): string => {
  if (type === 'db') {
    if (config.techStack.database === 'HBase') {
      return `hbase(main):001:0> create 'industrial_data', 'sensor', 'status'
0 row(s) in 2.4150 seconds

=> Hbase::Table - industrial_data
hbase(main):002:0> put 'industrial_data', '${config.techStack.rowKeyDesign}-001', 'sensor:temp', '298.1'
0 row(s) in 0.0890 seconds`;
    } else {
      return `> use industrial_db
switched to db industrial_db
> db.createCollection("device_logs")
{ "ok" : 1 }
> db.device_logs.insert({ "udi": 1, "type": "M", "air_temp": 298.1, "process_temp": 308.6 })
WriteResult({ "nInserted" : 1 })`;
    }
  }
  return `[${config.studentId}@hadoop-master ~]$ mapred streaming \\
  -input /input/ai4i2020.csv \\
  -output /output/${config.analysisFocus.focusArea.split(' ')[0]}_result \\
  -mapper ${config.techStack.mapReduceAlgorithm}_Mapper.py \\
  -reducer ${config.techStack.mapReduceAlgorithm}_Reducer.py
...
INFO mapreduce.Job: Job job_1623456789_0001 completed successfully`;
};

export const generateAnalysisText = (config: StudentConfig, stats: BaseStats): string => {
  const { topFaultTypes, focusArea } = config.analysisFocus;
  const highestFault = topFaultTypes[0];
  const count = stats.faultCounts[highestFault];
  
  return `分析结果显示，${focusArea}是影响产线稳定性的关键。在所有故障类型中，${highestFault}（${getFaultName(highestFault)}）发生频率最高，达到 ${count} 次。这与${config.writingStyle === 'technical' ? '设备热力学特性' : '日常维护记录'}高度吻合。建议针对此类故障调整${config.personalizedData.customField}阈值。`;
};

const getFaultName = (code: string) => {
  const names: any = { HDF: "散热系统故障", OSF: "过载故障", PWF: "电力故障", TWF: "刀具磨损", RNF: "随机故障" };
  return names[code] || "未知故障";
};