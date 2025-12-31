import { StudentConfig } from '../IBDA_config';

export const getChapter2Text = (c: StudentConfig) => {
  const t = {
    1: { // 张明 - 详细
      download: `数据集的获取是开展分析工作的第一步。本次实验选用的 "AI4I 2020 Predictive Maintenance Dataset" 托管在著名的 UCI 机器学习资源库中。该数据集由 AI4I 实验室发布，包含 10000 条真实的铣床加工记录。
下载过程如下：首先，我使用 Chrome 浏览器访问 UCI 官方网站，在搜索栏输入数据集编号 "00581"。进入详情页后，仔细阅读了数据描述，了解到该数据集包含 14 个特征列，如 UDI（唯一标识）、Product ID（产品编号）、Type（质量等级）以及多个传感器读数。
点击 "Data Folder" 链接，下载了名为 "ai4i2020.csv" 的文件。下载完成后，文件保存至本地 D 盘的 "Industrial_BigData_Assignment/Data" 目录下。
为了验证数据的完整性，我首先检查了文件大小，约为 1.2MB，与官方描述一致。接着，使用 Microsoft Excel 2019 打开文件。Excel 能够正确识别 CSV 的逗号分隔符。我检查了首行表头，确认 "Air temperature [K]" 等包含特殊字符的字段显示正常，无乱码。随后，我滚动至文件末尾，确认最后一条记录的 UDI 为 10000，且无空白行，证明数据下载完整。`,
      custom: `为了模拟更真实的工业场景，我在原始数据的基础上进行了增强。根据作业要求，我需要增加 ${c.personalizedData.addedRecords} 条新记录。为此，我编写了一个 Python 脚本，利用 Pandas 库读取原始 CSV，并基于原始数据的统计分布（均值、方差）生成了新的传感器读数。
特别地，我增加了一个名为 "${c.personalizedData.customField}" 的自定义字段。该字段的生成逻辑是：${c.personalizedData.customFieldLogic}
这一逻辑通过 Python 的 apply 函数实现。
生成的新数据追加在原数据之后，新的 UDI 范围为 ${c.personalizedData.udiRange[0]} 至 ${c.personalizedData.udiRange[1]}。保存为 "ai4i2020_extended.csv"。`,
      upload: `数据准备就绪后，下一步是将数据上传至 Linux 虚拟机中的 HDFS 分布式文件系统。
首先，我使用 Xftp 工具将本地的 "ai4i2020_extended.csv" 上传至虚拟机的 \`/home/${c.terminalConfig.user}/data\` 目录下。
接着，打开终端窗口，输入 \`start-dfs.sh\` 启动 HDFS 服务。服务启动后，使用 \`jps\` 命令确认 NameNode 和 DataNode 进程均已运行。
为了规范文件管理，我在 HDFS 上创建了专属目录：\`hdfs dfs -mkdir -p /user/${c.terminalConfig.user}/raw\`。
最后，执行上传命令：\`hdfs dfs -put /home/${c.terminalConfig.user}/data/ai4i2020_extended.csv /user/${c.terminalConfig.user}/raw/\`。
上传完成后，我立即执行了 \`hdfs dfs -ls /user/${c.terminalConfig.user}/raw/\` 命令，终端返回了文件信息，显示文件大小正确，权限为 rw-r--r--，所有者为 ${c.terminalConfig.user}，证明上传成功且文件可读。`
    },
    2: { // 李华 - 简洁
      download: `从 UCI 官网下载 ai4i2020.csv 文件。文件大小 1.2MB，格式为 CSV。
使用 Excel 打开进行校验：
1. 检查行数：共 10001 行（含表头）。
2. 检查列数：共 14 列。
3. 抽样检查：随机抽取第 5000 行，确认 UDI 为 5000，且传感器数值（温度、转速）在合理范围内（如 Air Temp 约 300K）。
验证结论：数据完整，无乱码，无缺失值。`,
      custom: `新增 ${c.personalizedData.addedRecords} 条模拟数据，总记录数达 ${10000 + c.personalizedData.addedRecords} 条。
新增字段：${c.personalizedData.customField}。
生成逻辑：${c.personalizedData.customFieldLogic}
该字段用于后续分析负载与故障率的相关性。数据已合并并保存为 industrial_data.csv。`,
      upload: `操作环境：CentOS 7 + Hadoop 2.7。
步骤：
1. 本地传输：使用 scp 命令将文件传至 NameNode 的 /home/${c.terminalConfig.user} 目录。
2. HDFS 目录创建：\`hdfs dfs -mkdir -p /bigdata/uci/data\`。
3. 上传文件：\`hdfs dfs -put industrial_data.csv /bigdata/uci/data/\`。
4. 验证：使用 \`hdfs dfs -ls -h\` 查看，确认文件存在且大小正确。`
    },
    3: { // 王芳 - 技术
      download: `数据源：UCI Machine Learning Repository。
获取方式：通过 \`wget\` 命令行工具直接下载，以确保数据流的完整性。
命令：\`wget https://archive.ics.uci.edu/ml/machine-learning-databases/00581/ai4i2020.csv\`
校验机制：下载完成后，利用 \`md5sum\` 计算文件哈希值，并与官方提供的 checksum 进行比对，确保传输过程中未发生比特翻转。
格式审查：使用 \`head -n 5 ai4i2020.csv\` 查看文件前五行，确认分隔符为逗号，且 Schema 符合预期（14 columns）。`,
      custom: `特征工程：引入 "${c.personalizedData.customField}"。
计算逻辑：${c.personalizedData.customFieldLogic}
数据增强：利用 Python NumPy 库生成 ${c.personalizedData.addedRecords} 条服从高斯分布的合成数据，注入到原始数据集末尾，UDI 扩展至 ${c.personalizedData.udiRange[1]}。此操作旨在测试系统在非均匀数据分布下的鲁棒性。`,
      upload: `HDFS 操作实录：
1. 目录规划：遵循 \`/data/{project}/{layer}\` 规范，创建 \`/data/industrial/raw\`。
2. 上传指令：\`hdfs dfs -copyFromLocal dataset_final.csv /data/industrial/raw/\`。
3. 一致性检查：执行 \`hdfs fsck /data/industrial/raw/dataset_final.csv -files -blocks\`，确认文件 Block 分布健康，无损坏块。`
    },
    4: { // 赵强 - 实践
      download: `老师在群里发了数据包，我就直接下载下来了。解压出来是个 csv 文件，看着不大，1 兆多。
我先用 Excel 打开看了看，里面有一万行数据。主要看了看最后一列 "Machine failure"，大部分是 0（没坏），偶尔有几个 1（坏了），这挺符合实际情况的，毕竟机器要是天天坏厂子早倒闭了。
UDI 那一列是从 1 排到 10000 的，没有断号，说明数据没丢。`,
      custom: `为了做作业，我得加点料。我按老师要求加了 ${c.personalizedData.addedRecords} 条新数据。
我还搞了个新指标叫 "${c.personalizedData.customField}"。
这玩意儿我是这么算的：${c.personalizedData.customFieldLogic}
这样我就能看看到底是跑得快的机器容易坏，还是分低的机器容易坏。`,
      upload: `先把 csv 文件拖到虚拟机桌面上。
打开终端连上虚拟机。
先建个文件夹：\`hdfs dfs -mkdir /project/device_data\`。
然后把文件扔进去：\`hdfs dfs -put Desktop/ai4i2020_plus.csv /project/device_data/\`。
最后查一下：\`hdfs dfs -ls /project/device_data\`，看到文件名在那儿摆着，大小也对，就齐活了。`
    }
  };
  return t[c.id];
};
