import React from 'react';
import { BarChart, Bar, PieChart, Pie, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { UbuntuTerminal } from '../shared/Terminal';
import { STUDENT_CONFIGS, BASE_STATS, STUDENT_SAMPLE_DATA } from './IBDA_config';

interface IBDA_Section6VisualizationProps {
    variantId?: number;
}

export const IBDA_Section6Visualization: React.FC<IBDA_Section6VisualizationProps> = ({ variantId = 1 }) => {
    const numericVariantId = typeof variantId === 'number' ? variantId : 1;
    const config = STUDENT_CONFIGS[numericVariantId];
    const data = STUDENT_SAMPLE_DATA[numericVariantId as keyof typeof STUDENT_SAMPLE_DATA] || STUDENT_SAMPLE_DATA[1];
    const colors = config.visualTheme.chartColors;

    // Parse fault output from STUDENT_SAMPLE_DATA
    const faultOutputLines = data.faultOutput.split('\n');
    const faultData = faultOutputLines.map(line => {
        const [name, value] = line.split('\t');
        const nameMap: Record<string, string> = { 'HDF': '散热系统故障', 'PWF': '电力故障', 'OSF': '过载故障', 'TWF': '刀具磨损', 'RNF': '随机故障' };
        return { name, value: parseInt(value) || 0, fullName: nameMap[name] || name };
    });

    const typeData = [
        { name: 'L型设备', count: BASE_STATS.typeDistribution.L, failures: Math.round(BASE_STATS.typeDistribution.L * BASE_STATS.avgByType.L.failureRate / 100) },
        { name: 'M型设备', count: BASE_STATS.typeDistribution.M, failures: Math.round(BASE_STATS.typeDistribution.M * BASE_STATS.avgByType.M.failureRate / 100) },
        { name: 'H型设备', count: BASE_STATS.typeDistribution.H, failures: Math.round(BASE_STATS.typeDistribution.H * BASE_STATS.avgByType.H.failureRate / 100) }
    ];

    const sortedFaultData = [...faultData].sort((a, b) => b.value - a.value);

    // Generate different charts based on student ID
    const renderMainChart = () => {
        switch (config.id) {
            case 1: // 张明 - 柱状图
                return (
                    <div className="capture-as-image border-2 border-gray-300 rounded-lg p-4 bg-white inline-block" style={{ width: '550px' }}>
                        <h4 className="text-center font-semibold mb-4">图 6-1 故障类型分布柱状图</h4>
                        <div style={{ height: '250px' }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={faultData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="value" name="故障次数" fill={colors[0]}>
                                        {faultData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                );
            case 2: // 李华 - 饼图
                return (
                    <div className="capture-as-image border-2 border-gray-300 rounded-lg p-4 bg-white inline-block" style={{ width: '550px' }}>
                        <h4 className="text-center font-semibold mb-4">图 6-1 故障类型占比饼图</h4>
                        <div style={{ height: '250px' }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={faultData}
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={80}
                                        fill="#8884d8"
                                        dataKey="value"
                                        label={(entry) => `${entry.name} (${((entry.value / BASE_STATS.totalFailures) * 100).toFixed(1)}%)`}
                                    >
                                        {faultData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                );
            case 3: // 王芳 - 折线图
                return (
                    <div className="capture-as-image border-2 border-gray-300 rounded-lg p-4 bg-white inline-block" style={{ width: '550px' }}>
                        <h4 className="text-center font-semibold mb-4">图 6-1 故障类型趋势折线图</h4>
                        <div style={{ height: '250px' }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={sortedFaultData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="value" stroke={colors[0]} strokeWidth={2} dot={{ fill: colors[0], r: 5 }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                );
            case 4: // 赵强 - 横向柱状图
                return (
                    <div className="capture-as-image border-2 border-gray-300 rounded-lg p-4 bg-white inline-block" style={{ width: '550px' }}>
                        <h4 className="text-center font-semibold mb-4">图 6-1 故障类型横向柱状图</h4>
                        <div style={{ height: '250px' }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={sortedFaultData} layout="vertical">
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis type="number" />
                                    <YAxis dataKey="name" type="category" width={60} />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="value" name="故障次数" fill={colors[0]}>
                                        {faultData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="page bg-white w-[210mm] min-h-[297mm] mx-auto shadow-lg mb-8 p-12 font-serif">
            {/* Section Header */}
            <h2 className="text-2xl font-bold mb-6 border-b-2 border-gray-300 pb-2">
                第6章 结果可视化
            </h2>

            {/* 6.1 Visualization Overview */}
            <h3 className="text-xl font-semibold mt-6 mb-4">6.1 可视化方案</h3>
            <p className="mb-4 text-justify indent-8 leading-relaxed">
                为了更直观地展示{config.analysisFocus.focusArea}的分析结果，
                使用Python的Matplotlib库生成可视化图表。
                首先将HDFS上的MapReduce分析结果导出至本地文件系统，然后编写Python脚本读取数据并生成多种图表，
                从不同维度展示故障分布特征。
                图表配色采用{config.id === 1 ? '红色系' : config.id === 2 ? '蓝绿色系' : config.id === 3 ? '橙绿色系' : '紫红色系'}
                方案，确保视觉上的区分度和可读性。
            </p>

            {/* 6.2 Data Export */}
            <h3 className="text-xl font-semibold mt-6 mb-4">6.2 数据导出</h3>
            <p className="mb-4 text-justify indent-8 leading-relaxed">
                从HDFS导出MapReduce分析结果:
            </p>

            <UbuntuTerminal
                user={config.terminalConfig.user}
                host={config.terminalConfig.host}
                cwd={config.terminalConfig.path}
                command={`hdfs dfs -getmerge /output/* ~/fault_results.txt && cat ~/fault_results.txt`}
                output={data.faultOutput}
                caption="Figure 6-1 Export HDFS Analysis Results"
            />

            {/* 6.3 Main Chart - Different for each student */}
            <h3 className="text-xl font-semibold mt-6 mb-4">6.3 故障分布可视化</h3>
            {renderMainChart()}

            {/* 6.4 Secondary Chart - Device Type Analysis */}
            <h3 className="text-xl font-semibold mt-6 mb-4">6.4 按设备类型的故障分布</h3>
            <div className="capture-as-image border-2 border-gray-300 rounded-lg p-4 bg-white inline-block" style={{ width: '550px' }}>
                <h4 className="text-center font-semibold mb-4">图 6-{config.id === 1 ? '2' : '3'} 各设备类型故障对比</h4>
                <div style={{ height: '250px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={typeData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="failures" name="故障次数" fill={colors[1]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* 6.5 Statistics Table */}
            <h3 className="text-xl font-semibold mt-6 mb-4">6.5 统计详情</h3>
            <div className="my-6 border border-gray-400 bg-white">
                <table className="w-full border-collapse text-sm">
                    <thead>
                        <tr className="border-b-2 border-gray-400 bg-gray-50">
                            <th className="border border-gray-400 px-4 py-2">故障类型</th>
                            <th className="border border-gray-400 px-4 py-2">故障名称</th>
                            <th className="border border-gray-400 px-4 py-2">次数</th>
                            <th className="border border-gray-400 px-4 py-2">占比</th>
                        </tr>
                    </thead>
                    <tbody>
                        {faultData.map((fault, idx) => {
                            const pct = ((fault.value / BASE_STATS.totalFailures) * 100).toFixed(1);
                            return (
                                <tr key={fault.name} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                    <td className="border border-gray-400 px-4 py-2 text-center font-bold">{fault.name}</td>
                                    <td className="border border-gray-400 px-4 py-2">{fault.fullName}</td>
                                    <td className="border border-gray-400 px-4 py-2 text-center">{fault.value}</td>
                                    <td className="border border-gray-400 px-4 py-2 text-center">{pct}%</td>
                                </tr>
                            );
                        })}
                        <tr className="font-bold border-t-2 border-gray-500 bg-blue-50">
                            <td className="border border-gray-400 px-4 py-2 text-center" colSpan={2}>总计</td>
                            <td className="border border-gray-400 px-4 py-2 text-center">{BASE_STATS.totalFailures}</td>
                            <td className="border border-gray-400 px-4 py-2 text-center">100%</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p className="text-center text-sm text-gray-600 mt-2">表 6-1 故障类型统计详情</p>

            {/* Summary */}
            <div className="mt-8 p-4 border border-gray-300 bg-gray-50">
                <h4 className="text-lg font-semibold mb-2">6.6 小结</h4>
                <p className="text-sm text-justify leading-relaxed">
                    本章完成了分析结果的可视化展示。通过{config.id === 1 ? '柱状图' : config.id === 2 ? '饼图' : config.id === 3 ? '折线图' : '横向柱状图'}
                    清晰地展示了各故障类型的分布情况。
                    {config.analysisFocus.topFaultTypes[0]}（{faultData.find(f => f.name === config.analysisFocus.topFaultTypes[0])?.fullName}）
                    为最主要的故障类型，占比{((faultData.find(f => f.name === config.analysisFocus.topFaultTypes[0])?.value || 0) / BASE_STATS.totalFailures * 100).toFixed(1)}%。
                    按设备类型分析显示，L型设备的故障率最高，需要重点关注其{config.personalizedData.customField.split(' ')[0]}。
                    可视化结果为{config.analysisFocus.focusArea}提供了直观的数据支撑。
                </p>
            </div>
        </div>
    );
};

export default IBDA_Section6Visualization;
