import React from 'react';
import { Terminal, Server, Database, FileText, CheckCircle, Play, Cpu, Activity, Lock, RefreshCw } from 'lucide-react';

// 1. Class Diagram (Resource Mgmt)
export const DeploymentClassDiagram: React.FC = () => (
    <div className="w-full flex justify-center items-center bg-white rounded border border-gray-300 capture-as-image p-6 my-4">
        <svg viewBox="0 0 600 300" className="w-full h-auto font-sans text-xs">
            <style>
                {`
          .cls-box { fill: #ffffff; stroke: #000000; stroke-width: 1.5; }
          .cls-header { fill: #e0e0e0; stroke: #000000; stroke-width: 1.5; }
          .cls-text { font-family: 'Courier New', monospace; font-size: 11px; }
          .cls-title { font-family: 'SimHei', sans-serif; font-weight: bold; font-size: 12px; }
          .cls-conn { stroke: #000000; stroke-width: 1.2; fill: none; marker-end: url(#arrow-cls); }
        `}
            </style>
            <defs>
                <marker id="arrow-cls" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                    <path d="M0,0 L0,6 L9,3 z" fill="white" stroke="black" strokeWidth="1" />
                </marker>
            </defs>

            {/* Class: Host */}
            <g transform="translate(20, 50)">
                <rect width="140" height="25" className="cls-header" />
                <text x="70" y="18" textAnchor="middle" className="cls-title">Host (主机)</text>
                <rect y="25" width="140" height="100" className="cls-box" />
                <text x="10" y="45" className="cls-text">- ip: String</text>
                <text x="10" y="60" className="cls-text">- hostname: String</text>
                <text x="10" y="75" className="cls-text">- status: Enum</text>
                <text x="10" y="90" className="cls-text">- sshPort: int</text>
                <text x="10" y="115" className="cls-text">+ checkConnectivity()</text>
            </g>

            {/* Class: Cluster */}
            <g transform="translate(230, 50)">
                <rect width="140" height="25" className="cls-header" />
                <text x="70" y="18" textAnchor="middle" className="cls-title">Cluster (集群)</text>
                <rect y="25" width="140" height="80" className="cls-box" />
                <text x="10" y="45" className="cls-text">- name: String</text>
                <text x="10" y="60" className="cls-text">- version: String</text>
                <text x="10" y="75" className="cls-text">- state: Enum</text>
                <text x="10" y="95" className="cls-text">+ deploy()</text>
            </g>

            {/* Class: ServiceRole */}
            <g transform="translate(440, 50)">
                <rect width="140" height="25" className="cls-header" />
                <text x="70" y="18" textAnchor="middle" className="cls-title">ServiceRole (角色)</text>
                <rect y="25" width="140" height="80" className="cls-box" />
                <text x="10" y="45" className="cls-text">- name: String</text>
                <text x="10" y="60" className="cls-text">- config: Map</text>
                <text x="10" y="80" className="cls-text">+ generateConfig()</text>
            </g>

            {/* Relationships */}
            <path d="M160 100 L230 100" className="cls-conn" strokeDasharray="5,5" />
            <text x="195" y="90" textAnchor="middle" fontSize="10">属于</text>

            <path d="M370 100 L440 100" className="cls-conn" />
            <text x="405" y="90" textAnchor="middle" fontSize="10">包含</text>
        </svg>
    </div>
);

// 2. Flowchart (Host Entry)
export const HostEntryFlow: React.FC = () => (
    <div className="w-full flex justify-center items-center bg-white rounded border border-gray-300 capture-as-image p-6 my-4">
        <svg viewBox="0 0 600 150" className="w-full h-auto font-sans text-xs">
            <defs>
                <marker id="arrow-he" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                    <path d="M0,0 L0,6 L9,3 z" fill="#000000" />
                </marker>
            </defs>
            <style>
                {`
          .he-node { fill: #ffffff; stroke: #000000; stroke-width: 1.5; rx: 5; }
          .he-text { font-size: 12px; font-family: 'SimSun', serif; text-anchor: middle; dominant-baseline: middle; }
          .he-conn { stroke: #000000; stroke-width: 1.2; fill: none; marker-end: url(#arrow-he); }
        `}
            </style>

            <rect x="20" y="50" width="100" height="40" className="he-node" />
            <text x="70" y="70" className="he-text">上传Excel</text>

            <line x1="120" y1="70" x2="160" y2="70" className="he-conn" />

            <rect x="160" y="50" width="100" height="40" className="he-node" />
            <text x="210" y="70" className="he-text">POI解析</text>

            <line x1="260" y1="70" x2="300" y2="70" className="he-conn" />

            <rect x="300" y="50" width="100" height="40" className="he-node" />
            <text x="350" y="70" className="he-text">格式校验</text>

            <line x1="400" y1="70" x2="440" y2="70" className="he-conn" />

            <rect x="440" y="50" width="120" height="40" className="he-node" />
            <text x="500" y="70" className="he-text">连通性测试(Ping)</text>
        </svg>
    </div>
);

