import React from 'react';
import { UbuntuTerminal } from '../shared/Terminal';
import { STUDENT_CONFIGS, BASE_STATS, STUDENT_SAMPLE_DATA } from './IBDA_config';
import { getChapter3Text } from './assets/chapter3';
import { genPreprocCmd, genPreprocVerify, genHDFSCleanPut } from './terminalGenerators';

interface IBDASection3PreprocessingProps {
    variantId?: number;
}

export const IBDASection3Preprocessing: React.FC<IBDASection3PreprocessingProps> = ({ variantId = 1 }) => {
    const numericVariantId = typeof variantId === 'number' ? variantId : 1;
    const config = STUDENT_CONFIGS[numericVariantId];
    const content = getChapter3Text(config);
    const data = STUDENT_SAMPLE_DATA[numericVariantId as keyof typeof STUDENT_SAMPLE_DATA] || STUDENT_SAMPLE_DATA[1];
    const totalRecords = data.totalRecords;
    const cleanedRecords = data.cleanedRecords;

    // Different structure per student
    if (config.id === 1) {
        // 学生1 - 详细的分步骤结构
        return (
            <div className="page bg-white w-[210mm] min-h-[297mm] mx-auto shadow-lg mb-8 p-12 font-serif">
                <h2 className="text-2xl font-bold mb-6 border-b-2 border-gray-300 pb-2">第3章 数据预处理</h2>

                <h3 className="text-xl font-semibold mt-6 mb-4">3.1 预处理概述</h3>
                <p className="mb-4 text-justify indent-8 leading-relaxed">
                    {content.intro}
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-4">3.2 预处理方法</h3>
                <p className="mb-4 text-justify indent-8 leading-relaxed whitespace-pre-line">{content.method}</p>

                <h3 className="text-xl font-semibold mt-6 mb-4">3.3 清洗步骤</h3>
                <div className="my-6 p-4 border border-gray-300 bg-gray-50">
                    <ol className="list-decimal pl-8 space-y-2">
                        <li>过滤温度异常值（空气温度&lt;295K或&gt;310K）</li>
                        <li>删除转速异常记录（转速&lt;1000rpm或&gt;3000rpm）</li>
                        <li>剔除扭矩异常数据（扭矩&lt;0Nm或&gt;80Nm）</li>
                        <li>处理缺失值（删除传感器读数为空的记录）</li>
                        <li>标准化日期格式</li>
                    </ol>
                </div>

                <h3 className="text-xl font-semibold mt-6 mb-4">3.4 执行清洗</h3>
                <UbuntuTerminal user={config.terminalConfig.user} host={config.terminalConfig.host} cwd={config.terminalConfig.path} command={genPreprocCmd(config)} caption="Data Cleaning Command" />
                <UbuntuTerminal user={config.terminalConfig.user} host={config.terminalConfig.host} cwd={config.terminalConfig.path} command="wc -l cleaned.csv" output={genPreprocVerify(config)} caption="Count Cleaned Records" />

                <h3 className="text-xl font-semibold mt-6 mb-4">3.5 上传清洗后数据</h3>
                <UbuntuTerminal user={config.terminalConfig.user} host={config.terminalConfig.host} cwd={config.terminalConfig.path} command={genHDFSCleanPut(config)} caption="Upload to HDFS" />

                <h3 className="text-xl font-semibold mt-6 mb-4">3.6 数据质量对比</h3>
                <div className="my-6 overflow-x-auto">
                    <table className="min-w-full border border-gray-400 text-sm">
                        <thead className="bg-gray-100 border-b-2 border-gray-400">
                            <tr><th className="border border-gray-400 p-2">指标</th><th className="border border-gray-400 p-2">原始</th><th className="border border-gray-400 p-2">清洗后</th></tr>
                        </thead>
                        <tbody>
                            <tr><td className="border border-gray-400 p-2">总记录数</td><td className="border border-gray-400 p-2">{totalRecords.toLocaleString()}</td><td className="border border-gray-400 p-2">{cleanedRecords.toLocaleString()}</td></tr>
                            <tr><td className="border border-gray-400 p-2">Type=L</td><td className="border border-gray-400 p-2">{BASE_STATS.typeDistribution.L}</td><td className="border border-gray-400 p-2">{BASE_STATS.typeDistribution.L}</td></tr>
                            <tr><td className="border border-gray-400 p-2">Type=M</td><td className="border border-gray-400 p-2">{BASE_STATS.typeDistribution.M}</td><td className="border border-gray-400 p-2">{BASE_STATS.typeDistribution.M}</td></tr>
                            <tr><td className="border border-gray-400 p-2">Type=H</td><td className="border border-gray-400 p-2">{BASE_STATS.typeDistribution.H}</td><td className="border border-gray-400 p-2">{BASE_STATS.typeDistribution.H}</td></tr>
                            <tr><td className="border border-gray-400 p-2">故障记录</td><td className="border border-gray-400 p-2">{BASE_STATS.totalFailures}</td><td className="border border-gray-400 p-2">{BASE_STATS.totalFailures}</td></tr>
                        </tbody>
                    </table>
                </div>

                <div className="mt-8">
                    <h4 className="text-lg font-semibold mb-2">3.7 小结</h4>
                    <p className="mb-4 text-justify indent-8 leading-relaxed">本章完成了工业传感器数据的数据预处理工作。通过对{totalRecords.toLocaleString()}条原始数据进行质量检查，识别并过滤了温度异常值、转速异常记录、扭矩异常数据以及包含缺失值的记录。采用Linux Shell工具链（awk、sed、grep）构建了高效的数据清洗流水线，实现了基于物理约束的异常值检测、基于统计规律的离群点识别以及基于业务逻辑的数据一致性验证。清洗过程共删除{totalRecords - cleanedRecords}条异常数据，最终得到{cleanedRecords.toLocaleString()}条高质量记录，数据完整性和一致性均达到100%。清洗后的数据已上传至HDFS分布式文件系统，为后续的{config.techStack.database}存储和MapReduce并行分析奠定了可靠的数据基础。</p>
                </div>
            </div>
        );
    } else if (config.id === 2) {
        // 学生2 - 简洁的流程图+终端
        return (
            <div className="page bg-white w-[210mm] min-h-[297mm] mx-auto shadow-lg mb-8 p-12 font-serif">
                <h2 className="text-2xl font-bold mb-6 border-b-2 border-gray-300 pb-2">第3章 数据清洗</h2>

                <h3 className="text-xl font-semibold mt-6 mb-4">3.1 清洗目标</h3>
                <p className="mb-4 text-justify indent-8 leading-relaxed">{content.intro}</p>
                <p className="mb-4 text-justify indent-8 leading-relaxed">
                    数据清洗是数据分析流程中至关重要的一环，原始数据往往包含噪声、缺失值或异常值，这些数据质量问题会直接影响后续分析的准确性。本次作业的数据清洗工作主要针对三个方面：异常值过滤、缺失值处理和格式标准化。异常值主要表现为传感器读数超出物理可能的范围，例如空气温度低于273K（绝对零度）或高于350K（超过设备极限），这些明显不合理的数据必须予以剔除。缺失值则表现为某些关键字段为空，这类记录无法为分析提供有效信息，也应予以删除。格式标准化问题主要涉及日期格式的不统一，虽然这类问题不影响数值分析，但统一格式有助于数据的后续处理和可视化呈现。
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-4">3.2 清洗规则</h3>
                <p className="mb-4 text-justify indent-8 leading-relaxed">
                    针对工业设备运行数据的特点，我们制定了以下具体的清洗规则。首先是温度异常值过滤，设定空气温度的有效范围为295K至310K，工艺温度的有效范围为298K至313K，超出此范围的数据将被视为传感器异常并予以过滤。其次是转速和扭矩的物理合理性检查，转速的有效范围为1000rpm至3000rpm，扭矩的有效范围为0Nm至80Nm，超出范围的数据同样被判定为异常。第三步是缺失值检测，任何包含空字段的记录都将被整体删除，以确保所有用于分析的数据都是完整的。最后是数据类型和格式的标准化，确保所有数值字段均为有效的浮点数或整数，设备类型字段统一为大写的L、M、H三种取值。
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-4">3.3 清洗流程</h3>
                <div className="my-6 p-4 border border-gray-300">
                    <table className="w-full text-sm">
                        <tbody>
                            <tr className="border-b"><td className="py-2 font-bold">输入</td><td className="py-2">原始CSV数据文件 ({totalRecords.toLocaleString()}条记录)</td></tr>
                            <tr className="border-b"><td className="py-2 font-bold">步骤1</td><td className="py-2">使用awk命令过滤温度异常值，保留温度在合理范围内的记录</td></tr>
                            <tr className="border-b"><td className="py-2 font-bold">步骤2</td><td className="py-2">使用sed命令处理格式问题，统一设备类型字段的大小写</td></tr>
                            <tr className="border-b"><td className="py-2 font-bold">步骤3</td><td className="py-2">使用grep命令删除包含空值或无效字符的行</td></tr>
                            <tr className="border-b"><td className="py-2 font-bold">输出</td><td className="py-2">清洗后的cleaned.csv文件 ({cleanedRecords.toLocaleString()}条记录)</td></tr>
                        </tbody>
                    </table>
                </div>

                <h3 className="text-xl font-semibold mt-6 mb-4">3.4 技术实现细节</h3>
                <p className="mb-4 text-justify indent-8 leading-relaxed">
                    数据清洗采用Linux Shell脚本实现，充分利用了Unix哲学中"做好一件事"的工具链思想。awk是模式扫描和处理语言，非常适合处理结构化文本数据，我们通过指定逗号作为字段分隔符，对每一行数据执行条件判断，仅保留满足温度条件的记录。sed是流编辑器，主要用于文本替换和转换操作，我们用它来处理数据格式的一致性问题。grep是文本搜索工具，通过-v参数实现反向匹配，即删除包含特定模式的行。这三个命令通过管道符号连接，形成一个高效的数据处理流水线，中间结果直接在内存中传递，避免了不必要的磁盘I/O操作，大大提升了处理效率。
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-4">3.5 执行命令</h3>
                <UbuntuTerminal user={config.terminalConfig.user} host={config.terminalConfig.host} cwd={config.terminalConfig.path} command={genPreprocCmd(config)} output={genPreprocVerify(config)} caption="Clean and Verify" />

                <h3 className="text-xl font-semibold mt-6 mb-4">3.6 结果上传</h3>
                <p className="mb-4 text-justify indent-8 leading-relaxed">
                    清洗完成后，我们使用hdfs dfs -put命令将处理后的数据上传至HDFS的/data/processed/目录，与原始数据的/data/raw/目录形成清晰的版本划分。这种分层存储结构便于数据溯源和质量对比，如果后续分析中发现问题，可以随时回溯到原始数据重新处理。上传完成后，再次执行行数统计命令，确认HDFS中的记录数与本地清洗后的记录数一致，确保数据传输过程没有发生丢包或损坏。
                </p>
                <UbuntuTerminal user={config.terminalConfig.user} host={config.terminalConfig.host} cwd={config.terminalConfig.path} command={genHDFSCleanPut(config)} caption="Upload to HDFS/processed/" />

                <div className="mt-8">
                    <h4 className="text-lg font-semibold mb-2">3.7 小结</h4>
                    <p className="mb-4 text-justify indent-8 leading-relaxed">数据清洗工作已完成，从{totalRecords.toLocaleString()}条原始数据中识别并删除了{totalRecords - cleanedRecords}条异常数据，清洗完成率达到{((cleanedRecords / totalRecords) * 100).toFixed(2)}%。异常数据主要集中在温度传感器读数超出物理合理范围以及部分关键字段存在缺失值的问题上。通过制定明确的清洗规则并采用Linux Shell工具链（awk、sed、grep）实现自动化处理，确保了清洗过程的可重复性和一致性。清洗后的数据完整性和一致性均达到100%，为后续的{config.techStack.database}存储和MapReduce并行分析提供了高质量的数据基础。数据质量的有效保障将直接影响后续分析结果的可靠性和准确性，因此数据清洗是整个分析流程中不可或缺的关键环节。</p>
                </div>
            </div>
        );
    } else if (config.id === 3) {
        // 学生3 - 技术导向的代码分析结构
        return (
            <div className="page bg-white w-[210mm] min-h-[297mm] mx-auto shadow-lg mb-8 p-12 font-serif">
                <h2 className="text-2xl font-bold mb-6 border-b-2 border-gray-300 pb-2">第3章 数据预处理技术</h2>

                <h3 className="text-xl font-semibold mt-6 mb-4">3.1 预处理技术概述</h3>
                <p className="mb-4 text-justify indent-8 leading-relaxed">{content.method}</p>
                <p className="mb-4 text-justify indent-8 leading-relaxed">
                    数据预处理是确保数据分析质量的关键环节，其核心目标是提升数据的完整性、一致性和准确性。在工业大数据场景下，传感器故障、传输错误、设备异常等因素都可能导致数据质量问题，如果直接使用原始数据进行分析，可能会得出错误甚至误导性的结论。本次项目的预处理工作采用了多层次的数据质量控制策略，包括基于物理约束的异常值检测、基于统计规律的离群点识别、以及基于业务逻辑的数据一致性验证。整个预处理流程基于Linux Shell工具链实现，充分利用了awk在文本处理方面的强大功能、sed在流编辑方面的高效性能、以及grep在模式匹配方面的灵活特性，构建了一个高效、可靠、可重复的数据清洗流水线。
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-4">3.2 核心命令解析</h3>
                <div className="p-4 border-l-4 border-blue-500 bg-blue-50 mb-4">
                    <p className="font-semibold mb-2">awk命令：温度范围过滤</p>
                    <p className="text-sm mt-1">语法：awk -F',' '$4&gt;295 &amp;&amp; $4&lt;310' input.csv</p>
                    <p className="text-sm mt-1">说明：-F参数指定逗号为字段分隔符，$4代表第4列（空气温度），条件筛选保留295-310K范围内的记录</p>
                </div>
                <div className="p-4 border-l-4 border-blue-500 bg-blue-50 mb-4">
                    <p className="font-semibold mb-2">sed命令：格式标准化</p>
                    <p className="text-sm mt-1">语法：sed 's/low/L/g' input.csv</p>
                    <p className="text-sm mt-1">说明：s命令执行字符串替换，将所有小写的"low"替换为大写的"L"，确保设备类型字段的一致性</p>
                </div>
                <div className="p-4 border-l-4 border-blue-500 bg-blue-50 mb-4">
                    <p className="font-semibold mb-2">grep命令：缺失值过滤</p>
                    <p className="text-sm mt-1">语法：grep -v ",," input.csv</p>
                    <p className="text-sm mt-1">说明：-v参数实现反向匹配，删除包含连续逗号（表示空字段）的行，确保数据完整性</p>
                </div>

                <h3 className="text-xl font-semibold mt-6 mb-4">3.3 预处理策略</h3>
                <p className="mb-4 text-justify indent-8 leading-relaxed">
                    针对工业设备运行数据的特点，我们设计了差异化的预处理策略。对于温度类连续变量，采用基于物理约束的硬阈值过滤方法，结合设备正常运行参数范围设定合理的上下界。对于转速和扭矩等机械参数，采用基于统计分布的离群点检测方法，计算均值和标准差，将偏离均值超过3倍标准差的记录视为离群点。对于分类型的设备类型字段，采用枚举值验证方法，仅保留L、M、H三种有效取值。对于故障标记字段，采用逻辑一致性检查，确保机器故障标志与具体故障类型标记之间不存在逻辑矛盾。这种多层次的验证策略能够有效识别和处理各种类型的数据质量问题，提升整体数据质量。
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-4">3.4 执行实录</h3>
                <UbuntuTerminal user={config.terminalConfig.user} host={config.terminalConfig.host} cwd={config.terminalConfig.path} command={genPreprocCmd(config)} caption="Execute Cleaning" />
                <UbuntuTerminal user={config.terminalConfig.user} host={config.terminalConfig.host} cwd={config.terminalConfig.path} command="head -3 cleaned.csv && echo '...' && tail -3 cleaned.csv" output={`UDI,Product ID,Type,Air temperature [K],Process temperature [K],Rotational speed [rpm],Torque [Nm],Tool wear [min],Machine failure
${data.udiStart},M13278,M,304.0,309.8,1294,44.9,34,0
${data.udiStart + 1},L13905,L,300.8,307.8,1539,20.1,64,0
...
${data.udiEnd - 2},M5${(data.udiEnd - 2).toString().slice(-4)},M,301.5,311.2,1423,45.1,198,0
${data.udiEnd - 1},M5${(data.udiEnd - 1).toString().slice(-4)},M,300.8,310.9,1489,43.7,15,0
${data.udiEnd},M5${data.udiEnd.toString().slice(-4)},M,299.2,309.5,1532,47.2,127,0`} caption="Data Sample" />

                <h3 className="text-xl font-semibold mt-6 mb-4">3.5 数据质量指标</h3>
                <div className="overflow-x-auto my-4">
                    <table className="min-w-full border border-gray-400 text-sm">
                        <thead className="bg-gray-100"><tr><th className="border px-2 py-1">指标</th><th className="border px-2 py-1">数值</th></tr></thead>
                        <tbody>
                            <tr><td className="border px-2 py-1">原始记录数</td><td className="border px-2 py-1">{totalRecords.toLocaleString()}条</td></tr>
                            <tr><td className="border px-2 py-1">清洗后记录数</td><td className="border px-2 py-1">{cleanedRecords.toLocaleString()}条</td></tr>
                            <tr><td className="border px-2 py-1">删除记录数</td><td className="border px-2 py-1">{totalRecords - cleanedRecords}条</td></tr>
                            <tr><td className="border px-2 py-1">删除率</td><td className="border px-2 py-1">{((totalRecords - cleanedRecords) / totalRecords * 100).toFixed(3)}%</td></tr>
                            <tr><td className="border px-2 py-1">数据完整性</td><td className="border px-2 py-1">100%（无缺失值）</td></tr>
                            <tr><td className="border px-2 py-1">格式一致性</td><td className="border px-2 py-1">100%（字段标准化）</td></tr>
                        </tbody>
                    </table>
                </div>

                <UbuntuTerminal user={config.terminalConfig.user} host={config.terminalConfig.host} cwd={config.terminalConfig.path} command={genHDFSCleanPut(config)} caption="Upload to HDFS" />

                <div className="mt-8">
                    <h4 className="text-lg font-semibold mb-2">3.6 小结</h4>
                    <p className="mb-4 text-justify indent-8 leading-relaxed">本章基于Linux Shell工具链完成了数据预处理工作，实现了从原始数据到高质量分析数据的转换。通过awk、sed、grep等工具的组合使用，构建了高效的数据清洗流水线，成功处理了{totalRecords.toLocaleString()}条原始数据，最终得到{cleanedRecords.toLocaleString()}条高质量记录。数据质量评估结果显示，数据完整性和一致性均达到100%，为后续的{config.techStack.database}存储和MapReduce并行分析奠定了坚实的数据基础。预处理过程采用的技术方法和策略具有较强的通用性，可扩展应用于其他类似的大规模工业数据处理场景。通过对预处理技术的深入解析和命令级别的详细说明，不仅完成了数据处理任务，也加深了对Unix工具链在文本处理领域的理解。</p>
                </div>
            </div>
        );
    } else {
        // 学生4 - 正式报告结构
        return (
            <div className="page bg-white w-[210mm] min-h-[297mm] mx-auto shadow-lg mb-8 p-12 font-serif">
                <h2 className="text-2xl font-bold mb-6 border-b-2 border-gray-300 pb-2">第3章 数据预处理</h2>

                <h3 className="text-xl font-semibold mt-6 mb-4">3.1 数据质量分析</h3>
                <p className="mb-4 text-justify indent-8 leading-relaxed">{content.intro}</p>
                <p className="mb-4 text-justify indent-8 leading-relaxed">
                    数据预处理是数据分析流程中的关键环节，直接影响后续分析结果的准确性和可靠性。在对{totalRecords.toLocaleString()}条原始数据进行初步检查后，发现了以下主要数据质量问题。首先，部分记录的传感器读数存在异常值，主要表现为温度传感器读数超出物理合理范围，如空气温度低于270K或高于320K，这类数据明显不符合设备正常运行状态。其次，存在少量记录包含缺失字段，某些关键字段为空值，这类不完整的数据无法为分析提供有效信息。第三，数据格式存在不一致问题，虽然不影响数值分析，但统一格式有助于后续的数据处理和可视化工作。
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-4">3.2 清洗规则设计</h3>
                <p className="mb-4 text-justify indent-8 leading-relaxed">{content.method}</p>
                <div className="overflow-x-auto my-4">
                    <table className="min-w-full border border-gray-400 text-sm">
                        <thead className="bg-gray-100 border-b-2 border-gray-400">
                            <tr>
                                <th className="border border-gray-400 p-2">清洗项</th>
                                <th className="border border-gray-400 p-2">规则</th>
                                <th className="border border-gray-400 p-2">方法</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border border-gray-400 p-2">温度异常值</td>
                                <td className="border border-gray-400 p-2">空气温度 295-310K，工艺温度 298-313K</td>
                                <td className="border border-gray-400 p-2">awk条件过滤</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-400 p-2">转速异常值</td>
                                <td className="border border-gray-400 p-2">1000-3000 rpm</td>
                                <td className="border border-gray-400 p-2">awk条件过滤</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-400 p-2">扭矩异常值</td>
                                <td className="border border-gray-400 p-2">0-80 Nm</td>
                                <td className="border border-gray-400 p-2">awk条件过滤</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-400 p-2">缺失值</td>
                                <td className="border border-gray-400 p-2">删除包含空字段的记录</td>
                                <td className="border border-gray-400 p-2">grep反向匹配</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-400 p-2">格式标准化</td>
                                <td className="border border-gray-400 p-2">Type字段统一为大写</td>
                                <td className="border border-gray-400 p-2">sed字符串替换</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <h3 className="text-xl font-semibold mt-6 mb-4">3.3 清洗流程实现</h3>
                <p className="mb-4 text-justify indent-8 leading-relaxed">
                    数据清洗采用Linux Shell脚本实现，充分利用了Unix工具链的优势。awk工具用于基于条件的数据过滤，通过指定字段分隔符和比较条件，快速筛选出满足阈值要求的记录。grep工具用于模式匹配和反向选择，通过-v参数实现删除包含特定模式（如连续逗号表示空值）的行。sed工具用于文本替换和格式转换，确保设备类型字段的一致性。这三个工具通过管道符号连接，形成数据处理流水线，中间结果在内存中传递，避免了多次磁盘I/O操作，提升了处理效率。
                </p>
                <UbuntuTerminal user={config.terminalConfig.user} host={config.terminalConfig.host} cwd={config.terminalConfig.path} command={genPreprocCmd(config)} caption="Data Cleaning Command" />
                <UbuntuTerminal user={config.terminalConfig.user} host={config.terminalConfig.host} cwd={config.terminalConfig.path} command={`echo "原始记录数: $(wc -l < ai4i2020.csv)"; echo "清洗后记录数: $(wc -l < cleaned.csv)"`} output={`原始记录数: ${totalRecords + 1}
清洗后记录数: ${cleanedRecords + 1}`} caption="Before and After Cleaning" />

                <h3 className="text-xl font-semibold mt-6 mb-4">3.4 清洗后数据验证</h3>
                <UbuntuTerminal user={config.terminalConfig.user} host={config.terminalConfig.host} cwd={config.terminalConfig.path} command="head -3 cleaned.csv" output={`UDI,Product ID,Type,Air temperature [K],Process temperature [K],Rotational speed [rpm],Torque [Nm],Tool wear [min],Machine failure
${data.udiStart},M13278,M,304.0,309.8,1294,44.9,34,0
${data.udiStart + 1},L13905,L,300.8,307.8,1539,20.1,64,0`} caption="Cleaned Data Sample" />

                <h3 className="text-xl font-semibold mt-6 mb-4">3.5 数据上传至HDFS</h3>
                <p className="mb-4 text-justify indent-8 leading-relaxed">
                    清洗完成后的数据需要上传至HDFS分布式文件系统，为后续的{config.techStack.database}存储和MapReduce分析提供数据基础。HDFS的上传操作使用hdfs dfs -put命令完成，上传前需要确认目标目录已创建。上传完成后，使用hdfs dfs -ls命令验证文件是否成功存储，使用hdfs dfs -count命令统计记录数，确保与本地清洗后的记录数一致，保证数据传输的完整性。
                </p>
                <UbuntuTerminal user={config.terminalConfig.user} host={config.terminalConfig.host} cwd={config.terminalConfig.path} command={genHDFSCleanPut(config)} caption="Upload to HDFS Distributed Storage" />

                <h3 className="text-xl font-semibold mt-6 mb-4">3.6 数据质量评估</h3>
                <div className="overflow-x-auto my-4">
                    <table className="min-w-full border border-gray-400 text-sm">
                        <thead className="bg-gray-100 border-b-2 border-gray-400">
                            <tr><th className="border px-2 py-1">质量指标</th><th className="border px-2 py-1">数值</th></tr>
                        </thead>
                        <tbody>
                            <tr><td className="border px-2 py-1">原始记录数</td><td className="border px-2 py-1">{totalRecords.toLocaleString()}条</td></tr>
                            <tr><td className="border px-2 py-1">清洗后记录数</td><td className="border px-2 py-1">{cleanedRecords.toLocaleString()}条</td></tr>
                            <tr><td className="border px-2 py-1">删除记录数</td><td className="border px-2 py-1">{totalRecords - cleanedRecords}条</td></tr>
                            <tr><td className="border px-2 py-1">数据完整性</td><td className="border px-2 py-1">100%（无缺失值）</td></tr>
                            <tr><td className="border px-2 py-1">格式一致性</td><td className="border px-2 py-1">100%（字段标准化）</td></tr>
                            <tr><td className="border px-2 py-1">异常值清除</td><td className="border px-2 py-1">已完成（物理阈值过滤）</td></tr>
                        </tbody>
                    </table>
                </div>

                <div className="mt-8">
                    <h4 className="text-lg font-semibold mb-2">3.7 小结</h4>
                    <p className="mb-4 text-justify indent-8 leading-relaxed">本章完成了工业传感器数据的预处理工作。通过对{totalRecords.toLocaleString()}条原始数据进行质量检查，制定了包含温度异常值过滤、转速扭矩范围检查、缺失值删除、格式标准化等内容的清洗规则。采用Linux Shell工具链（awk、sed、grep）构建了高效的数据清洗流水线，成功处理了所有原始数据，最终得到{cleanedRecords.toLocaleString()}条高质量记录。数据质量评估结果显示，数据完整性和一致性均达到100%。清洗后的数据已上传至HDFS分布式文件系统，为后续的{config.techStack.database}存储和MapReduce并行分析奠定了可靠的数据基础。预处理过程采用的技术方法具有较强的通用性，可应用于类似的大规模工业数据处理场景。</p>
                </div>
            </div>
        );
    }
};

export default IBDASection3Preprocessing;
