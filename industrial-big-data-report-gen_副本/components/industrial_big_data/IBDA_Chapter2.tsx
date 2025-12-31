import React from 'react';
import { StudentConfig } from '../../types';
import { ExcelScreenshot } from './ExcelScreenshot';
import { getChapter2Text } from './assets/chapter2';
import { UbuntuTerminal, KaliTerminal, XShellTerminal, LinuxTerminal } from './Terminals';

export const IBDA_Chapter2: React.FC<{ config: StudentConfig }> = ({ config }) => {
  const content: any = getChapter2Text(config);
  
  const excelRows = [
    { UDI: 1, Type: "M", AirTemp: 298.1, RPM: 1551, Torque: 42.8, [config.personalizedData.customField]: "..." },
    { UDI: 2, Type: "L", AirTemp: 298.2, RPM: 1408, Torque: 46.3, [config.personalizedData.customField]: "..." },
    { UDI: 3, Type: "L", AirTemp: 298.1, RPM: 1498, Torque: 49.4, [config.personalizedData.customField]: "..." },
    { UDI: 10001, Type: "M", AirTemp: 300.1, RPM: 1600, Torque: 38.5, [config.personalizedData.customField]: "..." },
  ];

  // Distinct Terminal Logic - Mixed usage
  const renderUploadTerminal = () => {
    switch (config.id) {
      case 1: // Zhang: Kali
        return <KaliTerminal 
          user={config.terminalConfig.user} host={config.terminalConfig.host} cwd={config.terminalConfig.path}
          command={`hdfs dfs -put ai4i2020_extended.csv /user/ai4i2020/raw/`}
          output="INFO: Upload success. Block replication: 3."
          caption="图 2-2 使用 Kali 终端上传数据至 HDFS"
        />;
      case 2: // Li: Linux
        return <LinuxTerminal 
          user={config.terminalConfig.user} host={config.terminalConfig.host} cwd={config.terminalConfig.path}
          command={`hdfs dfs -put industrial_data.csv /bigdata/uci/data/`}
          output="Copying file: industrial_data.csv [==================>] 100%"
          caption="图 2-2 数据上传过程 (Linux Shell)"
        />;
      case 3: // Wang: Ubuntu
        return <UbuntuTerminal 
          user={config.terminalConfig.user} host={config.terminalConfig.host} cwd={config.terminalConfig.path}
          command={`hdfs dfs -copyFromLocal dataset_final.csv /data/industrial/raw/`}
          output="1.28 MB copied in 1.42s"
          caption="图 2-2 HDFS 数据导入 (Ubuntu)"
        />;
      case 4: // Zhao: XShell
        return <XShellTerminal 
          user={config.terminalConfig.user} host={config.terminalConfig.host} cwd={config.terminalConfig.path}
          command={`hdfs dfs -put ai4i2020_plus.csv /project/device_data/`}
          output="Put: 'ai4i2020_plus.csv': 100% complete."
          caption="图 2-2 通过 XShell 上传文件"
        />;
    }
  };

  // Mixed terminal for verify to show variety
  const renderVerifyTerminal = () => {
     switch (config.id) {
      case 1: // Zhang: XShell (Mixed)
        return <XShellTerminal 
          user={config.terminalConfig.user} host={config.terminalConfig.host} cwd={config.terminalConfig.path}
          command={`hdfs dfs -ls /user/ai4i2020/raw/`}
          output={`Found 1 items
-rw-r--r--   3 zhangming supergroup    1.28M 2024-05-20 10:15 /user/ai4i2020/raw/ai4i2020_extended.csv`}
          caption="图 2-3 验证上传结果 (XShell)"
        />;
      case 2: // Li: Linux (Consistent)
        return <LinuxTerminal 
          user={config.terminalConfig.user} host={config.terminalConfig.host} cwd={config.terminalConfig.path}
          command={`hdfs dfs -ls -h /bigdata/uci/data/`}
          output={`Found 1 items
-rw-r--r--   1 lihua hdfs      1.3 M 2024-05-20 11:20 /bigdata/uci/data/industrial_data.csv`}
          caption="图 2-3 HDFS 文件列表确认"
        />;
      case 3: // Wang: Kali (Mixed)
        return <KaliTerminal 
          user="root" host="kali-audit" cwd="~"
          command={`hdfs fsck /data/industrial/raw/dataset_final.csv -files -blocks`}
          output={`/data/industrial/raw/dataset_final.csv 1285410 bytes, 1 block(s):  OK
Status: HEALTHY`}
          caption="图 2-3 文件完整性审计 (Kali)"
        />;
      case 4: // Zhao: Ubuntu (Mixed)
        return <UbuntuTerminal 
          user={config.terminalConfig.user} host="monitor-node" cwd={config.terminalConfig.path}
          command={`hdfs dfs -count /project/device_data`}
          output={`           1            1            1285000 /project/device_data`}
          caption="图 2-3 确认文件大小 (Ubuntu)"
        />;
    }
  };

  return (
    <div className="page text-black">
      <h2 className="text-2xl font-bold mb-6 border-b-2 border-black pb-2">二、 数据准备</h2>

      <h3 className="text-xl font-bold mt-4 mb-2">2.1 数据集获取与校验</h3>
      <p className="mb-2 text-justify indent-8 leading-7 whitespace-pre-line">{content.download}</p>
      <div className="mb-8">
        <ExcelScreenshot rows={excelRows} title={`AI4I_${config.studentId}_Data`} />
        <div className="text-center text-sm font-bold">图 2-1 数据集预览（含 {config.personalizedData.customField}）</div>
      </div>

      <h3 className="text-xl font-bold mt-4 mb-2">2.2 个性化特征工程</h3>
      <p className="mb-2 text-justify indent-8 leading-7 whitespace-pre-line">{content.custom}</p>

      <h3 className="text-xl font-bold mt-4 mb-2">2.3 分布式文件系统上传</h3>
      <p className="mb-2 text-justify indent-8 leading-7 whitespace-pre-line">{content.upload}</p>
      
      {renderUploadTerminal()}
      {renderVerifyTerminal()}
    </div>
  );
};