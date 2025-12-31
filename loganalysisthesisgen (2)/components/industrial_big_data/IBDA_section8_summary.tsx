import React from 'react';
import { STUDENT_CONFIGS, BASE_STATS, STUDENT_SAMPLE_DATA } from './IBDA_config';
import { getFaultName } from './contentGenerators';

interface IBDA_Section8SummaryProps {
    variantId?: number;
}

export const IBDA_Section8Summary: React.FC<IBDA_Section8SummaryProps> = ({ variantId = 1 }) => {
    const numericVariantId = typeof variantId === 'number' ? variantId : 1;
    const config = STUDENT_CONFIGS[numericVariantId];
    const data = STUDENT_SAMPLE_DATA[numericVariantId as keyof typeof STUDENT_SAMPLE_DATA] || STUDENT_SAMPLE_DATA[1];
    const cleanedRecords = data.cleanedRecords;

    // Different structure per student
    if (config.id === 1) {
        return (
            <div className="page bg-white w-[210mm] min-h-[297mm] mx-auto shadow-lg mb-8 p-12 font-serif">
                <h2 className="text-2xl font-bold mb-6 border-b-2 border-gray-300 pb-2">第8章 总结与展望</h2>

                <h3 className="text-xl font-semibold mt-6 mb-4">8.1 项目总结</h3>
                <p className="mb-4 text-justify indent-8 leading-relaxed">
                    本次工业大数据分析课程大作业，以工业设备预测性维护为应用背景，系统性地完成了从数据采集、预处理、存储、分析到可视化展示的完整数据处理流程。项目基于Hadoop分布式计算平台，处理了{cleanedRecords.toLocaleString()}条工业设备运行数据，通过MapReduce并行编程实现了故障类型的统计分析，最终识别出{config.analysisFocus.topFaultTypes[0]}（{getFaultName(config.analysisFocus.topFaultTypes[0])}）为需要重点关注的主要故障类型。
                </p>
                <p className="mb-4 text-justify indent-8 leading-relaxed">
                    在技术实现层面，项目首先成功搭建了包含HDFS分布式文件系统和MapReduce并行计算框架的Hadoop开发环境，为后续数据处理任务奠定了基础。在数据准备阶段，我们从UCI机器学习库获取了AI4I 2020预测性维护数据集，并基于设备运行参数特征进行了个性化数据增强，新增了{config.personalizedData.customField}字段，使数据集更好地服务于{config.analysisFocus.focusArea}的研究目标。数据预处理环节采用Linux Shell命令完成了异常值过滤、格式统一等清洗操作，确保了分析数据的质量。
                </p>
                <p className="mb-4 text-justify indent-8 leading-relaxed">
                    在数据存储与分析方面，项目采用了{config.techStack.database}数据库实现清洗后数据的高效存储，设计了基于{config.techStack.rowKeyDesign}的存储结构，支持按设备类型和唯一标识符的快速查询。MapReduce编程环节实现了故障类型的并行统计算法，通过"Mapper提取故障类型、Reducer累加计数"的两阶段处理模式，充分发挥了分布式计算的优势，显著提升了大规模数据处理效率。最终，通过Python Matplotlib库生成了多维度可视化图表，包括故障类型分布柱状图、设备类型参数对比图等，将抽象的数据分析结果转化为直观易懂的图形展示。
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-4">8.2 心得体会</h3>
                <p className="mb-4 text-justify indent-8 leading-relaxed">
                    通过本次课程大作业的完整实践，我在理论知识和实操技能两个层面都获得了显著的提升。在知识理解方面，深入学习了Hadoop生态系统的核心技术原理，包括HDFS的分布式存储机制、MapReduce的并行计算模型、以及{config.techStack.database}数据库的NoSQL存储架构。这些理论知识在项目实践中得到了验证和巩固，让我对大数据技术的整体架构和各组件之间的协作关系有了更加系统和深入的认识。
                </p>
                <p className="mb-4 text-justify indent-8 leading-relaxed">
                    在技能培养方面，项目实践锻炼了我的全栈式数据处理能力。从Linux命令行的数据预处理操作，到Java语言的MapReduce程序编写与调试，再到Python的数据可视化实现，整个流程涵盖了数据工程领域的多个关键技术环节。特别是在解决实际问题的过程中，我学会了如何阅读官方技术文档、如何在社区论坛中搜索类似问题的解决方案、如何通过系统化的调试方法定位程序错误，这些自主学习和问题解决能力的提升是课程带给我最宝贵的收获。
                </p>
                <p className="mb-4 text-justify indent-8 leading-relaxed">
                    在项目实施过程中，我也遇到了一些具有挑战性的技术问题。例如，在MapReduce程序调试阶段，曾遇到数据格式解析错误的问题，经过逐步排查发现是CSV文件中存在特殊字符导致的，通过修改分隔逻辑和使用正则表达式匹配最终解决了该问题。另外，在可视化图表制作环节，中文字体的显示也花费了一些时间进行配置。这些问题的解决过程让我深刻体会到，实际工程开发往往需要处理各种边界情况和细节问题，耐心和细致是完成高质量项目的重要素质。
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-4">8.3 不足与改进</h3>
                <p className="mb-4 text-justify indent-8 leading-relaxed">
                    客观地审视本次项目，仍存在一些可以改进和优化的地方。首先，在数据预处理环节，目前采用的是基于规则的简单清洗方法，主要通过设定阈值范围来过滤异常值，这种方式虽然能够处理明显错误的数据，但对于更隐蔽的数据质量问题可能不够敏感。如果未来能够引入统计分析方法或机器学习算法来辅助异常检测，应该能够更准确地识别出需要处理的问题数据。
                </p>
                <p className="mb-4 text-justify indent-8 leading-relaxed">
                    其次，在MapReduce程序实现方面，目前的代码结构相对简单，没有进行深度的性能优化。例如，可以引入Combiner组件在Map阶段进行本地聚合，减少网络传输的数据量；或者根据数据分布特点设计更优化的分区策略，实现更均衡的负载分配。这些优化措施对于处理更大规模的数据集时将会发挥更加明显的作用，也是后续可以深入研究的方向。
                </p>
                <p className="mb-4 text-justify indent-8 leading-relaxed">
                    在分析深度方面，目前的工作主要集中在描述性统计分析层面，通过故障频次统计和参数对比得出了初步的分析结论。如果能够进一步引入时间序列分析，研究故障发生的时间规律和趋势变化，或者运用关联规则挖掘发现不同参数之间的复杂关系，分析结果将会具有更强的预测性和指导价值。此外，结合机器学习算法构建故障预测模型，实现对潜在故障的提前预警，这也是工业大数据应用的重要发展方向。
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-4">8.4 未来展望</h3>
                <p className="mb-4 text-justify indent-8 leading-relaxed">
                    展望未来，工业大数据分析技术将在智能制造和工业互联网的发展中扮演越来越重要的角色。随着工业物联网设备的大规模部署，数据采集的粒度和频度将持续提升，海量实时数据的处理需求对传统的批处理模式提出了新的挑战。引入Spark Streaming或Apache Flink等流式计算框架，实现设备运行状态的实时监控和异常的即时响应，将是技术演进的重要方向。这种从离线分析向实时分析的转变，能够显著提升故障响应速度，减少设备停机时间，为企业创造更大的经济价值。
                </p>
                <p className="mb-4 text-justify indent-8 leading-relaxed">
                    在人工智能技术日益成熟的背景下，将机器学习和深度学习算法融入工业大数据分析平台具有广阔的应用前景。通过训练故障预测模型，可以实现从被动维护向主动预防的转变。例如，利用LSTM等循环神经网络对设备运行时间序列数据进行建模，能够捕捉参数变化的细微趋势，提前预测可能发生的故障类型和时间窗口。此外，数字孪生技术作为连接物理设备和虚拟模型的桥梁，可以在虚拟空间中模拟设备的运行状态和维护策略，为优化维护方案提供试验平台，这些都是未来可以深入探索的技术方向。
                </p>
                <p className="mb-4 text-justify indent-8 leading-relaxed">
                    从应用拓展的角度来看，单一设备类型的数据分析只是工业大数据应用的起点。未来可以逐步扩大数据规模，将更多类型的工业设备纳入统一的分析平台，构建跨设备、跨产线的综合监测系统。同时，整合生产计划、维护记录、供应链管理等多源数据，实现从设备级监控向工厂级优化的跃升。通过开发移动端应用和可视化大屏，将数据分析结果以更便捷的方式呈现给管理人员和一线操作人员，提升数据服务的可及性和实用性，真正实现数据驱动决策的智能化管理目标。
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-4">8.5 结语</h3>
                <p className="mb-4 text-justify indent-8 leading-relaxed">
                    大数据时代已经到来，工业大数据分析技术正在深刻改变着传统制造业的生产方式和运维模式。通过本次课程大作业的系统实践，我不仅掌握了Hadoop等大数据处理技术的应用方法，更重要的是培养了一种数据驱动的思维方式，学会了从海量数据中挖掘价值信息、发现潜在规律的分析能力。这次项目经历让我深刻认识到，技术服务于业务需求，优秀的大数据分析解决方案需要充分理解工业场景的实际问题，将技术能力与领域知识有机结合，才能发挥出最大的价值。
                </p>
                <p className="mb-4 text-justify indent-8 leading-relaxed">
                    在未来的学习和工作中，我将继续关注工业大数据领域的前沿技术发展，不断扩充自己的知识储备和技术能力。希望通过持续的学习和实践，能够在智能制造和工业互联网的浪潮中找到自己的定位，为推动制造业的数字化、智能化转型贡献自己的一份力量。感谢课程组老师的悉心指导和同学们的帮助，这次课程大作业的经历将成为我成长道路上宝贵的财富。
                </p>

                <div className="mt-8 pt-4 border-t-2 border-gray-300 text-center">
                    <p className="text-sm text-gray-600">—— 报告完 ——</p>
                </div>
            </div>
        );
    } else if (config.id === 2) {
        return (
            <div className="page bg-white w-[210mm] min-h-[297mm] mx-auto shadow-lg mb-8 p-12 font-serif">
                <h2 className="text-2xl font-bold mb-6 border-b-2 border-gray-300 pb-2">第8章 总结与展望</h2>

                <h3 className="text-xl font-semibold mt-6 mb-4">8.1 项目总结</h3>
                <p className="mb-4 text-justify indent-8 leading-relaxed">
                    本报告系统记录了基于Hadoop生态系统的工业大数据分析项目实施全过程。项目以UCI AI4I 2020工业设备数据集为基础，通过数据增强技术新增了{config.personalizedData.customField}字段，最终形成了包含{cleanedRecords.toLocaleString()}条有效记录的数据集。经过数据清洗、分布式存储、并行分析、结果可视化等环节的完整处理流程，成功识别出{config.analysisFocus.topFaultTypes[0]}（{getFaultName(config.analysisFocus.topFaultTypes[0])}）为发生频次最高的故障类型，验证了高负载条件与设备故障之间的显著关联性。
                </p>
                <p className="mb-4 text-justify indent-8 leading-relaxed">
                    技术实现方面，项目构建了稳定的Hadoop伪分布式开发环境，熟练运用HDFS命令实现了数据的分布式存储和管理。数据预处理阶段综合运用了grep、sed、awk等Linux文本处理工具，完成了异常值过滤、空值剔除、格式标准化等清洗任务，使原始数据的完整性得到有效保障。存储层采用{config.techStack.database}数据库，设计了基于{config.techStack.rowKeyDesign}的索引结构，实现了高效的按设备类型扫描和单条记录快速查询功能。MapReduce分析环节编写了故障统计聚合程序，通过并行计算显著提升了处理效率，最终统计结果与预期分析目标高度吻合。
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-4">8.2 心得体会</h3>
                <p className="mb-4 text-justify indent-8 leading-relaxed">
                    本次课程大作业是对工业大数据分析全流程的一次系统性实践。在项目推进过程中，我深刻体会到完整的数据分析项目需要扎实的理论基础和丰富的实践经验相结合。理论知识为项目实施提供了指导框架，帮助我理解各技术组件的适用场景和设计原理。而实践操作则让我真正掌握了命令行工具的使用技巧、Java编程的调试方法、以及数据可视化的呈现技巧，这些动手能力的培养是单纯依靠书本学习无法获得的。
                </p>
                <p className="mb-4 text-justify indent-8 leading-relaxed">
                    项目中遇到的技术挑战主要集中在环境配置和程序调试两个环节。Hadoop生态系统的组件众多，各组件之间的版本兼容性配置较为复杂，初期在搭建开发环境时花费了较多时间。通过查阅官方文档、参考社区教程、反复测试验证，最终成功搭建了稳定可用的开发平台。这个经历让我认识到，在实际工程开发中，环境搭建虽然不直接产生业务价值，却是项目成功的基石，需要给予足够的重视和耐心。在MapReduce程序调试过程中，分布式系统的调试难度远高于单机程序，需要通过日志分析和逐步排查来定位问题，这种系统化的调试方法对我的技术能力提升很有帮助。
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-4">8.3 不足与改进</h3>
                <p className="mb-4 text-justify indent-8 leading-relaxed">
                    回顾项目实施过程，虽然达成了预定的分析目标，但在技术深度和应用广度方面仍有提升空间。数据预处理方面，目前的清洗规则主要基于业务经验和简单阈值，缺少对数据统计分布特性的深入分析，可能遗漏一些不符合常规但实际有效的数据模式。如果能够结合数据探索分析，了解各字段的分布特征和相关性，将有助于设计更加科学合理的清洗策略。另外，对于缺失值的处理目前采用的是直接删除的方式，这在数据量充足时是可行的，但当数据规模增大或关键字段存在缺失时，可能需要考虑插值填补等更精细的处理方法。
                </p>
                <p className="mb-4 text-justify indent-8 leading-relaxed">
                    分析算法方面，当前实现的故障统计属于基础的聚合分析，虽然能够回答"发生了什么"的问题，但对于"为什么发生"和"将来可能发生什么"的预测性问题的解答能力有限。工业设备的故障往往是多因素共同作用的结果，单一维度的频次统计难以揭示复杂的因果关系。后续可以引入相关性分析、因果推断等高级分析方法，更深入地挖掘设备参数与故障类型之间的关联机制。此外，结合时间序列数据进行趋势分析，探索故障发生的周期性规律和演化趋势，将有助于实现从故障统计向故障预测的能力跃升。
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-4">8.4 未来展望</h3>
                <p className="mb-4 text-justify indent-8 leading-relaxed">
                    随着工业4.0战略的深入推进，工业大数据分析技术将在制造业转型升级中发挥日益重要的支撑作用。从技术演进趋势来看，批处理模式向流处理模式的转变是必然方向，引入Spark Streaming等实时计算框架可以实现设备状态的秒级监控和故障的毫秒级响应，这对于高价值设备的保护具有重要意义。同时，机器学习技术与大数据平台的深度融合将赋予系统更强的智能决策能力，通过训练故障预测模型，可以实现从被动事后维修向主动事前预防的转变，显著降低设备停机带来的经济损失。
                </p>
                <p className="mb-4 text-justify indent-8 leading-relaxed">
                    在应用拓展方面，单设备单场景的分析只是起点，未来可以构建覆盖全厂设备的综合监测平台，实现跨设备类型的统一管理和横向对比分析。整合多源异构数据，将设备运行数据与生产计划、维护记录、供应链信息等业务数据进行关联分析，能够从更宏观的视角发现优化机会。开发面向不同角色的应用界面，为管理人员提供决策支持大屏，为维护人员提供移动工单APP，为操作人员提供设备健康度仪表盘，通过分层分级的信息服务，提升整个组织的数据驱动决策能力。
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-4">8.5 结语</h3>
                <p className="mb-4 text-justify indent-8 leading-relaxed">
                    本次工业大数据分析课程大作业的顺利完成，标志着我对Hadoop生态系统和工业数据处理技术有了系统性的掌握。从最初的环境搭建困难，到后来的熟练操作；从面对大量数据时的无所适从，到后来能够设计完整的分析方案，这个成长过程让我深刻体会到实践出真知的道理。技术能力的提升需要经历反复的尝试、遇到问题、解决问题、总结经验的过程，每一次挫折都是通往成功的阶梯。
                </p>
                <p className="mb-4 text-justify indent-8 leading-relaxed">
                    感谢课程老师的精心指导，感谢同学们的互助交流。工业大数据领域技术更新迅速、应用前景广阔，我将以本次项目为新的起点，继续保持学习的热情，关注技术发展动态，努力将所学知识应用到实际工作中，为推动制造业的智能化转型贡献自己的一份力量。
                </p>

                <div className="mt-8 pt-4 border-t-2 border-gray-300 text-center">
                    <p className="text-sm text-gray-600">—— 报告完 ——</p>
                </div>
            </div>
        );
    } else if (config.id === 3) {
        return (
            <div className="page bg-white w-[210mm] min-h-[297mm] mx-auto shadow-lg mb-8 p-12 font-serif">
                <h2 className="text-2xl font-bold mb-6 border-b-2 border-gray-300 pb-2">第8章 总结与展望</h2>

                <h3 className="text-xl font-semibold mt-6 mb-4">8.1 项目总结</h3>
                <p className="mb-4 text-justify indent-8 leading-relaxed">
                    本项目以工业设备预测性维护为应用场景，基于Hadoop大数据平台完成了{cleanedRecords.toLocaleString()}条设备运行数据的全流程分析。项目的技术路线涵盖数据获取与增强、Linux命令行预处理、{config.techStack.database}数据库存储、MapReduce并行计算、Python可视化分析等核心环节，最终实现了对{config.personalizedData.customField}与设备故障关系的深入探索。通过系统的数据分析，识别出{config.analysisFocus.topFaultTypes[0]}（{getFaultName(config.analysisFocus.topFaultTypes[0])}）为关键风险因素，验证了温度异常对设备稳定性的显著影响，为工业场景下的预测性维护决策提供了数据支撑。
                </p>
                <p className="mb-4 text-justify indent-8 leading-relaxed">
                    技术架构层面，项目采用分层设计实现了各技术组件的有机集成。数据层使用HDFS实现原始数据和清洗数据的分布式存储，利用{config.techStack.database}的文档型存储特性构建了灵活的设备运行数据模型，采用{config.techStack.rowKeyDesign}作为主键设计，支持高效的按设备查询。计算层基于MapReduce编程模型实现了故障类型的并行统计算法，通过自定义的Mapper和Reducer函数完成了数据提取和聚合计算，充分发挥了分布式计算的并行处理优势。应用层通过Python Matplotlib库实现了分析结果的可视化呈现，将抽象的数据分析结论转化为直观的图形展示，提升了结果的可解释性和可传达性。
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-4">8.2 心得体会</h3>
                <p className="mb-4 text-justify indent-8 leading-relaxed">
                    本次课程大作业是一次将理论知识转化为工程实践的有益尝试。在学习Hadoop相关技术的过程中，我深刻认识到分布式系统设计与传统单机应用开发的显著差异。分布式环境下的数据分区、任务调度、容错处理等机制，使得系统在获得横向扩展能力的同时，也带来了编程复杂度的提升。MapReduce计算模型虽然简化了并行编程的难度，但要将实际问题抽象为Map和Reduce两个阶段的操作，仍需要对问题本质有深刻的理解。这种思维方式的转变是我通过本项目获得的重要收获。
                </p>
                <p className="mb-4 text-justify indent-8 leading-relaxed">
                    在项目实施过程中，技术文档的阅读能力和代码调试技能得到了显著提升。Hadoop生态系统的官方文档内容详实但信息量巨大，学会快速定位所需信息并准确理解技术细节是高效学习的关键。在遇到MapReduce程序运行异常时，通过分析日志文件、查看任务计数器、检查中间输出等方式进行系统化调试，最终定位问题所在并成功解决。这种独立解决技术问题的过程不仅增强了信心，也培养了面对复杂系统时的分析思维和耐心品质。
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-4">8.3 不足与改进</h3>
                <p className="mb-4 text-justify indent-8 leading-relaxed">
                    对项目进行技术复盘，可以发现几个可以进一步优化的方面。首先是MapReduce程序的效率优化。当前实现没有使用Combiner组件，Map阶段的输出需要全部传输到Reduce节点，在网络传输开销和Reduce端内存压力方面存在优化空间。通过在Map节点进行本地预聚合，可以显著减少shuffle阶段的数据传输量，这对于处理更大规模数据集时尤为重要。另外，数据倾斜问题在当前数据规模下影响不明显，但如果数据分布不均匀，某些Reduce节点处理时间过长可能成为整体性能的瓶颈，需要考虑更合理的分区策略。
                </p>
                <p className="mb-4 text-justify indent-8 leading-relaxed">
                    分析深度的提升是另一个改进方向。当前的分析工作主要集中在故障类型的频次统计和设备参数的对比分析，属于描述性统计的范畴。虽然能够揭示数据的基本特征，但对于故障发生的内在机制和预测性信息的挖掘尚有不足。引入更高级的分析方法，如基于时间序列的趋势分析、基于相关性的因素分析、基于机器学习的预测建模等，可以进一步提升分析结果的深度和前瞻性。特别是针对{config.personalizedData.customField}这一关键风险因素，可以建立更加精细的风险评估模型，实现风险的量化度量。
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-4">8.4 未来展望</h3>
                <p className="mb-4 text-justify indent-8 leading-relaxed">
                    展望工业大数据技术的发展方向，实时化、智能化、平台化是三个重要的演进趋势。实时化方面，随着工业物联网设备数据采集频率的不断提升，批处理模式已经无法满足毫秒级响应的需求，引入流式计算框架实现实时数据处理和异常检测是技术发展的必然选择。智能化方面，机器学习算法与大数据平台的深度融合将赋予系统更强的预测和决策能力，通过训练故障预测模型、异常检测模型等智能算法，可以实现从数据统计向智能预测的能力跃升。平台化方面，构建统一的数据中台，集成数据采集、存储、计算、分析、应用等全链路功能，为企业提供一站式的大数据服务平台，是工业大数据应用规模化推广的重要基础。
                </p>
                <p className="mb-4 text-justify indent-8 leading-relaxed">
                    数字孪生技术作为连接物理世界和数字世界的桥梁，为工业大数据分析提供了新的应用场景。通过在虚拟空间中构建设备的高保真数字化模型，将实时运行数据映射到数字孪生体上，可以实现对设备状态的实时监测、故障预警、虚拟试验等高级功能。这种物理设备与虚拟模型的实时交互和协同优化，代表着智能制造的未来发展方向。本项目建立的数据分析基础可以进一步扩展到数字孪生应用场景，为设备全生命周期管理和预测性维护提供更强大的技术支撑。
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-4">8.5 结语</h3>
                <p className="mb-4 text-justify indent-8 leading-relaxed">
                    本次工业大数据分析课程大作业的完成，不仅是对课程所学知识的一次系统梳理和应用实践，更是对个人技术能力和工程素养的一次全面检验。通过完整经历数据分析项目的各个环节，从需求理解、方案设计、技术实现到结果总结，我对工业大数据分析的技术体系和应用方法有了更加系统和深入的认识。这个过程让我深刻体会到，优秀的技术解决方案需要将技术能力与业务需求紧密结合，充分理解应用场景的特点和约束条件，才能设计出真正有价值的系统。
                </p>
                <p className="mb-4 text-justify indent-8 leading-relaxed">
                    感谢课程老师的悉心指导，感谢同学们的学习交流。工业大数据是一个充满活力和机遇的领域，技术更新迭代迅速，应用场景不断拓展。我将以本次项目作为新的起点，保持对前沿技术的关注和学习热情，继续在实践中积累经验，在应用中创造价值，为推动制造业的数字化、网络化、智能化发展贡献自己的力量。
                </p>

                <div className="mt-8 pt-4 border-t-2 border-gray-300 text-center">
                    <p className="text-sm text-gray-600">—— 报告完 ——</p>
                </div>
            </div>
        );
    } else {
        return (
            <div className="page bg-white w-[210mm] min-h-[297mm] mx-auto shadow-lg mb-8 p-12 font-serif">
                <h2 className="text-2xl font-bold mb-6 border-b-2 border-gray-300 pb-2">第8章 总结与展望</h2>

                <h3 className="text-xl font-semibold mt-6 mb-4">8.1 项目总结</h3>
                <p className="mb-4 text-justify indent-8 leading-relaxed">
                    本次工业大数据分析项目基于Hadoop平台完成了完整的数据分析流程。项目处理了{cleanedRecords.toLocaleString()}条工业设备运行数据，涵盖数据获取、预处理、存储、分析和可视化等环节。分析结果显示，{config.analysisFocus.topFaultTypes[0]}（{getFaultName(config.analysisFocus.topFaultTypes[0])}）是发生频次最高的故障类型，与{config.personalizedData.customField}参数存在显著相关性，为设备维护决策提供了数据支持。
                </p>
                <p className="mb-4 text-justify indent-8 leading-relaxed">
                    技术实现方面，项目搭建了Hadoop开发环境，配置了HDFS分布式文件系统和MapReduce计算框架。数据准备阶段从UCI获取AI4I 2020数据集，新增了{config.personalizedData.customField}字段以支持研究目标。数据清洗采用Linux Shell工具（grep、sed、awk）完成异常值过滤和格式标准化。数据存储采用{config.techStack.database}数据库，使用{config.techStack.rowKeyDesign}作为主键设计。MapReduce程序实现了故障类型的并行统计，Python Matplotlib库用于结果可视化展示。
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-4">8.2 心得体会</h3>
                <p className="mb-4 text-justify indent-8 leading-relaxed">
                    通过本次项目实践，对Hadoop生态系统有了更深入的理解。课堂学习的理论知识在实践中得到验证，特别是MapReduce计算模型，通过实际编程掌握了其运行机制和数据流转过程。从环境搭建到代码实现的完整经历，加深了对分布式系统设计的理解。
                </p>
                <p className="mb-4 text-justify indent-8 leading-relaxed">
                    调试过程是重要的学习环节。MapReduce程序运行初期遇到各种报错，通过分析日志、检查数据格式、排查代码逻辑，逐步定位并解决问题。这个过程培养了系统化的调试方法和解决问题的耐心，认识到实际工程开发需要细致和坚持。
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-4">8.3 不足与改进</h3>
                <p className="mb-4 text-justify indent-8 leading-relaxed">
                    数据预处理环节可以进一步优化。当前采用基于简单规则的异常值检测方法，适用于明显错误数据的识别，但对于隐蔽性较强的异常数据可能不够准确。未来可以考虑引入统计分析方法，基于数据分布特性进行异常检测，提高数据质量控制的精度。
                </p>
                <p className="mb-4 text-justify indent-8 leading-relaxed">
                    MapReduce程序存在性能优化空间。当前实现为基本的聚合统计，如果处理更大规模的数据或更复杂的分析任务，需要考虑引入Combiner进行本地聚合以减少网络传输，或设计更优的分区策略以实现负载均衡。分析深度方面，当前以描述性统计为主，未来可以探索预测性分析，引入机器学习方法实现故障预测。
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-4">8.4 未来展望</h3>
                <p className="mb-4 text-justify indent-8 leading-relaxed">
                    工业大数据技术在工业4.0和智能制造背景下具有广阔的应用前景。当前项目采用事后分析模式，未来的发展方向是实现实时监控和提前预警。通过引入流式计算框架，可以实现设备状态的实时监测和故障的即时响应。结合机器学习技术构建预测模型，能够实现从被动维修向主动预防的转变，显著降低设备停机损失。
                </p>
                <p className="mb-4 text-justify indent-8 leading-relaxed">
                    从应用拓展角度，单一设备类型的分析具有局限性。未来可以构建覆盖全厂设备的综合监控平台，整合设备运行数据、生产计划、维护记录、供应链信息等多源数据，从更大的视角进行优化分析。通过跨设备类型的横向对比和跨业务环节的纵向关联，可以挖掘更大的应用价值。
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-4">8.5 结语</h3>
                <p className="mb-4 text-justify indent-8 leading-relaxed">
                    本次工业大数据分析课程项目完成了从理论学习到实践的完整转化。通过环境搭建、数据处理、程序开发、结果分析的完整流程，对工业大数据技术体系有了系统性的认识。项目实践过程中遇到的各种技术挑战，通过查阅文档、分析日志、反复测试得到解决，这个过程积累了宝贵的经验。
                </p>
                <p className="mb-4 text-justify indent-8 leading-relaxed">
                    感谢课程老师的指导和同学们的交流讨论。工业大数据领域技术发展迅速，需要持续学习以跟上技术演进。将以本次项目为基础，继续关注领域发展，将所学知识应用到实际工作中。
                </p>

                <div className="mt-8 pt-4 border-t-2 border-gray-300 text-center">
                    <p className="text-sm text-gray-600">—— 报告完 ——</p>
                </div>
            </div>
        );
    }
};

export default IBDA_Section8Summary;
