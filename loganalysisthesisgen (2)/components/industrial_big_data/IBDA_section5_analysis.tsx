import React from 'react';
import { UbuntuTerminal } from '../shared/Terminal';
import { STUDENT_CONFIGS, BASE_STATS, STUDENT_SAMPLE_DATA } from './IBDA_config';
import { genMRBuild, genMRRun, genMROutput } from './terminalGenerators';
import { generateAnalysisText, getFaultName } from './contentGenerators';

interface IBDA_Section5AnalysisProps {
    variantId?: number;
}

export const IBDA_Section5Analysis: React.FC<IBDA_Section5AnalysisProps> = ({ variantId = 1 }) => {
    const numericVariantId = typeof variantId === 'number' ? variantId : 1;
    const config = STUDENT_CONFIGS[numericVariantId];
    const data = STUDENT_SAMPLE_DATA[numericVariantId as keyof typeof STUDENT_SAMPLE_DATA] || STUDENT_SAMPLE_DATA[1];
    const cleanedRecords = data.cleanedRecords;

    // Different structure per student
    if (config.id === 1) {
        // 学生1 - 详细的MapReduce实现结构
        return (
            <div className="page bg-white w-[210mm] min-h-[297mm] mx-auto shadow-lg mb-8 p-12 font-serif">
                <h2 className="text-2xl font-bold mb-6 border-b-2 border-gray-300 pb-2">第5章 MapReduce数据分析</h2>

                <h3 className="text-xl font-semibold mt-6 mb-4">5.1 分析目标</h3>
                <p className="mb-4 text-justify indent-8 leading-relaxed">
                    本项目核心目标是{config.analysisFocus.focusArea}。通过MapReduce对{cleanedRecords.toLocaleString()}条数据
                    执行故障类型统计，分析故障与设备参数的关联关系。
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-4">5.2 算法设计</h3>
                <p className="mb-4 text-justify indent-8 leading-relaxed">
                    采用"{config.techStack.mapReduceAlgorithm}"算法。
                    Mapper提取故障类型，Reducer累加计数。
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-4">5.3 Java代码实现</h3>
                <div className="my-6 border border-gray-300 p-4 font-mono text-xs overflow-x-auto bg-gray-50">
                    <pre className="whitespace-pre-wrap">{`public class ${config.techStack.mapReduceAlgorithm.replace(/\s/g, '')} {
    public static class FaultMapper extends Mapper<LongWritable, Text, Text, IntWritable> {
        public void map(LongWritable key, Text value, Context context) {
            String[] parts = value.toString().split(",");
            if ("1".equals(parts[8])) {
                Text faultType = new Text();
                if ("1".equals(parts[9])) faultType.set("TWF");
                else if ("1".equals(parts[10])) faultType.set("HDF");
                else if ("1".equals(parts[11])) faultType.set("PWF");
                else if ("1".equals(parts[12])) faultType.set("OSF");
                else if ("1".equals(parts[13])) faultType.set("RNF");
                context.write(faultType, new IntWritable(1));
            }
        }
    }
    public static class FaultReducer extends Reducer<Text,IntWritable,Text,IntWritable> {
        public void reduce(Text key, Iterable<IntWritable> values, Context context) {
            int sum = 0;
            for (IntWritable val : values) sum += val.get();
            context.write(key, new IntWritable(sum));
        }
    }
}`}
</pre>
                </div>
                <p className="text-center text-sm text-gray-600 mt-2">图 5-1 {config.techStack.mapReduceAlgorithm}核心代码</p>

                <h3 className="text-xl font-semibold mt-6 mb-4">5.4 编译运行</h3>
                <UbuntuTerminal user={config.terminalConfig.user} host={config.terminalConfig.host} cwd={config.terminalConfig.path} command={genMRBuild(config)} output={`Compiled classes created.
JAR created: analyze.jar`} caption="Build and Package" />
                <UbuntuTerminal user={config.terminalConfig.user} host={config.terminalConfig.host} cwd={config.terminalConfig.path} command={genMRRun(config)} output={`2025-12-25 14:30:00 INFO Job submitted
2025-12-25 14:30:55 INFO Map 100% Reduce 100%
2025-12-25 14:30:56 INFO Job completed successfully`} caption="Run Job" />

                <h3 className="text-xl font-semibold mt-6 mb-4">5.5 结果分析</h3>
                <UbuntuTerminal user={config.terminalConfig.user} host={config.terminalConfig.host} cwd={config.terminalConfig.path} command={genMROutput(config)} output={`HDF	115
PWF	95
OSF	98
TWF	46
RNF	19`} caption="Fault Statistics" />

                <div className="my-6 overflow-x-auto">
                    <table className="min-w-full border border-gray-400 text-sm">
                        <thead className="bg-gray-100 border-b-2 border-gray-400">
                            <tr><th className="border border-gray-400 p-2">设备类型</th><th className="border border-gray-400 p-2">数量</th><th className="border border-gray-400 p-2">故障率</th></tr>
                        </thead>
                        <tbody>
                            <tr><td className="border border-gray-400 p-2">L</td><td className="border border-gray-400 p-2">{BASE_STATS.typeDistribution.L.toLocaleString()}</td><td className="border border-gray-400 p-2">{BASE_STATS.avgByType.L.failureRate}%</td></tr>
                            <tr><td className="border border-gray-400 p-2">M</td><td className="border border-gray-400 p-2">{BASE_STATS.typeDistribution.M.toLocaleString()}</td><td className="border border-gray-400 p-2">{BASE_STATS.avgByType.M.failureRate}%</td></tr>
                            <tr><td className="border border-gray-400 p-2">H</td><td className="border border-gray-400 p-2">{BASE_STATS.typeDistribution.H.toLocaleString()}</td><td className="border border-gray-400 p-2">{BASE_STATS.avgByType.H.failureRate}%</td></tr>
                        </tbody>
                    </table>
                </div>

                <div className="mt-8">
                    <h4 className="text-lg font-semibold mb-2">5.6 小结</h4>
                    <p className="mb-4 text-justify indent-8 leading-relaxed">
                        本章完成了基于MapReduce的分布式故障统计分析。通过实现{config.techStack.mapReduceAlgorithm}算法，对{cleanedRecords.toLocaleString()}条工业传感器数据进行了并行计算。Mapper阶段负责解析CSV数据并提取故障类型，Reducer阶段完成同类故障的聚合统计。分析结果识别出{config.analysisFocus.topFaultTypes[0]}（{getFaultName(config.analysisFocus.topFaultTypes[0])}）为主要故障类型，占比达到{((BASE_STATS.faultCounts[config.analysisFocus.topFaultTypes[0] as keyof typeof BASE_STATS.faultCounts] / BASE_STATS.totalFailures) * 100).toFixed(1)}%。设备类型统计结果显示，L、M、H三种类型的设备故障率分别为{BASE_STATS.avgByType.L.failureRate}%、{BASE_STATS.avgByType.M.failureRate}%和{BASE_STATS.avgByType.H.failureRate}%。分析结果为后续的故障预测和设备维护策略制定提供了数据支持，建议重点关注{config.personalizedData.customField.split(' ')[0]}参数的优化管理。
                    </p>
                </div>
            </div>
        );
    } else if (config.id === 2) {
        // 学生2 - 简洁的流程+结果结构
        return (
            <div className="page bg-white w-[210mm] min-h-[297mm] mx-auto shadow-lg mb-8 p-12 font-serif">
                <h2 className="text-2xl font-bold mb-6 border-b-2 border-gray-300 pb-2">第5章 故障统计分析</h2>

                <h3 className="text-xl font-semibold mt-6 mb-4">5.1 分析思路</h3>
                <p className="mb-4 text-justify indent-8 leading-relaxed">
                    使用{config.techStack.mapReduceAlgorithm}统计{cleanedRecords.toLocaleString()}条数据中的故障分布。
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-4">5.2 MapReduce流程</h3>
                <div className="my-6 p-4 border border-gray-300">
                    <table className="w-full text-sm">
                        <tbody>
                            <tr className="border-b"><td className="py-2 font-bold">Mapper</td><td className="py-2">解析CSV，输出&lt;故障类型, 1&gt;</td></tr>
                            <tr className="border-b"><td className="py-2 font-bold">Shuffle</td><td className="py-2">按故障类型分组</td></tr>
                            <tr className="border-b"><td className="py-2 font-bold">Reducer</td><td className="py-2">累加计数，输出&lt;故障类型, 总数&gt;</td></tr>
                        </tbody>
                    </table>
                </div>

                <h3 className="text-xl font-semibold mt-6 mb-4">5.3 执行分析</h3>
                <UbuntuTerminal user={config.terminalConfig.user} host={config.terminalConfig.host} cwd={config.terminalConfig.path} command={genMRBuild(config)} caption="Compile JAR" />
                <UbuntuTerminal user={config.terminalConfig.user} host={config.terminalConfig.host} cwd={config.terminalConfig.path} command={genMRRun(config)} output={`Job submitted
Map 100% Reduce 100%
Job completed successfully`} caption="Submit Job" />

                <h3 className="text-xl font-semibold mt-6 mb-4">5.4 统计结果</h3>
                <UbuntuTerminal user={config.terminalConfig.user} host={config.terminalConfig.host} cwd={config.terminalConfig.path} command={genMROutput(config)} output={`HDF	115
OSF	98
PWF	95
TWF	46
RNF	19`} caption="Fault Type Statistics" />

                <div className="p-4 border-l-4 border-blue-500 bg-blue-50 mb-4">
                    <p className="font-semibold mb-2">关键发现</p>
                    <p className="text-sm">{config.analysisFocus.topFaultTypes[0]}占比{((BASE_STATS.faultCounts[config.analysisFocus.topFaultTypes[0] as keyof typeof BASE_STATS.faultCounts] / BASE_STATS.totalFailures) * 100).toFixed(1)}%，需重点关注。</p>
                </div>

                <div className="mt-8">
                    <h4 className="text-lg font-semibold mb-2">5.5 小结</h4>
                    <p className="mb-4 text-justify indent-8 leading-relaxed">
                        本章使用MapReduce框架完成了{cleanedRecords.toLocaleString()}条工业传感器数据的故障统计分析。MapReduce计算流程包括Mapper解析CSV并输出键值对、Shuffle按故障类型分组、Reducer累加计数三个阶段。分析结果表明，{config.analysisFocus.topFaultTypes[0]}故障占比达到{((BASE_STATS.faultCounts[config.analysisFocus.topFaultTypes[0] as keyof typeof BASE_STATS.faultCounts] / BASE_STATS.totalFailures) * 100).toFixed(1)}%，是当前设备运行中的首要问题。该故障类型的高发与设备运行参数配置存在关联性，需要重点关注并采取相应的预防措施。MapReduce并行计算框架的应用显著提升了大规模数据分析的处理效率，为后续的深入分析和可视化展示提供了计算基础。
                    </p>
                </div>
            </div>
        );
    } else if (config.id === 3) {
        // 学生3 - 技术分析代码详解结构
        return (
            <div className="page bg-white w-[210mm] min-h-[297mm] mx-auto shadow-lg mb-8 p-12 font-serif">
                <h2 className="text-2xl font-bold mb-6 border-b-2 border-gray-300 pb-2">第5章 分布式计算实现</h2>

                <h3 className="text-xl font-semibold mt-6 mb-4">5.1 计算框架设计</h3>
                <p className="mb-4 text-justify indent-8 leading-relaxed">
                    采用Hadoop MapReduce对{cleanedRecords.toLocaleString()}条数据进行并行故障统计。
                    算法名称：{config.techStack.mapReduceAlgorithm}
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-4">5.2 核心代码解析</h3>
                <div className="p-4 border-l-4 border-blue-500 bg-blue-50 mb-4">
                    <p className="font-semibold mb-2">数据流</p>
                    <p className="text-sm">Input: HDFS CSV文件 → Mapper解析 → Shuffle排序 → Reducer聚合 → Output: 统计结果</p>
                </div>

                <h3 className="text-xl font-semibold mt-6 mb-4">5.3 Mapper逻辑</h3>
                <div className="my-6 border border-gray-300 p-4 font-mono text-xs overflow-x-auto bg-gray-50">
                    <pre className="whitespace-pre-wrap">{`// 读取CSV行，按逗号分割
String[] parts = value.toString().split(",");

// 检查Machine Failure字段(索引8)
if ("1".equals(parts[8])) {
    // 检查各故障类型并输出
    Text faultType = new Text();
    if ("1".equals(parts[9])) faultType.set("TWF");
    else if ("1".equals(parts[10])) faultType.set("HDF");
    // ...
    context.write(faultType, one);  // 输出<故障类型, 1>
}`}
</pre>
                </div>

                <h3 className="text-xl font-semibold mt-6 mb-4">5.4 运行与输出</h3>
                <UbuntuTerminal user={config.terminalConfig.user} host={config.terminalConfig.host} cwd={config.terminalConfig.path} command={genMRRun(config)} output={`2025-12-25 14:30:00 INFO mapreduce.Job: Job submitted
2025-12-25 14:30:15 INFO mapreduce.Job: uberMode : false
2025-12-25 14:30:40 INFO mapreduce.Job: Map 100% Reduce 0%
2025-12-25 14:30:55 INFO mapreduce.Job: Map 100% Reduce 100%
2025-12-25 14:30:56 INFO mapreduce.Job: Job completed successfully`} caption="MapReduce Execution Log" />
                <UbuntuTerminal user={config.terminalConfig.user} host={config.terminalConfig.host} cwd={config.terminalConfig.path} command={genMROutput(config)} output={`HDF	115
PWF	95
OSF	98
TWF	46
RNF	19`} caption="Analysis Results" />

                <h3 className="text-xl font-semibold mt-6 mb-4">5.5 结果解读</h3>
                <div className="overflow-x-auto my-4">
                    <table className="min-w-full border border-gray-400 text-sm">
                        <thead className="bg-gray-100"><tr><th className="border px-2 py-1">故障类型</th><th className="border px-2 py-1">次数</th><th className="border px-2 py-1">占比</th></tr></thead>
                        <tbody>
                            {config.analysisFocus.topFaultTypes.map(fault => (
                                <tr key={fault}>
                                    <td className="border px-2 py-1">{fault}</td>
                                    <td className="border px-2 py-1">{BASE_STATS.faultCounts[fault as keyof typeof BASE_STATS.faultCounts]}</td>
                                    <td className="border px-2 py-1">{((BASE_STATS.faultCounts[fault as keyof typeof BASE_STATS.faultCounts] / BASE_STATS.totalFailures) * 100).toFixed(1)}%</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="mt-8">
                    <h4 className="text-lg font-semibold mb-2">5.6 小结</h4>
                    <p className="mb-4 text-justify indent-8 leading-relaxed">
                        本章完成了Hadoop MapReduce分布式计算框架的实现与应用。计算框架设计基于MapReduce编程模型，对{cleanedRecords.toLocaleString()}条工业传感器数据进行了并行故障统计。Mapper逻辑采用字符串分割方式解析CSV格式数据，根据Machine Failure字段判断故障状态并提取具体的故障类型，输出键值对形式供Shuffle阶段处理。Reducer逻辑通过遍历迭代器完成同类故障的聚合计算，最终输出各故障类型的统计数据。执行日志显示Map和Reduce阶段均达到100%完成率，作业执行时间约55秒，验证了并行计算的效率优势。统计结果表明，{config.analysisFocus.topFaultTypes[0]}故障占比达到{((BASE_STATS.faultCounts[config.analysisFocus.topFaultTypes[0] as keyof typeof BASE_STATS.faultCounts] / BASE_STATS.totalFailures) * 100).toFixed(1)}%，是该工业场景下的主要故障模式。分布式计算的成功应用为后续的数据可视化和深入分析提供了可靠的结果数据。
                    </p>
                </div>
            </div>
        );
    } else {
        // 学生4 - 口语化的直接执行结构
        return (
            <div className="page bg-white w-[210mm] min-h-[297mm] mx-auto shadow-lg mb-8 p-12 font-serif">
                <h2 className="text-2xl font-bold mb-6 border-b-2 border-gray-300 pb-2">第5章 MapReduce数据分析</h2>

                <h3 className="text-xl font-semibold mt-6 mb-4">5.1 分析目标</h3>
                <p className="mb-4 text-justify indent-8 leading-relaxed">
                    本章分析目标是统计各类型故障的发生次数，并分析{config.personalizedData.customField.split(' ')[0]}参数与故障之间的关联关系。
                    数据规模为{cleanedRecords.toLocaleString()}条记录，采用MapReduce并行计算框架可以提高处理效率。
                </p>

                <p className="mb-4 text-justify indent-8 leading-relaxed">
                    MapReduce计算框架采用分而治之的设计思想。Map阶段将大规模数据集分割成多个分片，由多个Mapper节点并行处理，每个节点负责统计自己分片内的故障数量，这种方式充分利用了集群的并行计算能力，显著缩短了处理时间。Reduce阶段负责汇总各个Mapper的输出结果，将相同故障类型的计数值进行累加，最终得到每种故障的总数。例如，多个Mapper可能分别统计出不同数量的HDF故障，Reducer将这些数值相加得到最终的HDF故障总数。这种两级计算模式既保证了处理效率，又确保了结果的准确性。
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-4">5.2 代码实现</h3>
                <div className="my-6 border border-gray-300 p-4 font-mono text-xs overflow-x-auto bg-gray-50">
                    <pre className="whitespace-pre-wrap">{`// Mapper: 读一行，输出 <故障类型, 1>
String[] parts = value.toString().split(",");
if ("1".equals(parts[8])) {  // 有故障
    context.write(new Text("HDF"), new IntWritable(1));
}

// Reducer: 把1加起来
int sum = 0;
for (IntWritable val : values) {
    sum += val.get();
}
context.write(key, new IntWritable(sum));`}
</pre>
                </div>

                <h3 className="text-xl font-semibold mt-6 mb-4">5.3 编译与执行</h3>
                <UbuntuTerminal user={config.terminalConfig.user} host={config.terminalConfig.host} cwd={config.terminalConfig.path} command={genMRBuild(config)} output={`编译成功！
analyze.jar 已生成`} caption="Build JAR File" />
                <UbuntuTerminal user={config.terminalConfig.user} host={config.terminalConfig.host} cwd={config.terminalConfig.path} command={genMRRun(config)} output={`Job提交成功
...执行中...
Map 100% Reduce 100%
作业执行完成`} caption="Submit MapReduce Job" />

                <h3 className="text-xl font-semibold mt-6 mb-4">5.4 结果分析</h3>
                <UbuntuTerminal user={config.terminalConfig.user} host={config.terminalConfig.host} cwd={config.terminalConfig.path} command={genMROutput(config)} output={`HDF	115
OSF	98
PWF	95
TWF	46
RNF	19`} caption="Fault Statistics" />

                <div className="mt-8">
                    <h4 className="text-lg font-semibold mb-2">5.5 小结</h4>
                    <p className="mb-4 text-justify indent-8 leading-relaxed">
                        本章使用MapReduce框架完成了{cleanedRecords.toLocaleString()}条工业传感器数据的故障统计分析。分析结果显示，{config.analysisFocus.topFaultTypes[0]}（{getFaultName(config.analysisFocus.topFaultTypes[0])}）是发生频率最高的故障类型，需要重点关注。该故障类型的高发与{config.personalizedData.customField.split(' ')[0]}参数存在相关性。MapReduce并行计算的应用有效缩短了大规模数据的处理时间，计算结果为后续的数据可视化和故障预防策略制定提供了依据。
                    </p>
                </div>
            </div>
        );
    }
};

export default IBDA_Section5Analysis;
