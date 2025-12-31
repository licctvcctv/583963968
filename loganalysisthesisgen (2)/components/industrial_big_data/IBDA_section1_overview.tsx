import React from 'react';
import { UbuntuTerminal } from '../shared/Terminal';
import { STUDENT_CONFIGS, BASE_STATS, STUDENT_SAMPLE_DATA } from './IBDA_config';
import { getChapter1Text } from './assets/chapter1';
import { getFaultName } from './contentGenerators';

interface IBDASection1OverviewProps {
    variantId?: number;
}

export const IBDASection1Overview: React.FC<IBDASection1OverviewProps> = ({ variantId = 1 }) => {
    const numericVariantId = typeof variantId === 'number' ? variantId : 1;
    const config = STUDENT_CONFIGS[numericVariantId];
    const content = getChapter1Text(config);
    const data = STUDENT_SAMPLE_DATA[numericVariantId as keyof typeof STUDENT_SAMPLE_DATA] || STUDENT_SAMPLE_DATA[1];

    // Different structure per student
    const renderStudent1 = () => (
        <>
            <h3 className="text-xl font-semibold mt-6 mb-4">1.1 项目背景</h3>
            <p className="mb-4 text-justify indent-8 leading-relaxed">{content.bg}</p>

            <h3 className="text-xl font-semibold mt-6 mb-4">1.2 数据集概览</h3>
            <p className="mb-4 text-justify indent-8 leading-relaxed">
                本次实验使用的数据集记录了工业设备在正常运行和故障状态下的传感器读数。
                数据集总体规模为{BASE_STATS.uciRecords.toLocaleString()}条记录（原始数据），
                另外新增{data.addedRecords}条模拟数据（UDI范围：{data.udiStart}-{data.udiEnd}），
                总计{data.totalRecords.toLocaleString()}条记录。
            </p>
            <p className="mb-4 text-justify indent-8 leading-relaxed">
                关键特征包括：空气温度（约{BASE_STATS.avgByType.L.temp.toFixed(2)}K）、工艺温度（约{BASE_STATS.avgByType.M.temp + 8}K）、
                转速（{BASE_STATS.avgByType.L.rpm}rpm左右）、扭矩（{BASE_STATS.avgByType.L.torque}Nm左右）等。
                故障类型包括：{config.analysisFocus.topFaultTypes.map(f => `${f}（${getFaultName(f)}）`).join('、')}。
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-4">1.3 研究目标</h3>
            <p className="mb-4 text-justify indent-8 leading-relaxed whitespace-pre-line">{content.purpose}</p>

            <h3 className="text-xl font-semibold mt-6 mb-4">1.4 技术架构</h3>
            <p className="mb-4 text-justify indent-8 leading-relaxed whitespace-pre-line">{content.route}</p>

            <div className="flex flex-col items-center justify-center space-y-2 my-8">
                <div className="border border-gray-400 p-4 rounded w-80 text-center bg-gray-50">
                    <div className="font-bold text-sm">数据获取 (CSV + {config.personalizedData.addedRecords}条增量)</div>
                </div>
                <div className="text-2xl text-gray-400">↓</div>
                <div className="border border-gray-400 p-4 rounded w-80 text-center bg-gray-50">
                    <div className="font-bold text-sm">数据预处理 (Linux Shell)</div>
                </div>
                <div className="text-2xl text-gray-400">↓</div>
                <div className="border border-gray-400 p-4 rounded w-80 text-center bg-gray-50">
                    <div className="font-bold text-sm">分布式存储 ({config.techStack.database})</div>
                </div>
                <div className="text-2xl text-gray-400">↓</div>
                <div className="border border-gray-400 p-4 rounded w-80 text-center bg-gray-50">
                    <div className="font-bold text-sm">离线计算 (MapReduce)</div>
                </div>
                <div className="text-2xl text-gray-400">↓</div>
                <div className="border border-gray-400 p-4 rounded w-80 text-center bg-gray-50">
                    <div className="font-bold text-sm">可视化分析</div>
                </div>
            </div>
        </>
    );

    const renderStudent2 = () => (
        <>
            <h3 className="text-xl font-semibold mt-6 mb-4">1.1 选题背景</h3>
            <p className="mb-4 text-justify indent-8 leading-relaxed">{content.bg}</p>

            <h3 className="text-xl font-semibold mt-6 mb-4">1.2 核心问题</h3>
            <div className="p-4 border border-gray-300 bg-gray-50 mb-4">
                <p className="font-semibold mb-2">本研究关注的核心问题：</p>
                <ol className="list-decimal pl-8 space-y-2">
                    <li>如何高效存储{BASE_STATS.uciRecords.toLocaleString()}+{config.personalizedData.addedRecords}条工业传感器数据？</li>
                    <li>{config.personalizedData.customField.split(' ')[0]}与设备故障率存在何种关联？</li>
                    <li>如何识别{config.analysisFocus.topFaultTypes.join('、')}等高风险故障模式？</li>
                    <li>MapReduce并行计算能否显著提升分析效率？</li>
                </ol>
            </div>

            <h3 className="text-xl font-semibold mt-6 mb-4">1.3 技术方案</h3>
            <div className="overflow-x-auto my-4">
                <table className="min-w-full border border-gray-400 text-sm">
                    <thead className="bg-gray-100 border-b-2 border-gray-400">
                        <tr>
                            <th className="border border-gray-400 p-2 text-left">技术组件</th>
                            <th className="border border-gray-400 p-2 text-left">选型</th>
                            <th className="border border-gray-400 p-2 text-left">用途</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border border-gray-400 p-2">分布式存储</td>
                            <td className="border border-gray-400 p-2">HDFS + {config.techStack.database}</td>
                            <td className="border border-gray-400 p-2">存储{BASE_STATS.uciRecords.toLocaleString()}+{config.personalizedData.addedRecords}条记录</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-400 p-2">数据预处理</td>
                            <td className="border border-gray-400 p-2">Linux Shell (awk/sed/grep)</td>
                            <td className="border border-gray-400 p-2">清洗异常值、格式标准化</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-400 p-2">并行计算</td>
                            <td className="border border-gray-400 p-2">MapReduce</td>
                            <td className="border border-gray-400 p-2">{config.techStack.mapReduceAlgorithm}</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-400 p-2">可视化</td>
                            <td className="border border-gray-400 p-2">Python Matplotlib</td>
                            <td className="border border-gray-400 p-2">饼图、柱状图展示</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );

    const renderStudent3 = () => (
        <>
            <h3 className="text-xl font-semibold mt-6 mb-4">1.1 研究动机</h3>
            <p className="mb-4 text-justify indent-8 leading-relaxed">{content.bg}</p>
            <p className="mb-4 text-justify indent-8 leading-relaxed">
                随着工业4.0战略的深入推进和智能制造的快速发展，工业设备的复杂度和自动化水平不断提高，对设备运维管理提出了更高的要求。传统的定期维护模式存在维护过度或维护不足的问题，既增加了维护成本，又无法有效避免突发故障导致的设备停机。基于数据驱动的预测性维护技术，通过实时监测设备运行状态、分析历史数据模式、预测潜在故障风险，能够实现从被动维修向主动预防的转变，显著提升设备可靠性和生产效率。本项目正是在这一背景下展开，旨在运用大数据处理技术探索工业设备故障分析的有效方法。
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-4">1.2 问题定义</h3>
            <div className="p-4 border-l-4 border-blue-500 bg-blue-50 mb-4">
                <p className="font-semibold">研究问题：</p>
                <p className="mt-2">在工业4.0背景下，如何利用{config.techStack.database}构建可扩展的传感器数据存储与分析平台，并基于{config.personalizedData.customField.split(' ')[0]}特征实现{config.analysisFocus.focusArea}？</p>
            </div>
            <p className="mb-4 text-justify indent-8 leading-relaxed">
                本研究的核心问题可以进一步分解为以下几个子问题：首先，如何高效地存储和管理{BASE_STATS.uciRecords.toLocaleString()}条工业传感器数据？这需要选择合适的分布式存储方案，确保数据的可扩展性和高可用性。其次，如何从海量数据中提取有价值的信息？这需要设计有效的数据处理流程和分析算法。第三，{config.personalizedData.customField.split(' ')[0]}参数与设备故障之间是否存在显著的关联关系？这需要通过数据分析和统计验证来回答。最后，如何将分析结果转化为实际的运维决策支持？这需要将技术分析结果与工业场景的业务需求相结合，提出可操作的优化建议。
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-4">1.3 技术架构设计</h3>
            <p className="mb-4 text-justify indent-8 leading-relaxed">{content.route}</p>
            <p className="mb-4 text-justify indent-8 leading-relaxed">
                项目采用分层架构设计，包括数据层、存储层、计算层和应用层。数据层负责原始数据的采集和初步处理，采用Linux Shell工具链实现高效的数据清洗和格式转换。存储层基于HDFS分布式文件系统实现数据的可靠存储，利用{config.techStack.database}数据库提供灵活的数据访问能力。计算层采用MapReduce并行计算框架，实现大规模数据的分布式处理和分析。应用层通过Python可视化库实现分析结果的图形化展示，将复杂的数据分析结论转化为直观易懂的可视化图表。这种分层架构设计保证了系统的可扩展性、可维护性和可复用性。
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-4">1.4 预期成果</h3>
            <div className="overflow-x-auto my-4">
                <table className="min-w-full border border-gray-400 text-sm">
                    <thead className="bg-gray-100 border-b-2 border-gray-400">
                        <tr>
                            <th className="border border-gray-400 p-2 text-left">成果类型</th>
                            <th className="border border-gray-400 p-2 text-left">具体内容</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border border-gray-400 p-2">数据平台</td>
                            <td className="border border-gray-400 p-2">构建包含{BASE_STATS.uciRecords.toLocaleString()}+{config.personalizedData.addedRecords}条记录的工业传感器数据库</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-400 p-2">分析模型</td>
                            <td className="border border-gray-400 p-2">实现基于{config.personalizedData.customField.split(' ')[0]}的故障特征分析</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-400 p-2">故障画像</td>
                            <td className="border border-gray-400 p-2">输出{config.analysisFocus.topFaultTypes.length}类主要故障的特征分布和统计规律</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-400 p-2">性能验证</td>
                            <td className="border border-gray-400 p-2">验证{config.techStack.database}在工业场景下的读写性能和查询效率</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-400 p-2">优化建议</td>
                            <td className="border border-gray-400 p-2">基于数据分析结果的设备维护策略优化建议</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p className="mb-4 text-justify indent-8 leading-relaxed">
                通过本项目的实施，预期将在技术层面掌握Hadoop生态系统的核心组件的使用方法，包括HDFS分布式存储、MapReduce并行计算、NoSQL数据库应用等。在应用层面，将建立一套完整的工业大数据分析流程，从数据获取、预处理、存储、分析到可视化，形成可复用的技术方案。在业务层面，将识别出影响设备可靠性的关键因素，为工业现场的设备管理提供数据支撑和决策参考。这些预期成果的达成将证明大数据技术在工业运维领域的应用价值。
            </p>
        </>
    );

    const renderStudent4 = () => (
        <>
            <h3 className="text-xl font-semibold mt-6 mb-4">1.1 项目背景与意义</h3>
            <p className="mb-4 text-justify indent-8 leading-relaxed">{content.bg}</p>
            <p className="mb-4 text-justify indent-8 leading-relaxed">
                在工业4.0和智能制造的时代背景下，工业设备正朝着智能化、网络化、数据化的方向快速发展。设备产生的传感器数据量呈指数级增长，这些数据中蕴含着设备运行状态、健康水平、故障征兆等重要信息。如何有效地采集、存储、分析和利用这些数据，成为工业运维管理面临的关键问题。传统的设备维护方式主要依赖人工经验和定期检修，存在响应滞后、资源浪费、无法预测等问题。大数据技术的出现为解决这些问题提供了新的思路，通过对海量设备数据的深入分析，可以实现故障的早期预警和精准定位，为预测性维护提供数据支撑。
            </p>
            <p className="mb-4 text-justify indent-8 leading-relaxed">
                本项目以工业设备预测性维护为应用场景，选择{config.techStack.database}作为数据存储方案，采用MapReduce并行计算框架进行数据分析，旨在构建一套完整的工业大数据处理与分析系统。项目的研究意义主要体现在三个方面：一是技术层面，通过实际项目掌握Hadoop生态系统和NoSQL数据库的应用方法；二是方法层面，探索工业传感器数据的分析方法和故障特征提取技术；三是应用层面，为工业现场的设备管理提供数据驱动的决策支持。项目的实施将有助于提升设备运维的智能化水平，降低维护成本，提高生产效率。
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-4">1.2 数据集描述</h3>
            <div className="overflow-x-auto my-4">
                <table className="min-w-full border border-gray-400 text-sm">
                    <thead className="bg-gray-100 border-b-2 border-gray-400">
                        <tr>
                            <th className="border border-gray-400 p-2 text-left">数据属性</th>
                            <th className="border border-gray-400 p-2 text-left">描述</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border border-gray-400 p-2">数据来源</td>
                            <td className="border border-gray-400 p-2">UCI机器学习仓库 AI4I 2020预测性维护数据集</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-400 p-2">数据规模</td>
                            <td className="border border-gray-400 p-2">原始数据{BASE_STATS.uciRecords.toLocaleString()}条 + 增强数据{config.personalizedData.addedRecords}条 = {BASE_STATS.uciRecords + config.personalizedData.addedRecords}条总计</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-400 p-2">传感器数量</td>
                            <td className="border border-gray-400 p-2">每条记录包含{BASE_STATS.features}个传感器读数或状态字段</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-400 p-2">故障记录比例</td>
                            <td className="border border-gray-400 p-2">约{BASE_STATS.failureRate}%的数据为故障记录</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-400 p-2">自定义字段</td>
                            <td className="border border-gray-400 p-2">{config.personalizedData.customField.split(' ')[0]}（{config.personalizedData.customField}）</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-400 p-2">设备类型</td>
                            <td className="border border-gray-400 p-2">L（低质量）、M（中质量）、H（高质量）三种类型</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p className="mb-4 text-justify indent-8 leading-relaxed">
                数据集记录了工业设备在各种运行条件下的传感器读数，包括空气温度、工艺温度、转速、扭矩、工具磨损等关键参数。每条记录还包含设备类型标识和故障标记，标注了该时刻是否发生故障以及故障的具体类型。为了更好地支撑{config.analysisFocus.focusArea}的研究目标，项目在原始数据基础上进行了数据增强，新增了{config.personalizedData.customField}字段，该字段基于{config.personalizedData.customFieldLogic}计算得出，能够反映设备运行的综合效率水平。
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-4">1.3 技术路线</h3>
            <p className="mb-4 text-justify indent-8 leading-relaxed whitespace-pre-line">{content.route}</p>
            <p className="mb-4 text-justify indent-8 leading-relaxed">
                项目的技术路线遵循大数据处理的标准流程。首先，在数据准备阶段，从公开数据源获取原始数据集，通过数据增强技术添加自定义字段，形成完整的数据基础。其次，在数据预处理阶段，采用Linux Shell工具链对原始数据进行清洗，包括异常值过滤、缺失值处理、格式标准化等操作，确保数据质量。第三，在数据存储阶段，利用HDFS分布式文件系统实现数据的高可靠存储，通过{config.techStack.database}数据库提供灵活的数据访问接口。第四，在数据分析阶段，采用MapReduce并行计算框架实现故障类型的统计分析，提取关键故障特征。最后，在结果展示阶段，使用Python可视化库将分析结果以图形方式呈现，形成直观易懂的分析报告。
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-4">1.4 研究目标</h3>
            <p className="mb-4 text-justify indent-8 leading-relaxed whitespace-pre-line">{content.purpose}</p>
            <p className="mb-4 text-justify indent-8 leading-relaxed">
                本项目的核心研究目标包括以下几个方面：第一，搭建基于Hadoop生态系统的工业大数据处理平台，验证分布式技术在工业场景下的适用性；第二，设计和实现数据预处理流程，探索工业传感器数据清洗的有效方法；第三，应用MapReduce并行计算技术，实现大规模设备数据的故障统计分析；第四，基于{config.personalizedData.customField.split(' ')[0]}等关键参数，分析设备运行状态与故障发生之间的关联关系；第五，根据分析结果提出设备维护优化建议，为实际生产提供决策支持。通过这些目标的达成，项目将形成一套完整的工业大数据分析解决方案，为类似问题的解决提供参考。
            </p>
        </>
    );

    return (
        <div className="page bg-white w-[210mm] min-h-[297mm] mx-auto shadow-lg mb-8 p-12 font-serif">
            <h2 className="text-2xl font-bold mb-6 border-b-2 border-gray-300 pb-2">
                第1章 作业概述
            </h2>

            {config.id === 1 && renderStudent1()}
            {config.id === 2 && renderStudent2()}
            {config.id === 3 && renderStudent3()}
            {config.id === 4 && renderStudent4()}
        </div>
    );
};

export default IBDASection1Overview;
