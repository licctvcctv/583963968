import React from 'react';
import { Terminal, Server, Activity, AlertTriangle, Play, Settings, Database, CheckCircle } from 'lucide-react';

// --- VISUAL COMPONENT: MacOS Terminal Window ---
export const TerminalWindow: React.FC<{ command: string; output: string; cwd?: string }> = ({ command, output, cwd = "~/hadoop-ops" }) => (
    <div className="w-full bg-[#1e1e1e] rounded-lg shadow-xl overflow-hidden my-6 font-mono text-sm capture-as-image text-left border border-gray-700">
        {/* Title Bar */}
        <div className="bg-[#2d2d2d] px-4 py-2 flex items-center gap-2 border-b border-[#3e3e3e]">
            <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e]"></div>
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123]"></div>
                <div className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29]"></div>
            </div>
            <div className="ml-4 text-gray-400 text-xs flex items-center gap-1">
                <Terminal size={10} />
                <span>admin@manager: {cwd} — -zsh — 80x24</span>
            </div>
        </div>
        {/* Content */}
        <div className="p-4 text-gray-300 font-mono leading-relaxed">
            <div className="flex gap-2 text-[#5af78e]">
                <span>➜</span>
                <span className="text-[#57c7ff]">{cwd}</span>
                <span className="text-gray-100">{command}</span>
            </div>
            <div className="mt-1 whitespace-pre-wrap text-gray-400">
                {output}
            </div>
        </div>
    </div>
);

// --- VISUAL COMPONENT: Vim Editor Window ---
export const VimEditor: React.FC<{ filename: string; content: string; language?: string }> = ({ filename, content, language = 'yaml' }) => {
    const lines = content.split('\n');
    return (
        <div className="w-full bg-[#282c34] rounded-lg shadow-xl overflow-hidden my-6 font-mono text-sm capture-as-image text-left border border-gray-700">
            {/* Editor Content */}
            <div className="p-4 text-[#abb2bf] leading-relaxed overflow-x-auto">
                {lines.map((line, i) => (
                    <div key={i} className="flex">
                        <span className="w-8 text-right text-[#4b5263] mr-4 select-none">{i + 1}</span>
                        <span className="whitespace-pre">{line}</span>
                    </div>
                ))}
                <div className="flex mt-1">
                    <span className="w-8 text-right text-[#4b5263] mr-4 select-none">~</span>
                </div>
                <div className="flex">
                    <span className="w-8 text-right text-[#4b5263] mr-4 select-none">~</span>
                </div>
            </div>

            {/* Status Bar */}
            <div className="bg-[#21252b] text-[#9da5b4] text-xs flex justify-between items-center border-t border-[#181a1f]">
                <div className="flex">
                    <div className="bg-[#98c379] text-[#282c34] font-bold px-3 py-1">NORMAL</div>
                    <div className="bg-[#3e4452] px-3 py-1 flex items-center gap-2">
                        <span>{filename}</span>
                    </div>
                </div>
                <div className="flex px-3 py-1 gap-4">
                    <span>{language}</span>
                    <span>utf-8</span>
                    <span>100%</span>
                    <span>{lines.length}:1</span>
                </div>
            </div>
        </div>
    );
};

