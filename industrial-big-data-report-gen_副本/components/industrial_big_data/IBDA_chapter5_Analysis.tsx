import React from 'react';
import { StudentConfig } from '../../types';
import { VMScreenshot } from './VMScreenshot';
import { genMRBuild } from './terminalGenerators';

export const IBDA_chapter5_Analysis: React.FC<{ config: StudentConfig }> = ({ config }) => {
  return (
    <div className="page text-black">
      <h2 className="text-2xl font-bold mb-6 border-b-2 border-black pb-2">五、 数据分析 (MapReduce)</h2>
      
      <h3 className="text-xl font-bold mt-4 mb-2">5.1 算法设计</h3>
      <p>采用 MapReduce 框架编写 <code>{config.techStack.mapReduceAlgorithm}</code> 程序，旨在统计不同工况下的故障分布情况。</p>

      <h3 className="text-xl font-bold mt-4 mb-2">5.2 代码编译与打包</h3>
      <p>使用 JDK 对 Java 源码进行编译，并打包为 JAR 文件。</p>
      <VMScreenshot theme={config.visualTheme.terminal} title="MR Build" command="javac & jar" output={genMRBuild(config)} />

      <h3 className="text-xl font-bold mt-4 mb-2">5.3 作业提交与执行</h3>
      <p>提交 Jar 包至 Yarn 集群运行。</p>
      <VMScreenshot theme={config.visualTheme.terminal} title="MR Run" 
        command={`hadoop jar ${config.techStack.mapReduceAlgorithm}.jar driver /clean_input /output_mr`} 
        output={`INFO mapreduce.Job: map 100% reduce 100%\nJob job_162234_001 completed successfully.`} 
      />

      <h3 className="text-xl font-bold mt-4 mb-2">5.4 分析结果输出</h3>
      <p>查看 HDFS 上的统计结果。</p>
      <VMScreenshot theme={config.visualTheme.terminal} title="MR Output" 
        command={`hdfs dfs -cat /output_mr/part-r-00000`} 
        output={`L_Type_Fault\t235\nM_Type_Fault\t83\nH_Type_Fault\t21\n${config.analysisFocus.topFaultTypes[0]}\t${config.personalizedData.addedRecords > 650 ? '135' : '110'}`} 
      />
    </div>
  );
};