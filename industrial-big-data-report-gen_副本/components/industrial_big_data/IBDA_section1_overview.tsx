import React from 'react';
import { StudentConfig } from '../../types';
import { generateOverview } from './contentGenerators';

export const IBDA_section1_overview: React.FC<{ config: StudentConfig }> = ({ config }) => {
  return (
    <div className="page text-black">
      <h2 className="text-2xl font-bold mb-6 border-b-2 border-black pb-2">一、 作业概述</h2>
      
      <h3 className="text-xl font-bold mt-6 mb-3 text-black">1.1 实验背景</h3>
      <p className="mb-4 leading-7 text-justify indent-8 text-black">
        随着工业互联网的快速发展，设备运行产生的时序数据呈现爆发式增长。
        {generateOverview(config)} 
        本次大作业选取了真实的铣床加工数据集（ai4i2020），模拟真实的工业生产环境，旨在通过大数据技术解决设备故障预测滞后、维护成本高昂等痛点问题。
      </p>

      <h3 className="text-xl font-bold mt-6 mb-3 text-black">1.2 实验目标</h3>
      <ul className="list-disc pl-10 space-y-2 leading-7 text-black">
        <li>掌握 Linux 环境下 Hadoop 生态系统（HDFS, HBase/MongoDB）的部署与应用。</li>
        <li>利用 MapReduce/Spark 框架对 {config.personalizedData.addedRecords + 10000} 条工业数据进行清洗与特征提取。</li>
        <li>重点针对 <strong>{config.analysisFocus.focusArea}</strong> 进行深度挖掘。</li>
        <li>实现数据可视化大屏展示，为决策提供 {config.writingStyle === 'technical' ? '量化依据' : '直观参考'}。</li>
      </ul>

      <h3 className="text-xl font-bold mt-6 mb-3 text-black">1.3 技术架构</h3>
      <p className="mb-4 leading-7 text-justify indent-8 text-black">
        本项目采用典型的 Lambda 架构变体。数据源层为 CSV 格式传感器日志；
        存储层选用 {config.techStack.database} 进行非结构化/半结构化存储；
        计算层设计了专用的 {config.techStack.mapReduceAlgorithm} 算法；
        最终通过 Python 数据可视化库展示结果。
      </p>
    </div>
  );
};