// --- UI MOCK: Cluster Dashboard ---
export const ClusterDashboardUI: React.FC = () => (
    <div className="w-full bg-gray-100 border border-gray-300 shadow-sm rounded-lg overflow-hidden capture-as-image font-sans mb-4">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-3 flex justify-between items-center">
            <div className="flex items-center gap-3">
                <div className="bg-blue-600 p-1.5 rounded text-white"><Activity size={18} /></div>
                <span className="font-bold text-gray-800 text-lg">Hadoop 运维管理平台</span>
            </div>
            <div className="flex gap-4 text-sm text-gray-600">
                <span className="flex items-center gap-1"><Server size={14} /> 集群总数: 1</span>
                <span className="flex items-center gap-1"><Database size={14} /> 节点总数: 5</span>
                <span className="flex items-center gap-1 text-green-600"><CheckCircle size={14} /> 状态: 正常</span>
            </div>
        </div>

        {/* Main Content */}
        <div className="p-6 grid grid-cols-3 gap-6">
            {/* Card 1: Cluster Status */}
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 col-span-2">
                <h4 className="font-bold text-gray-700 mb-4 flex items-center gap-2">
                    <Activity size={16} className="text-blue-500" /> 实时资源监控
                </h4>
                <div className="h-40 flex items-end gap-2 px-2 border-b border-l border-gray-200 relative">
                    {[40, 65, 45, 80, 55, 70, 60, 50, 75, 85, 60, 45].map((h, i) => (
                        <div key={i} className="flex-1 bg-blue-500 opacity-80 rounded-t-sm" style={{ height: `${h}%` }}></div>
                    ))}
                    <div className="absolute top-2 right-2 text-xs text-gray-500">CPU Usage (Avg: 62%)</div>
                </div>
            </div>

            {/* Card 2: Alerts */}
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <h4 className="font-bold text-gray-700 mb-4 flex items-center gap-2">
                    <AlertTriangle size={16} className="text-orange-500" /> 最新告警
                </h4>
                <div className="space-y-3">
                    <div className="bg-red-50 p-2 rounded border border-red-100 text-xs">
                        <div className="font-bold text-red-700">DataNode Down</div>
                        <div className="text-red-500">Node-3 (192.168.1.103)</div>
                        <div className="text-gray-400 mt-1">10 mins ago</div>
                    </div>
                    <div className="bg-yellow-50 p-2 rounded border border-yellow-100 text-xs">
                        <div className="font-bold text-yellow-700">High Memory Usage</div>
                        <div className="text-yellow-600">Node-1 (Master) &gt; 90%</div>
                        <div className="text-gray-400 mt-1">25 mins ago</div>
                    </div>
                </div>
            </div>

            {/* Card 3: Node List */}
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 col-span-3">
                <h4 className="font-bold text-gray-700 mb-4 flex items-center gap-2">
                    <Server size={16} className="text-purple-500" /> 节点列表
                </h4>
                <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 text-gray-500">
                        <tr>
                            <th className="p-2">主机名</th>
                            <th className="p-2">IP 地址</th>
                            <th className="p-2">角色</th>
                            <th className="p-2">状态</th>
                            <th className="p-2">操作</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        <tr>
                            <td className="p-2">master-01</td>
                            <td className="p-2">192.168.1.101</td>
                            <td className="p-2"><span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs">NameNode</span></td>
                            <td className="p-2 text-green-600 flex items-center gap-1"><CheckCircle size={12} /> Running</td>
                            <td className="p-2 text-blue-600 cursor-pointer">详情</td>
                        </tr>
                        <tr>
                            <td className="p-2">slave-01</td>
                            <td className="p-2">192.168.1.102</td>
                            <td className="p-2"><span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-xs">DataNode</span></td>
                            <td className="p-2 text-green-600 flex items-center gap-1"><CheckCircle size={12} /> Running</td>
                            <td className="p-2 text-blue-600 cursor-pointer">详情</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
);

// --- UI MOCK: Deployment Wizard ---
export const DeploymentWizardUI: React.FC = () => (
    <div className="w-full bg-white border border-gray-300 shadow-sm rounded-lg overflow-hidden capture-as-image font-sans mb-4">
        <div className="bg-gray-50 border-b border-gray-200 px-6 py-4">
            <h3 className="text-lg font-bold text-gray-800">新建集群部署任务</h3>
            <div className="flex items-center gap-2 mt-2">
                <div className="h-1 w-8 bg-blue-600 rounded"></div>
                <div className="h-1 w-8 bg-blue-600 rounded"></div>
                <div className="h-1 w-8 bg-blue-600 rounded"></div>
                <div className="h-1 w-8 bg-gray-300 rounded"></div>
                <span className="text-xs text-gray-500 ml-2">步骤 3/4: 配置分发</span>
            </div>
        </div>
        <div className="p-6 flex gap-6">
            <div className="w-1/3 space-y-4">
                <div className="p-3 border rounded bg-blue-50 border-blue-200">
                    <div className="text-xs font-bold text-blue-600 mb-1">正在执行</div>
                    <div className="text-sm font-bold text-gray-800 flex items-center gap-2">
                        <Play size={14} className="animate-pulse" /> 分发配置文件
                    </div>
                </div>
                <div className="p-3 border rounded bg-gray-50">
                    <div className="text-xs font-bold text-gray-500 mb-1">等待中</div>
                    <div className="text-sm text-gray-600 flex items-center gap-2">
                        <Settings size={14} /> 启动服务
                    </div>
                </div>
            </div>
            <div className="w-2/3 bg-black rounded-lg p-4 font-mono text-xs text-gray-300 overflow-hidden">
                <div className="text-green-400 mb-2">TASK [hadoop-config : Render core-site.xml] ************************************</div>
                <div className="mb-1">ok: [192.168.1.101]</div>
                <div className="mb-1">changed: [192.168.1.102]</div>
                <div className="mb-4">changed: [192.168.1.103]</div>

                <div className="text-green-400 mb-2">TASK [hadoop-config : Render hdfs-site.xml] ************************************</div>
                <div className="mb-1">ok: [192.168.1.101]</div>
                <div className="mb-1">changed: [192.168.1.102]</div>
                <div className="mb-1 animate-pulse">changed: [192.168.1.103] _</div>
            </div>
        </div>
    </div>
);
