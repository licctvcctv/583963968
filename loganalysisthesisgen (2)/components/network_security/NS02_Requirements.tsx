import React from 'react';

// 二、需求分析
export const NS02_Requirements: React.FC = () => {
    return (
        <div id="ns-requirements" className="page bg-white w-[210mm] min-h-[297mm] mx-auto shadow-lg mb-8 p-12 page-break">
            <h2 className="text-[18pt] font-hei mb-6 font-bold">二、需求分析</h2>

            <h3 className="text-[14pt] font-hei font-bold mt-6 mb-4">2.1 功能需求</h3>
            <p className="mb-4 indent-8 text-justify">
                根据题目要求"企业内网纵深渗透"，本项目需要实现以下功能：
            </p>
            <ul className="list-decimal ml-12 mb-4 space-y-2">
                <li><strong>资产发现功能：</strong>使用Nmap、Masscan等工具对目标网段进行扫描，发现存活主机、开放端口和运行服务</li>
                <li><strong>网络拓扑绘制：</strong>根据扫描结果绘制目标网络的拓扑结构图</li>
                <li><strong>漏洞扫描功能：</strong>对发现的服务进行漏洞扫描，识别潜在的安全风险</li>
                <li><strong>漏洞利用功能：</strong>针对发现的漏洞进行利用尝试，获取服务器访问权限</li>
                <li><strong>攻击路径记录：</strong>全程记录攻击过程，编写可复现的攻击路径报告</li>
                <li><strong>修复方案设计：</strong>给出基于分层VLAN与微隔离的安全加固方案</li>
            </ul>

            <h3 className="text-[14pt] font-hei font-bold mt-6 mb-4">2.2 技术需求</h3>
            <div className="mb-4">
                <table className="w-full border-collapse border border-gray-400">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-gray-400 p-2 text-left">工具名称</th>
                            <th className="border border-gray-400 p-2 text-left">版本</th>
                            <th className="border border-gray-400 p-2 text-left">主要用途</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border border-gray-400 p-2">Nmap</td>
                            <td className="border border-gray-400 p-2">7.94</td>
                            <td className="border border-gray-400 p-2">端口扫描、服务识别、漏洞检测脚本</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-400 p-2">Dirb</td>
                            <td className="border border-gray-400 p-2">2.22</td>
                            <td className="border border-gray-400 p-2">Web目录爆破，发现隐藏文件和目录</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-400 p-2">Nikto</td>
                            <td className="border border-gray-400 p-2">2.5.0</td>
                            <td className="border border-gray-400 p-2">Web漏洞扫描，检测常见Web安全问题</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-400 p-2">Redis-cli</td>
                            <td className="border border-gray-400 p-2">7.0</td>
                            <td className="border border-gray-400 p-2">Redis数据库连接与命令执行</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-400 p-2">Hydra</td>
                            <td className="border border-gray-400 p-2">9.5</td>
                            <td className="border border-gray-400 p-2">在线密码爆破工具</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-400 p-2">redis-rogue-server</td>
                            <td className="border border-gray-400 p-2">-</td>
                            <td className="border border-gray-400 p-2">Redis主从复制RCE漏洞利用工具</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p className="text-center text-sm font-bold mb-4">表 2-1 项目使用工具清单</p>

            <h3 className="text-[14pt] font-hei font-bold mt-6 mb-4">2.3 渗透测试流程</h3>
            <p className="mb-4 indent-8 text-justify">
                本项目采用标准的渗透测试方法论，整体流程如下：
            </p>
            
            {/* 流程图 */}
            <div className="my-4 p-4 border border-gray-300 rounded capture-as-image bg-white">
                <svg viewBox="0 0 550 80" className="w-full h-auto">
                    <rect width="550" height="80" fill="#fafafa"/>
                    
                    <rect x="10" y="25" width="80" height="35" rx="5" fill="#e3f2fd" stroke="#1976d2" strokeWidth="2"/>
                    <text x="50" y="47" textAnchor="middle" fontSize="10" fill="#1976d2">信息收集</text>
                    
                    <path d="M90 42 L110 42" stroke="#666" strokeWidth="2" markerEnd="url(#arr)"/>
                    
                    <rect x="110" y="25" width="80" height="35" rx="5" fill="#fff3e0" stroke="#f57c00" strokeWidth="2"/>
                    <text x="150" y="47" textAnchor="middle" fontSize="10" fill="#e65100">漏洞发现</text>
                    
                    <path d="M190 42 L210 42" stroke="#666" strokeWidth="2" markerEnd="url(#arr)"/>
                    
                    <rect x="210" y="25" width="80" height="35" rx="5" fill="#ffebee" stroke="#c62828" strokeWidth="2"/>
                    <text x="250" y="47" textAnchor="middle" fontSize="10" fill="#c62828">漏洞利用</text>
                    
                    <path d="M290 42 L310 42" stroke="#666" strokeWidth="2" markerEnd="url(#arr)"/>
                    
                    <rect x="310" y="25" width="80" height="35" rx="5" fill="#e8f5e9" stroke="#2e7d32" strokeWidth="2"/>
                    <text x="350" y="47" textAnchor="middle" fontSize="10" fill="#2e7d32">权限获取</text>
                    
                    <path d="M390 42 L410 42" stroke="#666" strokeWidth="2" markerEnd="url(#arr)"/>
                    
                    <rect x="410" y="25" width="80" height="35" rx="5" fill="#f3e5f5" stroke="#7b1fa2" strokeWidth="2"/>
                    <text x="450" y="47" textAnchor="middle" fontSize="10" fill="#7b1fa2">报告编写</text>
                    
                    <defs>
                        <marker id="arr" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                            <path d="M0,0 L0,6 L9,3 z" fill="#666"/>
                        </marker>
                    </defs>
                </svg>
            </div>
            <p className="text-center text-sm font-bold mb-4">图 2-1 渗透测试流程图</p>
        </div>
    );
};
