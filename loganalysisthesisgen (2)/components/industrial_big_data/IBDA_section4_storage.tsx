import React from 'react';
import { UbuntuTerminal } from '../shared/Terminal';
import { STUDENT_CONFIGS, BASE_STATS, STUDENT_SAMPLE_DATA } from './IBDA_config';
import { genDBCreate, genDBImport, genQueries } from './terminalGenerators';

interface IBDASection4StorageProps {
    variantId?: number;
}

export const IBDASection4Storage: React.FC<IBDASection4StorageProps> = ({ variantId = 1 }) => {
    const numericVariantId = typeof variantId === 'number' ? variantId : 1;
    const config = STUDENT_CONFIGS[numericVariantId];
    const data = STUDENT_SAMPLE_DATA[numericVariantId as keyof typeof STUDENT_SAMPLE_DATA] || STUDENT_SAMPLE_DATA[1];
    const cleanedRecords = data.cleanedRecords;
    const isHBase = config.techStack.database === 'HBase';

    // Different structure per student
    if (config.id === 1) {
        // 学生1 - 详细的HBase结构
        return (
            <div className="page bg-white w-[210mm] min-h-[297mm] mx-auto shadow-lg mb-8 p-12 font-serif">
                <h2 className="text-2xl font-bold mb-6 border-b-2 border-gray-300 pb-2">第4章 HBase数据存储</h2>

                <h3 className="text-xl font-semibold mt-6 mb-4">4.1 HBase概述</h3>
                <p className="mb-4 text-justify indent-8 leading-relaxed">
                    HBase是构建在HDFS之上的高可靠性、高性能、列式可伸缩数据库，
                    适合处理海量结构化数据的随机读写和实时查询场景。
                    列族存储模式能够有效压缩数据，降低存储成本。
                    本次作业将{cleanedRecords.toLocaleString()}条清洗后的数据存储至HBase。
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-4">4.2 HBase环境配置</h3>
                <UbuntuTerminal user={config.terminalConfig.user} host={config.terminalConfig.host} cwd={config.terminalConfig.path} command="hbase version" output={`HBase 2.0.2.6.5.3123-3
Source code repository git://gs3041.hwx.example.com/hbase/hbase.branch-2.0 revision=unknown
Compiled by jenkins on 2025-11-15T04:23Z
Running on Java 1.8.0_181`} caption="HBase Version Info" />
                <UbuntuTerminal user={config.terminalConfig.user} host={config.terminalConfig.host} cwd={config.terminalConfig.path} command="hbase shell" output={`HBase Shell
Use "help" to get list of supported commands.
Version 2.0.2, r2.0.2.6.5.3123-3

hbase(main):001:0> status`} caption="Start HBase Shell" />
                <UbuntuTerminal user={config.terminalConfig.user} host={config.terminalConfig.host} cwd={config.terminalConfig.path} command="status" output={`active master:  ${config.terminalConfig.host}.cluster,16000,1234567890123
1 live servers
    ${config.terminalConfig.host}.cluster,16020,1234567890123
average load: 0.5`} caption="HBase Cluster Status" />

                <h3 className="text-xl font-semibold mt-6 mb-4">4.3 创建数据表</h3>
                <p className="mb-4 text-justify indent-8 leading-relaxed">
                    创建工业传感器数据表，包含basic、sensor和fault三个列族。
                </p>
                <UbuntuTerminal user={config.terminalConfig.user} host={config.terminalConfig.host} cwd={config.terminalConfig.path} command={genDBCreate(config).split('\n')[0]} output={genDBCreate(config)} caption="Create HBase Table" />
                <UbuntuTerminal user={config.terminalConfig.user} host={config.terminalConfig.host} cwd={config.terminalConfig.path} command={`describe '${config.techStack.tableName}'`} output={`Table ${config.techStack.tableName} is ENABLED
COLUMN FAMILIES DESCRIPTION
{NAME => 'basic', VERSIONS => '1', EVICTION_BLOCKS => 'true'}
{NAME => 'sensor', VERSIONS => '1', EVICTION_BLOCKS => 'true'}
{NAME => 'fault', VERSIONS => '1', EVICTION_BLOCKS => 'true'}
3 row(s)`} caption="Table Schema Description" />

                <h3 className="text-xl font-semibold mt-6 mb-4">4.4 批量导入数据</h3>
                <UbuntuTerminal user={config.terminalConfig.user} host={config.terminalConfig.host} cwd={config.terminalConfig.path} command={genDBImport(config)} output={`...
2025-12-25 12:15:23 INFO mapreduce.Job: Job job_1234567890_0003 completed successfully
2025-12-25 12:15:24 INFO mapreduce.Job: Counters: 50
imported ${cleanedRecords} Rows`} caption="Bulk Load Import Data" />
                <UbuntuTerminal user={config.terminalConfig.user} host={config.terminalConfig.host} cwd={config.terminalConfig.path} command={`count '${config.techStack.tableName}'`} output={`${cleanedRecords}`} caption="Verify Record Count" />
                <UbuntuTerminal user={config.terminalConfig.user} host={config.terminalConfig.host} cwd={config.terminalConfig.path} command={`get '${config.techStack.tableName}', '10050'`} output={`COLUMN=basic:UDI, timestamp=1234567890123, value=10050
COLUMN=sensor:AirTemperature, timestamp=1234567890123, value=300.5
COLUMN=fault:MachineFailure, timestamp=1234567890123, value=0`} caption="Query Single Record" />

                <div className="mt-8">
                    <h4 className="text-lg font-semibold mb-2">4.5 小结</h4>
                    <p className="mb-4 text-justify indent-8 leading-relaxed">本章完成了基于HBase的分布式数据存储工作。HBase作为构建在HDFS之上的高可靠性、高性能、列式可伸缩数据库，非常适合处理海量工业传感器数据的随机读写和实时查询场景。表结构设计采用basic、sensor和fault三个列族，分别存储设备基本信息、传感器读数和故障状态，列族存储模式能够有效压缩数据并降低存储成本。RowKey采用{config.techStack.rowKeyDesign}设计策略，确保数据在Region间的均匀分布并优化查询性能。通过MapReduce批量导入方式，成功将{cleanedRecords.toLocaleString()}条清洗后的数据加载至HBase表{config.techStack.tableName}中。数据验证操作确认了导入过程的完整性和准确性，单条记录查询测试验证了存储系统的可用性。HBase存储系统的搭建为后续的MapReduce并行分析和实时数据查询提供了可靠的数据访问接口。</p>
                </div>
            </div>
        );
    } else if (config.id === 2) {
        // 学生2 - 简洁的HBase流程
        return (
            <div className="page bg-white w-[210mm] min-h-[297mm] mx-auto shadow-lg mb-8 p-12 font-serif">
                <h2 className="text-2xl font-bold mb-6 border-b-2 border-gray-300 pb-2">第4章 HBase存储方案</h2>

                <h3 className="text-xl font-semibold mt-6 mb-4">4.1 为什么选HBase</h3>
                <p className="mb-4 text-justify indent-8 leading-relaxed">
                    HBase基于HDFS，支持海量数据随机读写，列族存储节省空间。
                    需要存储{cleanedRecords.toLocaleString()}条记录。
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-4">4.2 建表流程</h3>
                <div className="my-6 p-4 border border-gray-300">
                    <table className="w-full text-sm">
                        <tbody>
                            <tr className="border-b"><td className="py-2 font-bold">列族</td><td className="py-2">字段</td></tr>
                            <tr className="border-b"><td className="py-2 font-bold">basic</td><td className="py-2">UDI, ProductID, Type</td></tr>
                            <tr className="border-b"><td className="py-2 font-bold">sensor</td><td className="py-2">AirTemp, ProcessTemp, RPM, Torque, ToolWear</td></tr>
                            <tr className="border-b"><td className="py-2 font-bold">fault</td><td className="py-2">MachineFailure, TWF, HDF, PWF, OSF, RNF</td></tr>
                        </tbody>
                    </table>
                </div>

                <h3 className="text-xl font-semibold mt-6 mb-4">4.3 操作实录</h3>
                <UbuntuTerminal user={config.terminalConfig.user} host={config.terminalConfig.host} cwd={config.terminalConfig.path} command={`create '${config.techStack.tableName}', 'basic', 'sensor', 'fault'`} output={`Created table ${config.techStack.tableName}
Took 1.2345 seconds`} caption="Create Table" />
                <UbuntuTerminal user={config.terminalConfig.user} host={config.terminalConfig.host} cwd={config.terminalConfig.path} command={genDBImport(config)} output={`Job completed successfully
imported ${cleanedRecords} Rows`} caption="Import Data" />
                <UbuntuTerminal user={config.terminalConfig.user} host={config.terminalConfig.host} cwd={config.terminalConfig.path} command={`scan '${config.techStack.tableName}', {LIMIT=>5}`} output={`ROW     COLUMN+CELL
10050   column=basic:UDI, timestamp=..., value=10050
10051   column=basic:UDI, timestamp=..., value=10051
...`} caption="Scan Data Sample" />

                <div className="mt-8">
                    <h4 className="text-lg font-semibold mb-2">4.4 小结</h4>
                    <p className="mb-4 text-justify indent-8 leading-relaxed">本章完成了HBase存储方案的实现。HBase作为基于HDFS的分布式列族数据库，具有支持海量数据随机读写、列族存储节省空间、自动分片实现水平扩展等特点，非常适合存储{cleanedRecords.toLocaleString()}条工业传感器记录。表{config.techStack.tableName}的schema设计包含basic、sensor、fault三个列族，分别对应设备基本信息、传感器读数和故障标记字段，这种设计既保持了逻辑上的清晰性，又利用了列族存储的压缩优势。数据导入过程采用MapReduce批量加载方式，显著提升了大规模数据的写入效率。导入完成后的数据扫描和统计操作验证了存储的正确性和完整性。HBase存储系统的建立为后续的MapReduce并行分析任务提供了高效的数据访问层，列族结构也为按需读取特定字段提供了性能优化。</p>
                </div>
            </div>
        );
    } else if (config.id === 3) {
        // 学生3 - MongoDB技术分析结构
        return (
            <div className="page bg-white w-[210mm] min-h-[297mm] mx-auto shadow-lg mb-8 p-12 font-serif">
                <h2 className="text-2xl font-bold mb-6 border-b-2 border-gray-300 pb-2">第4章 MongoDB文档存储</h2>

                <h3 className="text-xl font-semibold mt-6 mb-4">4.1 MongoDB存储架构</h3>
                <p className="mb-4 text-justify indent-8 leading-relaxed">
                    MongoDB采用BSON文档模型，支持嵌套结构和灵活的Schema设计。
                    对于工业传感器数据，文档模型可以天然表示每条记录的复杂结构。
                    {config.personalizedData.customField.split(' ')[0]}字段可以直接作为文档属性存储。
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-4">4.2 环境验证</h3>
                <UbuntuTerminal user={config.terminalConfig.user} host={config.terminalConfig.host} cwd={config.terminalConfig.path} command="mongo --version" output={`MongoDB shell version v4.0.12
git version: a14b234567890abcdef1234567890123456789
OpenSSL version: OpenSSL 1.0.2k-fips`} caption="MongoDB Version" />
                <UbuntuTerminal user={config.terminalConfig.user} host={config.terminalConfig.host} cwd={config.terminalConfig.path} command="systemctl status mongod | head -10" output={`* mongod.service - High-performance, schema-free document-oriented database
   Active: active (running) since Mon 2025-12-25 12:20:00 UTC
 Main PID: 12345 (mongod)
    Memory: 285.0M`} caption="Service Status" />

                <h3 className="text-xl font-semibold mt-6 mb-4">4.3 集合与索引创建</h3>
                <div className="p-4 border-l-4 border-blue-500 bg-blue-50 mb-4">
                    <p className="font-semibold mb-2">索引策略</p>
                    <p className="text-sm">UDI字段创建唯一索引（精确查询）</p>
                    <p className="text-sm">Type字段创建单字段索引（范围查询）</p>
                </div>
                <UbuntuTerminal user={config.terminalConfig.user} host={config.terminalConfig.host} cwd={config.terminalConfig.path} command={`db.${config.techStack.tableName}.createIndex({ "UDI": 1 }, { unique: true })`} output={`{
    "createdCollectionAutomatically": false,
    "numIndexesBefore": 1,
    "numIndexesAfter": 2,
    "created": 1
}`} caption="Create UDI Unique Index" />
                <UbuntuTerminal user={config.terminalConfig.user} host={config.terminalConfig.host} cwd={config.terminalConfig.path} command={`db.${config.techStack.tableName}.createIndex({ "Type": 1 })`} output={`{
    "ok": 1
}`} caption="Create Type Index" />

                <h3 className="text-xl font-semibold mt-6 mb-4">4.4 数据导入</h3>
                <UbuntuTerminal user={config.terminalConfig.user} host={config.terminalConfig.host} cwd={config.terminalConfig.path} command={genDBImport(config)} output={`2025-12-25T12:25:00.123+0000    connected to: localhost
2025-12-25T12:25:02.456+0000    imported ${cleanedRecords} documents`} caption="mongoimport Data" />
                <UbuntuTerminal user={config.terminalConfig.user} host={config.terminalConfig.host} cwd={config.terminalConfig.path} command={`db.${config.techStack.tableName}.countDocuments({})`} output={`${cleanedRecords}`} caption="Count Documents" />
                <UbuntuTerminal user={config.terminalConfig.user} host={config.terminalConfig.host} cwd={config.terminalConfig.path} command={`db.${config.techStack.tableName}.findOne({ "UDI": 10050 })`} output={`{
    "_id": ObjectId("6768f0a01234567890abcdef"),
    "UDI": 10050,
    "Product ID": "M14860",
    "Type": "L",
    "Air temperature [K]": 300.5,
    "Process temperature [K]": 309.8,
    "Rotational speed [rpm]": 1456,
    "Torque [Nm]": 45.2,
    "Tool wear [min]": 12,
    "Machine failure": 0,
    "${config.personalizedData.customField.split(' ')[0]}": ${config.id === 3 ? 'calculated_value' : 'custom_field_value'}
}`} caption="Query Single Document" />

                <div className="mt-8">
                    <h4 className="text-lg font-semibold mb-2">4.5 小结</h4>
                    <p className="mb-4 text-justify indent-8 leading-relaxed">本章完成了基于MongoDB的文档存储方案实现。MongoDB采用BSON文档模型，支持嵌套结构和灵活的Schema设计，对于工业传感器数据这种半结构化数据具有天然的表达优势。集合{config.techStack.tableName}的设计充分利用了文档模型的灵活性，{config.personalizedData.customField.split(' ')[0]}字段作为文档属性直接存储，无需预先定义固定的表结构。索引策略方面，为UDI字段创建了唯一索引以支持基于设备唯一标识的精确查询，为Type字段创建了单字段索引以优化按设备类型的范围查询性能。数据导入通过mongoimport工具完成，成功加载{cleanedRecords.toLocaleString()}条文档。导入完成后的数据统计和单文档查询操作验证了存储系统的可用性和数据完整性。MongoDB存储系统的建立为后续的数据分析和查询操作提供了灵活高效的数据访问接口。</p>
                </div>
            </div>
        );
    } else {
        // 学生4 - 口语化的MongoDB直接结构
        return (
            <div className="page bg-white w-[210mm] min-h-[297mm] mx-auto shadow-lg mb-8 p-12 font-serif">
                <h2 className="text-2xl font-bold mb-6 border-b-2 border-gray-300 pb-2">第4章 MongoDB数据存储</h2>

                <h3 className="text-xl font-semibold mt-6 mb-4">4.1 MongoDB选型分析</h3>
                <p className="mb-4 text-justify indent-8 leading-relaxed">
                    MongoDB是文档型数据库，支持JSON格式存储，无需预先定义表结构。
                    对于{cleanedRecords.toLocaleString()}条工业传感器数据，MongoDB能够提供灵活的存储方案。
                </p>

                <p className="mb-4 text-justify indent-8 leading-relaxed">
                    MongoDB作为文档数据库，具有Schema灵活、无需预定义表结构的特点，特别适合需要添加{config.personalizedData.customField.split(' ')[0]}这类自定义字段的数据存储需求。MongoDB的查询语法与JavaScript类似，学习成本较低。存储格式为JSON文档，便于与前后端分离架构集成。对于{cleanedRecords.toLocaleString()}条记录的数据规模，MongoDB能够提供足够的处理能力和查询性能。
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-4">4.2 环境准备</h3>
                <UbuntuTerminal user={config.terminalConfig.user} host={config.terminalConfig.host} cwd={config.terminalConfig.path} command="systemctl status mongod | grep Active" output={`   Active: active (running) since Mon 2025-12-25 12:20:00 UTC`} caption="Check Service Status" />
                <UbuntuTerminal user={config.terminalConfig.user} host={config.terminalConfig.host} cwd={config.terminalConfig.path} command="mongo --version | head -1" output={`MongoDB shell version v4.0.12`} caption="Check Version Info" />

                <h3 className="text-xl font-semibold mt-6 mb-4">4.3 数据导入</h3>
                <UbuntuTerminal user={config.terminalConfig.user} host={config.terminalConfig.host} cwd={config.terminalConfig.path} command={genDBImport(config)} output={`connected to: localhost
imported ${cleanedRecords} documents
done!`} caption="Import CSV to MongoDB" />
                <UbuntuTerminal user={config.terminalConfig.user} host={config.terminalConfig.host} cwd={config.terminalConfig.path} command={`mongo --quiet --eval "db.${config.techStack.tableName}.count()"`} output={`${cleanedRecords}`} caption="Count Records" />

                <h3 className="text-xl font-semibold mt-6 mb-4">4.4 数据查询验证</h3>
                <UbuntuTerminal user={config.terminalConfig.user} host={config.terminalConfig.host} cwd={config.terminalConfig.path} command={`mongo --quiet --eval "db.${config.techStack.tableName}.findOne()"`} output={`{
    "UDI": 10050,
    "Type": "L",
    "Machine failure": 0
    ... (省略部分字段)
}`} caption="Query Single Document" />

                <div className="mt-8">
                    <h4 className="text-lg font-semibold mb-2">4.5 小结</h4>
                    <p className="mb-4 text-justify indent-8 leading-relaxed">本章完成了基于MongoDB的数据存储工作。MongoDB作为文档数据库，具有Schema灵活、支持JSON格式存储的特点，适合存储包含{config.personalizedData.customField.split(' ')[0]}自定义字段的工业传感器数据。环境准备阶段验证了MongoDB服务的运行状态和版本信息。数据导入采用mongoimport工具，成功将{cleanedRecords.toLocaleString()}条记录加载至集合{config.techStack.tableName}中。导入完成后的文档计数查询确认了数据加载的完整性。MongoDB存储系统的建立为后续的数据查询和分析操作提供了灵活的数据访问基础。</p>
                </div>
            </div>
        );
    }
};

export default IBDASection4Storage;
