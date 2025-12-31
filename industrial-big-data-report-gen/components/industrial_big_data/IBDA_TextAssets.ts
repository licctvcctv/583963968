import { StudentConfig, BaseStats } from '../../types';

export const getChapter1Text = (c: StudentConfig) => {
  const t = {
    1: {
      purpose: `本作业的主要目的是构建一个完整的工业大数据分析流程。通过处理来自真实工厂环境的传感器数据，我们旨在掌握 Hadoop 生态系统的核心组件。具体而言，实验要求我们深入理解分布式文件系统 HDFS 的存储机制，熟练运用 Linux 命令行工具进行数据清洗，并掌握 ${c.techStack.database} 这种 NoSQL 数据库的表设计与查询操作。此外，通过编写 MapReduce 程序，我们将学习如何对海量数据进行离线统计分析，最终通过可视化手段挖掘数据背后的业务价值。`,
      dataset: `我们选取了 UCI 机器学习库中的 "AI4I 2020 预测性维护数据集"。该数据集包含了 10000 条真实的铣床加工记录，每一条记录都详尽地记录了设备在特定时间点的运行状态，包括空气温度、工艺温度、转速、扭矩以及刀具磨损量等 14 个关键字段。为了模拟更加复杂的生产环境，我在原始数据的基础上，根据学号后四位特定算法生成了 ${c.personalizedData.addedRecords} 条增量数据，UDI 编号从 ${c.personalizedData.udiRange[0]} 开始，并特别增加了一个 "${c.personalizedData.customField}" 字段，用于后续的特征工程分析。`,
      route: `本实验严格遵循大数据处理的标准生命周期。第一步是数据获取与增强，包括 CSV 文件的下载与模拟数据的生成；第二步是数据预处理，利用 Linux 强大的文本处理工具清洗脏数据；第三步是数据存储，将清洗后的数据导入 ${c.techStack.database}；第四步是离线计算，编写 Java MapReduce 程序进行故障统计；最后一步是数据可视化，生成图表辅助决策。`
    },
    2: {
      purpose: `本实验旨在应用 Hadoop 技术栈解决工业预测性维护问题。核心目标：1. 部署 HDFS 分布式存储；2. 使用 ${c.techStack.database} 存储非结构化数据；3. 开发 MapReduce 统计任务；4. 输出可视化分析报告。通过本次实践，加深对分布式计算原理的理解，提升解决实际工程问题的能力。`,
      dataset: `使用 UCI AI4I 2020 铣床数据集。原始数据 10000 条，含温度、转速、扭矩等 14 个特征。在此基础上，我扩展了 ${c.personalizedData.addedRecords} 条数据（UDI ${c.personalizedData.udiRange.join('-')}），并新增了用于评估的 ${c.personalizedData.customField} 字段。数据覆盖了 L、M、H 三种不同质量等级的设备，具有很好的代表性。`,
      route: `技术路线简述：数据采集 -> Linux 预处理 (awk/sed) -> HDFS 上传 -> ${c.techStack.database} 存储 -> MapReduce 分析 -> 结果图表化。整个流程模拟了企业级数据仓库的 ETL 过程。`
    },
    3: {
      purpose: `本项目基于典型的 Lambda 架构设计，重点验证 Hadoop 生态圈在工业时序数据处理中的可行性。实验重点在于评估 ${c.techStack.database} 在高并发写入场景下的表现，以及 MapReduce 编程模型在批处理任务中的计算效率。同时，探索特征工程对故障预测准确率的影响，为构建实时监控系统奠定基础。`,
      dataset: `数据源为 UCI AI4I 2020 提供了多维度的时序传感器读数。除了基础的物理量（Temp, RPM, Torque），数据集还标记了五种特定的故障模式（TWF, HDF 等）。为了测试系统的水平扩展能力，我在本地注入了 ${c.personalizedData.addedRecords} 条合成记录，并引入非线性特征 ${c.personalizedData.customField}，其计算逻辑为 ${c.personalizedData.customFieldLogic}。`,
      route: `架构流程图：Raw CSV -> ETL (Shell Scripts) -> Distributed Storage (HDFS) -> NoSQL Warehousing (${c.techStack.database}) -> Batch Processing (MapReduce/Yarn) -> BI Visualization。此架构保证了数据的一致性与可扩展性。`
    },
    4: {
      purpose: `在工厂实际生产中，设备突然坏了会造成很大损失。这个作业就是教我们怎么用大数据技术来预测设备什么时候会坏。我们要学会把机器产生的数据存起来，洗干净，然后算一算哪些机器容易出问题，最后画成图表给经理看，帮助工厂省钱。这是一项非常实用的技能。`,
      dataset: `老师给的是那个铣床的数据，里面有 1 万条记录，记录了机器转多快、温度多高这些信息。我自己又按规则造了 ${c.personalizedData.addedRecords} 条数据加进去，假装是新收上来的数据。我还加了个叫 ${c.personalizedData.customField} 的列，看看能不能帮我更好地发现故障。`,
      route: `做的步骤大概是：先把数据搞下来 -> 用命令把没用的数据删掉 -> 存到 Hadoop 里面去 -> 用 ${c.techStack.database} 存好方便查 -> 写个程序算算故障率 -> 画图看结果。每一步都很关键，缺一不可。`
    }
  };
  return t[c.id];
};

