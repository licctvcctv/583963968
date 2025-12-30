import React from 'react';
import { Activity, Server, Database, Bell, User, Layout, HardDrive, Shield, Cpu, Menu, Search, Plus, MoreHorizontal, CheckCircle, AlertCircle, Play, BarChart2, Terminal, FileText, RefreshCw, Settings, List, Filter, Download, ChevronRight } from 'lucide-react';

// Shared Window Frame for "Real System" feel with Scaling
// Simulates a 1000px desktop viewport scaled down to fit A4 width (~700px)
const BrowserFrame: React.FC<{ title: string; children: React.ReactNode; height?: number }> = ({ title, children, height = 400 }) => {
    // Target desktop width
    const contentWidth = 1000;
    // Scale factor to fit into A4 (approx 700px available width)
    const scale = 0.7;
    // Calculated height for the container to maintain aspect ratio after scaling
    const containerHeight = height * scale;

    return (
        <div className="w-full bg-white rounded-lg shadow-xl overflow-hidden border border-gray-300 my-6 font-sans capture-as-image break-inside-avoid">
            {/* Browser Toolbar */}
            <div className="bg-[#f0f2f5] border-b border-gray-300 px-4 py-2 flex items-center gap-4">
                <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f57] border border-[#ce3e3a]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#febc2e] border border-[#d6a120]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#28c840] border border-[#1da02b]"></div>
                </div>
                <div className="flex gap-2 text-gray-400">
                    <div className="hover:bg-gray-200 rounded p-1"><ChevronRight size={14} className="rotate-180" /></div>
                    <div className="hover:bg-gray-200 rounded p-1"><ChevronRight size={14} /></div>
                    <div className="hover:bg-gray-200 rounded p-1"><RefreshCw size={14} /></div>
                </div>
                <div className="flex-1 bg-white border border-gray-300 rounded-md px-3 py-1.5 text-xs text-gray-600 flex items-center shadow-sm overflow-hidden whitespace-nowrap text-ellipsis">
                    <Shield size={10} className="mr-2 text-green-600 flex-shrink-0" />
                    <span className="font-mono truncate">https://ops-platform.internal/console/{title}</span>
                </div>
            </div>
            {/* Viewport Container */}
            <div className="bg-[#f4f7fa] relative overflow-hidden border-b border-gray-100" style={{ height: containerHeight }}>
                {/* Scaled Content Wrapper */}
                <div style={{
                    width: contentWidth,
                    height: height,
                    transform: `scale(${scale})`,
                    transformOrigin: 'top left',
                    overflow: 'hidden'
                }}>
                    {children}
                </div>
            </div>
        </div>
    );
};

// Sidebar Component
const Sidebar = ({ active }: { active: string }) => (
    <div className="w-56 bg-[#001529] flex flex-col text-slate-300 flex-shrink-0">
        <div className="h-14 flex items-center justify-center border-b border-slate-700 bg-[#002140]">
            <Activity className="text-blue-400 mr-2" size={20} />
            <span className="font-bold text-white tracking-wide">Hadoop Ops</span>
        </div>
        <div className="flex-1 py-4 space-y-1">
            {[
                { id: 'dashboard', icon: Layout, label: '系统概览' },
                { id: 'hosts', icon: Server, label: '主机管理' },
                { id: 'deploy', icon: Play, label: '自动化部署' },
                { id: 'monitor', icon: BarChart2, label: '监控中心' },
                { id: 'logs', icon: FileText, label: '日志分析' },
                { id: 'healing', icon: RefreshCw, label: '故障自愈' },
                { id: 'settings', icon: Settings, label: '系统设置' },
            ].map(item => (
                <div key={item.id} className={`px-6 py-3 flex items-center gap-3 cursor-pointer hover:bg-blue-600 hover:text-white transition-colors ${active === item.id ? 'bg-blue-600 text-white border-r-4 border-blue-400' : ''}`}>
                    <item.icon size={16} />
                    <span className="text-sm font-medium">{item.label}</span>
                </div>
            ))}
        </div>
        <div className="p-4 border-t border-slate-700 text-xs text-center text-slate-500">
            v3.5.0 Enterprise
        </div>
    </div>
);

