import React from 'react';
import { StudentConfig } from '../../types';

const textAssets = {
  1: { // Zhang
    harvest: `通过本次大作业，我系统地掌握了 Hadoop 生态圈的核心技术。从在 Linux 下配置 Java 环境变量，到编写复杂的 HBase Shell 脚本，再到调试 Java MapReduce 代码，每一个环节都极大地锻炼了我的动手能力。特别是解决了 HBase RowKey 热点问题后，我对分布式系统的设计理念有了更深的感悟。此外，我也学会了如何从业务角度审视数据，而不仅仅是看技术指标。`,
    shortcoming: `1. **集群规模**：由于是在单机虚拟机上模拟，无法体会真实集群的网络延迟和节点故障切换（Failover）过程。
2. **实时性**：目前的架构是离线批处理（T+1），无法满足毫秒级预警需求。
3. **算法复杂度**：MapReduce 逻辑较为简单，仅做了统计，未涉及机器学习预测模型。`,
    future: `下一步，我计划引入 Spark Streaming 替代 MapReduce，实现实时流处理。同时，尝试使用 Spark MLlib 训练随机森林模型，通过输入的传感器数据直接预测故障发生的概率，将“事后分析”升级为“事前预测”。`
  },
  2: { // Li
    harvest: `最大的收获是学会了全流程的数据治理。以前只关注算法，这次发现 80% 的时间都在做数据清洗和环境搭建。这让我明白，高质量的数据才是 AI 落地的基石。通过对比不同负载下的故障率，我体会到了数据分析对业务决策的巨大支撑作用。`,
    shortcoming: `数据可视化部分做得还不够美观，Python Matplotlib 的交互性较差。另外，对于 HBase 的底层原理（如 LSM Tree）理解还不够透彻。`,
    future: `计划学习 ECharts 或 Superset 等 BI 工具，制作更专业的仪表盘。深入研读 HBase 源码，优化表结构设计。`
  },
  3: { // Wang
    harvest: `本次实验验证了 MongoDB 在工业场景下的潜力。我深入理解了 Schema-less 的优势，以及如何利用 Aggregation Pipeline 替代简单的 MapReduce。这种“存算分离”或“存算一体”的架构选型思考，是我最大的收获。`,
    shortcoming: `特征工程部分主要依赖人工经验（如定义温差），缺乏自动化的特征提取（如 PCA）。且 MongoDB 在极大规模数据下的 Join 性能测试未涉及。`,
    future: `引入深度学习（LSTM）处理时序数据。尝试搭建 MongoDB 分片集群，测试其水平扩展极限。`
  },
  4: { // Zhao
    harvest: `以前觉得大数据很难，这次自己动手做了一遍，发现只要思路清晰，一步步来也能搞定。学会了用 XShell 远程管理服务器，学会了用 MongoDB 查数据，这些技能以后工作肯定用得上。`,
    shortcoming: `Linux 命令还不够熟，经常因为输错一个字母卡半天。Java 代码也是抄书上的，自己写可能还写不出来。`,
    future: `多练练 Linux，争取不用鼠标也能操作。学点 Python，听说那个处理数据更方便。希望能做一个手机 APP，能在手机上随时看到机器的状态。`
  }
};

export const IBDA_Chapter8: React.FC<{ config: StudentConfig }> = ({ config }) => {
  const content = textAssets[config.id];

  return (
    <div className="page text-black">
      <h2 className="text-2xl font-bold mb-6 border-b-2 border-black pb-2">八、 总结与反思</h2>

      <h3 className="text-xl font-bold mt-6 mb-3">8.1 实验收获</h3>
      <p className="mb-4 leading-7 text-justify indent-8 whitespace-pre-line">{content.harvest}</p>

      <h3 className="text-xl font-bold mt-6 mb-3">8.2 不足之处</h3>
      <p className="mb-4 leading-7 text-justify indent-8 whitespace-pre-line">{content.shortcoming}</p>

      <h3 className="text-xl font-bold mt-6 mb-3">8.3 未来展望</h3>
      <p className="mb-4 leading-7 text-justify indent-8 whitespace-pre-line">{content.future}</p>
    </div>
  );
};