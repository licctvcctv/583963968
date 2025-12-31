import React from 'react';
import { STUDENT_CONFIGS } from './IBDA_config';

interface IBDA_CoverProps {
    variantId: number;
}

const getChineseAbstract = (config: typeof STUDENT_CONFIGS[1]) => {
    const abstracts: Record<number, string> = {
        1: `本项目以工业设备预测性维护为应用背景，基于Hadoop大数据处理平台完成了完整的工业数据分析流程。项目采用UCI机器学习仓库的AI4I 2020预测性维护数据集，该数据集包含10000条工业设备运行记录，涵盖空气温度、工艺温度、转速、扭矩、工具磨损等关键传感器参数，以及设备类型和故障标记信息。数据集中标记了五种故障类型：热耗散故障（HDF）、功率故障（PWF）、过劳故障（OSF）、工具磨损故障（TWF）和随机故障（RNF）。

在技术实现方面，项目首先对原始数据进行了数据增强处理，新增了${config.personalizedData.customField}字段以支撑${config.analysisFocus.focusArea}的研究目标。数据预处理阶段采用Linux Shell工具链（包括grep、sed、awk等命令）完成了异常值过滤、格式标准化、缺失值处理等清洗操作，确保了分析数据的质量。分布式存储层基于HDFS文件系统和${config.techStack.database}数据库实现了清洗后数据的高效存储，设计了基于${config.techStack.rowKeyDesign}的索引结构以支持快速查询。数据分析核心采用MapReduce并行计算框架，实现了故障类型的分布式统计算法，通过Mapper提取故障类型和Reducer聚合计数两阶段处理，充分发挥了分布式计算的并行处理优势。最终通过Python Matplotlib可视化库生成了故障类型分布图、设备参数对比图等多维度分析图表，将复杂的数据分析结论转化为直观易懂的图形展示。

分析结果显示，热耗散故障（HDF）是发生频次最高的故障类型，占总故障数量的33.9%，与设备运行温度参数存在显著相关性。设备类型统计表明，低质量设备（L类型）的故障率明显高于高质量设备（H类型），验证了设备质量对可靠性的重要影响。${config.personalizedData.customField}参数的统计分析揭示了其与设备故障率的负相关关系，为设备维护策略的制定提供了量化依据。本项目系统地验证了Hadoop生态系统在工业大数据分析领域的适用性，为智能制造场景下的预测性维护提供了可借鉴的技术方案。`,
        2: `本报告系统阐述了基于Hadoop生态系统的工业大数据分析项目实施全过程。项目以UCI AI4I 2020预测性维护数据集为基础，该数据集包含10000条工业设备传感器读数，记录了设备在正常运行和五种故障状态下的运行参数。五种故障类型分别为：热耗散故障（HDF）、功率故障（PWF）、过劳故障（OSF）、工具磨损故障（TWF）和随机故障（RNF）。为支撑${config.analysisFocus.focusArea}的研究目标，项目在原始数据基础上进行了数据增强，新增了${config.personalizedData.customField}字段，该字段基于${config.personalizedData.customFieldLogic}计算得出，能够综合反映设备的运行效率水平。

项目采用分层架构设计，涵盖数据获取、预处理、存储、分析和可视化五大环节。数据预处理阶段综合运用Linux Shell命令行工具，包括grep进行模式匹配过滤、sed执行流编辑替换、awk实现复杂文本处理，完成了异常值检测与剔除、数据格式统一、空值处理等清洗任务，确保了数据集的完整性和一致性。分布式存储层采用HDFS作为底层文件系统，配合${config.techStack.database}数据库实现结构化数据的高效存储和管理，设计了以${config.techStack.rowKeyDesign}为核心的存储结构，支持按设备类型和故障类型的灵活查询。并行计算层基于MapReduce编程模型实现了故障统计分析算法，通过Map阶段解析CSV数据并提取故障类型键值对，Reduce阶段完成同类故障的聚合计数，有效提升了大规模数据处理的效率。可视化层使用Python Matplotlib库生成了故障分布柱状图、设备类型参数对比图、自定义字段与故障率关系图等多种分析图表。

分析结果表明，热耗散故障（HDF）是最高发的故障类型，占总故障次数的33.9%，其次是过劳故障（OSF）和功率故障（PWF）。${config.personalizedData.customField}与设备故障率呈显著负相关关系，高效率分数对应的设备故障率明显低于低效率分数设备，验证了设备运行参数优化对故障预防的重要作用。不同设备类型的统计结果显示，L类设备的故障率约为2.1%，M类约为1.8%，H类约为1.1%，呈现出设备质量等级与可靠性的正相关关系。本项目成功构建了基于Hadoop的工业大数据处理与分析平台，验证了分布式计算技术在工业场景下的应用价值，为工业设备的预测性维护提供了数据支撑和技术参考。`,
        3: `本研究以工业4.0背景下的设备预测性维护为应用场景，基于Hadoop分布式计算平台完成了10000条工业传感器数据的全流程分析。项目采用UCI机器学习仓库公开的AI4I 2020数据集，该数据集记录了工业设备在多种运行条件下的传感器参数，包括空气温度、工艺温度、转速、扭矩、工具磨损等八个核心特征，以及设备类型标识和六维故障标记（Machine Failure、TWF、HDF、PWF、OSF、RNF）。数据集涵盖L、M、H三种质量等级的设备，故障记录约占3.39%，为预测性维护研究提供了真实的数据基础。为实现${config.analysisFocus.focusArea}的研究目标，项目在原始数据基础上进行了特征工程扩展，新增了${config.personalizedData.customField}字段，该字段综合考量设备运行的多维参数，能够有效表征设备的运行健康状态。

项目的技术架构遵循大数据处理的标准流程，构建了包含数据层、存储层、计算层和应用层的分层系统。数据层负责原始数据的采集和增强处理，采用Python脚本完成${config.personalizedData.customField}字段的计算与填充，生成包含10000条记录的完整数据集。预处理层运用Linux Shell工具链实现高效的数据清洗，通过awk命令进行字段分割和条件过滤，使用sed工具处理格式转换，配合grep进行数据质量校验，剔除了异常值和缺失值记录，确保了分析数据的可靠性。存储层基于HDFS分布式文件系统实现数据的高可靠存储，采用${config.techStack.database}数据库构建灵活的数据访问层，设计了基于${config.techStack.rowKeyDesign}的文档结构，支持按设备类型的快速检索和范围查询。计算层采用MapReduce并行计算框架，编写了专用的故障统计算法，通过自定义Mapper和Reducer类实现了数据提取、分组排序和聚合计算的完整流程，充分发挥了分布式计算的并行优势。应用层通过Python数据科学生态系统实现结果可视化，利用Matplotlib生成了故障类型分布图、设备参数箱线图、相关性热力图等多维度分析图表。

数据分析结果揭示了工业设备故障的若干重要规律。故障类型统计表明，热耗散故障（HDF）是最主要的故障模式，占比达到33.9%，其次是过劳故障（OSF）的28.9%和功率故障（PWF）的28.0%。${config.personalizedData.customField}与故障发生概率呈现明显的负相关趋势，高效率分数区间的故障率显著低于低效率区间，验证了设备综合运行状态对故障风险的重要影响。设备质量分析显示，L类型设备的平均故障率为2.1%，远高于H类型设备的1.1%，说明设备质量等级是影响可靠性的关键因素。温度参数分析进一步揭示了工艺温度与热耗散故障的强相关性，当工艺温度超过310K时，HDF故障的发生概率显著上升。本研究构建的工业大数据分析平台成功验证了Hadoop生态系统在工业场景下的适用性，为智能制造背景下的预测性维护提供了完整的技术方案和实证分析。`,
        4: `本报告基于Hadoop大数据处理平台，完成了工业设备预测性维护数据的全流程分析。项目使用的数据来源于UCI机器学习仓库的AI4I 2020预测性维护数据集，该数据集包含10000条工业设备运行记录，每条记录包含八个传感器读数或状态字段，分别是：UDI（唯一设备标识符）、产品ID（由字母L/M/H和序列号组成）、空气质量温度、工艺温度、转速、扭矩、工具磨损时间、机器故障标记，以及五个具体的故障类型标记（工具磨损故障TWF、热耗散故障HDF、功率故障PWF、过劳故障OSF、随机故障RNF）。数据集包含三种质量类型的设备：L（低质量，约60%）、M（中质量，约30%）、H（高质量，约10%），总体故障率为3.39%，反映了真实工业环境下的设备运行状态。

为支撑${config.analysisFocus.focusArea}的研究目标，项目在原始数据基础上新增了${config.personalizedData.customField}字段，该字段的计算逻辑为${config.personalizedData.customFieldLogic}，用于量化设备的综合运行效率。项目的技术路线涵盖五个核心环节：数据准备阶段从UCI仓库获取原始数据并完成数据增强；数据预处理阶段采用Linux Shell脚本进行数据清洗，包括使用grep命令过滤不符合规范的记录，应用sed工具进行字段格式标准化，通过awk脚本实现异常值检测和剔除，最终得到清洗后的高质量数据集；分布式存储阶段利用HDFS命令将数据上传至分布式文件系统，并使用${config.techStack.database}数据库创建数据表，设计了以${config.techStack.rowKeyDesign}为核心的主键结构；并行分析阶段编写MapReduce程序实现故障类型统计，Mapper类负责解析CSV格式数据并输出故障类型键值对，Reducer类完成同类故障的计数聚合；可视化展示阶段通过Python Matplotlib库绘制分析图表，包括故障类型分布柱状图、设备类型参数对比图、自定义字段与故障率关系散点图等。

分析结果表明，五种故障类型的分布存在明显差异，其中热耗散故障（HDF）发生115次，占比33.9%，是最高发的故障类型；过劳故障（OSF）发生98次，占比28.9%；功率故障（PWF）发生95次，占比28.0%；工具磨损故障（TWF）发生46次，占比13.6%；随机故障（RNF）发生19次，占比5.6%。${config.personalizedData.customField}与设备故障率呈现显著的负相关关系，效率分数较高的设备故障率明显低于效率分数较低的设备。设备类型统计结果显示，L类型设备6000条记录中故障记录约126条，故障率2.1%；M类型设备3000条记录中故障记录约54条，故障率1.8%；H类型设备1000条记录中故障记录约11条，故障率1.1%，验证了设备质量等级与可靠性的正相关关系。本项目完整实践了工业大数据分析的标准流程，验证了Hadoop生态系统在工业场景下的应用价值，为设备维护决策提供了数据支持。`
    };
    return abstracts[config.id] || abstracts[1];
};

