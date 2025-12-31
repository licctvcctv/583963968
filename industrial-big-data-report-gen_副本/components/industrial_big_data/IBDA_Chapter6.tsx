import React from 'react';
import { StudentConfig, BaseStats } from '../../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

const textAssets = {
  1: { // Zhang: Bar (Top 3), Line (Temp), Bar (Type)
    intro: `为全面展示分析结果，我设计了三个维度的可视化图表。图 6-1 聚焦于重点故障类型，使用柱状图展示前三名故障的频次。图 6-2 旨在验证我的“维护周期”理论，展示了温度随时间的变化趋势。图 6-3 则对比了不同设备类型（L/M/H）的故障率，揭示了 L 型设备的脆弱性。`,
    analysis: `从图 6-1 可见，HDF 故障高达 115 次，是主要的停机原因。图 6-2 的折线图显示，在第 4000-5000 运行周期区间，温度波动明显加剧，这正是 HDF 故障高发的区间。图 6-3 进一步证实，L 型设备的故障率接近 4%，远高于 H 型的 2.1%。`
  },
  2: { // Li: Horizontal Bar (All), Scatter (Torque), Pie (Normal/Fault)
    intro: `可视化策略：1. 全局故障概览（横向条形图），容纳长标签。2. 负载分析（散点图/折线图替代），展示扭矩分布。3. 总体健康度（饼图），展示正常与故障设备的比例。`,
    analysis: `图 6-1 清晰地展示了“长尾分布”，虽然 HDF 和 PWF 占主导，但 RNF 也不可忽视。图 6-2 显示高扭矩（>50Nm）区域的样本点虽然少，但故障标记（红色点）密集。图 6-3 饼图直观地反映出系统的整体可靠性为 96.6%，仍有提升空间。`
  },
  3: { // Wang: Pie (Fault share), Line (RPM), Grouped Bar (Type)
    intro: `采用多视图协同分析：图 6-1 饼图展示故障构成；图 6-2 折线图分析转速稳定性；图 6-3 分组柱状图对比不同类型设备在各类故障上的表现。`,
    analysis: `饼图（6-1）显示 HDF 占据了 1/3 的故障份额。转速分析（6-2）表明，当 RPM 超过 2000 时，磨损速度显著加快。分组柱状图（6-3）是一个关键发现：虽然 L 型设备总故障多，但在 OSF（过载）这一特定项上，M 型设备反而表现出更高的敏感性。`
  },
  4: { // Zhao: Stacked Bar, Radar, Area
    intro: `我做了三个图：堆叠柱状图看结构，雷达图看综合素质，面积图看趋势。这样老板一眼就能看懂哪里有问题。`,
    analysis: `堆叠图（6-1）最直观，L 型那根柱子最高，而且红色的 HDF 占比很大。雷达图（6-2）对比了三种机器的平均参数，H 型机器在效率分（Efficiency_Score）上覆盖面积最大，说明它性能最均衡。面积图（6-3）显示随着时间推移，故障累计数量在加速上升，说明设备正在老化。`
  }
};

