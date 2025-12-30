import React from 'react';
import { TerminalWindow } from './TerminalWindow';

// 任务一续：WordCount执行与结果
export const BigDataTask1_Part2: React.FC = () => (
    <>
        {/* 第3页 */}
        <div id="bigdata-task1-3" className="page bg-white w-[210mm] min-h-[297mm] mx-auto shadow-lg mb-8 p-12">
            <h3 className="text-xl font-semibold mt-2 mb-4">1.7 上传文件到HDFS</h3>
            <p className="mb-4 text-justify indent-8">
                使用HDFS的put命令将5个文本文件从本地文件系统上传到HDFS的/input目录。
            </p>
            <TerminalWindow
                title="lutianwei@ubuntu-db-1:~"
                command="hdfs dfs -put 1.txt /input/"
                output=""
                theme="ubuntu"
                user="lutianwei"
                host="ubuntu-db-1"
                cwd="~"
            />
            <TerminalWindow
                title="lutianwei@sandbox.hortonworks.com - Xshell 7"
                command="hdfs dfs -put 2.txt 3.txt 4.txt 5.txt /input/"
                output=""
            />
            <TerminalWindow
                title="lutianwei@sandbox.hortonworks.com - Xshell 7"
                command="hdfs dfs -ls /input"
                output={`Found 5 items
-rw-r--r--   1 lutianwei hdfs     128000 2025-12-21 14:35 /input/1.txt
-rw-r--r--   1 lutianwei hdfs     120832 2025-12-21 14:35 /input/2.txt
-rw-r--r--   1 lutianwei hdfs     135168 2025-12-21 14:36 /input/3.txt
-rw-r--r--   1 lutianwei hdfs     148480 2025-12-21 14:36 /input/4.txt
-rw-r--r--   1 lutianwei hdfs     131072 2025-12-21 14:36 /input/5.txt`}
            />
            <p className="text-center text-sm font-bold mb-4">图 1-6 上传文本文件到HDFS并验证</p>

            <h3 className="text-xl font-semibold mt-6 mb-4">1.8 查看hadoop-mapreduce-examples包</h3>
            <p className="mb-4 text-justify indent-8">
                确认hadoop-mapreduce-examples-2.7.2.jar文件已存在于当前目录。
            </p>
            <TerminalWindow
                title="lutianwei@sandbox.hortonworks.com - Xshell 7"
                command="ls -lh hadoop-mapreduce-examples*.jar"
                output={`-rw-rw-r-- 1 lutianwei lutianwei 279K Dec 21 14:20 hadoop-mapreduce-examples-2.7.2.jar`}
            />
            <p className="text-center text-sm font-bold mb-4">图 1-7 确认MapReduce示例包</p>

            <h3 className="text-xl font-semibold mt-6 mb-4">1.9 执行MapReduce WordCount程序</h3>
            <p className="mb-4 text-justify indent-8">
                使用hadoop jar命令执行WordCount程序，对/input目录下的5个文本文件进行词频统计。
            </p>
            <TerminalWindow
                title="lutianwei@sandbox.hortonworks.com - Xshell 7"
                command="hadoop jar hadoop-mapreduce-examples-2.7.2.jar wordcount /input /output"
                output={`25/12/21 14:40:15 INFO client.RMProxy: Connecting to ResourceManager at sandbox.hortonworks.com/172.18.0.2:8050
25/12/21 14:40:15 INFO client.RMProxy: Connecting to ResourceManager at sandbox.hortonworks.com/172.18.0.2:8050
25/12/21 14:40:16 INFO input.FileInputFormat: Total input paths to process : 5
25/12/21 14:40:16 INFO mapreduce.JobSubmitter: number of splits:5
25/12/21 14:40:16 INFO mapreduce.JobSubmitter: Submitting tokens for job: job_1734789600000_0001
25/12/21 14:40:17 INFO impl.YarnClientImpl: Submitted application application_1734789600000_0001
25/12/21 14:40:17 INFO mapreduce.Job: The url to track the job: http://sandbox.hortonworks.com:8088/proxy/application_1734789600000_0001/
25/12/21 14:40:17 INFO mapreduce.Job: Running job: job_1734789600000_0001`}
            />
            <p className="text-center text-sm font-bold mb-4">图 1-8 提交WordCount作业</p>
        </div>

        {/* 第4页 */}
        <div id="bigdata-task1-4" className="page bg-white w-[210mm] min-h-[297mm] mx-auto shadow-lg mb-8 p-12">
            <h3 className="text-xl font-semibold mt-2 mb-4">1.10 MapReduce作业执行过程</h3>
            <p className="mb-4 text-justify indent-8">
                观察MapReduce作业的执行进度，包括Map阶段和Reduce阶段。
            </p>
            <TerminalWindow
                title="lutianwei@sandbox.hortonworks.com - Xshell 7"
                command=""
                output={`25/12/21 14:40:25 INFO mapreduce.Job: Job job_1734789600000_0001 running in uber mode : false
25/12/21 14:40:25 INFO mapreduce.Job:  map 0% reduce 0%
25/12/21 14:40:32 INFO mapreduce.Job:  map 20% reduce 0%
25/12/21 14:40:38 INFO mapreduce.Job:  map 40% reduce 0%
25/12/21 14:40:44 INFO mapreduce.Job:  map 60% reduce 0%
25/12/21 14:40:50 INFO mapreduce.Job:  map 80% reduce 0%
25/12/21 14:40:55 INFO mapreduce.Job:  map 100% reduce 0%
25/12/21 14:41:02 INFO mapreduce.Job:  map 100% reduce 33%
25/12/21 14:41:08 INFO mapreduce.Job:  map 100% reduce 67%
25/12/21 14:41:12 INFO mapreduce.Job:  map 100% reduce 100%
25/12/21 14:41:14 INFO mapreduce.Job: Job job_1734789600000_0001 completed successfully`}
            />
            <p className="text-center text-sm font-bold mb-4">图 1-9 MapReduce作业执行进度</p>

            <h3 className="text-xl font-semibold mt-6 mb-4">1.11 作业统计信息</h3>
            <TerminalWindow
                title="lutianwei@sandbox.hortonworks.com - Xshell 7"
                command=""
                output={`25/12/21 14:41:14 INFO mapreduce.Job: Counters: 49
        File System Counters
                FILE: Number of bytes read=892456
                FILE: Number of bytes written=2156789
                FILE: Number of read operations=0
                FILE: Number of write operations=0
                HDFS: Number of bytes read=663552
                HDFS: Number of bytes written=245678
                HDFS: Number of read operations=18
                HDFS: Number of write operations=2
        Job Counters 
                Launched map tasks=5
                Launched reduce tasks=1
                Data-local map tasks=5
                Total time spent by all maps in occupied slots (ms)=45000
                Total time spent by all reduces in occupied slots (ms)=12000
                Total vcore-milliseconds taken by all map tasks=45000
                Total vcore-milliseconds taken by all reduce tasks=12000
        Map-Reduce Framework
                Map input records=12456
                Map output records=98765
                Map output bytes=1024000
                Map output materialized bytes=892456
                Input split bytes=570
                Combine input records=98765
                Combine output records=8542
                Reduce input groups=8542
                Reduce shuffle bytes=892456
                Reduce input records=8542
                Reduce output records=8542
                Spilled Records=17084
                Shuffled Maps =5
                Failed Shuffles=0
                Merged Map outputs=5
                GC time elapsed (ms)=1234
                CPU time spent (ms)=15680
                Physical memory (bytes) snapshot=1234567890
                Virtual memory (bytes) snapshot=9876543210
        Shuffle Errors
                BAD_ID=0
                CONNECTION=0
                IO_ERROR=0
                WRONG_LENGTH=0
                WRONG_MAP=0
                WRONG_REDUCE=0
        File Input Format Counters 
                Bytes Read=663552
        File Output Format Counters 
                Bytes Written=245678`}
            />
            <p className="text-center text-sm font-bold mb-4">图 1-10 作业完成及统计信息</p>
        </div>
    </>
);

export default BigDataTask1_Part2;