// 3. Sequence (SSH Key)
export const SSHKeyExchangeSequence: React.FC = () => (
    <div className="w-full flex justify-center items-center bg-white rounded border border-gray-300 capture-as-image p-6 my-4">
        <svg viewBox="0 0 500 300" className="w-full h-auto font-sans text-xs">
            <defs>
                <marker id="arrow-ssh" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                    <path d="M0,0 L0,6 L9,3 z" fill="#000000" />
                </marker>
            </defs>
            <style>
                {`
          .ssh-line { stroke: #000000; stroke-width: 1; stroke-dasharray: 4; }
          .ssh-rect { fill: #ffffff; stroke: #000000; stroke-width: 1.5; }
          .ssh-text { font-size: 11px; font-family: 'SimSun', serif; text-anchor: middle; }
          .ssh-msg { stroke: #000000; stroke-width: 1.2; marker-end: url(#arrow-ssh); }
        `}
            </style>

            <rect x="50" y="20" width="80" height="30" className="ssh-rect" />
            <text x="90" y="40" className="ssh-text">Web Server</text>
            <line x1="90" y1="50" x2="90" y2="280" className="ssh-line" />

            <rect x="350" y="20" width="80" height="30" className="ssh-rect" />
            <text x="390" y="40" className="ssh-text">Target Host</text>
            <line x1="390" y1="50" x2="390" y2="280" className="ssh-line" />

            <line x1="90" y1="80" x2="200" y2="80" className="ssh-msg" />
            <text x="145" y="70" className="ssh-text">1. 生成RSA密钥对</text>

            <line x1="90" y1="120" x2="390" y2="120" className="ssh-msg" />
            <text x="240" y="110" className="ssh-text">2. SSH连接 (User/Pass)</text>

            <line x1="90" y1="160" x2="390" y2="160" className="ssh-msg" />
            <text x="240" y="150" className="ssh-text">3. 写入 authorized_keys</text>

            <line x1="390" y1="200" x2="90" y2="200" className="ssh-msg" strokeDasharray="4" />
            <text x="240" y="190" className="ssh-text">4. 返回成功</text>

            <line x1="90" y1="240" x2="390" y2="240" className="ssh-msg" />
            <text x="240" y="230" className="ssh-text">5. 验证免密登录</text>
        </svg>
    </div>
);

// 4. Logic Flow (Inventory)
export const InventoryGenerationLogic: React.FC = () => (
    <div className="w-full flex justify-center items-center bg-white rounded border border-gray-300 capture-as-image p-6 my-4">
        <svg viewBox="0 0 600 200" className="w-full h-auto font-sans text-xs">
            <style>
                {`
          .inv-box { fill: #ffffff; stroke: #000000; stroke-width: 1.5; }
          .inv-text { font-size: 12px; font-family: 'SimSun', serif; text-anchor: middle; dominant-baseline: middle; }
          .inv-conn { stroke: #000000; stroke-width: 1.2; fill: none; marker-end: url(#arrow-inv); }
        `}
            </style>
            <defs>
                <marker id="arrow-inv" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                    <path d="M0,0 L0,6 L9,3 z" fill="#000000" />
                </marker>
            </defs>

            <rect x="20" y="80" width="100" height="40" className="inv-box" />
            <text x="70" y="100" className="inv-text">读取DB角色表</text>

            <line x1="120" y1="100" x2="160" y2="100" className="inv-conn" />

            <polygon points="160,100 200,70 240,100 200,130" className="inv-box" />
            <text x="200" y="100" className="inv-text">分组</text>

            <line x1="240" y1="100" x2="280" y2="100" className="inv-conn" />

            <rect x="280" y="80" width="120" height="40" className="inv-box" />
            <text x="340" y="100" className="inv-text">加载Jinja2模板</text>

            <line x1="400" y1="100" x2="440" y2="100" className="inv-conn" />

            <rect x="440" y="80" width="120" height="40" className="inv-box" />
            <text x="500" y="100" className="inv-text">生成 hosts.ini</text>
        </svg>
    </div>
);

