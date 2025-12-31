import React from 'react';
import { StudentConfig } from '../../types';
import { VMScreenshot } from './VMScreenshot';
import { ExcelScreenshot } from './ExcelScreenshot';
import { genHDFSList } from './terminalGenerators';

export const IBDA_chapter2_DataPrep: React.FC<{ config: StudentConfig }> = ({ config }) => {
  const excelData = [
    { UDI: 1, ProductID: "M14860", Type: "M", AirTemp: 298.1, ProcessTemp: 308.6, RPM: 1551, Torque: 42.8, [config.personalizedData.customField]: "..." },
    { UDI: 2, ProductID: "L47181", Type: "L", AirTemp: 298.2, ProcessTemp: 308.7, RPM: 1408, Torque: 46.3, [config.personalizedData.customField]: "..." },
    { UDI: "...", ProductID: "...", Type: "...", AirTemp: "...", ProcessTemp: "...", RPM: "...", Torque: "...", [config.personalizedData.customField]: "..." },
    { UDI: config.personalizedData.udiRange[0], ProductID: "New_001", Type: "M", AirTemp: 300.1, ProcessTemp: 310.2, RPM: 1600, Torque: 38.5, [config.personalizedData.customField]: "..." },
  ];

  return (
    <div className="page text-black">
      <h2 className="text-2xl font-bold mb-6 border-b-2 border-black pb-2">二、 数据准备</h2>
      
      <h3 className="text-xl font-bold mt-4 mb-2">2.1 数据集与个性化处理</h3>
      <p className="mb-2">本次实验使用 ai4i2020 数据集（10000条）。为增强分析深度，本人添加了自定义字段 <code>{config.personalizedData.customField}</code>，并额外生成了 {config.personalizedData.addedRecords} 条数据（UDI范围 {config.personalizedData.udiRange.join('-')}）。</p>
      <div className="text-center text-sm font-bold my-2">图 2-1 数据集预览（Excel）</div>
      <ExcelScreenshot rows={excelData} title="AI4I_2020_Prepared" />

      <h3 className="text-xl font-bold mt-4 mb-2">2.2 HDFS 上传操作</h3>
      <p>使用 <code>hdfs dfs -put</code> 命令将处理好的 CSV 文件上传至 Hadoop 集群。</p>
      <VMScreenshot 
        theme={config.visualTheme.terminal} title="Terminal - HDFS Upload"
        command={`hdfs dfs -put local_data/ai4i2020.csv /user/${config.studentId}/input/`}
        output={`2024-05-20 10:14:22 INFO fs.FSInputChecker: Found 1 block(s)
Upload successful. Time: 1.2s`}
      />

      <h3 className="text-xl font-bold mt-4 mb-2">2.3 HDFS 结果验证</h3>
      <p>通过 <code>-ls</code> 命令验证文件是否上传成功及大小是否符合预期。</p>
      <VMScreenshot 
        theme={config.visualTheme.terminal} title="Terminal - HDFS Verify"
        command={`hdfs dfs -ls /user/${config.studentId}/input/`}
        output={genHDFSList(config)}
      />
    </div>
  );
};