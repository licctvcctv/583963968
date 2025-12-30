import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, AreaChart, Area } from 'recharts';

// --- CHART: Professional Vega-Lite Style (Deployment Time) ---
export const VegaStyleLineChart: React.FC = () => {
    const data = [
        { nodes: 5, manual: 60, auto: 10 },
        { nodes: 10, manual: 120, auto: 15 },
        { nodes: 20, manual: 240, auto: 20 },
        { nodes: 50, manual: 600, auto: 35 },
        { nodes: 100, manual: 1200, auto: 50 },
    ];

    return (
        <div className="w-full h-[400px] bg-white border border-gray-300 capture-as-image p-6 my-4 font-sans">
            <h4 className="text-center font-bold text-gray-800 mb-6 text-sm">集群部署耗时对比 (人工 vs 自动化)</h4>
            <ResponsiveContainer width="100%" height="90%">
                <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="2 2" stroke="#e5e9f0" vertical={false} />
                    <XAxis
                        dataKey="nodes"
                        label={{ value: '集群节点数', position: 'insideBottom', offset: -10, fontSize: 12, fill: '#666' }}
                        tick={{ fontSize: 11, fill: '#888' }}
                        axisLine={{ stroke: '#ccc' }}
                    />
                    <YAxis
                        label={{ value: '部署耗时 (分钟)', angle: -90, position: 'insideLeft', fontSize: 12, fill: '#666' }}
                        tick={{ fontSize: 11, fill: '#666' }}
                        axisLine={{ stroke: '#ccc' }}
                    />
                    <Tooltip
                        contentStyle={{ border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', borderRadius: '8px', fontSize: '12px' }}
                    />
                    <Legend verticalAlign="top" height={36} iconType="plainline" />
                    <Line
                        type="monotone"
                        dataKey="manual"
                        name="人工部署耗时"
                        stroke="#E67E22"
                        strokeWidth={2.5}
                        dot={{ r: 4, strokeWidth: 2, fill: 'white' }}
                    />
                    <Line
                        type="monotone"
                        dataKey="auto"
                        name="自动化部署耗时"
                        stroke="#2F5597"
                        strokeWidth={2.5}
                        dot={{ r: 4, strokeWidth: 2, fill: 'white' }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

// --- CHART: System Resource Area Chart (CPU/Memory) ---
export const SystemResourceChart: React.FC = () => {
    const data = [
        { time: '0m', cpu: 10, mem: 20 },
        { time: '2m', cpu: 45, mem: 30 }, // Ansible pushing
        { time: '4m', cpu: 80, mem: 45 }, // Installing
        { time: '6m', cpu: 60, mem: 50 }, // Config
        { time: '8m', cpu: 20, mem: 40 }, // Done
    ];

    return (
        <div className="w-full h-[350px] bg-white border border-gray-300 capture-as-image p-6 my-4 font-sans">
            <h4 className="text-center font-bold text-gray-800 mb-6 text-sm">部署期间管理节点资源占用监控</h4>
            <ResponsiveContainer width="100%" height="90%">
                <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                        <linearGradient id="colorCpu" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorMem" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="time" tick={{ fontSize: 11 }} axisLine={{ stroke: '#ccc' }} />
                    <YAxis label={{ value: '占用率 (%)', angle: -90, position: 'insideLeft', fontSize: 12 }} tick={{ fontSize: 11 }} />
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <Tooltip contentStyle={{ borderRadius: '4px', fontSize: '12px' }} />
                    <Legend verticalAlign="top" height={36} />
                    <Area type="monotone" dataKey="cpu" stroke="#8884d8" fillOpacity={1} fill="url(#colorCpu)" name="CPU 占用率 %" />
                    <Area type="monotone" dataKey="mem" stroke="#82ca9d" fillOpacity={1} fill="url(#colorMem)" name="内存 占用率 %" />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};
