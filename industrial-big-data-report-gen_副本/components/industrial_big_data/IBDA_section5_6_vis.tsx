import React from 'react';
import { StudentConfig, BaseStats } from '../../types';
import { generateAnalysisText } from './contentGenerators';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface Props { config: StudentConfig; stats: BaseStats; }

export const IBDA_section5_6_vis: React.FC<Props> = ({ config, stats }) => {
  const barData = config.analysisFocus.topFaultTypes.map(type => ({
    name: type,
    count: stats.faultCounts[type],
    rate: ((stats.faultCounts[type] / stats.totalRecords) * 100).toFixed(2)
  }));

  const pieData = [
    { name: 'L型 (Low)', value: stats.typeDistribution.L },
    { name: 'M型 (Medium)', value: stats.typeDistribution.M },
    { name: 'H型 (High)', value: stats.typeDistribution.H },
  ];
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

  return (
    <div className="page">
      <h2 className="text-2xl font-bold mb-6 border-b-2 border-gray-800 pb-2 text-black">五、 数据分析与可视化</h2>

      <h3 className="text-xl font-bold mt-6 mb-3 text-black">5.1 故障分布分析</h3>
      <p className="mb-4 leading-7 text-black">{generateAnalysisText(config, stats)}</p>
      
      {/* 故障频次图表 */}
      <div className="h-64 w-full border border-gray-300 p-4 mb-6 bg-white">
        <h4 className="text-center font-bold text-sm mb-2 text-black">图 5-1 主要故障类型频次统计 ({config.studentId})</h4>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={barData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis type="number" stroke="#000000" tick={{ fill: 'black', fontSize: 12 }} />
            <YAxis dataKey="name" type="category" width={50} stroke="#000000" tick={{ fill: 'black', fontWeight: 'bold' }} />
            <Tooltip 
              contentStyle={{ backgroundColor: 'white', borderColor: 'black', color: 'black' }} 
              itemStyle={{ color: 'black' }}
            />
            <Legend wrapperStyle={{ color: 'black' }} />
            <Bar dataKey="count" fill="#6366f1" name="故障次数" barSize={30} label={{ position: 'right', fill: 'black' }} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <h3 className="text-xl font-bold mt-6 mb-3 text-black">5.2 设备类型占比</h3>
      <div className="flex items-center justify-between">
        <div className="w-1/2 pr-4 text-sm leading-6 text-black">
          <p>L型设备占比最高(60%)，且故障率相对较高(3.92%)。这表明低端设备的可靠性是整个产线的短板。
          {config.analysisFocus.insightType}</p>
        </div>
        
        {/* 饼图 */}
        <div className="w-1/2 h-64 border border-gray-300 p-4 bg-white">
             <h4 className="text-center font-bold text-sm mb-2 text-black">图 5-2 设备资产构成</h4>
             <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie 
                  data={pieData} 
                  cx="50%" 
                  cy="50%" 
                  outerRadius={60} 
                  fill="#8884d8" 
                  dataKey="value" 
                  label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                  labelLine={{ stroke: 'black' }}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="black" />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: 'white', borderColor: 'black', color: 'black' }} />
                <Legend iconType="circle" wrapperStyle={{ color: 'black', fontSize: '12px' }} />
              </PieChart>
            </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};