// 5. Mock UI (Role Allocation)
export const RoleAllocationUI: React.FC = () => (
    <div className="w-full bg-white border border-gray-300 shadow-sm rounded-lg overflow-hidden capture-as-image font-sans mb-4 p-4">
        <h4 className="font-bold text-gray-700 mb-2 text-sm">集群角色规划</h4>
        <table className="w-full text-xs text-left border-collapse border border-gray-200">
            <thead className="bg-gray-100">
                <tr>
                    <th className="border p-2">主机IP</th>
                    <th className="border p-2">主机名</th>
                    <th className="border p-2">NameNode</th>
                    <th className="border p-2">DataNode</th>
                    <th className="border p-2">ResourceManager</th>
                    <th className="border p-2">NodeManager</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className="border p-2">192.168.1.101</td>
                    <td className="border p-2">master-01</td>
                    <td className="border p-2 text-center"><CheckCircle size={14} className="text-green-600 inline" /></td>
                    <td className="border p-2 text-center"></td>
                    <td className="border p-2 text-center"><CheckCircle size={14} className="text-green-600 inline" /></td>
                    <td className="border p-2 text-center"></td>
                </tr>
                <tr>
                    <td className="border p-2">192.168.1.102</td>
                    <td className="border p-2">slave-01</td>
                    <td className="border p-2 text-center"></td>
                    <td className="border p-2 text-center"><CheckCircle size={14} className="text-green-600 inline" /></td>
                    <td className="border p-2 text-center"></td>
                    <td className="border p-2 text-center"><CheckCircle size={14} className="text-green-600 inline" /></td>
                </tr>
                <tr>
                    <td className="border p-2">192.168.1.103</td>
                    <td className="border p-2">slave-02</td>
                    <td className="border p-2 text-center"></td>
                    <td className="border p-2 text-center"><CheckCircle size={14} className="text-green-600 inline" /></td>
                    <td className="border p-2 text-center"></td>
                    <td className="border p-2 text-center"><CheckCircle size={14} className="text-green-600 inline" /></td>
                </tr>
            </tbody>
        </table>
    </div>
);

// 6. Data Flow (Config Rendering)
export const ConfigRenderingFlow: React.FC = () => (
    <div className="w-full flex justify-center items-center bg-white rounded border border-gray-300 capture-as-image p-6 my-4">
        <svg viewBox="0 0 600 250" className="w-full h-auto font-sans text-xs">
            <style>
                {`
          .cfg-file { fill: #fff; stroke: #000; stroke-width: 1.2; }
          .cfg-proc { fill: #f0f0f0; stroke: #000; stroke-width: 1.5; rx: 5; }
          .cfg-text { font-size: 11px; font-family: 'SimSun', serif; text-anchor: middle; }
          .cfg-conn { stroke: #000; stroke-width: 1.2; fill: none; marker-end: url(#arrow-cfg); }
        `}
            </style>
            <defs>
                <marker id="arrow-cfg" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                    <path d="M0,0 L0,6 L9,3 z" fill="#000000" />
                </marker>
            </defs>

            <path d="M50 50 L130 50 L130 110 L50 110 Z" className="cfg-file" />
            <path d="M110 50 L130 70 L130 50 Z" fill="black" />
            <text x="90" y="85" className="cfg-text">core-site.xml.j2</text>
            <text x="90" y="100" className="cfg-text">(模板)</text>

            <path d="M50 150 L130 150 L130 210 L50 210 Z" className="cfg-file" />
            <path d="M110 150 L130 170 L130 150 Z" fill="black" />
            <text x="90" y="185" className="cfg-text">group_vars</text>
            <text x="90" y="200" className="cfg-text">(变量)</text>

            <line x1="130" y1="80" x2="200" y2="120" className="cfg-conn" />
            <line x1="130" y1="180" x2="200" y2="140" className="cfg-conn" />

            <rect x="200" y="100" width="120" height="60" className="cfg-proc" />
            <text x="260" y="135" className="cfg-text">Ansible Template</text>
            <text x="260" y="150" className="cfg-text">渲染引擎</text>

            <line x1="320" y1="130" x2="400" y2="130" className="cfg-conn" />

            <path d="M400 100 L480 100 L480 160 L400 160 Z" className="cfg-file" />
            <text x="440" y="135" className="cfg-text">core-site.xml</text>
            <text x="440" y="150" className="cfg-text">(最终配置)</text>
        </svg>
    </div>
);

