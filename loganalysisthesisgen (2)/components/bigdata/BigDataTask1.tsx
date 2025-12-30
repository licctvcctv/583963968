import React from 'react';
import { TerminalWindow } from './TerminalWindow';

// 任务一：Hadoop环境搭建与词频统计
export const BigDataTask1: React.FC = () => (
    <>
        {/* 第1页 */}
        <div id="bigdata-task1" className="page bg-white w-[210mm] min-h-[297mm] mx-auto shadow-lg mb-8 p-12">
            <h2 className="text-2xl font-bold mb-6 border-b-2 border-gray-300 pb-2">任务一：Hadoop环境搭建与词频统计</h2>

            <h3 className="text-xl font-semibold mt-6 mb-4">1.1 实验环境准备</h3>
            <p className="mb-4 text-justify indent-8">
                本次实验采用Hortonworks Data Platform (HDP) Sandbox 2.5.0作为Hadoop实验环境。HDP Sandbox是一个预配置的虚拟机镜像，
                内置了完整的Hadoop生态系统组件，包括HDFS、YARN、MapReduce等核心组件。
                实验环境配置如下：使用VirtualBox 7.0.4导入HDP_2.5_virtualbox.ova镜像文件，
                虚拟机内存配置为8GB，CPU核心数设置为4核，网络模式配置为NAT。
                启动虚拟机后，通过浏览器访问http://127.0.0.1:8888可进入Ambari管理界面。
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-4">1.2 创建个人用户账户</h3>
            <p className="mb-4 text-justify indent-8">
                为确保实验的独立性和可追溯性，需要以自己的姓名拼音创建专属用户账户。首先使用XShell终端工具连接到虚拟机，
                连接参数为：主机地址127.0.0.1，端口号2222，初始用户名root，初始密码hadoop。
            </p>
            <TerminalWindow
                user="root"
                title="root@ubuntu-server:~"
                command="useradd lutianwei"
                output=""
                theme="ubuntu"
                host="ubuntu-server"
            />
            <TerminalWindow
                user="root"
                title="root@sandbox.hortonworks.com - Xshell 7"
                command="passwd lutianwei"
                output={`Changing password for user lutianwei.
New password: 
Retype new password: 
passwd: all authentication tokens updated successfully.`}
            />
            <p className="text-center text-sm font-bold mb-4">图 1-1 创建新用户lutianwei与设置密码</p>

            <h3 className="text-xl font-semibold mt-6 mb-4">1.3 使用新用户登录系统</h3>
            <p className="mb-4 text-justify indent-8">
                在XShell中新建会话，使用刚才创建的lutianwei账户重新连接虚拟机。登录成功后，命令提示符会显示为
                [lutianwei@sandbox ~]$，表明当前操作用户为lutianwei。
            </p>
            <TerminalWindow
                title="lutianwei@sandbox.hortonworks.com - Xshell 7"
                command="whoami"
                output="lutianwei"
            />
            <TerminalWindow
                title="lutianwei@sandbox.hortonworks.com - Xshell 7"
                command="pwd"
                output="/home/lutianwei"
            />
            <p className="text-center text-sm font-bold mb-4">图 1-2 使用新用户登录并验证身份</p>
        </div>

        {/* 第2页 */}
        <div id="bigdata-task1-2" className="page bg-white w-[210mm] min-h-[297mm] mx-auto shadow-lg mb-8 p-12">
            <h3 className="text-xl font-semibold mt-2 mb-4">1.4 查看HDFS文件系统结构</h3>
            <p className="mb-4 text-justify indent-8">
                Hadoop分布式文件系统（HDFS）是Hadoop的核心组件之一，提供高吞吐量的数据访问。
                使用hdfs dfs -ls /命令查看HDFS根目录结构。
            </p>
            <TerminalWindow
                title="lutianwei@sandbox.hortonworks.com - Xshell 7"
                command="hdfs dfs -ls /"
                output={`Found 10 items
drwxrwxrwx   - yarn   hadoop          0 2025-12-20 08:15 /app-logs
drwxr-xr-x   - hdfs   hdfs            0 2025-12-20 08:10 /apps
drwxr-xr-x   - yarn   hadoop          0 2025-12-20 08:12 /ats
drwxr-xr-x   - hdfs   hdfs            0 2025-12-20 08:12 /hdp
drwxr-xr-x   - mapred hdfs            0 2025-12-20 08:11 /mapred
drwxr-xr-x   - hdfs   hdfs            0 2025-12-20 08:11 /mr-history
drwxrwxrwx   - hdfs   hdfs            0 2025-12-20 08:15 /tmp
drwxr-xr-x   - hdfs   hdfs            0 2025-12-20 08:12 /user`}
            />
            <p className="text-center text-sm font-bold mb-4">图 1-3 查看HDFS根目录结构</p>

            <h3 className="text-xl font-semibold mt-6 mb-4">1.5 在HDFS中创建输入目录</h3>
            <p className="mb-4 text-justify indent-8">
                为了存储待处理的文本文件，需要在HDFS中创建专用的输入目录。
            </p>
            <TerminalWindow
                title="lutianwei@sandbox.hortonworks.com - Xshell 7"
                command="hdfs dfs -mkdir /input"
                output=""
            />
            <TerminalWindow
                title="lutianwei@sandbox.hortonworks.com - Xshell 7"
                command="hdfs dfs -ls /"
                output={`Found 11 items
drwxrwxrwx   - yarn   hadoop          0 2025-12-20 08:15 /app-logs
drwxr-xr-x   - hdfs   hdfs            0 2025-12-20 08:10 /apps
drwxr-xr-x   - yarn   hadoop          0 2025-12-20 08:12 /ats
drwxr-xr-x   - hdfs   hdfs            0 2025-12-20 08:12 /hdp
drwxr-xr-x   - lutianwei hdfs         0 2025-12-21 14:30 /input
drwxr-xr-x   - mapred hdfs            0 2025-12-20 08:11 /mapred
drwxr-xr-x   - hdfs   hdfs            0 2025-12-20 08:11 /mr-history
drwxrwxrwx   - hdfs   hdfs            0 2025-12-20 08:15 /tmp
drwxr-xr-x   - hdfs   hdfs            0 2025-12-20 08:12 /user`}
            />
            <p className="text-center text-sm font-bold mb-4">图 1-4 创建HDFS输入目录</p>

            <h3 className="text-xl font-semibold mt-6 mb-4">1.6 准备文本文件</h3>
            <p className="mb-4 text-justify indent-8">
                本实验准备了5个英文文本文件，每个文件大小不小于100KB。使用FileZilla将本地文本文件
                传输到虚拟机的用户主目录。
            </p>
            <TerminalWindow
                title="lutianwei@sandbox.hortonworks.com - Xshell 7"
                command="ls -lh *.txt"
                output={`-rw-rw-r-- 1 lutianwei lutianwei 125K Dec 21 14:25 1.txt
-rw-rw-r-- 1 lutianwei lutianwei 118K Dec 21 14:25 2.txt
-rw-rw-r-- 1 lutianwei lutianwei 132K Dec 21 14:25 3.txt
-rw-rw-r-- 1 lutianwei lutianwei 145K Dec 21 14:25 4.txt
-rw-rw-r-- 1 lutianwei lutianwei 128K Dec 21 14:25 5.txt`}
            />
            <p className="text-center text-sm font-bold mb-4">图 1-5 查看本地文本文件列表</p>
        </div>
    </>
);

export default BigDataTask1;
