import { StudentConfig } from '../../../types';

export const getChapter3Text = (c: StudentConfig) => {
  const t = {
    1: { // 张明 - 详细
      method: `在数据预处理阶段，我选择在 Linux 环境下直接使用 Shell 命令进行流式处理。这种方法的优势在于无需编写复杂的 Python 脚本，利用 Linux 管道符（|）将多个命令串联，处理效率极高，特别适合 GB 级别的文本数据。主要使用的工具有：
- **awk**：强大的文本分析工具，用于按列筛选和逻辑判断。
- **grep**：用于文本搜索，这里配合 -v 参数用于反向选择（剔除）。
- **sed**：流编辑器，用于字符串替换和格式调整。`,
      steps: `清洗流程分为三步：
1. **数据过滤**：使用 awk 命令 \`awk -F, '($4>290 && $4<320)'\`。这里 -F, 指定逗号为分隔符，$4 代表第四列（Air Temperature）。该命令筛选出空气温度在 290K 到 320K 之间的正常数据，剔除了传感器故障导致的极端值。
2. **缺失值处理**：使用 grep 命令 \`grep -v ",,"\`。原始数据中存在部分记录缺失某些字段，表现为连续的逗号。该命令删除了所有包含空字段的行，保证了数据的完整性。
3. **格式标准化**：使用 sed 命令 \`sed 's/L/Low/g; s/M/Medium/g; s/H/High/g'\`。将 Type 列的缩写替换为全称，提高数据的可读性。
最终命令将这三步串联，并重定向输出到 cleaned_data.csv。`,
      verify: `处理完成后，我首先使用 \`wc -l\` 命令统计了清洗前后的行数。原始数据为 10600 行，清洗后为 10582 行，说明有 18 条异常数据被成功剔除。
接着，我使用 \`head -n 5\` 查看了清洗后的前 5 行，确认 Type 字段已变更为 Full Name，且无空字段。
最后，将清洗干净的数据上传至 HDFS 的 \`/user/ai4i2020/clean/\` 目录，准备进行下一步存储。`
    },
    2: { // 李华 - 简洁
      method: `预处理工具：Linux Shell。
理由：轻量级，无需额外安装依赖，适合快速处理结构化 CSV 数据。
核心命令：cat, awk, sed。`,
      steps: `1. **去重**：使用 \`sort | uniq\` 去除可能重复上传的记录。
2. **筛选**：通过 \`awk '$6 > 0'\` 剔除转速（Rotational speed）为 0 的停机数据，这些数据对故障预测无意义。
3. **转换**：利用 \`sed 's/product/PRODUCT/g'\` 将表头统一转换为大写，规范化字段名。
执行命令：\`cat industrial_data.csv | awk -F, '$6>0' | sed 's/product/PRODUCT/g' > processed_data.csv\`。`,
      verify: `验证手段：
1. 计数验证：\`wc -l\` 显示有效数据剩余 10685 条。
2. 内容抽检：随机查看第 100 行，确认转速大于 0。
3. 归档：将 processed_data.csv 上传至 HDFS 的 \`/bigdata/uci/processed/\`。`
    },
    3: { // 王芳 - 技术
      method: `数据清洗管道（ETL Pipeline）设计：
采用流式处理范式（Stream Processing Paradigm），避免将整个文件加载至内存（OOM Risk）。
工具链：GNU Core Utilities (awk, grep, sed)。
正则表达式：用于复杂的模式匹配与替换。`,
      steps: `Step 1: **Outlier Detection** (异常值检测)
命令：\`awk -F, '{if($7<3 || $7>80) print $0}'\` 用于识别扭矩（Torque）异常的行（正常范围 3.8-76.6 Nm）。确认无误后，取反逻辑进行过滤。
Step 2: **Data Imputation** (数据插补) - 本次采用直接剔除策略
命令：\`grep -v "NA"\` 剔除标记为 NA 的记录。
Step 3: **Normalization** (归一化预处理)
命令：\`sed 's/\\r//g'\` 去除 Windows 换行符（CRLF），统一为 Linux 换行符（LF），防止 MapReduce 解析错误。`,
      verify: `Data Validation Results:
- Input Rows: 11950
- Output Rows: 11925 (Dropped 25 outliers)
- Integrity Check: Passed (No Nulls, No CRLF)
Action: Put \`final_dataset.csv\` to \`/data/industrial/clean/\`.`
    },
    4: { // 赵强 - 实践
      method: `我没整那些复杂的代码，直接用 Linux 命令搞定。
主要就是把不能用的数据删了，把看着不顺眼的数据改了。`,
      steps: `1. **删坏数据**：有的行里数据是空的，或者温度显示 0 度（肯定坏了），我用 awk 把这些行挑出来扔了。
2. **改名字**：原本的产品 ID 是小写字母，我看 Excel 里看着费劲，就用 tr 命令把它全变大写了。
3. **保存**：处理完的东西存成 \`ai4i2020_clean.csv\`。`,
      verify: `弄完之后，我用 \`wc -l\` 数了一下，少了几十行，说明清洗起作用了。
然后把这个干净文件传到 Hadoop 上，目录是 \`/project/device_data/clean/\`。
我看了一眼 HDFS 网页界面，文件已经在里面了。`
    }
  };
  return t[c.id];
};