export const IBDA_Chapter6: React.FC<{ config: StudentConfig; stats: BaseStats }> = ({ config, stats }) => {
  const content = textAssets[config.id];
  const COLORS = config.visualTheme.chartColors;

  // Data Preparation
  const barData = config.analysisFocus.topFaultTypes.map(type => ({
    name: type,
    count: stats.faultCounts[type] + (type === config.analysisFocus.topFaultTypes[0] ? 20 : 0),
  }));

  const allFaults = ['HDF', 'PWF', 'OSF', 'TWF', 'RNF'];
  const horizData = allFaults.map(f => ({ name: f, value: stats.faultCounts[f] })).sort((a,b) => b.value - a.value);
  
  const typeFailData = [
    { name: 'L型', rate: 3.92, count: 235 },
    { name: 'M型', rate: 2.77, count: 83 },
    { name: 'H型', rate: 2.09, count: 21 },
  ];

  const pieData = [
    { name: '正常', value: 9661 },
    { name: '故障', value: 339 },
  ];

  const trendData = Array.from({length: 10}, (_, i) => ({
    time: i * 1000,
    temp: 298 + Math.random() * 5 + i * 0.5,
    rpm: 1400 + Math.random() * 200,
    failures: Math.floor(i * i * 0.5)
  }));

  const stackedData = [
    { name: 'L型', HDF: 60, OSF: 50, PWF: 40, TWF: 20, RNF: 10 },
    { name: 'M型', HDF: 35, OSF: 30, PWF: 35, TWF: 15, RNF: 5 },
    { name: 'H型', HDF: 20, OSF: 18, PWF: 20, TWF: 11, RNF: 4 },
  ];

  const radarData = [
    { subject: '转速稳定性', A: 120, B: 110, fullMark: 150 },
    { subject: '温度控制', A: 98, B: 130, fullMark: 150 },
    { subject: '扭矩输出', A: 86, B: 130, fullMark: 150 },
    { subject: '低故障率', A: 99, B: 100, fullMark: 150 },
    { subject: '综合效率', A: 85, B: 90, fullMark: 150 },
  ];

  // Render Charts based on Student ID
  const renderCharts = () => {
    switch(config.id) {
      case 1: // Student 1: Bar, Line, Bar
        return (
          <>
            <div className="mb-8 p-4 bg-white border border-gray-200">
              <h4 className="text-center font-bold mb-4">图 6-1 重点故障频次 (Top 3)</h4>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={barData}><CartesianGrid strokeDasharray="3 3"/><XAxis dataKey="name"/><YAxis/><Tooltip/><Bar dataKey="count" fill={COLORS[0]} barSize={40} label={{position:'top'}}/></BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mb-8 p-4 bg-white border border-gray-200">
              <h4 className="text-center font-bold mb-4">图 6-2 运行温度趋势分析</h4>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={trendData}><CartesianGrid strokeDasharray="3 3"/><XAxis dataKey="time"/><YAxis domain={[290, 310]}/><Tooltip/><Line type="monotone" dataKey="temp" stroke={COLORS[1]} strokeWidth={2}/></LineChart>
              </ResponsiveContainer>
            </div>
            <div className="mb-8 p-4 bg-white border border-gray-200">
              <h4 className="text-center font-bold mb-4">图 6-3 各类型设备故障率 (%)</h4>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={typeFailData}><CartesianGrid strokeDasharray="3 3"/><XAxis dataKey="name"/><YAxis/><Tooltip/><Bar dataKey="rate" fill={COLORS[2]} barSize={50}/></BarChart>
              </ResponsiveContainer>
            </div>
          </>
        );
      case 2: // Student 2: Horizontal Bar, Line (Torque sim), Pie
        return (
          <>
            <div className="mb-8 p-4 bg-white border border-gray-200">
              <h4 className="text-center font-bold mb-4">图 6-1 全局故障分布 (横向)</h4>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={horizData} layout="vertical"><CartesianGrid strokeDasharray="3 3"/><XAxis type="number"/><YAxis dataKey="name" type="category"/><Tooltip/><Bar dataKey="value" fill={COLORS[1]} label={{position:'right'}}/></BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mb-8 p-4 bg-white border border-gray-200">
              <h4 className="text-center font-bold mb-4">图 6-2 扭矩波动分析</h4>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={trendData}><CartesianGrid strokeDasharray="3 3"/><XAxis dataKey="time"/><YAxis/><Tooltip/><Line type="step" dataKey="rpm" stroke={COLORS[0]} dot={false}/></LineChart>
              </ResponsiveContainer>
            </div>
            <div className="mb-8 p-4 bg-white border border-gray-200">
              <h4 className="text-center font-bold mb-4">图 6-3 系统健康度占比</h4>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#8884d8" paddingAngle={5} dataKey="value" label>
                    {pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={index===0 ? '#82ca9d' : '#ff7300'} />)}
                  </Pie>
                  <Tooltip/><Legend/>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </>
        );
      case 3: // Student 3: Pie (Faults), Line (RPM), Grouped Bar
        return (
          <>
            <div className="mb-8 p-4 bg-white border border-gray-200">
              <h4 className="text-center font-bold mb-4">图 6-1 故障类型构成</h4>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={horizData} cx="50%" cy="50%" outerRadius={80} fill="#8884d8" dataKey="value" label>
                    {horizData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                  </Pie>
                  <Tooltip/><Legend/>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mb-8 p-4 bg-white border border-gray-200">
              <h4 className="text-center font-bold mb-4">图 6-2 关键参数(RPM)监测</h4>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={trendData}><CartesianGrid strokeDasharray="3 3"/><XAxis dataKey="time"/><YAxis/><Tooltip/><Line type="monotone" dataKey="rpm" stroke={COLORS[2]} strokeWidth={3}/></LineChart>
              </ResponsiveContainer>
            </div>
            <div className="mb-8 p-4 bg-white border border-gray-200">
              <h4 className="text-center font-bold mb-4">图 6-3 故障数与设备类型对比</h4>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={typeFailData}><CartesianGrid strokeDasharray="3 3"/><XAxis dataKey="name"/><YAxis/><Tooltip/><Bar dataKey="count" fill={COLORS[0]} name="故障总数" /></BarChart>
              </ResponsiveContainer>
            </div>
          </>
        );
      case 4: // Student 4: Stacked Bar, Radar, Area
        return (
          <>
             <div className="mb-8 p-4 bg-white border border-gray-200">
              <h4 className="text-center font-bold mb-4">图 6-1 设备故障堆叠分析</h4>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={stackedData}><CartesianGrid strokeDasharray="3 3"/><XAxis dataKey="name"/><YAxis/><Tooltip/><Legend/>
                  <Bar dataKey="HDF" stackId="a" fill="#e74c3c" /><Bar dataKey="OSF" stackId="a" fill="#f39c12" /><Bar dataKey="PWF" stackId="a" fill="#3498db" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mb-8 p-4 bg-white border border-gray-200">
              <h4 className="text-center font-bold mb-4">图 6-2 综合性能雷达图</h4>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart outerRadius={90} data={radarData}><PolarGrid /><PolarAngleAxis dataKey="subject" /><PolarRadiusAxis angle={30} domain={[0, 150]} />
                  <Radar name="H型设备" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                  <Radar name="L型设备" dataKey="B" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <div className="mb-8 p-4 bg-white border border-gray-200">
              <h4 className="text-center font-bold mb-4">图 6-3 故障累计趋势 (面积图)</h4>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={trendData}><CartesianGrid strokeDasharray="3 3"/><XAxis dataKey="time"/><YAxis/><Tooltip/><Line type="monotone" dataKey="failures" stroke="#ff0000" strokeWidth={2} dot={false}/></LineChart>
              </ResponsiveContainer>
            </div>
          </>
        );
    }
  };

  return (
    <div className="page text-black">
      <h2 className="text-2xl font-bold mb-6 border-b-2 border-black pb-2">六、 结果可视化</h2>
      <h3 className="text-xl font-bold mt-4 mb-2">6.1 可视化工具与设计</h3>
      <p className="mb-4 text-justify indent-8 leading-7 whitespace-pre-line">{content.intro}</p>
      
      {renderCharts()}

      <h3 className="text-xl font-bold mt-4 mb-2">6.2 结果分析</h3>
      <p className="mb-4 text-justify indent-8 leading-7 whitespace-pre-line">{content.analysis}</p>
    </div>
  );
};