import React from 'react';
import { StudentConfig } from '../../types';
import { getChapter3Text } from './assets/chapter3';
import { UbuntuTerminal, KaliTerminal, XShellTerminal, PlainTerminal, LinuxTerminal } from './Terminals';

export const IBDA_Chapter3: React.FC<{ config: StudentConfig }> = ({ config }) => {
  const content: any = getChapter3Text(config);

  const renderPreprocTerminal = () => {
    switch (config.id) {
      case 1: // Zhang: Ubuntu (Mixed)
        return <UbuntuTerminal 
          user="zhangming" host="data-node" cwd="~/data"
          command={`awk -F, '($4>290 && $4<320)' ai4i2020_extended.csv | grep -v ",," | sed 's/L/Low/g' > cleaned_data.csv`}
          output=""
          caption="图 3-1 执行组合清洗命令 (Ubuntu)"
        />;
      case 2: // Li: XShell (Mixed)
        return <XShellTerminal 
          user="lihua" host="server" cwd="/home/lihua"
          command={`cat industrial_data.csv | awk -F, '$6>0' | sed 's/product/PRODUCT/g' > processed_data.csv`}
          output=""
          caption="图 3-1 数据清洗管道 (XShell)"
        />;
      case 3: // Wang: Plain (Mixed)
        return <PlainTerminal 
          command={`awk -F, '{if($7>=3 && $7<=80) print $0}' dataset_final.csv | sed 's/\\r//g' > final_dataset.csv`}
          output=""
          caption="图 3-1 纯命令行预处理指令"
        />;
      case 4: // Zhao: Kali (Mixed)
        return <KaliTerminal 
          user="root" host="kali" cwd="~/code"
          command={`awk -F, '$4>0' ai4i2020_plus.csv | tr 'a-z' 'A-Z' > ai4i2020_clean.csv`}
          output=""
          caption="图 3-1 使用 Kali 清洗数据"
        />;
    }
  };

  const renderVerifyTerminal = () => {
    switch (config.id) {
      case 1: // Zhang: XShell
        return <XShellTerminal 
          user="zhangming" host="hadoop-master" cwd="~"
          command={`wc -l cleaned_data.csv && hdfs dfs -put cleaned_data.csv /user/ai4i2020/clean/`}
          output={`10582 cleaned_data.csv
Upload success.`}
          caption="图 3-2 验证行数并上传"
        />;
      case 2: // Li: Linux
        return <LinuxTerminal 
          user="lihua" host="server" cwd="/home/lihua"
          command={`wc -l processed_data.csv`}
          output={`10685 processed_data.csv`}
          caption="图 3-2 结果统计"
        />;
      case 3: // Wang: Ubuntu
        return <UbuntuTerminal 
          user="wangfang" host="ubuntu" cwd="~"
          command={`grep -c "" final_dataset.csv`}
          output={`11925`}
          caption="图 3-2 验证输出记录数"
        />;
      case 4: // Zhao: Linux (Mixed)
        return <LinuxTerminal 
          user="zhaoqiang" host="node-2" cwd="~/code"
          command={`hdfs dfs -ls /project/device_data/clean/`}
          output={`Found 1 items
-rw-r--r--   1 zhaoqiang supergroup 1.2M 2024-05-20 /project/device_data/clean/ai4i2020_clean.csv`}
          caption="图 3-2 HDFS 结果确认"
        />;
    }
  };

  return (
    <div className="page text-black">
      <h2 className="text-2xl font-bold mb-6 border-b-2 border-black pb-2">三、 数据预处理</h2>

      <h3 className="text-xl font-bold mt-4 mb-2">3.1 预处理工具与方法</h3>
      <p className="mb-2 text-justify indent-8 leading-7 whitespace-pre-line">{content.method}</p>

      <h3 className="text-xl font-bold mt-4 mb-2">3.2 核心清洗操作</h3>
      <p className="mb-2 text-justify indent-8 leading-7 whitespace-pre-line">{content.steps}</p>
      {renderPreprocTerminal()}

      <h3 className="text-xl font-bold mt-4 mb-2">3.3 结果验证与保存</h3>
      <p className="mb-2 text-justify indent-8 leading-7 whitespace-pre-line">{content.verify}</p>
      {renderVerifyTerminal()}
    </div>
  );
};