// 5.1 Dashboard (Enhanced)
export const ScreenshotDashboard: React.FC = () => (
    <BrowserFrame title="dashboard" height={600}>
        <div className="flex h-full">
            <Sidebar active="dashboard" />
            <div className="flex-1 p-6 overflow-hidden">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-slate-800">运维总览 Dashboard</h2>
                    <div className="flex items-center gap-4">
                        <span className="text-xs text-slate-500 bg-white px-2 py-1 rounded border">Last updated: Just now</span>
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 border border-blue-200"><User size={16} /></div>
                            <span className="text-sm font-medium">Admin</span>
                        </div>
                    </div>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-4 gap-5 mb-6">
                    <div className="bg-white p-5 rounded-lg shadow-sm border border-slate-200 relative overflow-hidden">
                        <div className="text-slate-500 text-xs font-medium uppercase tracking-wider mb-1">Cluster Health</div>
                        <div className="text-2xl font-bold text-green-600 flex items-center gap-2">
                            <CheckCircle size={24} /> Healthy
                        </div>
                        <div className="absolute right-0 top-0 h-full w-1 bg-green-500"></div>
                    </div>
                    <div className="bg-white p-5 rounded-lg shadow-sm border border-slate-200">
                        <div className="text-slate-500 text-xs font-medium uppercase tracking-wider mb-1">HDFS Storage</div>
                        <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-bold text-slate-800">45.2</span>
                            <span className="text-sm text-slate-500">TB Used</span>
                        </div>
                        <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2"><div className="w-[65%] bg-blue-500 h-full rounded-full"></div></div>
                    </div>
                    <div className="bg-white p-5 rounded-lg shadow-sm border border-slate-200">
                        <div className="text-slate-500 text-xs font-medium uppercase tracking-wider mb-1">YARN Memory</div>
                        <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-bold text-slate-800">892</span>
                            <span className="text-sm text-slate-500">GB Allocated</span>
                        </div>
                        <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2"><div className="w-[82%] bg-purple-500 h-full rounded-full"></div></div>
                    </div>
                    <div className="bg-white p-5 rounded-lg shadow-sm border border-slate-200">
                        <div className="text-slate-500 text-xs font-medium uppercase tracking-wider mb-1">Active Alerts</div>
                        <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-bold text-orange-500">3</span>
                            <span className="text-sm text-slate-500">Warnings</span>
                        </div>
                        <div className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle size={10} /> 0 Critical</div>
                    </div>
                </div>

                {/* Charts Area */}
                <div className="grid grid-cols-3 gap-5 h-80">
                    <div className="col-span-2 bg-white p-5 rounded-lg shadow-sm border border-slate-200 flex flex-col">
                        <div className="flex justify-between mb-4">
                            <h3 className="font-bold text-slate-700 flex items-center gap-2"><Activity size={16} className="text-blue-500" /> Cluster Load Average (24h)</h3>
                            <div className="flex gap-2">
                                <button className="text-xs px-2 py-1 bg-slate-100 rounded hover:bg-slate-200">CPU</button>
                                <button className="text-xs px-2 py-1 bg-white border rounded hover:bg-slate-50">Memory</button>
                            </div>
                        </div>
                        <div className="flex-1 flex items-end gap-1 px-2 border-b border-l border-slate-100 pb-2 relative">
                            {Array.from({ length: 40 }).map((_, i) => {
                                const h = 30 + Math.random() * 50;
                                return <div key={i} className="flex-1 bg-blue-500 opacity-80 rounded-t-sm hover:opacity-100 transition-opacity" style={{ height: `${h}%` }}></div>
                            })}
                            <div className="absolute top-10 left-0 w-full h-[1px] bg-slate-100 border-t border-dashed border-slate-300"></div>
                            <div className="absolute top-20 left-0 w-full h-[1px] bg-slate-100 border-t border-dashed border-slate-300"></div>
                        </div>
                        <div className="flex justify-between text-xs text-slate-400 mt-2 px-2">
                            <span>00:00</span><span>06:00</span><span>12:00</span><span>18:00</span><span>23:59</span>
                        </div>
                    </div>
                    <div className="bg-white p-5 rounded-lg shadow-sm border border-slate-200 flex flex-col">
                        <h3 className="font-bold text-slate-700 mb-4 flex items-center gap-2"><Server size={16} className="text-purple-500" /> Service Status</h3>
                        <div className="space-y-4 flex-1 overflow-y-auto pr-2">
                            {[
                                { name: 'HDFS NameNode', status: 'Active', color: 'text-green-600', bg: 'bg-green-100' },
                                { name: 'HDFS DataNodes', status: '3/3 Live', color: 'text-green-600', bg: 'bg-green-100' },
                                { name: 'YARN ResourceManager', status: 'Active', color: 'text-green-600', bg: 'bg-green-100' },
                                { name: 'YARN NodeManagers', status: '3/3 Live', color: 'text-green-600', bg: 'bg-green-100' },
                                { name: 'Hive Metastore', status: 'Stopped', color: 'text-slate-500', bg: 'bg-slate-100' },
                                { name: 'Spark History Server', status: 'Running', color: 'text-green-600', bg: 'bg-green-100' },
                            ].map((s, i) => (
                                <div key={i} className="flex justify-between items-center p-2 hover:bg-slate-50 rounded border border-transparent hover:border-slate-100">
                                    <span className="text-sm font-medium text-slate-700">{s.name}</span>
                                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${s.bg} ${s.color}`}>{s.status}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </BrowserFrame>
);

// 5.2 Deployment Wizard (Enhanced)
export const ScreenshotDeployment: React.FC = () => (
    <BrowserFrame title="deploy/wizard/step-3" height={600}>
        <div className="flex h-full">
            <Sidebar active="deploy" />
            <div className="flex-1 p-8 bg-slate-50">
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 h-full flex flex-col overflow-hidden">
                    {/* Wizard Header */}
                    <div className="bg-slate-50 border-b border-slate-200 px-8 py-6">
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h2 className="text-xl font-bold text-slate-800">Cluster Deployment Wizard</h2>
                                <p className="text-sm text-slate-500 mt-1">Task ID: DEP-20240520-001 | Target: Production Cluster</p>
                            </div>
                            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold">Running</span>
                        </div>
                        {/* Progress Bar */}
                        <div className="flex items-center w-full">
                            {[
                                { step: 1, label: 'Host Selection', status: 'complete' },
                                { step: 2, label: 'Role Mapping', status: 'complete' },
                                { step: 3, label: 'Config Rendering', status: 'complete' },
                                { step: 4, label: 'Package Install', status: 'current' },
                                { step: 5, label: 'Service Start', status: 'pending' },
                            ].map((s, i) => (
                                <React.Fragment key={i}>
                                    <div className="flex flex-col items-center gap-2 relative z-10">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${s.status === 'complete' ? 'bg-green-500 text-white' :
                                            s.status === 'current' ? 'bg-blue-600 text-white ring-4 ring-blue-100' : 'bg-slate-200 text-slate-500'
                                            }`}>
                                            {s.status === 'complete' ? <CheckCircle size={14} /> : s.step}
                                        </div>
                                        <span className={`text-xs font-medium ${s.status === 'current' ? 'text-blue-700' : 'text-slate-500'}`}>{s.label}</span>
                                    </div>
                                    {i < 4 && <div className={`flex-1 h-0.5 -mx-4 mb-5 ${s.status === 'complete' ? 'bg-green-500' : 'bg-slate-200'}`}></div>}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>

                    {/* Execution Detail */}
                    <div className="flex-1 flex">
                        {/* Task List */}
                        <div className="w-1/3 border-r border-slate-200 bg-white overflow-y-auto">
                            <div className="p-4 border-b border-slate-100 font-bold text-sm text-slate-700 bg-slate-50">Execution Plan</div>
                            {[
                                { name: 'Install JDK 1.8', status: 'success', time: '45s' },
                                { name: 'Configure Firewall', status: 'success', time: '12s' },
                                { name: 'Install Hadoop Binaries', status: 'success', time: '1m 20s' },
                                { name: 'Render Config Templates', status: 'success', time: '5s' },
                                { name: 'Format NameNode', status: 'running', time: 'Running...' },
                                { name: 'Start NameNode Service', status: 'pending', time: '-' },
                                { name: 'Start DataNode Services', status: 'pending', time: '-' },
                            ].map((t, i) => (
                                <div key={i} className={`p-4 border-b border-slate-50 flex justify-between items-center ${t.status === 'running' ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''}`}>
                                    <div className="flex items-center gap-3">
                                        {t.status === 'success' && <CheckCircle size={16} className="text-green-500" />}
                                        {t.status === 'running' && <RefreshCw size={16} className="text-blue-500 animate-spin" />}
                                        {t.status === 'pending' && <div className="w-4 h-4 rounded-full border-2 border-slate-300"></div>}
                                        <span className={`text-sm ${t.status === 'running' ? 'font-bold text-blue-700' : 'text-slate-600'}`}>{t.name}</span>
                                    </div>
                                    <span className="text-xs text-slate-400 font-mono">{t.time}</span>
                                </div>
                            ))}
                        </div>
                        {/* Real-time Log */}
                        <div className="w-2/3 bg-[#1e1e1e] p-4 font-mono text-xs text-slate-300 overflow-y-auto">
                            <div className="text-slate-500 mb-2"># Ansible Playbook Real-time Output</div>
                            <div className="text-green-400">TASK [common : Install JDK 1.8] **************************************************</div>
                            <div>ok: [192.168.1.101]</div>
                            <div>ok: [192.168.1.102]</div>
                            <div>ok: [192.168.1.103]</div>
                            <div className="my-2"></div>
                            <div className="text-green-400">TASK [hadoop-namenode : Format NameNode] *****************************************</div>
                            <div className="text-yellow-400">changed: [192.168.1.101]</div>
                            <div className="pl-4 text-slate-500">
                                2024-05-20 10:15:32,456 INFO namenode.NameNode: STARTUP_MSG:
                                <br />/************************************************************
                                <br />STARTUP_MSG: Starting NameNode
                                <br />STARTUP_MSG:   host = master-01/192.168.1.101
                                <br />************************************************************/
                            </div>
                            <div className="animate-pulse mt-2">_</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </BrowserFrame>
);

// 5.3 Log Analysis (New)
export const ScreenshotLogAnalysis: React.FC = () => (
    <BrowserFrame title="logs/search" height={600}>
        <div className="flex h-full">
            <Sidebar active="logs" />
            <div className="flex-1 p-6 bg-slate-50 flex flex-col">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-slate-800">Log Analysis Center</h2>
                    <div className="flex gap-2">
                        <button className="px-3 py-1.5 bg-white border border-slate-300 rounded text-sm text-slate-600 flex items-center gap-2 shadow-sm">
                            <Download size={14} /> Export
                        </button>
                        <button className="px-3 py-1.5 bg-blue-600 text-white rounded text-sm font-medium shadow-sm">
                            Save Query
                        </button>
                    </div>
                </div>

                {/* Search Bar */}
                <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 mb-4">
                    <div className="flex gap-2 mb-3">
                        <div className="flex-1 relative">
                            <Search size={16} className="absolute left-3 top-2.5 text-slate-400" />
                            <input type="text" className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded bg-slate-50 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none font-mono" placeholder='service="hadoop-datanode" AND level="ERROR"' defaultValue='service="hadoop-datanode" AND level="ERROR"' />
                        </div>
                        <div className="w-48 relative">
                            <input type="text" className="w-full px-3 py-2 border border-slate-300 rounded bg-white text-sm" value="Last 15 minutes" readOnly />
                        </div>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded font-medium text-sm">Search</button>
                    </div>
                    {/* Histogram */}
                    <div className="h-16 flex items-end gap-0.5 border-b border-slate-100 pb-1">
                        {Array.from({ length: 60 }).map((_, i) => {
                            const isError = Math.random() > 0.8;
                            const h = Math.random() * 80 + 10;
                            return <div key={i} className={`flex-1 rounded-t-sm ${isError ? 'bg-red-400' : 'bg-blue-300'}`} style={{ height: `${h}%` }}></div>
                        })}
                    </div>
                </div>

                {/* Log Table */}
                <div className="bg-white rounded-lg shadow-sm border border-slate-200 flex-1 overflow-hidden flex flex-col">
                    <div className="px-4 py-2 border-b border-slate-200 bg-slate-50 text-xs font-bold text-slate-500 flex gap-4">
                        <span className="w-40">Timestamp</span>
                        <span className="w-24">Level</span>
                        <span className="w-32">Service</span>
                        <span className="w-32">Host</span>
                        <span className="flex-1">Message</span>
                    </div>
                    <div className="flex-1 overflow-y-auto font-mono text-xs">
                        {[
                            { time: '2024-05-20 14:23:45.123', level: 'ERROR', service: 'hadoop-datanode', host: 'slave-01', msg: 'IOException: Disk out of space on /data/01' },
                            { time: '2024-05-20 14:23:45.120', level: 'WARN', service: 'hadoop-datanode', host: 'slave-01', msg: 'Slow BlockReceiver write packet to mirror' },
                            { time: '2024-05-20 14:23:44.890', level: 'INFO', service: 'hadoop-datanode', host: 'slave-02', msg: 'Receiving block blk_1073741825 src: /192.168.1.101:50010 dest: /192.168.1.103:50010' },
                            { time: '2024-05-20 14:23:44.500', level: 'ERROR', service: 'hadoop-datanode', host: 'slave-01', msg: 'DataNode is shutting down: VolumeScanner found error' },
                            { time: '2024-05-20 14:23:42.111', level: 'INFO', service: 'hadoop-namenode', host: 'master-01', msg: 'BlockStateChange: BLOCK* addStoredBlock: blockMap updated: 192.168.1.102:50010 is added to blk_1073741825' },
                        ].map((log, i) => (
                            <div key={i} className="px-4 py-2 border-b border-slate-100 hover:bg-blue-50 flex gap-4 items-start">
                                <span className="w-40 text-slate-500 flex-shrink-0">{log.time}</span>
                                <span className={`w-24 font-bold flex-shrink-0 ${log.level === 'ERROR' ? 'text-red-600' : log.level === 'WARN' ? 'text-orange-500' : 'text-green-600'}`}>{log.level}</span>
                                <span className="w-32 text-slate-600 flex-shrink-0">{log.service}</span>
                                <span className="w-32 text-slate-600 flex-shrink-0">{log.host}</span>
                                <span className="flex-1 text-slate-800 break-all">{log.msg}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </BrowserFrame>
);

// 5.4 Auto-Healing History (New)
export const ScreenshotHealingHistory: React.FC = () => (
    <BrowserFrame title="healing/history" height={600}>
        <div className="flex h-full">
            <Sidebar active="healing" />
            <div className="flex-1 p-6 bg-slate-50">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-slate-800">故障自愈中心</h2>
                    <div className="flex gap-4">
                        <div className="bg-white px-4 py-2 rounded shadow-sm border border-slate-200 flex flex-col items-center">
                            <span className="text-xs text-slate-500">Total Healed</span>
                            <span className="text-lg font-bold text-green-600">12</span>
                        </div>
                        <div className="bg-white px-4 py-2 rounded shadow-sm border border-slate-200 flex flex-col items-center">
                            <span className="text-xs text-slate-500">Success Rate</span>
                            <span className="text-lg font-bold text-blue-600">100%</span>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
                    <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
                        <h3 className="font-bold text-slate-700">Recent Healing Events</h3>
                        <div className="flex gap-2">
                            <button className="px-3 py-1 border rounded text-xs bg-white text-slate-600 flex items-center gap-1"><Filter size={12} /> Filter</button>
                            <button className="px-3 py-1 border rounded text-xs bg-white text-slate-600 flex items-center gap-1"><List size={12} /> Columns</button>
                        </div>
                    </div>
                    <table className="w-full text-sm text-left">
                        <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
                            <tr>
                                <th className="p-4">Event ID</th>
                                <th className="p-4">Trigger Time</th>
                                <th className="p-4">Alert Rule</th>
                                <th className="p-4">Target Host</th>
                                <th className="p-4">Action Taken</th>
                                <th className="p-4">Status</th>
                                <th className="p-4">Duration</th>
                                <th className="p-4">Details</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            <tr className="hover:bg-slate-50">
                                <td className="p-4 font-mono text-xs text-slate-500">EVT-8921</td>
                                <td className="p-4 text-slate-700">2024-05-20 14:25:10</td>
                                <td className="p-4"><span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs font-bold">DataNode Down</span></td>
                                <td className="p-4 text-slate-700">slave-01 (192.168.1.102)</td>
                                <td className="p-4 text-slate-700 flex items-center gap-2"><RefreshCw size={14} className="text-blue-500" /> Restart Service</td>
                                <td className="p-4"><span className="flex items-center gap-1 text-green-600 text-xs font-bold"><CheckCircle size={12} /> Success</span></td>
                                <td className="p-4 text-slate-500">15s</td>
                                <td className="p-4 text-blue-600 cursor-pointer hover:underline text-xs">View Log</td>
                            </tr>
                            <tr className="hover:bg-slate-50">
                                <td className="p-4 font-mono text-xs text-slate-500">EVT-8920</td>
                                <td className="p-4 text-slate-700">2024-05-19 09:12:45</td>
                                <td className="p-4"><span className="bg-orange-100 text-orange-700 px-2 py-1 rounded text-xs font-bold">Disk Usage &gt; 90%</span></td>
                                <td className="p-4 text-slate-700">slave-02 (192.168.1.103)</td>
                                <td className="p-4 text-slate-700 flex items-center gap-2"><HardDrive size={14} className="text-blue-500" /> Clean Tmp Logs</td>
                                <td className="p-4"><span className="flex items-center gap-1 text-green-600 text-xs font-bold"><CheckCircle size={12} /> Success</span></td>
                                <td className="p-4 text-slate-500">8s</td>
                                <td className="p-4 text-blue-600 cursor-pointer hover:underline text-xs">View Log</td>
                            </tr>
                            <tr className="hover:bg-slate-50">
                                <td className="p-4 font-mono text-xs text-slate-500">EVT-8919</td>
                                <td className="p-4 text-slate-700">2024-05-18 22:05:30</td>
                                <td className="p-4"><span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs font-bold">NameNode Heap High</span></td>
                                <td className="p-4 text-slate-700">master-01 (192.168.1.101)</td>
                                <td className="p-4 text-slate-700 flex items-center gap-2"><Cpu size={14} className="text-blue-500" /> No Action (Notify)</td>
                                <td className="p-4"><span className="flex items-center gap-1 text-slate-500 text-xs font-bold">Skipped</span></td>
                                <td className="p-4 text-slate-500">-</td>
                                <td className="p-4 text-blue-600 cursor-pointer hover:underline text-xs">View Log</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </BrowserFrame>
);
