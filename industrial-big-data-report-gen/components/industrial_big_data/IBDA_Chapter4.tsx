import React from 'react';
import { StudentConfig } from '../../types';
import { getChapter4Text } from './assets/chapter4'; // Assume this exists (I will create it next)
import { UbuntuTerminal, KaliTerminal, XShellTerminal, LinuxTerminal } from './Terminals';

// Inline text asset for Ch4 to ensure compilation (splitting file strategy)
const textAssets = {
  1: { // Zhang: HBase
    select: `针对本实验的时序数据特性，我选择了 HBase 作为存储数据库。HBase 是一个基于 HDFS 的分布式列式数据库，具有高吞吐量、低延迟的特点，非常适合存储像传感器日志这样写入量大、读取模式固定的数据。相比于关系型数据库，HBase 的列族机制允许我们灵活地扩展字段（如后续增加新的传感器），且其基于 RowKey 的索引机制能够提供毫秒级的单点查询性能。`,
    schema: `表名：\`uci_industrial_device\`。
列族设计：
1. \`basic_info\`：存储静态信息，如 ProductID, Type, Maintenance_Cycle。
2. \`status_info\`：存储动态传感器数据，如 AirTemp, RPM, Torque。
3. \`fault_info\`：存储故障标记，如 Machine_failure, HDF, OSF。
RowKey 设计：采用 \`UDI-Type\` 的组合方式（例如 \`10001-M\`）。这种设计既保证了唯一性，又允许我们利用 HBase 的前缀扫描功能，快速获取特定 UDI 的设备记录。同时，将 Type 放在 RowKey 后半部分可以避免因 Type 分布不均导致的热点问题（Salted RowKey 的变体思路）。`,
    import: `数据导入使用 HBase 自带的 \`ImportTsv\` 工具。该工具本质上是一个 MapReduce 任务，能够将 TSV/CSV 文件直接转换为 HBase 的内部存储格式（HFile），然后通过 BulkLoad 方式加载，效率远高于逐条 Put。
命令：\`hbase org.apache.hadoop.hbase.mapreduce.ImportTsv -Dimporttsv.columns=HBASE_ROW_KEY,basic_info:PID,basic_info:Type... uci_industrial_device /user/ai4i2020/clean\`。`,
    query: `验证查询：
1. \`get 'uci_industrial_device', '10001-M'\`：获取单条记录详情。
2. \`scan 'uci_industrial_device', {LIMIT=>5}\`：扫描前5条数据，验证数据是否正确落入相应列族。
3. \`scan 'uci_industrial_device', {FILTER=>"SingleColumnValueFilter('fault_info','HDF',=,'binary:1')"}\`：查询所有发生散热故障的记录。`
  },
  2: { // Li: HBase
    select: `数据库选型：HBase。
理由：
1. 扩展性：支持 PB 级数据存储，满足工业大数据长期留存需求。
2. 稀疏性：HBase 处理稀疏数据（Sparse Data）效率高，适合某些传感器可能缺失读数的情况。
3. 生态：与 Hadoop MapReduce 无缝集成。`,
    schema: `表名：\`industrial_maintenance\`。
列族：\`d\` (data), \`f\` (failure)。采用短列族名以节省存储空间。
RowKey：\`Type-UDI\`（例如 \`L-10001\`）。
设计理由：本实验重点关注负载与故障的关联，而负载分布与 Type 高度相关。将 Type 置于 RowKey 前缀，可以实现物理上的数据聚集（Data Locality），提高按 Type 扫描的效率（Block Cache 命中率）。`,
    import: `导入方式：Shell 脚本循环 Put（适合小规模数据演示）。
虽然 BulkLoad 更快，但为了演示 HBase Shell 交互，编写了一个简单的脚本读取 CSV 并执行 Put 命令。
\`echo "put 'industrial_maintenance', 'L-10001', 'd:torque', '42.5'" | hbase shell\`。`,
    query: `查询测试：
1. 统计 L 型设备数量：\`count 'industrial_maintenance', {CACHE => 1000}\`。
2. 查找特定故障：使用 ColumnPrefixFilter 过滤故障列。`
  },
  3: { // Wang: MongoDB
    select: `技术选型：MongoDB。
优势：
1. Schema-less：无需预定义表结构，完美适配 JSON 格式的异构数据。
2. 丰富的查询语言：支持聚合管道（Aggregation Pipeline），比 HBase 的 Filter 更强大。
3. 开发效率：BSON 格式与应用程序对象映射自然。`,
    schema: `Database: \`industrial_db\`
Collection: \`device_collection\`
Document Structure: 
\`\`\`json
{
  "_id": ObjectId(...),
  "udi": 10001,
  "specs": { "product_id": "M14860", "type": "M" },
  "sensors": { "air_temp": 298.1, "rpm": 1551 ... },
  "risk_score": "High"
}
\`\`\`
索引设计：
- \`db.device_collection.createIndex({ "udi": 1 }, { unique: true })\`
- \`db.device_collection.createIndex({ "sensors.air_temp": 1 })\``,
    import: `使用 \`mongoimport\` 工具。
命令：\`mongoimport --db industrial_db --collection device_collection --type csv --file final_dataset.csv --headerline\`。
--headerline 参数自动利用首行作为键名。`,
    query: `查询验证：
1. \`db.device_collection.find({ "risk_score": "High" }).count()\`
2. \`db.device_collection.aggregate([{ $group: { _id: "$specs.type", avg_rpm: { $avg: "$sensors.rpm" } } }])\``
  },
  4: { // Zhao: MongoDB
    select: `我选了 MongoDB。
原因很简单：它存东西就像存一个个文件一样，特别灵活。而且它的查询命令跟 JavaScript 很像，好学。HBase 那个命令行太难用了。对于我们这种应用型的分析，MongoDB 足够快了。`,
    schema: `库名：\`factory_monitor\`
表名：\`industrial_monitor\`
不需要提前建表，数据导进去自动就生成了。
为了查得快，我给 \`Type\` 和 \`Machine failure\` 这两列加了索引。`,
    import: `导入最简单：
\`mongoimport -d factory_monitor -c industrial_monitor --type csv --file ai4i2020_clean.csv --headerline\`
跑完显示 "imported 10800 documents"，一下就进去了。`,
    query: `我就试了几个查数：
1. 查有多少坏机器：\`db.industrial_monitor.find({"Machine failure": 1}).count()\`
2. 查 L 型机器：\`db.industrial_monitor.find({"Type": "L"}).limit(5)\``
  }
};

