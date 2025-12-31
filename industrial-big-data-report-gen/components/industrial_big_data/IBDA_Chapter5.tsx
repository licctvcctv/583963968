import React from 'react';
import { StudentConfig } from '../../types';
import { UbuntuTerminal, KaliTerminal, XShellTerminal, LinuxTerminal } from './Terminals';

const textAssets = {
  1: { // Zhang: MR
    design: `为了对 HBase 中的数据进行离线分析，我基于 Hadoop MapReduce 框架编写了 Java 程序。
核心类：\`FaultCountMapper\`。
逻辑：
1. **InputFormat**：使用 \`TableInputFormat\` 直接读取 HBase 表 \`uci_industrial_device\`。
2. **Mapper**：
   - 从 Result 对象中提取 \`fault_info:HDF\` 等故障列。
   - 如果某故障列值为 '1'，则 Context.write(new Text("HDF"), new IntWritable(1))。
   - 同时统计 \`basic_info:Type\`，输出 Type 与故障的组合键。
3. **Reducer**：标准的 SumReducer，对相同 Key 的计数进行累加。
4. **OutputFormat**：将结果写入 HDFS 的 \`/output/zhangming/fault_stats\` 目录。`,
    exec: `编译与运行步骤：
1. 配置 Classpath：\`export HADOOP_CLASSPATH=$(hbase mapredcp):$HADOOP_CLASSPATH\`。
2. 编译：\`javac -cp $HADOOP_CLASSPATH FaultCount.java\`。
3. 打包：\`jar -cvf fault_count.jar FaultCount*.class\`。
4. 提交：\`hadoop jar fault_count.jar FaultCount\`。`,
    result: `作业耗时 45 秒。
查看结果文件，发现 HDF（散热故障）计数为 135（含增量数据），远高于其他故障。这验证了散热系统是产线最薄弱的环节。`
  },
  2: { // Li: MR
    design: `针对 CSV 文本数据编写 MapReduce。
算法：\`TypeFailureReducer\`。
Mapper 逻辑：
- 解析 CSV 行。
- Key: \`Load_Level\` (Low/Medium/High)。
- Value: \`1\` (如果 Machine failure == 1)。
Reducer 逻辑：
- 统计每个负载等级下的故障总数。
- 计算故障率 = 故障数 / 总样本数（需在 Cleanup 阶段计算）。`,
    exec: `1. 编译 Java 代码。
2. 打成 Jar 包：\`analysis.jar\`。
3. 运行：\`hadoop jar analysis.jar com.lihua.LoadAnalysis /bigdata/uci/processed /output/load_analysis\`。`,
    result: `High Load 下的故障率为 5.8%，显著高于 Low Load 的 1.2%。说明高负载运行是导致设备损坏的主要原因。`
  },
  3: { // Wang: Mongo Aggregation (simulated as MR concept or actual MR)
    design: `虽然 MongoDB 支持 MapReduce，但官方推荐使用 Aggregation Pipeline 处理此类统计任务，效率更高。本次实验为了符合 Hadoop 要求，使用了 MongoDB Connector for Hadoop。
Mapper：
- 读取 BSON 文档。
- 提取 \`Temperature_Risk\` 字段。
- 提取 \`Machine_failure\`。
- 输出 <Risk_Level, Failure_Flag>。
Reducer：
- 统计不同风险等级下的故障次数。`,
    exec: `提交 Hadoop 作业，指定 MongoInputFormat。
命令参数繁多，需指定 mongo.input.uri。`,
    result: `High Risk (温差>15K) 的设备中，故障发生率高达 12%，验证了温差作为预测指标的有效性。`
  },
  4: { // Zhao: Mongo/MR
    design: `我用 Java 写了个简单的 WordCount 改版。
把每一行的故障类型（TWF, HDF...）读出来，只要是 1，就输出一个 <故障名, 1>。
虽然简单，但是能算出哪种病最常见。
另外我还算了一下 Efficiency_Score 的平均分，看看好机器和坏机器分差多少。`,
    exec: `javac 编译，jar 打包。
扔到集群上跑。看着进度条走完。`,
    result: `跑出来的结果：PWF（电力故障）有 110 次，HDF 有 130 次。
看样子电力不稳也是个大问题。`
  }
};

export const IBDA_Chapter5: React.FC<{ config: StudentConfig }> = ({ config }) => {
  const content = textAssets[config.id];

  const renderCompileTerminal = () => {
     switch(config.id) {
         case 1: return <KaliTerminal user="zhangming" host="kali" cwd="~/code" command="javac -cp ... FaultCount.java" output="" caption="图 5-1 编译 MapReduce 代码" />;
         case 2: return <LinuxTerminal user="lihua" host="server" cwd="~/workspace" command="ant build" output="Buildfile: build.xml ... BUILD SUCCESSFUL" caption="图 5-1 使用 Ant 构建项目" />;
         case 3: return <UbuntuTerminal user="wangfang" host="ubuntu" cwd="~/dev" command="mvn package" output="[INFO] Building jar: /home/wangfang/dev/target/mongo-mr.jar" caption="图 5-1 Maven 打包" />;
         case 4: return <XShellTerminal user="zhaoqiang" host="cluster-node1" cwd="~/code" command="javac *.java" output="" caption="图 5-1 编译代码" />;
     }
  }

  const renderRunTerminal = () => {
      switch(config.id) {
          case 1: return <XShellTerminal user="zhangming" host="hadoop-master" cwd="~" command="hadoop jar fault_count.jar ..." output="Map 100% Reduce 100%" caption="图 5-2 作业执行监控" />;
          case 2: return <LinuxTerminal user="lihua" host="server" cwd="~" command="hadoop jar analysis.jar ..." output="Job job_1622 completed." caption="图 5-2 Hadoop 运行日志" />;
          case 3: return <UbuntuTerminal user="wangfang" host="ubuntu" cwd="~" command="hadoop jar mongo-mr.jar ..." output="INFO mapreduce.Job: Job job_local123 completed" caption="图 5-2 提交任务" />;
          case 4: return <KaliTerminal user="zhaoqiang" host="kali" cwd="~" command="hadoop jar myjob.jar ..." output="Succeeded" caption="图 5-2 运行成功" />;
      }
  }

  return (
    <div className="page text-black">
      <h2 className="text-2xl font-bold mb-6 border-b-2 border-black pb-2">五、 数据分析 (MapReduce)</h2>

      <h3 className="text-xl font-bold mt-4 mb-2">5.1 算法设计思路</h3>
      <p className="mb-2 text-justify indent-8 leading-7 whitespace-pre-line">{content.design}</p>

      <h3 className="text-xl font-bold mt-4 mb-2">5.2 代码编译与打包</h3>
      <p className="mb-2 text-justify indent-8 leading-7 whitespace-pre-line">{content.exec}</p>
      {renderCompileTerminal()}

      <h3 className="text-xl font-bold mt-4 mb-2">5.3 作业提交与结果</h3>
      <p className="mb-2 text-justify indent-8 leading-7 whitespace-pre-line">{content.result}</p>
      {renderRunTerminal()}
    </div>
  );
};