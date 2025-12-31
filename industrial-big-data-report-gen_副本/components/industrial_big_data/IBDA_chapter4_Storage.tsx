import React from 'react';
import { StudentConfig } from '../../types';
import { VMScreenshot } from './VMScreenshot';
import { genDBCreate, genQueries } from './terminalGenerators';

export const IBDA_chapter4_Storage: React.FC<{ config: StudentConfig }> = ({ config }) => {
  const dbName = config.techStack.database;
  
  return (
    <div className="page text-black">
      <h2 className="text-2xl font-bold mb-6 border-b-2 border-black pb-2">四、 数据存储</h2>

      <h3 className="text-xl font-bold mt-4 mb-2">4.1 数据库创建 ({dbName})</h3>
      <p>根据数据特性，选择 {dbName} 作为存储介质。{dbName === 'HBase' ? '采用 RowKey 设计优化查询。' : '建立复合索引以提升读取速度。'}</p>
      <VMScreenshot theme={config.visualTheme.terminal} title={`Create ${dbName}`} command={dbName==='HBase'?'hbase shell':'mongo'} output={genDBCreate(config)} />

      <h3 className="text-xl font-bold mt-4 mb-2">4.2 数据导入</h3>
      <p>使用导入工具将清洗后的数据批量写入数据库。</p>
      <VMScreenshot theme={config.visualTheme.terminal} title="Data Import" 
        command={dbName==='HBase' 
          ? `hbase org.apache.hadoop.hbase.mapreduce.ImportTsv -Dimporttsv.columns=... uci_data /clean_input` 
          : `mongoimport --db industrial_db --collection device_collection --type csv --file cleaned.csv --headerline`} 
        output={`... Job completed successfully.\nImported ${10000+config.personalizedData.addedRecords-15} records.`} 
      />

      <h3 className="text-xl font-bold mt-4 mb-2">4.3 关键查询任务实现</h3>
      <div className="space-y-4">
        <div>
          <p className="font-bold">任务1：查询某 UDI 的所有运行参数</p>
          <VMScreenshot theme={config.visualTheme.terminal} title="Query 1" command="[Query Command 1]" output={genQueries(config, 1)} />
        </div>
        <div>
          <p className="font-bold">任务2：查询所有 H 型设备的记录数</p>
          <VMScreenshot theme={config.visualTheme.terminal} title="Query 2" command="[Query Command 2]" output={genQueries(config, 2)} />
        </div>
        <div>
          <p className="font-bold">任务3：查询 Tool Wear > 200 的故障设备</p>
          <VMScreenshot theme={config.visualTheme.terminal} title="Query 3" command="[Query Command 3]" output={genQueries(config, 3)} />
        </div>
      </div>
    </div>
  );
};