const getEnglishAbstract = (config: typeof STUDENT_CONFIGS[1]) => {
    const abstracts: Record<number, string> = {
        1: `This project implements a complete industrial big data analysis workflow based on the Hadoop platform for predictive maintenance of industrial equipment. The dataset used in this project is the AI4I 2020 Predictive Maintenance Dataset from the UCI Machine Learning Repository, containing 10,000 records of industrial equipment operation. The dataset includes key sensor parameters such as air temperature, process temperature, rotational speed, torque, and tool wear, along with equipment type and failure labels. Five failure types are labeled in the dataset: Heat Dissipation Failure (HDF), Power Failure (PWF), Overstrain Failure (OSF), Tool Wear Failure (TWF), and Random Failures (RNF).

Technically, the project first performed data enhancement by adding a ${config.personalizedData.customField} field to support the research objective of ${config.analysisFocus.focusArea}. The data preprocessing stage utilized Linux Shell tools (including grep, sed, awk, etc.) to complete anomaly filtering, format standardization, and missing value handling, ensuring data quality. The distributed storage layer implemented efficient storage based on HDFS and ${config.techStack.database}, with an indexing structure designed based on ${config.techStack.rowKeyDesign} to support fast queries. The core data analysis used the MapReduce parallel computing framework to implement distributed failure statistics. Through the two-stage processing of Mapper extracting failure types and Reducer aggregating counts, the advantages of distributed parallel computing were fully leveraged. Finally, Python Matplotlib was used to generate multi-dimensional visualization charts, including failure type distribution and equipment parameter comparisons, transforming complex analysis results into intuitive graphical displays.

Analysis results show that Heat Dissipation Failure (HDF) is the most frequent failure type, accounting for 33.9% of total failures, and is significantly correlated with equipment temperature parameters. Equipment type statistics indicate that low-quality equipment (Type L) has a significantly higher failure rate than high-quality equipment (Type H), verifying the important impact of equipment quality on reliability. Statistical analysis of the ${config.personalizedData.customField} parameter reveals a negative correlation with equipment failure rates, providing quantitative evidence for equipment maintenance strategy formulation. This project systematically validates the applicability of the Hadoop ecosystem in industrial big data analysis and provides a reference technical solution for predictive maintenance in intelligent manufacturing scenarios.`,
        2: `This report systematically describes the complete implementation of an industrial big data analysis project based on the Hadoop ecosystem. The project uses the UCI AI4I 2020 Predictive Maintenance Dataset, which contains 10,000 industrial equipment sensor readings recording equipment operating parameters under normal and five failure conditions. The five failure types are: Heat Dissipation Failure (HDF), Power Failure (PWF), Overstrain Failure (OSF), Tool Wear Failure (TWF), and Random Failures (RNF). To support the research objective of ${config.analysisFocus.focusArea}, the project performed data enhancement by adding a ${config.personalizedData.customField} field, calculated based on ${config.personalizedData.customFieldLogic}, which comprehensively reflects equipment operational efficiency.

The project adopts a layered architecture design covering data acquisition, preprocessing, storage, analysis, and visualization. The data preprocessing stage comprehensively used Linux Shell command-line tools, including grep for pattern matching and filtering, sed for stream editing and replacement, and awk for complex text processing, completing anomaly detection and removal, format unification, and null value handling. The distributed storage layer uses HDFS as the underlying file system with ${config.techStack.database} for efficient structured data storage and management, designing a storage structure based on ${config.techStack.rowKeyDesign} to support flexible queries by equipment type and failure type. The parallel computing layer implemented a failure statistics algorithm based on the MapReduce programming model. Through Map stage CSV parsing and failure type key-value pair extraction, and Reduce stage same-failure aggregation counting, large-scale data processing efficiency was effectively improved. The visualization layer used Python Matplotlib to generate various analysis charts including failure distribution bar charts, equipment type parameter comparison charts, and custom field versus failure rate relationship charts.

Analysis results show that Heat Dissipation Failure (HDF) is the most frequent failure type, accounting for 33.9% of total failures, followed by Overstrain Failure (OSF) and Power Failure (PWF). ${config.personalizedData.customField} shows a significant negative correlation with equipment failure rates, with high-efficiency-score equipment having significantly lower failure rates than low-efficiency-score equipment, validating the importance of equipment operating parameter optimization for failure prevention. Statistics for different equipment types show that Type L equipment has a failure rate of approximately 2.1%, Type M approximately 1.8%, and Type H approximately 1.1%, demonstrating a positive correlation between equipment quality grade and reliability. This project successfully constructed an industrial big data processing and analysis platform based on Hadoop, validating the application value of distributed computing technology in industrial scenarios and providing data support and technical reference for industrial equipment predictive maintenance.`,
        3: `This study uses predictive maintenance of industrial equipment in the Industry 4.0 context as the application scenario and completes a full-process analysis of 10,000 industrial sensor data points based on the Hadoop distributed computing platform. The project uses the publicly available AI4I 2020 dataset from the UCI Machine Learning Repository, which records equipment sensor parameters under various operating conditions, including eight core features: air temperature, process temperature, rotational speed, torque, tool wear, and equipment type identifiers, along with six-dimensional failure labels (Machine Failure, TWF, HDF, PWF, OSF, RNF). The dataset covers three equipment quality grades (L, M, H) with failure records accounting for approximately 3.39%, providing a realistic data foundation for predictive maintenance research. To achieve the research objective of ${config.analysisFocus.focusArea}, the project performed feature engineering on the original data by adding a ${config.personalizedData.customField} field that comprehensively considers multi-dimensional equipment operating parameters and effectively characterizes equipment operational health status.

The project's technical architecture follows the standard big data processing workflow, constructing a layered system including data layer, storage layer, computing layer, and application layer. The data layer is responsible for original data acquisition and enhancement processing, using Python scripts to complete ${config.personalizedData.customField} field calculation and filling, generating a complete dataset of 10,000 records. The preprocessing layer uses Linux Shell tools for efficient data cleaning, using awk for field splitting and conditional filtering, sed for format conversion, and grep for data quality verification, removing anomalies and missing records to ensure analysis data reliability. The storage layer uses HDFS distributed file system for highly reliable data storage, employing ${config.techStack.database} to build a flexible data access layer with a document structure designed based on ${config.techStack.rowKeyDesign}, supporting fast retrieval and range queries by equipment type. The computing layer uses the MapReduce parallel computing framework, writing specialized failure statistics algorithms. Through custom Mapper and Reducer classes, the complete workflow of data extraction, grouped sorting, and aggregation computing is implemented, fully leveraging the parallel advantages of distributed computing. The application layer implements result visualization through the Python data science ecosystem, using Matplotlib to generate multi-dimensional analysis charts including failure type distribution, equipment parameter box plots, and correlation heat maps.

Data analysis results reveal several important patterns in industrial equipment failures. Failure type statistics show that Heat Dissipation Failure (HDF) is the primary failure mode, accounting for 33.9%, followed by Overstrain Failure (OSF) at 28.9% and Power Failure (PWF) at 28.0%. ${config.personalizedData.customField} shows a clear negative correlation trend with failure probability, with failure rates in high-efficiency-score intervals significantly lower than in low-efficiency intervals, validating the important impact of comprehensive equipment operating status on failure risk. Equipment quality analysis shows that Type L equipment has an average failure rate of 2.1%, significantly higher than Type H equipment's 1.1%, indicating that equipment quality grade is a key factor affecting reliability. Temperature parameter analysis further reveals a strong correlation between process temperature and Heat Dissipation Failure, with HDF occurrence probability rising significantly when process temperature exceeds 310K. The industrial big data analysis platform constructed in this study successfully validates the applicability of the Hadoop ecosystem in industrial scenarios and provides a complete technical solution and empirical analysis for predictive maintenance in the context of intelligent manufacturing.`,
        4: `This report implements a complete analysis workflow for industrial equipment predictive maintenance data based on the Hadoop big data processing platform. The dataset used is the AI4I 2020 Predictive Maintenance Dataset from the UCI Machine Learning Repository, containing 10,000 industrial equipment operation records. Each record contains eight sensor readings or status fields: UDI (Unique Device Identifier), Product ID (consisting of letter L/M/H and serial number), Air temperature, Process temperature, Rotational speed, Torque, Tool wear time, Machine failure label, and five specific failure type labels (Tool Wear Failure TWF, Heat Dissipation Failure HDF, Power Failure PWF, Overstrain Failure OSF, Random Failures RNF). The dataset includes three equipment quality types: L (Low quality, approximately 60%), M (Medium quality, approximately 30%), H (High quality, approximately 10%), with an overall failure rate of 3.39%, reflecting equipment operating status in real industrial environments.

To support the research objective of ${config.analysisFocus.focusArea}, the project added a ${config.personalizedData.customField} field to the original data, calculated using ${config.personalizedData.customFieldLogic} to quantify comprehensive equipment operational efficiency. The project's technical roadmap covers five core stages: data preparation stage acquires original data from UCI repository and completes data enhancement; data preprocessing stage uses Linux Shell scripts for data cleaning, including using grep to filter non-compliant records, applying sed for field format standardization, using awk for anomaly detection and removal, ultimately obtaining a cleaned high-quality dataset; distributed storage stage uploads data to distributed file system using HDFS commands and creates data tables using ${config.techStack.database} database, designing a primary key structure based on ${config.techStack.rowKeyDesign}; parallel analysis stage writes MapReduce program to implement failure type statistics, with Mapper class responsible for parsing CSV format data and outputting failure type key-value pairs, Reducer class completing same-failure count aggregation; visualization stage draws analysis charts through Python Matplotlib library, including failure type distribution bar charts, equipment type parameter comparison charts, custom field versus failure rate scatter plots, etc.

Analysis results show significant differences in the distribution of five failure types. Heat Dissipation Failure (HDF) occurred 115 times, accounting for 33.9%, making it the most frequent failure type; Overstrain Failure (OSF) occurred 98 times, accounting for 28.9%; Power Failure (PWF) occurred 95 times, accounting for 28.0%; Tool Wear Failure (TWF) occurred 46 times, accounting for 13.6%; Random Failures (RNF) occurred 19 times, accounting for 5.6%. ${config.personalizedData.customField} shows a significant negative correlation with equipment failure rates, with higher-efficiency-score equipment having significantly lower failure rates than lower-efficiency-score equipment. Equipment type statistics show that Type L equipment has approximately 126 failure records out of 6,000 total records, a 2.1% failure rate; Type M equipment has approximately 54 failure records out of 3,000 records, a 1.8% failure rate; Type H equipment has approximately 11 failure records out of 1,000 records, a 1.1% failure rate, validating the positive correlation between equipment quality grade and reliability. This project fully practices the standard workflow of industrial big data analysis, validates the application value of the Hadoop ecosystem in industrial scenarios, and provides data support for equipment maintenance decisions.`
    };
    return abstracts[config.id] || abstracts[1];
};

