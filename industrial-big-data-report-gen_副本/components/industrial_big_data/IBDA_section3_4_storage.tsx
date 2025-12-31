import React from 'react';
import { StudentConfig } from '../../types';
import { VMScreenshot } from './VMScreenshot';
import { generateTerminalOutput } from './contentGenerators';

export const IBDA_section3_4_storage: React.FC<{ config: StudentConfig }> = ({ config }) => {
  return (
    <div className="page text-black">
      <h2 className="text-2xl font-bold mb-6 border-b-2 border-black pb-2">三、 数据处理与存储</h2>

      <h3 className="text-xl font-bold mt-6 mb-3 text-black">3.1 数据清洗策略</h3>
      <p className="mb-4 leading-7 text-black">
        针对原始数据中可能存在的缺失值和异常值，采用以下策略：
        1. 剔除 RNF (随机故障) 标记为 1 但其他传感器数值正常的噪声数据。
        2. 针对 {config.personalizedData.customField} 字段进行归一化处理。
        3. 将 Type 字段 (L/M/H) 转换为 One-Hot 编码以便于计算。
      </p>

      <h3 className="text-xl font-bold mt-6 mb-3 text-black">3.2 数据库选型与设计</h3>
      <p className="mb-4 leading-7 text-black">
        考虑到工业数据的高吞吐量特性，本项目选用 <strong>{config.techStack.database}</strong> 作为核心存储引擎。
        {config.techStack.database === 'HBase' 
          ? `RowKey 设计采用 "${config.techStack.rowKeyDesign}" 结构，以避免 Region 热点问题。`
          : `集合设计采用文档模型，利用复合索引优化查询效率。`}
      </p>

      <h3 className="text-xl font-bold mt-6 mb-3 text-black">3.3 存储操作实录</h3>
      <VMScreenshot
        title="CentOS 7 - Database Node - VMware Workstation"
        command={config.techStack.database === 'HBase' ? "hbase shell" : "mongo"}
        output={generateTerminalOutput(config, 'db')}
      />

      <h3 className="text-xl font-bold mt-6 mb-3 text-black">3.4 离线计算 (MapReduce)</h3>
      <p className="mb-2 text-black">编写 {config.techStack.mapReduceAlgorithm} 任务统计各类型设备的平均故障间隔时间(MTBF)。</p>
      <VMScreenshot
        title="CentOS 7 - Compute Node - VMware Workstation"
        command={`hadoop jar mtbf_calc.jar ${config.techStack.mapReduceAlgorithm} /input /output`}
        output={generateTerminalOutput(config, 'mapreduce')}
      />
    </div>
  );
};