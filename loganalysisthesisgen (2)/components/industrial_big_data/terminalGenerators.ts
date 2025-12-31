import { StudentConfig, STUDENT_SAMPLE_DATA, BASE_STATS } from './IBDA_config';

const prompt = (c: StudentConfig) => {
  return `[${c.terminalConfig.user}@${c.terminalConfig.host} ${c.terminalConfig.path}]${c.terminalConfig.promptChar}`;
};

// 获取每个学生的独特数据
const getStudentData = (c: StudentConfig) => {
  return STUDENT_SAMPLE_DATA[c.id as keyof typeof STUDENT_SAMPLE_DATA] || STUDENT_SAMPLE_DATA[1];
};

// Chapter 2: Data Preparation
export const genHDFSPut = (c: StudentConfig) => {
  const p = prompt(c);
  const data = getStudentData(c);
  if (c.id === 1) return `${p} hdfs dfs -mkdir -p /user/${c.terminalConfig.user}/project\n${p} hdfs dfs -put ai4i2020_extended_900.csv /user/${c.terminalConfig.user}/project/`;
  if (c.id === 2) return `${p} hdfs dfs -put ~/data/industrial_data.csv /data/raw/`;
  if (c.id === 3) return `${p} hdfs dfs -copyFromLocal sensor_dataset.csv /user/${c.terminalConfig.user}/bigdata/`;
  return `${p} hdfs dfs -put ai4i2020.csv /input/`;
};

export const genHDFSVerify = (c: StudentConfig) => {
  const data = getStudentData(c);
  if (c.id === 1) return `Found 1 items\n-rw-r--r--   3 ${c.terminalConfig.user.padEnd(14)} supergroup    1.18M 2024-05-20 10:15 /user/${c.terminalConfig.user}/project/ai4i2020_extended_900.csv`;
  if (c.id === 2) return `Found 1 items\n-rw-r--r--   1 ${c.terminalConfig.user.padEnd(14)} hdfs          1.15M 2024-05-20 11:20 /data/raw/industrial_data.csv`;
  if (c.id === 3) return `Found 1 items\n-rwxr-xr-x   2 ${c.terminalConfig.user.padEnd(14)} hadoop        1.20M 2024-05-20 09:45 /user/${c.terminalConfig.user}/bigdata/sensor_dataset.csv`;
  return `            1            1       1234567 /input/ai4i2020.csv`;
};

export const genHDFSList = genHDFSVerify;

// Chapter 3: Preprocessing
export const genPreprocCmd = (c: StudentConfig) => {
  const p = prompt(c);
  if (c.id === 1) return `${p} awk -F, '$4>290 && $4<310' data.csv > temp.csv\n${p} grep -v ",NA" temp.csv > cleaned.csv`;
  if (c.id === 2) return `${p} cat raw.csv | awk 'NR>1 && $3!=""' | sed 's/L/Low/g' > processed.csv`;
  if (c.id === 3) return `${p} ./preprocess.sh dataset_final.csv`;
  return `${p} python3 clean_data.py --input raw.csv --output cleaned.csv`;
};

export const genPreprocVerify = (c: StudentConfig) => {
  const data = getStudentData(c);
  return `${data.cleanedRecords} cleaned.csv`;
};

export const genHDFSCleanPut = (c: StudentConfig) => {
  const p = prompt(c);
  if (c.id === 1) return `${p} hdfs dfs -put cleaned.csv /user/${c.terminalConfig.user}/clean/`;
  if (c.id === 2) return `${p} hdfs dfs -put processed.csv /data/processed/`;
  if (c.id === 3) return `${p} hdfs dfs -put data_clean.csv /user/${c.terminalConfig.user}/processed/`;
  return `${p} hdfs dfs -put cleaned.csv /input/clean/`;
};

// Chapter 4: Storage
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
  const data = getStudentData(c);
  if (c.techStack.database === 'HBase') {
    return `${p} hbase org.apache.hadoop.hbase.mapreduce.ImportTsv -Dimporttsv.columns="HBASE_ROW_KEY,basic:UDI,sensor:AirTemperature" ${c.techStack.tableName} /clean_input\n...
2024-05-20 12:15:23 INFO mapreduce.Job: Job job_${data.udiStart}_0003 completed successfully
imported ${data.cleanedRecords} Rows`;
  }
  return `${p} mongoimport --db industrial_db --collection ${c.techStack.tableName} --type csv --headerline --file cleaned.csv
2024-05-20T12:25:00.123+0000    connected to: localhost
2024-05-20T12:25:02.456+0000    imported ${data.cleanedRecords} documents`;
};

export const genQuery1 = (c: StudentConfig) => {
  const data = getStudentData(c);
  if (c.techStack.database === 'HBase') return `hbase(main):002:0> get '${c.techStack.tableName}', '${data.udiStart + 20}'\nCOLUMN                CELL\n basic:UDI          timestamp=..., value=${data.udiStart + 20}\n sensor:AirTemp     timestamp=..., value=300.5`;
  return `> db.${c.techStack.tableName}.findOne({UDI: ${data.udiStart + 20}})\n{ "_id": ObjectId("..."), "UDI": ${data.udiStart + 20}, "Type": "L", "Air temperature [K]": 300.5 }`;
};

export const genQuery2 = (c: StudentConfig) => {
  const data = getStudentData(c);
  if (c.techStack.database === 'HBase') return `hbase(main):003:0> scan '${c.techStack.tableName}', {FILTER=>"PrefixFilter('M')"}\nROW     COLUMN+CELL\n${data.udiStart + 5}    column=basic:Type, timestamp=..., value=M\n${data.udiStart + 15}   column=basic:Type, timestamp=..., value=M\n... ${Math.round(data.cleanedRecords * 0.33)} row(s)`;
  return `> db.${c.techStack.tableName}.find({Type: "M"}).count()\n${Math.round(data.cleanedRecords * 0.33)}`;
};

export const genQuery3 = (c: StudentConfig) => {
  const data = getStudentData(c);
  if (c.techStack.database === 'HBase') return `hbase(main):004:0> scan '${c.techStack.tableName}', {FILTER=>"ValueFilter(>, 'binary:200')", COLUMNS=>'sensor:ToolWear'}\nROW     COLUMN+CELL\n${data.udiStart + 35}   column=sensor:ToolWear, timestamp=..., value=218\n${data.udiStart + 67}   column=sensor:ToolWear, timestamp=..., value=201\n... 12 row(s)`;
  return `> db.${c.techStack.tableName}.find({"Tool wear [min]": {$gt: 200}}).count()\n12`;
};

export const genQueries = (c: StudentConfig, index: number) => {
  switch (index) {
    case 1: return genQuery1(c);
    case 2: return genQuery2(c);
    case 3: return genQuery3(c);
    default: return "";
  }
};

// Chapter 5: Analysis
export const genMRBuild = (c: StudentConfig) => {
  const p = prompt(c);
  return `${p} javac -cp $(hadoop classpath) FaultAnalysis.java\n${p} jar -cvf analyze.jar FaultAnalysis*.class`;
};

export const genMRRun = (c: StudentConfig) => {
  const p = prompt(c);
  return `${p} hadoop jar analyze.jar FaultAnalysis /input /output`;
};

export const genMROutput = (c: StudentConfig) => {
  const p = prompt(c);
  const data = getStudentData(c);
  return `${p} cat /output/part-r-00000\n${data.faultOutput}`;
};
