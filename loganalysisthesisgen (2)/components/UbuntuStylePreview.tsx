import React from 'react';
import { TerminalWindow } from './bigdata/TerminalWindow';

export const UbuntuStylePreview: React.FC = () => {
    return (
        <div id="ubuntu-preview" className="page bg-white w-[210mm] min-h-[297mm] mx-auto shadow-lg mb-8 p-12">
            <h2 className="text-2xl font-bold mb-6 border-b-2 border-purple-300 pb-2 text-purple-900">
                Ubuntu 虚拟机样式预览
            </h2>

            <p className="mb-4">这是您要求的 Ubuntu (紫色) 风格终端窗口效果展示：</p>

            <h3 className="text-xl font-semibold mt-6 mb-4">样式 1: 登录与基础命令</h3>
            <TerminalWindow
                theme="ubuntu"
                title="lutianwei@ubuntu-server:~"
                host="ubuntu-server"
                user="lutianwei"
                command="whoami"
                output="lutianwei"
            />

            <h3 className="text-xl font-semibold mt-6 mb-4">样式 2: 复杂输出展示 (HDFS List)</h3>
            <TerminalWindow
                theme="ubuntu"
                title="lutianwei@ubuntu-server:/usr/local/hadoop"
                host="ubuntu-server"
                user="lutianwei"
                cwd="/usr/local/hadoop"
                command="ls -l"
                output={`total 24
drwxr-xr-x 2 root root 4096 Dec 20 10:01 bin
drwxr-xr-x 3 root root 4096 Dec 20 10:01 etc
drwxr-xr-x 2 root root 4096 Dec 20 10:01 include
drwxr-xr-x 3 root root 4096 Dec 20 10:01 lib
drwxr-xr-x 2 root root 4096 Dec 20 10:01 libexec
drwxr-xr-x 2 root root 4096 Dec 20 10:01 sbin
drwxr-xr-x 4 root root 4096 Dec 20 10:01 share`}
            />

            <h3 className="text-xl font-semibold mt-6 mb-4">样式 3: 启动过程 (MapReduce)</h3>
            <TerminalWindow
                theme="ubuntu"
                title="lutianwei@node-1:~/jobs"
                host="node-1"
                user="lutianwei"
                cwd="~/jobs"
                command="bin/hadoop jar words.jar wordcount /in /out"
                output={`25/12/30 15:55:01 INFO client.RMProxy: Connecting to ResourceManager at node-1/192.168.1.100:8032
25/12/30 15:55:02 INFO input.FileInputFormat: Total input paths to process : 1
25/12/30 15:55:02 INFO mapreduce.JobSubmitter: number of splits:1
25/12/30 15:55:03 INFO mapreduce.Job: The url to track the job: http://node-1:8088/proxy/application_1735545300000_0001/
25/12/30 15:55:03 INFO mapreduce.Job: Running job: job_1735545300000_0001
25/12/30 15:55:10 INFO mapreduce.Job:  map 0% reduce 0%
25/12/30 15:55:15 INFO mapreduce.Job:  map 100% reduce 0%
25/12/30 15:55:20 INFO mapreduce.Job:  map 100% reduce 100%
25/12/30 15:55:21 INFO mapreduce.Job: Job job_1735545300000_0001 completed successfully`}
            />
        </div>
    );
};
