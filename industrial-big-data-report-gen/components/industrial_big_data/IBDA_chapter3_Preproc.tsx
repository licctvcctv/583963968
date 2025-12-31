import React from 'react';
import { StudentConfig } from '../../types';
import { VMScreenshot } from './VMScreenshot';
import { genPreprocCmd } from './terminalGenerators';

export const IBDA_chapter3_Preproc: React.FC<{ config: StudentConfig }> = ({ config }) => {
  return (
    <div className="page text-black">
      <h2 className="text-2xl font-bold mb-6 border-b-2 border-black pb-2">三、 数据预处理</h2>
      
      <h3 className="text-xl font-bold mt-4 mb-2">3.1 预处理工具与方法</h3>
      <p>本项目严格遵循实验要求，不使用 Pandas，而是利用 Linux 管道符结合 <code>awk</code> (过滤异常值)、<code>grep</code> (剔除空值)、<code>sed</code> (格式转换) 进行清洗。</p>

      <h3 className="text-xl font-bold mt-4 mb-2">3.2 核心清洗操作</h3>
      <ul className="list-disc pl-6 mb-2">
        <li>异常值过滤：保留 Air Temp 在 290-320K 之间的数据。</li>
        <li>空值剔除：删除包含空字段的无效行。</li>
        <li>格式统一：将 Product ID 统一转换为大写。</li>
      </ul>
      <div className="text-center text-sm font-bold my-2">图 3-1 核心预处理命令执行</div>
      <VMScreenshot 
        theme={config.visualTheme.terminal} title="Terminal - Preprocessing"
        command={genPreprocCmd(config).split('\n')[0]} 
        output=""
      />

      <h3 className="text-xl font-bold mt-4 mb-2">3.3 结果验证与保存</h3>
      <p>清洗完成后，使用 <code>wc -l</code> 统计有效数据行数，确保数据质量。</p>
      <div className="text-center text-sm font-bold my-2">图 3-2 预处理结果验证</div>
      <VMScreenshot 
        theme={config.visualTheme.terminal} title="Terminal - Verify Count"
        command={`wc -l cleaned_ai4i2020.csv`}
        output={`${10000 + config.personalizedData.addedRecords - 15} cleaned_ai4i2020.csv`}
      />
      <div className="text-center text-sm font-bold my-2">图 3-3 上传清洗后的数据</div>
      <VMScreenshot 
        theme={config.visualTheme.terminal} title="Terminal - Final Upload"
        command={`hdfs dfs -put cleaned_ai4i2020.csv /user/${config.studentId}/clean_input/`}
        output={`Upload success.`}
      />
    </div>
  );
};