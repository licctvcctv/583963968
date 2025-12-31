import { StudentConfig } from '../../types';

const prompt = (c: StudentConfig) => {
    return `[${c.terminalConfig.user}@${c.terminalConfig.host} ${c.terminalConfig.path}]${c.terminalConfig.promptChar}`;
};

// Chapter 2
export const genHDFSPut = (c: StudentConfig) => {
  const p = prompt(c);
  if (c.id === 1) return `${p} hdfs dfs -mkdir -p /user/zhangming/project\n${p} hdfs dfs -put ai4i2020.csv /user/zhangming/project/`;
  if (c.id === 2) return `${p} hdfs dfs -put ~/data/industrial.csv /data/raw/`;
  if (c.id === 3) return `${p} hdfs dfs -copyFromLocal dataset_final.csv /user/wangfang/bigdata/`;
  return `${p} hdfs dfs -put ai4i2020_v2.csv /input/`;
};

export const genHDFSVerify = (c: StudentConfig) => {
    const p = prompt(c);
    const count = 10000 + c.personalizedData.addedRecords;
    if (c.id === 1) return `Found 1 items\n-rw-r--r--   3 ${c.terminalConfig.user} supergroup    1.45M 2024-05-20 10:15 /user/zhangming/project/ai4i2020.csv`;
    if (c.id === 2) return `Found 1 items\n-rw-r--r--   1 ${c.terminalConfig.user} hdfs          1.51M 2024-05-20 11:20 /data/raw/industrial.csv`;
    if (c.id === 3) return `Found 1 items\n-rwxr-xr-x   2 ${c.terminalConfig.user} hadoop        1.48M 2024-05-20 09:45 /user/wangfang/bigdata/dataset_final.csv`;
    return `            1            1      1523456 /input/ai4i2020_v2.csv`;
};

export const genHDFSList = genHDFSVerify;

// Chapter 3
export const genPreprocCmd = (c: StudentConfig) => {
    const p = prompt(c);
    if(c.id === 1) return `${p} awk -F, '$4>290' data.csv > temp.csv\n${p} grep -v ",," temp.csv > clean.csv`;
    if(c.id === 2) return `${p} cat raw.csv | awk 'NR>1' | sed 's/L/Low/g' > processed.csv`;
    if(c.id === 3) return `${p} ./clean_script.sh dataset_final.csv`;
    return `${p} python3 clean_data.py --input ai4i.csv --output clean.csv`;
};

export const genPreprocVerify = (c: StudentConfig) => {
    const total = 10000 + c.personalizedData.addedRecords - 12; // Some dropped
    return `${total} cleaned.csv`;
};

export const genHDFSCleanPut = (c: StudentConfig) => {
    const p = prompt(c);
    if(c.id === 1) return `${p} hdfs dfs -put clean.csv /user/zhangming/clean/`;
    return `${p} hdfs dfs -put processed.csv /data/processed/`;
};

// Chapter 4
export const genDBCreate = (c: StudentConfig) => {
    if (c.techStack.database === 'HBase') {
        return `hbase(main):001:0> create '${c.techStack.tableName}', 'basic', 'sensor', 'fault'
0 row(s) in 2.2340 seconds
=> Hbase::Table - ${c.techStack.tableName}`;
    }
    return `> use industrial_db
switched to db industrial_db
> db.createCollection("${c.techStack.tableName}")
{ "ok" : 1 }`;
};

export const genDBImport = (c: StudentConfig) => {
    const p = prompt(c);
    if (c.techStack.database === 'HBase') {
        return `${p} hbase org.apache.hadoop.hbase.mapreduce.ImportTsv -Dimporttsv.columns=... ${c.techStack.tableName} /clean_input`;
    }
    return `${p} mongoimport --db industrial_db --collection ${c.techStack.tableName} --type csv --headerline --file clean.csv`;
};

export const genQuery1 = (c: StudentConfig) => {
    if (c.techStack.database === 'HBase') return `hbase(main):002:0> get '${c.techStack.tableName}', '10050'\nCOLUMN CELL\n basic:Type timestamp=... value=M`;
    return `> db.${c.techStack.tableName}.findOne({udi: 10050})\n{ "_id": ..., "udi": 10050, "type": "M" ... }`;
};

export const genQuery2 = (c: StudentConfig) => {
    if (c.techStack.database === 'HBase') return `hbase(main):003:0> scan '${c.techStack.tableName}', {FILTER=>"PrefixFilter('H')"} \n... 1003 row(s)`;
    return `> db.${c.techStack.tableName}.find({Type: 'H'}).count()\n1003`;
};

export const genQuery3 = (c: StudentConfig) => {
    if (c.techStack.database === 'HBase') return `hbase(main):004:0> scan '${c.techStack.tableName}', {FILTER=>"ValueFilter(>, 'binary:200')"} \n... 46 row(s)`;
    return `> db.${c.techStack.tableName}.find({ToolWear: {$gt: 200}})\n{ "udi": 1050, "fault": "TWF" }...`;
};

export const genQueries = (c: StudentConfig, index: number) => {
    switch(index) {
        case 1: return genQuery1(c);
        case 2: return genQuery2(c);
        case 3: return genQuery3(c);
        default: return "";
    }
};

// Chapter 5
export const genMRBuild = (c: StudentConfig) => {
    const p = prompt(c);
    return `${p} javac -cp $(hadoop classpath) ${c.techStack.mapReduceAlgorithm}.java\n${p} jar -cvf analyze.jar ${c.techStack.mapReduceAlgorithm}*.class`;
};

export const genMRRun = (c: StudentConfig) => {
    const p = prompt(c);
    return `${p} hadoop jar analyze.jar ${c.techStack.mapReduceAlgorithm} /input /output`;
};

export const genMROutput = (c: StudentConfig) => {
    const p = prompt(c);
    return `${p} hdfs dfs -cat /output/part-r-00000\nHDF\t115\nPWF\t95\nOSF\t98`;
};