import React from 'react';
import { StudentConfig } from '../../types';
import { VMScreenshot } from './VMScreenshot';

export const IBDA_section2_data_prep: React.FC<{ config: StudentConfig }> = ({ config }) => {
  return (
    <div className="page text-black">
      <h2 className="text-2xl font-bold mb-6 border-b-2 border-black pb-2">二、 数据准备</h2>

      <h3 className="text-xl font-bold mt-6 mb-3 text-black">2.1 数据集来源</h3>
      <p className="mb-4 leading-7 text-justify text-black">
        本次实验使用 AI4I 2020 预测性维护数据集。该数据集包含 10000 条真实记录，
        涵盖空气温度、工艺温度、转速、扭矩、刀具磨损等关键指标。
        此外，为模拟实时数据流，额外生成了 {config.personalizedData.addedRecords} 条模拟数据
        （UDI 范围: {config.personalizedData.udiRange[0]}-{config.personalizedData.udiRange[1]}）。
      </p>

      <h3 className="text-xl font-bold mt-6 mb-3 text-black">2.2 字段定义</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-400 text-sm text-black">
          <thead className="bg-gray-100 border-b border-black">
            <tr><th className="border border-gray-400 p-2 text-black">字段名</th><th className="border border-gray-400 p-2 text-black">描述</th><th className="border border-gray-400 p-2 text-black">单位/类型</th></tr>
          </thead>
          <tbody>
            <tr><td className="border border-gray-400 p-2">UDI</td><td className="border border-gray-400 p-2">唯一标识符</td><td className="border border-gray-400 p-2">Integer</td></tr>
            <tr><td className="border border-gray-400 p-2">Product ID</td><td className="border border-gray-400 p-2">产品编号</td><td className="border border-gray-400 p-2">String</td></tr>
            <tr><td className="border border-gray-400 p-2">Type</td><td className="border border-gray-400 p-2">质量等级 (L/M/H)</td><td className="border border-gray-400 p-2">Char</td></tr>
            <tr><td className="border border-gray-400 p-2 font-bold bg-gray-50 text-black">{config.personalizedData.customField}</td><td className="border border-gray-400 p-2 font-bold bg-gray-50 text-black">衍生特征 ({config.personalizedData.customFieldLogic})</td><td className="border border-gray-400 p-2 text-black">Float</td></tr>
          </tbody>
        </table>
      </div>

      <h3 className="text-xl font-bold mt-6 mb-3 text-black">2.3 数据上传至 HDFS</h3>
      <p className="mb-2 text-black">使用 HDFS shell 命令将预处理后的 CSV 文件上传至分布式文件系统。</p>
      <VMScreenshot
        title="CentOS 7 - NameNode - VMware Workstation"
        command={`hdfs dfs -put ai4i2020_v2.csv /user/${config.studentId}/input/`}
        output={`2024-05-20 10:00:01 INFO fs.FSInputChecker: Found 10600 records
Upload success: /user/${config.studentId}/input/ai4i2020_v2.csv (1.2 MB)`}
      />
    </div>
  );
};