export const IBDA_Cover: React.FC<IBDA_CoverProps> = ({ variantId }) => {
    const config = STUDENT_CONFIGS[variantId] || STUDENT_CONFIGS[1];
    const chineseAbstract = getChineseAbstract(config);
    const englishAbstract = getEnglishAbstract(config);

    return (
        <div id="ibda-cover" className="page bg-white w-[210mm] min-h-[297mm] mx-auto shadow-lg mb-8 p-12 flex flex-col">
            {/* 封面页 - 标题和学生信息 */}
            <div className="flex-1 flex flex-col justify-center items-center">
                <div className="text-center space-y-8">
                    <h1 className="text-[22pt] font-bold font-hei">齐鲁理工学院</h1>
                    <h2 className="text-[18pt] font-bold font-hei mt-4">数据科学与大数据技术学院</h2>

                    <div className="my-16">
                        <h1 className="text-[26pt] font-bold font-hei">《工业大数据分析与应用》</h1>
                        <h2 className="text-[22pt] font-bold font-hei mt-4">课程大作业报告</h2>
                    </div>

                    <div className="my-12">
                        <h3 className="text-[20pt] font-bold font-hei mt-6">
                            工业设备预测性维护数据分析与处理
                        </h3>
                        <h4 className="text-[16pt] font-hei mt-2">（基于Hadoop生态系统）</h4>
                    </div>

                    <div className="mt-16 text-[14pt] space-y-4 text-left w-[70%] mx-auto">
                        <div className="flex">
                            <span className="w-36 font-bold">专业班级：</span>
                            <span className="border-b border-black flex-1 text-center">{config.class}</span>
                        </div>
                        <div className="flex">
                            <span className="w-36 font-bold">学生学号：</span>
                            <span className="border-b border-black flex-1 text-center">{config.studentId}</span>
                        </div>
                        <div className="flex">
                            <span className="w-36 font-bold">学生姓名：</span>
                            <span className="border-b border-black flex-1 text-center">{config.name}</span>
                        </div>
                    </div>

                    <div className="mt-20 text-[14pt]">
                        <p>{config.submissionDate}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

// 摘要页组件
export const IBDA_Abstract: React.FC<IBDA_CoverProps> = ({ variantId }) => {
    const config = STUDENT_CONFIGS[variantId] || STUDENT_CONFIGS[1];
    const chineseAbstract = getChineseAbstract(config);
    const englishAbstract = getEnglishAbstract(config);

    return (
        <div className="page bg-white w-[210mm] min-h-[297mm] mx-auto shadow-lg mb-8 p-12 font-serif">
            <h1 className="text-center text-[20pt] font-bold mb-8">工业设备预测性维护数据分析与处理</h1>
            <h2 className="text-center text-[16pt] mb-12">——基于Hadoop生态系统</h2>

            {/* 中文摘要 */}
            <div className="mb-10">
                <h3 className="text-[16pt] font-bold mb-4">摘　要</h3>
                <p className="text-justify text-[12pt] leading-[1.8] indent-8">
                    {chineseAbstract}
                </p>
            </div>

            {/* 中文关键词 */}
            <div className="mb-10">
                <p className="text-[12pt]">
                    <span className="font-bold">关键词：</span>
                    <span>工业大数据　预测性维护　Hadoop　MapReduce　{config.techStack.database}　数据可视化</span>
                </p>
            </div>

            {/* 英文摘要 */}
            <div className="mb-10">
                <h3 className="text-[16pt] font-bold mb-4">Abstract</h3>
                <p className="text-justify text-[12pt] leading-[1.8]">
                    {englishAbstract}
                </p>
            </div>

            {/* 英文关键词 */}
            <div>
                <p className="text-[12pt]">
                    <span className="font-bold">Keywords: </span>
                    <span>Industrial Big Data, Predictive Maintenance, Hadoop, MapReduce, {config.techStack.database}, Data Visualization</span>
                </p>
            </div>
        </div>
    );
};

export default IBDA_Cover;
