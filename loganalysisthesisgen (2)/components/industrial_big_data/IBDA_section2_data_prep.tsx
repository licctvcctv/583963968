import React from 'react';
import { UbuntuTerminal } from '../shared/Terminal';
import { STUDENT_CONFIGS, BASE_STATS, STUDENT_SAMPLE_DATA } from './IBDA_config';
import { getChapter2Text } from './assets/chapter2';
import { genHDFSPut, genHDFSVerify } from './terminalGenerators';

interface IBDASection2DataPrepProps {
    variantId?: number;
}

export const IBDASection2DataPrep: React.FC<IBDASection2DataPrepProps> = ({ variantId = 1 }) => {
    const numericVariantId = typeof variantId === 'number' ? variantId : 1;
    const config = STUDENT_CONFIGS[numericVariantId];
    const content = getChapter2Text(config);
    const data = STUDENT_SAMPLE_DATA[numericVariantId as keyof typeof STUDENT_SAMPLE_DATA] || STUDENT_SAMPLE_DATA[1];
    const totalRecords = data.totalRecords;

    // Different content structure per student
    if (config.id === 1) {
        // 学生1 - 详细的分步骤结构
        return (
            <div className="page bg-white w-[210mm] min-h-[297mm] mx-auto shadow-lg mb-8 p-12 font-serif">
                <h2 className="text-2xl font-bold mb-6 border-b-2 border-gray-300 pb-2">第2章 数据准备</h2>

                <h3 className="text-xl font-semibold mt-6 mb-4">2.1 数据获取与验证</h3>
                <p className="mb-4 text-justify indent-8 leading-relaxed">{content.download}</p>

                <h3 className="text-xl font-semibold mt-6 mb-4">2.2 数据增强与自定义字段</h3>
                <p className="mb-4 text-justify indent-8 leading-relaxed">{content.custom}</p>

                <div className="my-6 overflow-x-auto">
                    <table className="min-w-full border border-gray-400 text-sm">
                        <thead className="bg-gray-100 border-b-2 border-gray-400">
                            <tr>
                                <th className="border border-gray-400 p-2">字段名</th>
                                <th className="border border-gray-400 p-2">描述</th>
                                <th className="border border-gray-400 p-2">单位/类型</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td className="border border-gray-400 p-2">UDI</td><td className="border border-gray-400 p-2">唯一标识符</td><td className="border border-gray-400 p-2">Integer</td></tr>
                            <tr><td className="border border-gray-400 p-2">Type</td><td className="border border-gray-400 p-2">质量等级</td><td className="border border-gray-400 p-2">Char</td></tr>
                            <tr className="bg-blue-50"><td className="border border-gray-400 p-2 font-bold">{config.personalizedData.customField.split(' ')[0]}</td><td className="border border-gray-400 p-2">{config.personalizedData.customField}</td><td className="border border-gray-400 p-2">自定义</td></tr>
                            <tr><td className="border border-gray-400 p-2" colSpan={3}><span className="font-bold">数据规模：</span>原始记录 {BASE_STATS.uciRecords.toLocaleString()} 条 + 增量记录 {config.personalizedData.addedRecords} 条 = 总计 <span className="font-bold text-blue-600">{totalRecords.toLocaleString()}</span> 条</td></tr>
                        </tbody>
                    </table>
                </div>

                <h3 className="text-xl font-semibold mt-6 mb-4">2.3 环境准备</h3>
                <UbuntuTerminal user={config.terminalConfig.user} host={config.terminalConfig.host} cwd={config.terminalConfig.path} command="hdfs dfsadmin -report" output={`Configured Capacity: 150 GB\nPresent Capacity: 120 GB\nDFS Remaining: 100 GB`} caption="HDFS Cluster Status" />

                <h3 className="text-xl font-semibold mt-6 mb-4">2.4 HDFS目录创建</h3>
                <UbuntuTerminal user={config.terminalConfig.user} host={config.terminalConfig.host} cwd={config.terminalConfig.path} command={`hdfs dfs -mkdir -p /user/${config.terminalConfig.user}/{config.techStack.database.toLowerCase()}`} caption="Create HDFS Directory" />

                <h3 className="text-xl font-semibold mt-6 mb-4">2.5 数据上传</h3>
                <p className="mb-4 text-justify indent-8 leading-relaxed">{content.upload}</p>
                <UbuntuTerminal user={config.terminalConfig.user} host={config.terminalConfig.host} cwd={config.terminalConfig.path} command={genHDFSPut(config)} caption="Upload Data" />

                <div className="mt-8">
                    <h4 className="text-lg font-semibold mb-2">2.6 小结</h4>
                    <p className="mb-4 text-justify indent-8 leading-relaxed">本章完成了工业数据的准备工作。数据来源包括UCI机器学习仓库的AI4I 2020预测性维护数据集（{BASE_STATS.uciRecords.toLocaleString()}条原始记录）以及基于{config.personalizedData.customFieldLogic}生成的{config.personalizedData.addedRecords}条增量数据。数据增强策略通过添加{config.personalizedData.customField}字段，使数据集更贴合{config.analysisFocus.focusArea}的研究需求。HDFS分布式文件系统的环境准备和目录结构创建工作已完成，{totalRecords.toLocaleString()}条记录已成功上传至分布式存储，为后续的数据清洗、数据库存储和MapReduce并行分析奠定了基础。</p>
                </div>
            </div>
        );
    } else if (config.id === 2) {
        // 学生2 - 简洁的流程图+表格结构
        return (
            <div className="page bg-white w-[210mm] min-h-[297mm] mx-auto shadow-lg mb-8 p-12 font-serif">
                <h2 className="text-2xl font-bold mb-6 border-b-2 border-gray-300 pb-2">第2章 数据准备</h2>

                <h3 className="text-xl font-semibold mt-6 mb-4">2.1 数据来源</h3>
                <p className="mb-4 text-justify indent-8 leading-relaxed">{content.download}</p>
                <p className="mb-4 text-justify indent-8 leading-relaxed">
                    本次作业采用的数据集来源于UCI机器学习仓库的AI4I 2020预测性维护数据集，该数据集记录了工业设备在各种运行条件下的传感器读数和故障状态。原始数据集包含{BASE_STATS.uciRecords.toLocaleString()}条记录，每条记录对应一个设备在特定时刻的运行状态。数据采集自真实的工业生产线，具有较高的可信度和代表性。为了更好地满足{config.analysisFocus.focusArea}的研究需求，我们对原始数据进行了个性化的增强处理，添加了{config.personalizedData.customField}字段，使数据集更贴合本项目的分析目标。
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-4">2.2 数据增强</h3>
                <p className="mb-4 text-justify indent-8 leading-relaxed">{content.custom}</p>
                <p className="mb-4 text-justify indent-8 leading-relaxed">
                    数据增强的具体实现基于{config.personalizedData.customFieldLogic}。通过Python脚本批量生成了{config.personalizedData.addedRecords}条模拟数据，这些数据的UDI编号从{config.personalizedData.udiRange[0]}到{config.personalizedData.udiRange[1]}，与原始数据保持连续性。新增数据在保留原始数据统计特征的基础上，引入了更多的参数变化组合，使得数据集能够更全面地覆盖设备的各种运行状态。增强后的数据集总共包含{totalRecords.toLocaleString()}条记录，为后续的MapReduce并行分析提供了充足的数据基础。
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-4">2.3 操作流程</h3>
                <div className="my-6 p-4 border border-gray-300">
                    <table className="w-full text-sm">
                        <tbody>
                            <tr className="border-b"><td className="py-2 font-bold">步骤1</td><td className="py-2">从UCI官网下载AI4I 2020数据集</td></tr>
                            <tr className="border-b"><td className="py-2 font-bold">步骤2</td><td className="py-2">编写Python脚本生成{config.personalizedData.addedRecords}条增强数据</td></tr>
                            <tr className="border-b"><td className="py-2 font-bold">步骤3</td><td className="py-2">合并原始数据与增强数据，验证格式一致性</td></tr>
                            <tr className="border-b"><td className="py-2 font-bold">步骤4</td><td className="py-2">启动Hadoop集群，确认HDFS服务正常运行</td></tr>
                            <tr className="border-b"><td className="py-2 font-bold">步骤5</td><td className="py-2">创建HDFS目录结构，上传合并后的数据文件</td></tr>
                            <tr><td className="py-2 font-bold">步骤6</td><td className="py-2">执行HDFS命令验证数据上传完整性和文件大小</td></tr>
                        </tbody>
                    </table>
                </div>

                <h3 className="text-xl font-semibold mt-6 mb-4">2.4 HDFS环境准备</h3>
                <p className="mb-4 text-justify indent-8 leading-relaxed">
                    在数据上传之前，需要确保Hadoop集群处于正常运行状态。首先通过start-all.sh脚本启动HDFS和YARN服务，然后使用jps命令验证NameNode、DataNode、SecondaryNameNode等关键进程是否已成功启动。接下来使用hdfs dfs -mkdir命令创建数据存储目录，我们将原始数据存储在/data/raw路径下，将后续清洗后的数据存储在/data/processed路径下，这种目录结构便于数据版本的管理和追溯。HDFS的分布式存储特性能够确保数据的高可靠性，默认的三副本机制可以有效防止单点故障导致的数据丢失。
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-4">2.5 上传操作</h3>
                <p className="mb-4 text-justify indent-8 leading-relaxed">
                    数据上传使用hdfs dfs -put命令完成，该命令将本地文件系统中的数据文件复制到HDFS的指定目录。由于数据文件大小约为1.15MB，上传过程通常在几秒钟内即可完成。上传完成后，使用hdfs dfs -ls命令验证文件是否成功存储，使用hdfs dfs -du命令查看文件大小确认数据完整性。HDFS会自动将大文件切分成128MB的块进行存储，虽然当前数据规模尚未达到单块大小，但这种方式为后续更大规模的数据处理做好了准备。
                </p>
                <UbuntuTerminal user={config.terminalConfig.user} host={config.terminalConfig.host} cwd={config.terminalConfig.path} command={genHDFSPut(config)} output={genHDFSVerify(config)} caption="Upload and Verify" />

                <div className="mt-8">
                    <h4 className="text-lg font-semibold mb-2">2.6 小结</h4>
                    <p className="mb-4 text-justify indent-8 leading-relaxed">本章完成了数据获取与准备工作。数据来源包括UCI机器学习仓库的AI4I 2020预测性维护数据集，包含{BASE_STATS.uciRecords.toLocaleString()}条原始记录。基于{config.personalizedData.customFieldLogic}的数据增强策略，生成了{config.personalizedData.addedRecords}条增量数据，UDI编号范围从{config.personalizedData.udiRange[0]}到{config.personalizedData.udiRange[1]}。新增的{config.personalizedData.customField}字段有效提升了数据集对{config.analysisFocus.focusArea}研究目标的支撑能力。Hadoop集群环境准备完成，{totalRecords.toLocaleString()}条记录已成功上传至HDFS分布式文件系统，采用分层目录结构（/data/raw和/data/processed）便于数据版本管理和追溯。数据准备工作为后续的数据清洗、数据库存储和MapReduce并行分析奠定了坚实基础。</p>
                </div>
            </div>
        );
    } else if (config.id === 3) {
        // 学生3 - 技术导向的命令流结构
        return (
            <div className="page bg-white w-[210mm] min-h-[297mm] mx-auto shadow-lg mb-8 p-12 font-serif">
                <h2 className="text-2xl font-bold mb-6 border-b-2 border-gray-300 pb-2">第2章 数据获取与预处理</h2>

                <h3 className="text-xl font-semibold mt-6 mb-4">2.1 数据集描述</h3>
                <p className="mb-4 text-justify indent-8 leading-relaxed">{content.download}</p>

                <h3 className="text-xl font-semibold mt-6 mb-4">2.2 特征工程</h3>
                <div className="p-4 border-l-4 border-blue-500 bg-blue-50 mb-4">
                    <p className="font-semibold mb-2">新增特征：{config.personalizedData.customField}</p>
                    <p className="text-sm mt-1">计算逻辑：{config.personalizedData.customFieldLogic}</p>
                    <p className="text-sm mt-1">数据范围：UDI {config.personalizedData.udiRange[0]}-{config.personalizedData.udiRange[1]}</p>
                </div>

                <h3 className="text-xl font-semibold mt-6 mb-4">2.3 HDFS操作实录</h3>
                <UbuntuTerminal user={config.terminalConfig.user} host={config.terminalConfig.host} cwd={config.terminalConfig.path} command="hdfs dfs -mkdir -p /data/industrial" caption="Create Data Directory" />
                <UbuntuTerminal user={config.terminalConfig.user} host={config.terminalConfig.host} cwd={config.terminalConfig.path} command={genHDFSPut(config)} output={genHDFSVerify(config)} caption="Upload and Verify" />

                <h3 className="text-xl font-semibold mt-6 mb-4">2.4 数据校验</h3>
                <div className="overflow-x-auto my-4">
                    <table className="min-w-full border border-gray-400 text-sm">
                        <thead className="bg-gray-100"><tr><th className="border px-2 py-1">指标</th><th className="border px-2 py-1">值</th></tr></thead>
                        <tbody>
                            <tr><td className="border px-2 py-1">总记录数</td><td className="border px-2 py-1">{totalRecords.toLocaleString()}</td></tr>
                            <tr><td className="border px-2 py-1">原始数据</td><td className="border px-2 py-1">{BASE_STATS.uciRecords.toLocaleString()}</td></tr>
                            <tr><td className="border px-2 py-1">增量数据</td><td className="border px-2 py-1">{config.personalizedData.addedRecords}</td></tr>
                            <tr><td className="border px-2 py-1">HDFS路径</td><td className="border px-2 py-1">/data/industrial</td></tr>
                        </tbody>
                    </table>
                </div>

                <div className="mt-8">
                    <h4 className="text-lg font-semibold mb-2">2.5 小结</h4>
                    <p className="mb-4 text-justify indent-8 leading-relaxed">本章完成了数据获取与预处理工作。数据集来源于UCI AI4I 2020预测性维护数据集，包含{BASE_STATS.uciRecords.toLocaleString()}条原始记录。特征工程方面，基于{config.personalizedData.customFieldLogic}新增了{config.personalizedData.customField}字段，UDI编号范围从{config.personalizedData.udiRange[0]}到{config.personalizedData.udiRange[1]}。HDFS分布式文件系统操作已完成，{totalRecords.toLocaleString()}条记录已上传至/data/industrial目录。数据质量校验结果显示，总记录数、原始数据量和增量数据量均符合预期。数据准备工作为后续的{config.techStack.database}存储和MapReduce并行分析奠定了基础。</p>
                </div>
            </div>
        );
    } else {
        // 学生4 - 口语化的直接结构
        return (
            <div className="page bg-white w-[210mm] min-h-[297mm] mx-auto shadow-lg mb-8 p-12 font-serif">
                <h2 className="text-2xl font-bold mb-6 border-b-2 border-gray-300 pb-2">第2章 准备数据</h2>

                <h3 className="text-xl font-semibold mt-6 mb-4">2.1 下载数据</h3>
                <p className="mb-4 text-justify indent-8 leading-relaxed">{content.download}</p>

                <h3 className="text-xl font-semibold mt-6 mb-4">2.2 加点我自己的数据</h3>
                <p className="mb-4 text-justify indent-8 leading-relaxed">{content.custom}</p>

                <div className="p-4 bg-yellow-50 border border-yellow-300 mb-4">
                    <p className="font-semibold mb-2">新增数据统计：</p>
                    <p className="text-sm text-justify leading-relaxed">
                        为了让数据更符合咱们的分析需求，我在原来的基础上又增加了{config.personalizedData.addedRecords}条数据。这些新增数据的UDI编号是从{config.personalizedData.udiRange[0]}到{config.personalizedData.udiRange[1]}，跟原始数据连续上了。最重要的是，我给每条记录都加了一个{config.personalizedData.customField.split(' ')[0]}字段，这样就能更好地分析设备的运行状态了。加完这些数据之后，整个数据集一共就有{totalRecords.toLocaleString()}条记录，数据量够大，分析出来的结果应该也更靠谱一些。
                    </p>
                </div>

                <h3 className="text-xl font-semibold mt-6 mb-4">2.3 上传到Hadoop</h3>
                <UbuntuTerminal user={config.terminalConfig.user} host={config.terminalConfig.host} cwd={config.terminalConfig.path} command="hdfs dfs -mkdir -p /project/data" caption="Create Directory" />
                <UbuntuTerminal user={config.terminalConfig.user} host={config.terminalConfig.host} cwd={config.terminalConfig.path} command={genHDFSPut(config)} output={genHDFSVerify(config)} caption="Transfer Data" />

                <div className="mt-8">
                    <h4 className="text-lg font-semibold mb-2">2.4 小结</h4>
                    <p className="mb-4 text-justify indent-8 leading-relaxed">本章完成了数据准备工作。数据来源于UCI机器学习仓库的AI4I 2020预测性维护数据集。在原有{BASE_STATS.uciRecords.toLocaleString()}条原始记录的基础上，通过数据增强策略新增了{config.personalizedData.addedRecords}条记录，UDI编号从{config.personalizedData.udiRange[0]}到{config.personalizedData.udiRange[1]}。新增数据包含{config.personalizedData.customField}字段，以更好地支撑设备运行状态分析。数据集总规模达到{totalRecords.toLocaleString()}条记录。HDFS分布式存储环境准备完成，数据文件已成功上传至/project/data目录，为后续的数据清洗、数据库存储和MapReduce分析提供了数据基础。</p>
                </div>
            </div>
        );
    }
};

export default IBDASection2DataPrep;
