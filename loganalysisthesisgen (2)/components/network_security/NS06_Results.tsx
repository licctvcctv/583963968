import React from 'react';

// 六、项目运行效果
export const NS06_Results: React.FC = () => {
    return (
        <div id="ns-results" className="page bg-white w-[210mm] min-h-[297mm] mx-auto shadow-lg mb-8 p-12 page-break">
            <h2 className="text-[18pt] font-hei mb-6 font-bold">六、项目运行效果</h2>

            <h3 className="text-[14pt] font-hei font-bold mt-6 mb-4">6.1 漏洞发现汇总</h3>
            <p className="mb-4 indent-8 text-justify">
                通过渗透测试，共发现以下安全漏洞：
            </p>
            <div className="mb-4">
                <table className="w-full border-collapse border border-gray-400">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-gray-400 p-2 text-left">漏洞名称</th>
                            <th className="border border-gray-400 p-2 text-left">危险等级</th>
                            <th className="border border-gray-400 p-2 text-left">CVSS评分</th>
                            <th className="border border-gray-400 p-2 text-left">影响描述</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border border-gray-400 p-2">Redis未授权访问</td>
                            <td className="border border-gray-400 p-2 text-red-600 font-bold">高危</td>
                            <td className="border border-gray-400 p-2">9.8</td>
                            <td className="border border-gray-400 p-2">可读写数据，旧版本可RCE</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-400 p-2">phpinfo信息泄露</td>
                            <td className="border border-gray-400 p-2 text-yellow-600 font-bold">中危</td>
                            <td className="border border-gray-400 p-2">5.3</td>
                            <td className="border border-gray-400 p-2">泄露服务器配置信息</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-400 p-2">allow_url_include开启</td>
                            <td className="border border-gray-400 p-2 text-red-600 font-bold">高危</td>
                            <td className="border border-gray-400 p-2">8.1</td>
                            <td className="border border-gray-400 p-2">可能导致远程文件包含</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-400 p-2">HTTP TRACE开启</td>
                            <td className="border border-gray-400 p-2 text-blue-600 font-bold">低危</td>
                            <td className="border border-gray-400 p-2">3.1</td>
                            <td className="border border-gray-400 p-2">可能导致XST攻击</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-400 p-2">软件版本过旧</td>
                            <td className="border border-gray-400 p-2 text-yellow-600 font-bold">中危</td>
                            <td className="border border-gray-400 p-2">5.0</td>
                            <td className="border border-gray-400 p-2">Apache/PHP版本过旧</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-400 p-2">缺少安全响应头</td>
                            <td className="border border-gray-400 p-2 text-blue-600 font-bold">低危</td>
                            <td className="border border-gray-400 p-2">2.5</td>
                            <td className="border border-gray-400 p-2">缺少X-Frame-Options等</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p className="text-center text-sm font-bold mb-4">表 6-1 漏洞发现汇总表</p>

            <h3 className="text-[14pt] font-hei font-bold mt-6 mb-4">6.2 攻击路径图</h3>
            <div className="my-4 p-4 border border-gray-300 rounded capture-as-image bg-white">
                <svg viewBox="0 0 550 180" className="w-full h-auto">
                    <rect width="550" height="180" fill="#fafafa"/>
                    
                    <rect x="10" y="70" width="90" height="45" rx="5" fill="#e3f2fd" stroke="#1976d2" strokeWidth="2"/>
                    <text x="55" y="88" textAnchor="middle" fontSize="9" fill="#1976d2">1.Nmap扫描</text>
                    <text x="55" y="102" textAnchor="middle" fontSize="8" fill="#666">发现4个端口</text>
                    
                    <path d="M100 92 L120 92" stroke="#666" strokeWidth="2" markerEnd="url(#ar)"/>
                    
                    <rect x="120" y="70" width="90" height="45" rx="5" fill="#fff3e0" stroke="#f57c00" strokeWidth="2"/>
                    <text x="165" y="88" textAnchor="middle" fontSize="9" fill="#e65100">2.Dirb扫描</text>
                    <text x="165" y="102" textAnchor="middle" fontSize="8" fill="#666">发现phpinfo</text>
                    
                    <path d="M210 92 L230 92" stroke="#666" strokeWidth="2" markerEnd="url(#ar)"/>
                    
                    <rect x="230" y="70" width="90" height="45" rx="5" fill="#ffebee" stroke="#c62828" strokeWidth="2"/>
                    <text x="275" y="88" textAnchor="middle" fontSize="9" fill="#c62828">3.Redis测试</text>
                    <text x="275" y="102" textAnchor="middle" fontSize="8" fill="#666">未授权访问!</text>
                    
                    <path d="M320 92 L340 92" stroke="#666" strokeWidth="2" markerEnd="url(#ar)"/>
                    
                    <rect x="340" y="70" width="90" height="45" rx="5" fill="#e8f5e9" stroke="#2e7d32" strokeWidth="2"/>
                    <text x="385" y="88" textAnchor="middle" fontSize="9" fill="#2e7d32">4.RCE尝试</text>
                    <text x="385" y="102" textAnchor="middle" fontSize="8" fill="#666">版本受限</text>
                    
                    <path d="M430 92 L450 92" stroke="#666" strokeWidth="2" markerEnd="url(#ar)"/>
                    
                    <rect x="450" y="70" width="90" height="45" rx="5" fill="#f3e5f5" stroke="#7b1fa2" strokeWidth="2"/>
                    <text x="495" y="88" textAnchor="middle" fontSize="9" fill="#7b1fa2">5.报告编写</text>
                    <text x="495" y="102" textAnchor="middle" fontSize="8" fill="#666">加固建议</text>
                    
                    <defs>
                        <marker id="ar" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                            <path d="M0,0 L0,6 L9,3 z" fill="#666"/>
                        </marker>
                    </defs>
                    
                    <text x="275" y="150" textAnchor="middle" fontSize="10" fill="#333">攻击链路：信息收集 → 漏洞发现 → 漏洞利用 → 权限获取（受限）→ 报告</text>
                </svg>
            </div>
            <p className="text-center text-sm font-bold mb-4">图 6-1 攻击路径流程图</p>

            <h3 className="text-[14pt] font-hei font-bold mt-6 mb-4">6.3 安全加固方案</h3>
            <p className="mb-4 indent-8 text-justify">
                针对发现的漏洞，设计基于分层VLAN与微隔离的安全加固方案：
            </p>
            <div className="my-4 p-4 border border-gray-300 rounded capture-as-image bg-white">
                <svg viewBox="0 0 500 200" className="w-full h-auto">
                    <rect width="500" height="200" fill="#fafafa"/>
                    
                    {/* DMZ区 */}
                    <rect x="20" y="20" width="140" height="80" rx="5" fill="#ffebee" stroke="#c62828" strokeWidth="2"/>
                    <text x="90" y="40" textAnchor="middle" fontSize="10" fill="#c62828" fontWeight="bold">DMZ区 (VLAN 10)</text>
                    <text x="90" y="60" textAnchor="middle" fontSize="9" fill="#666">Web服务器</text>
                    <text x="90" y="75" textAnchor="middle" fontSize="9" fill="#666">仅开放80/443</text>
                    
                    {/* 业务区 */}
                    <rect x="180" y="20" width="140" height="80" rx="5" fill="#e8f5e9" stroke="#2e7d32" strokeWidth="2"/>
                    <text x="250" y="40" textAnchor="middle" fontSize="10" fill="#2e7d32" fontWeight="bold">业务区 (VLAN 20)</text>
                    <text x="250" y="60" textAnchor="middle" fontSize="9" fill="#666">应用服务器</text>
                    <text x="250" y="75" textAnchor="middle" fontSize="9" fill="#666">内部访问</text>
                    
                    {/* 数据区 */}
                    <rect x="340" y="20" width="140" height="80" rx="5" fill="#e3f2fd" stroke="#1976d2" strokeWidth="2"/>
                    <text x="410" y="40" textAnchor="middle" fontSize="10" fill="#1976d2" fontWeight="bold">数据区 (VLAN 30)</text>
                    <text x="410" y="60" textAnchor="middle" fontSize="9" fill="#666">Redis/MySQL</text>
                    <text x="410" y="75" textAnchor="middle" fontSize="9" fill="#666">仅业务区可访问</text>
                    
                    {/* 防火墙 */}
                    <rect x="100" y="130" width="300" height="35" rx="5" fill="#fff3e0" stroke="#f57c00" strokeWidth="2"/>
                    <text x="250" y="152" textAnchor="middle" fontSize="10" fill="#e65100" fontWeight="bold">核心防火墙 + ACL策略 + 微隔离</text>
                    
                    <line x1="90" y1="100" x2="90" y2="130" stroke="#666" strokeWidth="1"/>
                    <line x1="250" y1="100" x2="250" y2="130" stroke="#666" strokeWidth="1"/>
                    <line x1="410" y1="100" x2="410" y2="130" stroke="#666" strokeWidth="1"/>
                </svg>
            </div>
            <p className="text-center text-sm font-bold mb-4">图 6-2 分层VLAN安全架构图</p>
        </div>
    );
};