// 7. Flowchart (Playbook Exec)
export const PlaybookExecutionFlow: React.FC = () => (
    <div className="w-full flex justify-center items-center bg-white rounded border border-gray-300 capture-as-image p-6 my-4">
        <svg viewBox="0 0 700 180" className="w-full h-auto font-sans text-xs">
            <style>
                {`
          .pb-node { fill: #fff; stroke: #000; stroke-width: 1.5; rx: 5; }
          .pb-text { font-size: 11px; font-family: 'SimSun', serif; text-anchor: middle; dominant-baseline: middle; }
          .pb-conn { stroke: #000; stroke-width: 1.2; fill: none; marker-end: url(#arrow-pb); }
        `}
            </style>
            <defs>
                <marker id="arrow-pb" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                    <path d="M0,0 L0,6 L9,3 z" fill="#000000" />
                </marker>
            </defs>

            <rect x="20" y="70" width="80" height="40" className="pb-node" />
            <text x="60" y="90" className="pb-text">环境检查</text>

            <line x1="100" y1="90" x2="140" y2="90" className="pb-conn" />

            <rect x="140" y="70" width="80" height="40" className="pb-node" />
            <text x="180" y="90" className="pb-text">JDK安装</text>

            <line x1="220" y1="90" x2="260" y2="90" className="pb-conn" />

            <rect x="260" y="70" width="80" height="40" className="pb-node" />
            <text x="300" y="90" className="pb-text">Hadoop解压</text>

            <line x1="340" y1="90" x2="380" y2="90" className="pb-conn" />

            <rect x="380" y="70" width="80" height="40" className="pb-node" />
            <text x="420" y="90" className="pb-text">配置分发</text>

            <line x1="460" y1="90" x2="500" y2="90" className="pb-conn" />

            <rect x="500" y="70" width="80" height="40" className="pb-node" />
            <text x="540" y="90" className="pb-text">服务启动</text>

            <line x1="580" y1="90" x2="620" y2="90" className="pb-conn" />

            <rect x="620" y="70" width="60" height="40" className="pb-node" />
            <text x="650" y="90" className="pb-text">验证</text>
        </svg>
    </div>
);

// 8. Mock Terminal (Log Stream)
export const TaskLogStream: React.FC = () => (
    <div className="w-full bg-[#1e1e1e] rounded-lg shadow-xl overflow-hidden my-4 font-mono text-xs capture-as-image text-left border border-gray-700">
        <div className="bg-[#2d2d2d] px-4 py-1 flex items-center gap-2 border-b border-[#3e3e3e]">
            <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]"></div>
            </div>
            <span className="ml-2 text-gray-400">Deployment Log Stream</span>
        </div>
        <div className="p-3 text-gray-300 leading-tight h-48 overflow-y-hidden">
            <div className="text-green-400">PLAY [Deploy Hadoop Cluster] ***************************************************</div>
            <div className="mt-1">TASK [Gathering Facts] *********************************************************</div>
            <div className="text-green-400">ok: [192.168.1.101]</div>
            <div className="text-green-400">ok: [192.168.1.102]</div>
            <div className="mt-1">TASK [common : Install Java JDK] *************************************************</div>
            <div className="text-yellow-400">changed: [192.168.1.101]</div>
            <div className="text-yellow-400">changed: [192.168.1.102]</div>
            <div className="mt-1">TASK [hadoop-install : Extract Hadoop Tarball] *********************************</div>
            <div className="text-yellow-400">changed: [192.168.1.101]</div>
            <div className="text-green-400">ok: [192.168.1.102]</div>
            <div className="mt-1">TASK [hadoop-config : Template Configuration] **********************************</div>
            <div className="text-yellow-400">changed: [192.168.1.101] &rArr; (item=core-site.xml)</div>
            <div className="text-yellow-400 animate-pulse">changed: [192.168.1.102] &rArr; (item=core-site.xml) _</div>
        </div>
    </div>
);