export const IBDA_Chapter4: React.FC<{ config: StudentConfig }> = ({ config }) => {
  const content = textAssets[config.id];
  const db = config.techStack.database;

  const renderCreateTerminal = () => {
    switch (config.id) {
      case 1: // Zhang: XShell (HBase)
        return <XShellTerminal 
          user="zhangming" host="hadoop-master" cwd="~"
          command={`hbase shell`}
          output={`HBase Shell
Version 2.4.10
hbase(main):001:0> create 'uci_industrial_device', 'basic_info', 'status_info', 'fault_info'
Created table uci_industrial_device
Took 2.2450 seconds`}
          caption="图 4-1 创建 HBase 表结构"
        />;
      case 2: // Li: Linux (HBase)
        return <LinuxTerminal 
          user="lihua" host="server" cwd="/home/lihua"
          command={`hbase shell ./create_table.hbase`}
          output={`0 row(s) in 1.5320 seconds
=> Hbase::Table - industrial_maintenance`}
          caption="图 4-1 脚本化建表"
        />;
      case 3: // Wang: Ubuntu (Mongo)
        return <UbuntuTerminal 
          user="wangfang" host="ubuntu" cwd="~"
          command={`mongo industrial_db --eval 'db.createCollection("device_collection")'`}
          output={`MongoDB shell version v4.4.6
connecting to: mongodb://127.0.0.1:27017/industrial_db
{ "ok" : 1 }`}
          caption="图 4-1 MongoDB 集合创建"
        />;
      case 4: // Zhao: Kali (Mongo)
        return <KaliTerminal 
          user="zhaoqiang" host="kali" cwd="~/code"
          command={`mongo`}
          output={`> use factory_monitor
switched to db factory_monitor
> db.industrial_monitor.createIndex({Type: 1})
{
  "createdCollectionAutomatically" : true,
  "numIndexesBefore" : 1,
  "numIndexesAfter" : 2,
  "ok" : 1
}`}
          caption="图 4-1 数据库初始化与索引"
        />;
    }
  };

  const renderImportTerminal = () => {
    switch(config.id) {
        case 1: 
            return <XShellTerminal user="zhangming" host="hadoop-master" cwd="~" command="hbase org.apache.hadoop.hbase.mapreduce.ImportTsv ..." output="INFO mapreduce.Job: Job job_1622 completed successfully." caption="图 4-2 MapReduce 导入数据" />;
        case 2:
            return <LinuxTerminal user="lihua" host="server" cwd="~" command="./import_data.sh" output="Importing... Done." caption="图 4-2 数据导入过程" />;
        case 3:
            return <UbuntuTerminal user="wangfang" host="ubuntu" cwd="~" command="mongoimport ..." output="imported 11925 documents" caption="图 4-2 mongoimport 执行结果" />;
        case 4:
            return <KaliTerminal user="zhaoqiang" host="kali" cwd="~" command="mongoimport ..." output="connected to: localhost... imported 10800 documents" caption="图 4-2 数据导入" />;
    }
  }

  return (
    <div className="page text-black">
      <h2 className="text-2xl font-bold mb-6 border-b-2 border-black pb-2">四、 数据存储</h2>

      <h3 className="text-xl font-bold mt-4 mb-2">4.1 数据库选型与 Schema 设计</h3>
      <p className="mb-2 text-justify indent-8 leading-7 whitespace-pre-line">{content.select}</p>
      <div className="bg-gray-50 p-4 border border-gray-200 rounded mb-4 font-mono text-sm whitespace-pre-wrap">{content.schema}</div>
      {renderCreateTerminal()}

      <h3 className="text-xl font-bold mt-4 mb-2">4.2 数据导入实施</h3>
      <p className="mb-2 text-justify indent-8 leading-7 whitespace-pre-line">{content.import}</p>
      {renderImportTerminal()}

      <h3 className="text-xl font-bold mt-4 mb-2">4.3 存储验证与查询</h3>
      <p className="mb-2 text-justify indent-8 leading-7 whitespace-pre-line">{content.query}</p>
    </div>
  );
};