export const getChapter2Text = (c: StudentConfig) => {
    const t = {
        1: {
            download: `数据集的下载过程需要访问实验平台指定的资源链接。首先使用浏览器打开链接，然后右键保存文件到本地指定目录。整个过程需要确保网络连接稳定。下载完成后，我使用 Microsoft Excel 工具打开了 csv 文件，仔细检查了首行的表头字段，确认没有乱码，并核对了数据行数。`,
            custom: `为了丰富分析维度，我编写了一个 Python 脚本来生成个性化数据。新增的字段名为 ${c.personalizedData.customField}，其生成的依据是 ${c.personalizedData.customFieldLogic}。这些数据被追加到原始文件的末尾，使得 UD 编号延续至 ${c.personalizedData.udiRange[1]}。`,
            upload: `在上传之前，我先在本地使用了 MobaXterm 的 SFTP 功能将文件传输到了 Linux 虚拟机。接着，在终端中使用 hdfs dfs -mkdir 命令创建了我的学号目录，最后使用 put 命令完成上传。`
        },
        2: {
            download: `从资源库下载 ai4i2020.csv。使用 Excel 打开，快速检查前 100 行，确认格式无误，分隔符正确。该文件大小约为 1.2MB，包含标准的逗号分隔值。`,
            custom: `基于要求，追加了 ${c.personalizedData.addedRecords} 条记录。新增列 ${c.personalizedData.customField}，按逻辑 ${c.personalizedData.customFieldLogic} 计算填充。这有助于分析负载对设备寿命的影响。`,
            upload: `通过 SSH 将处理好的文件传至 NameNode。执行 HDFS 命令创建目录 /user/${c.studentId}/input/ 并上传文件。验证文件权限为 644。`
        },
        3: {
            download: `通过 wget 命令获取数据集。MD5 校验通过后，使用文本编辑器查看文件编码，确认为 UTF-8 无 BOM 格式，满足 Hadoop 处理要求。数据完整性校验是保证后续分析准确性的前提。`,
            custom: `利用 Pandas 库进行数据增强。构造了特征向量 ${c.personalizedData.customField}，并通过 NumPy 的随机函数模拟了 ${c.personalizedData.addedRecords} 条符合正态分布的增量数据，以避免数据倾斜。`,
            upload: `采用 HDFS Shell 接口进行交互。首先规划 HDFS 目录结构，遵循 /user/{id}/project/input 的规范，然后执行 put 操作，并关注 Block size 分配情况。`
        },
        4: {
            download: `我直接从老师发的压缩包里解压出了 csv 文件。双击打开看了一下，里面的数字和字母都显示正常，没有乱码，行数也对。`,
            custom: `按照作业要求，我加了 ${c.personalizedData.addedRecords} 行新数据。还算了一个叫 ${c.personalizedData.customField} 的新指标，这个指标大概是根据 ${c.personalizedData.customFieldLogic} 算出来的。`,
            upload: `把文件拖进虚拟机里，然后敲命令把它存到 Hadoop 系统里面去。显示 Upload successful 就说明成功了。`
        }
    };
    return t[c.id];
}
// ... similar structures for other chapters (omitted for brevity, will be fully implemented in the components directly or here if needed)
// Actually, to ensure full coverage, I'll export simplified getters and handle detailed text in components using this pattern.
export const getTexts = (c: StudentConfig, chapter: number) => {
    // This is a placeholder for the logic I will implement in the Chapter components to avoid huge file here.
    return {}; 
}