// 9. Mock UI (Progress Dashboard)
export const DeploymentProgressUI: React.FC = () => (
    <div className="w-full bg-white border border-gray-300 shadow-sm rounded-lg p-6 my-4 capture-as-image font-sans">
        <h4 className="font-bold text-gray-700 mb-4 text-sm">部署任务进度: Task-20240520-001</h4>
        <div className="flex items-center justify-between mb-6 relative">
            <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -z-10"></div>
            <div className="absolute top-1/2 left-0 w-3/4 h-1 bg-blue-500 -z-10"></div>

            <div className="flex flex-col items-center bg-white px-2">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold"><CheckCircle size={16} /></div>
                <span className="text-xs mt-1 font-bold text-blue-600">环境检查</span>
            </div>
            <div className="flex flex-col items-center bg-white px-2">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold"><CheckCircle size={16} /></div>
                <span className="text-xs mt-1 font-bold text-blue-600">基础安装</span>
            </div>
            <div className="flex flex-col items-center bg-white px-2">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold"><CheckCircle size={16} /></div>
                <span className="text-xs mt-1 font-bold text-blue-600">配置分发</span>
            </div>
            <div className="flex flex-col items-center bg-white px-2">
                <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs font-bold animate-pulse"><RefreshCw size={16} className="animate-spin" /></div>
                <span className="text-xs mt-1 font-bold text-blue-500">服务启动</span>
            </div>
            <div className="flex flex-col items-center bg-white px-2">
                <div className="w-8 h-8 rounded-full bg-gray-300 text-gray-500 flex items-center justify-center text-xs font-bold">5</div>
                <span className="text-xs mt-1 text-gray-400">健康检查</span>
            </div>
        </div>
        <div className="flex gap-4 text-xs text-gray-600">
            <div className="flex items-center gap-1"><Play size={12} /> 开始时间: 10:30:00</div>
            <div className="flex items-center gap-1"><Activity size={12} /> 耗时: 5m 20s</div>
        </div>
    </div>
);

// 10. Sequence (Service Verification)
export const ServiceVerificationSequence: React.FC = () => (
    <div className="w-full flex justify-center items-center bg-white rounded border border-gray-300 capture-as-image p-6 my-4">
        <svg viewBox="0 0 500 250" className="w-full h-auto font-sans text-xs">
            <style>
                {`
          .sv-line { stroke: #000; stroke-width: 1; stroke-dasharray: 4; }
          .sv-rect { fill: #fff; stroke: #000; stroke-width: 1.5; }
          .sv-text { font-size: 11px; font-family: 'SimSun', serif; text-anchor: middle; }
          .sv-msg { stroke: #000; stroke-width: 1.2; marker-end: url(#arrow-sv); }
        `}
            </style>
            <defs>
                <marker id="arrow-sv" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                    <path d="M0,0 L0,6 L9,3 z" fill="#000000" />
                </marker>
            </defs>

            <rect x="50" y="20" width="80" height="30" className="sv-rect" />
            <text x="90" y="40" className="sv-text">Ansible</text>
            <line x1="90" y1="50" x2="90" y2="230" className="sv-line" />

            <rect x="350" y="20" width="80" height="30" className="sv-rect" />
            <text x="390" y="40" className="sv-text">Node (DataNode)</text>
            <line x1="390" y1="50" x2="390" y2="230" className="sv-line" />

            <line x1="90" y1="80" x2="390" y2="80" className="sv-msg" />
            <text x="240" y="70" className="sv-text">1. 启动服务 (systemctl start)</text>

            <line x1="390" y1="110" x2="90" y2="110" className="sv-msg" strokeDasharray="4" />
            <text x="240" y="100" className="sv-text">2. 返回启动结果</text>

            <line x1="90" y1="140" x2="390" y2="140" className="sv-msg" />
            <text x="240" y="130" className="sv-text">3. 检查进程 (jps)</text>

            <line x1="90" y1="170" x2="390" y2="170" className="sv-msg" />
            <text x="240" y="160" className="sv-text">4. 检查端口 (9864)</text>

            <line x1="390" y1="200" x2="90" y2="200" className="sv-msg" strokeDasharray="4" />
            <text x="240" y="190" className="sv-text">5. 返回健康状态</text>
        </svg>
    </div>
);
