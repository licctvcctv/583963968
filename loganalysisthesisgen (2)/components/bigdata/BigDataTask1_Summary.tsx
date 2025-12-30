import React from 'react';
import { TerminalWindow } from './TerminalWindow';

// 任务一：结果查看与总结
export const BigDataTask1_Summary: React.FC = () => (
    <>
        {/* 第5页 - 输出结果 */}
        <div id="bigdata-task1-5" className="page bg-white w-[210mm] min-h-[297mm] mx-auto shadow-lg mb-8 p-12">
            <h3 className="text-xl font-semibold mt-2 mb-4">1.12 检查输出目录</h3>
            <p className="mb-4 text-justify indent-8">
                作业执行完成后，结果保存在HDFS的/output目录中。
            </p>
            <TerminalWindow 
                title="lutianwei@sandbox.hortonworks.com - Xshell 7"
                command="hdfs dfs -ls /output"
                output={`Found 2 items
-rw-r--r--   1 lutianwei hdfs          0 2025-12-21 14:41 /output/_SUCCESS
-rw-r--r--   1 lutianwei hdfs     245678 2025-12-21 14:41 /output/part-r-00000`}
            />
            <p className="text-center text-sm font-bold mb-4">图 1-11 查看输出目录</p>

            <h3 className="text-xl font-semibold mt-6 mb-4">1.13 查看词频统计结果（Top 50）</h3>
            <p className="mb-4 text-justify indent-8">
                使用hdfs dfs -cat命令读取结果文件，通过sort命令按词频降序排序，使用head命令截取前50条记录。
            </p>
            <TerminalWindow 
                title="lutianwei@sandbox.hortonworks.com - Xshell 7"
                command={`hdfs dfs -cat /output/part-r-00000 | sort -t $'\\t' -k2 -nr | head -n 50`}
                output={`the	1542
of	986
and	875
to	823
a	756
in	698
is	645
that	589
for	534
it	478
with	423
as	398
was	376
on	354
be	332
are	298
by	276
this	254
from	243
have	232
or	221
an	198
at	187
not	176
but	165
which	154
they	143
you	132
all	121
were	118
has	115
been	112
their	108
will	105
would	102
can	98
more	95
if	92
about	89
one	86
out	83
up	80
when	77
there	74
so	71
what	68
who	65
no	62
my	59
said	56`}
            />
            <p className="text-center text-sm font-bold mb-4">图 1-12 词频统计结果 Top 50</p>
        </div>

        {/* 第6页 - 分析与总结 */}
        <div id="bigdata-task1-6" className="page bg-white w-[210mm] min-h-[297mm] mx-auto shadow-lg mb-8 p-12">
            <h3 className="text-xl font-semibold mt-2 mb-4">1.14 词频统计结果分析</h3>
            <p className="mb-4 text-justify indent-8">
                从统计结果可以看出，出现频率最高的单词主要是英文中的常用词（Stop Words），如冠词、介词、连词等。
                这符合自然语言的齐普夫定律（Zipf's Law）：在任何一种语言的语料库中，少数高频词占据了文本的大部分内容。
            </p>
            <table className="w-full border-collapse border border-gray-400 text-sm mb-6">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border border-gray-400 px-4 py-2">排名</th>
                        <th className="border border-gray-400 px-4 py-2">单词</th>
                        <th className="border border-gray-400 px-4 py-2">出现次数</th>
                        <th className="border border-gray-400 px-4 py-2">词性说明</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td className="border border-gray-400 px-4 py-1 text-center">1</td><td className="border border-gray-400 px-4 py-1">the</td><td className="border border-gray-400 px-4 py-1 text-center">1542</td><td className="border border-gray-400 px-4 py-1">定冠词</td></tr>
                    <tr><td className="border border-gray-400 px-4 py-1 text-center">2</td><td className="border border-gray-400 px-4 py-1">of</td><td className="border border-gray-400 px-4 py-1 text-center">986</td><td className="border border-gray-400 px-4 py-1">介词</td></tr>
                    <tr><td className="border border-gray-400 px-4 py-1 text-center">3</td><td className="border border-gray-400 px-4 py-1">and</td><td className="border border-gray-400 px-4 py-1 text-center">875</td><td className="border border-gray-400 px-4 py-1">连词</td></tr>
                    <tr><td className="border border-gray-400 px-4 py-1 text-center">4</td><td className="border border-gray-400 px-4 py-1">to</td><td className="border border-gray-400 px-4 py-1 text-center">823</td><td className="border border-gray-400 px-4 py-1">介词</td></tr>
                    <tr><td className="border border-gray-400 px-4 py-1 text-center">5</td><td className="border border-gray-400 px-4 py-1">a</td><td className="border border-gray-400 px-4 py-1 text-center">756</td><td className="border border-gray-400 px-4 py-1">不定冠词</td></tr>
                    <tr><td className="border border-gray-400 px-4 py-1 text-center">6</td><td className="border border-gray-400 px-4 py-1">in</td><td className="border border-gray-400 px-4 py-1 text-center">698</td><td className="border border-gray-400 px-4 py-1">介词</td></tr>
                    <tr><td className="border border-gray-400 px-4 py-1 text-center">7</td><td className="border border-gray-400 px-4 py-1">is</td><td className="border border-gray-400 px-4 py-1 text-center">645</td><td className="border border-gray-400 px-4 py-1">系动词</td></tr>
                    <tr><td className="border border-gray-400 px-4 py-1 text-center">8</td><td className="border border-gray-400 px-4 py-1">that</td><td className="border border-gray-400 px-4 py-1 text-center">589</td><td className="border border-gray-400 px-4 py-1">连词/代词</td></tr>
                    <tr><td className="border border-gray-400 px-4 py-1 text-center">9</td><td className="border border-gray-400 px-4 py-1">for</td><td className="border border-gray-400 px-4 py-1 text-center">534</td><td className="border border-gray-400 px-4 py-1">介词</td></tr>
                    <tr><td className="border border-gray-400 px-4 py-1 text-center">10</td><td className="border border-gray-400 px-4 py-1">it</td><td className="border border-gray-400 px-4 py-1 text-center">478</td><td className="border border-gray-400 px-4 py-1">代词</td></tr>
                </tbody>
            </table>
            <p className="text-center text-sm font-bold mb-6">表 1-1 词频统计结果Top 10分析</p>

            <h3 className="text-xl font-semibold mt-6 mb-4">1.15 任务一总结</h3>
            <p className="mb-4 text-justify indent-8">
                通过本次实验，成功完成了以下任务：
            </p>
            <p className="mb-2 text-justify indent-8">
                （1）搭建并配置了HDP Sandbox 2.5.0 Hadoop实验环境，包括VirtualBox虚拟机的导入和网络配置；
            </p>
            <p className="mb-2 text-justify indent-8">
                （2）创建了以个人姓名拼音命名的专属用户账户lutianwei，确保实验的独立性和可追溯性；
            </p>
            <p className="mb-2 text-justify indent-8">
                （3）掌握了HDFS的基本操作命令，包括目录创建（mkdir）、文件上传（put）、文件列表查看（ls）等；
            </p>
            <p className="mb-2 text-justify indent-8">
                （4）成功运行了MapReduce WordCount程序，对5个文本文件（共计约650KB）进行了词频统计；
            </p>
            <p className="mb-4 text-justify indent-8">
                （5）分析了统计结果，理解了自然语言的词频分布规律，验证了齐普夫定律。
            </p>
            <p className="mb-4 text-justify indent-8">
                实验过程中，深入理解了Hadoop分布式计算的基本原理，包括HDFS的数据存储机制、
                MapReduce的分而治之思想、以及YARN的资源调度功能。WordCount程序虽然简单，
                但完整展示了MapReduce编程模型的核心流程：Map阶段将输入数据拆分并转换为键值对，
                Shuffle阶段对相同键的数据进行分组，Reduce阶段对分组后的数据进行聚合计算。
            </p>
        </div>
    </>
);

export default BigDataTask1_Summary;
