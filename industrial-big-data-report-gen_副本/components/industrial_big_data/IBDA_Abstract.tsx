import React from 'react';
import { StudentConfig } from '../../types';

export const IBDA_Abstract: React.FC<{ config: StudentConfig }> = ({ config }) => {
  return (
    <div className="page text-black">
      <div className="text-center mb-10">
        <h2 className="text-2xl font-bold mb-4">摘要</h2>
      </div>
      <p className="indent-8 leading-8 mb-8 text-justify">
        工业大数据的分析与应用是实现智能制造的关键环节。针对传统设备维护成本高、故障预测难的问题，
        本文基于 Hadoop 生态系统构建了预测性维护数据分析平台。以 UCI AI4I 2020 铣床加工数据集为基础，
        结合学生个性化的 {config.personalizedData.addedRecords} 条增量数据，完成了从数据采集、清洗、
        存储到挖掘可视化的全流程实践。
      </p>
      <p className="indent-8 leading-8 mb-8 text-justify">
        实验首先利用 Linux 文本处理工具完成数据预处理，构建了包含 {config.personalizedData.customField} 
        在内的特征工程体系；随后对比选择了 {config.techStack.database} 作为核心存储引擎，设计了 
        {config.techStack.rowKeyDesign === 'Composite' ? '复合键' : config.techStack.rowKeyDesign + ' 结构'} 
        优化查询性能；进而开发 {config.techStack.mapReduceAlgorithm} 算法统计故障分布。
        分析结果表明，{config.analysisFocus.topFaultTypes[0]} 是影响设备稳定性的首要因素，
        尤其是 {config.analysisFocus.insightType}。
      </p>
      
      <div className="font-bold mb-10">
        关键词：<span className="font-normal">工业大数据；Hadoop；{config.techStack.database}；MapReduce；预测性维护</span>
      </div>

      <div className="border-t border-black my-8 w-1/3 mx-auto"></div>

      <div className="text-center mb-10">
        <h2 className="text-2xl font-bold mb-4">Abstract</h2>
      </div>
      <p className="indent-8 leading-8 mb-8 text-justify">
        The analysis and application of industrial big data is a key link in realizing intelligent manufacturing. 
        Aiming at the problems of high maintenance cost and difficult failure prediction of traditional equipment, 
        this paper builds a predictive maintenance data analysis platform based on the Hadoop ecosystem. 
        Based on the UCI AI4I 2020 dataset and {config.personalizedData.addedRecords} incremental records, 
        the whole process practice from data collection, cleaning, storage to visualization is completed.
      </p>
      <p className="indent-8 leading-8 mb-8 text-justify">
        The experiment utilizes {config.techStack.database} for storage and MapReduce for large-scale calculation. 
        The results show that {config.analysisFocus.topFaultTypes[0]} is the primary factor affecting equipment stability.
      </p>
       <div className="font-bold">
        Keywords: <span className="font-normal">Industrial Big Data; Hadoop; {config.techStack.database}; Predictive Maintenance</span>
      </div>
    </div>
  );
};