import { StudentConfig } from '../../../types';

export const getChapter4Text = (c: StudentConfig) => {
  const t = {
    1: { // Zhang: HBase
      select: `针对本实验的时序数据特性，我选择了 HBase 作为存储数据库。HBase 是一个基于 HDFS 的分布式列式数据库，具有高吞吐量、低延迟的特点，非常适合存储像传感器日志这样写入量大、读取模式固定的数据。相比于关系型数据库，HBase 的列族机制允许我们灵活地扩展字段（如后续增加新的传感器），且其基于 RowKey 的索引机制能够提供毫秒级的单点查询性能。在本实验中，数据量达到了 10600 条，未来扩展至 PB 级时，HBase 的优势将更加明显。`,
      schema: `表名：\`uci_industrial_device\`。
列族设计：
1. \`basic_info\`：存储静态信息，如 ProductID, Type, Maintenance_Cycle。这些数据写入后基本不变。
2. \`status_info\`：存储动态传感器数据，如 AirTemp, RPM, Torque。这些数据是分析的核心。
3. \`fault_info\`：存储故障标记，如 Machine_failure, HDF, OSF。
RowKey 设计：采用 \`UDI-Type\` 的组合方式（例如 \`10001-M\`）。这种设计既保证了唯一性，又允许我们利用 HBase 的前缀扫描功能，快速获取特定 UDI 的设备记录。同时，将 Type 放在 RowKey 后半部分可以避免因 Type 分布不均导致的热点问题（Salted RowKey 的变体思路）。`,
      import: `数据导入使用 HBase 自带的 \`ImportTsv\` 工具。该工具本质上是一个 MapReduce 任务，能够将 TSV/CSV 文件直接转换为 HBase 的内部存储格式（HFile），然后通过 BulkLoad 方式加载，效率远高于逐条 Put。
命令：\`hbase org.apache.hadoop.hbase.mapreduce.ImportTsv -Dimporttsv.columns=HBASE_ROW_KEY,basic_info:PID,basic_info:Type... uci_industrial_device /user/ai4i2020/clean\`。
执行过程中，我监控了 Yarn 界面，观察到 Map 任务的进度，最终成功导入了所有数据。`,
      query: `验证查询：
1. 点查询：\`get 'uci_industrial_device', '10001-M'\`，成功获取了该设备的完整信息，验证了数据完整性。
2. 范围查询：\`scan 'uci_industrial_device', {LIMIT=>5}\`，扫描前5条数据，验证数据是否正确落入相应列族。
3. 过滤器查询：\`scan 'uci_industrial_device', {FILTER=>"SingleColumnValueFilter('fault_info','HDF',=,'binary:1')"}\`，查询所有发生散热故障的记录，返回了 115 条结果，与预期一致。`
    },
    2: { // Li: HBase
      select: `数据库选型：HBase。
理由：
1. 扩展性：支持 PB 级数据存储，满足工业大数据长期留存需求。
2. 稀疏性：HBase 处理稀疏数据（Sparse Data）效率高，适合某些传感器可能缺失读数的情况。
3. 生态：与 Hadoop MapReduce 无缝集成，可以直接作为 MR 任务的输入源。`,
      schema: `表名：\`industrial_maintenance\`。
列族：\`d\` (data), \`f\` (failure)。采用短列族名以节省存储空间。
RowKey：\`Type-UDI\`（例如 \`L-10001\`）。
设计理由：本实验重点关注负载与故障的关联，而负载分布与 Type 高度相关。将 Type 置于 RowKey 前缀，可以实现物理上的数据聚集（Data Locality），提高按 Type 扫描的效率（Block Cache 命中率）。例如，要分析所有 L 型设备，只需扫描 RowKey 以 'L' 开头的区域。`,
      import: `导入方式：Shell 脚本循环 Put（适合小规模数据演示）。
虽然 BulkLoad 更快，但为了演示 HBase Shell 交互，编写了一个简单的 Shell 脚本读取 CSV 并执行 Put 命令。
命令示例：\`echo "put 'industrial_maintenance', 'L-10001', 'd:torque', '42.5'" | hbase shell\`。
这种方式虽然慢，但能让我清楚地看到每一条数据的写入过程，适合教学演示。`,
      query: `查询测试：
1. 统计 L 型设备数量：\`count 'industrial_maintenance', {CACHE => 1000}\`，返回 6000+ 条记录。
2. 查找特定故障：使用 ColumnPrefixFilter 过滤故障列，验证了过滤器的有效性。
3. 版本验证：修改了一条数据并再次查询，验证了 HBase 的多版本特性。`
    },
    3: { // Wang: MongoDB
      select: `技术选型：MongoDB。
优势：
1. Schema-less：无需预定义表结构，完美适配 JSON 格式的异构数据。对于工业物联网场景，不同设备的传感器可能不同，MongoDB 能灵活应对。
2. 丰富的查询语言：支持聚合管道（Aggregation Pipeline），比 HBase 的 Filter 更强大，能够直接在数据库层完成复杂计算。
3. 开发效率：BSON 格式与应用程序对象映射自然，减少了 ORM 的开销。`,
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
- \`db.device_collection.createIndex({ "udi": 1 }, { unique: true })\`：保证 UDI 唯一性。
- \`db.device_collection.createIndex({ "sensors.air_temp": 1 })\`：加速温度范围查询。`,
      import: `使用 \`mongoimport\` 工具。
命令：\`mongoimport --db industrial_db --collection device_collection --type csv --file final_dataset.csv --headerline\`。
--headerline 参数自动利用首行作为键名。导入速度非常快，1秒内完成。日志显示 "imported 11925 documents"。`,
      query: `查询验证：
1. 风险查询：\`db.device_collection.find({ "risk_score": "High" }).count()\`，找出了所有高风险设备。
2. 聚合查询：\`db.device_collection.aggregate([{ $group: { _id: "$specs.type", avg_rpm: { $avg: "$sensors.rpm" } } }])\`，计算了各类型设备的平均转速，展示了 MongoDB 强大的分析能力。`
    },
    4: { // Zhao: MongoDB
      select: `我选了 MongoDB。
原因很简单：它存东西就像存一个个文件一样，特别灵活。而且它的查询命令跟 JavaScript 很像，好学。HBase 那个命令行太难用了，不仅要设计 RowKey 还要管列族。对于我们这种应用型的分析，MongoDB 足够快了，而且以后如果要开发 Web 界面，JSON 格式的数据直接就能用。`,
      schema: `库名：\`factory_monitor\`
表名：\`industrial_monitor\`
不需要提前建表，数据导进去自动就生成了。
为了查得快，我给 \`Type\` 和 \`Machine failure\` 这两列加了索引。这样查坏机器的时候就不用全表扫描了，速度嗖嗖的。`,
      import: `导入最简单：
\`mongoimport -d factory_monitor -c industrial_monitor --type csv --file ai4i2020_clean.csv --headerline\`
跑完显示 "imported 10800 documents"，一下就进去了。中间报了个错，说连不上数据库，后来发现是服务没起，\systemctl start mongod\` 之后就好了。`,
      query: `我就试了几个查数：
1. 查有多少坏机器：\`db.industrial_monitor.find({"Machine failure": 1}).count()\`，结果是对的。
2. 查 L 型机器：\`db.industrial_monitor.find({"Type": "L"}).limit(5)\`，看看数据对不对。
3. 查那个效率分：\`db.industrial_monitor.find({Efficiency_Score: {$gt: 90}})\`，看看好机器多不多。`
    }
  };
  return t[c.id];
};