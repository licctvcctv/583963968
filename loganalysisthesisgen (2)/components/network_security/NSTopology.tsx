import React from 'react';

// 网络拓扑图组件
export const NSTopology: React.FC = () => {
    return (
        <div id="ns-topology" className="page bg-white w-[210mm] min-h-[297mm] mx-auto shadow-lg mb-8 p-12 page-break">
            <h2 className="text-[18pt] font-hei mb-6 font-bold text-center">二、资产发现与网络拓扑</h2>

            <h3 className="text-[14pt] font-hei font-bold mt-6 mb-4">2.1 网络拓扑图</h3>
            <p className="mb-4 indent-8 text-justify">
                通过Nmap扫描结果，绘制目标网络拓扑结构如下：
            </p>
            
            {/* 网络拓扑图 */}
            <div className="my-6 p-4 border border-gray-300 rounded capture-as-image bg-white">
                <svg viewBox="0 0 600 350" className="w-full h-auto">
                    {/* 背景 */}
                    <rect width="600" height="350" fill="#f8f9fa"/>
                    
                    {/* 互联网云 */}
                    <ellipse cx="300" cy="40" rx="80" ry="25" fill="#e3f2fd" stroke="#1976d2" strokeWidth="2"/>
                    <text x="300" y="45" textAnchor="middle" fontSize="12" fill="#1976d2">互联网</text>
                    
                    {/* 路由器 */}
                    <rect x="260" y="90" width="80" height="40" rx="5" fill="#fff3e0" stroke="#f57c00" strokeWidth="2"/>
                    <text x="300" y="115" textAnchor="middle" fontSize="11" fill="#e65100">路由器</text>
                    <text x="300" y="145" textAnchor="middle" fontSize="9" fill="#666">192.168.6.1</text>
                    
                    {/* 连接线 - 互联网到路由器 */}
                    <line x1="300" y1="65" x2="300" y2="90" stroke="#666" strokeWidth="2"/>
                    
                    {/* 内网区域框 */}
                    <rect x="30" y="170" width="540" height="160" rx="10" fill="none" stroke="#4caf50" strokeWidth="2" strokeDasharray="5,5"/>
                    <text x="50" y="190" fontSize="12" fill="#4caf50" fontWeight="bold">内网区域 (192.168.6.0/24)</text>
                    
                    {/* 连接线 - 路由器到内网 */}
                    <line x1="300" y1="130" x2="300" y2="170" stroke="#666" strokeWidth="2"/>
                    
                    {/* 攻击机 Kali */}
                    <rect x="60" y="220" width="100" height="60" rx="5" fill="#ffebee" stroke="#c62828" strokeWidth="2"/>
                    <text x="110" y="245" textAnchor="middle" fontSize="11" fill="#c62828" fontWeight="bold">Kali Linux</text>
                    <text x="110" y="260" textAnchor="middle" fontSize="9" fill="#666">攻击机</text>
                    <text x="110" y="275" textAnchor="middle" fontSize="9" fill="#666">192.168.6.210</text>
                    
                    {/* 目标服务器 */}
                    <rect x="250" y="220" width="100" height="60" rx="5" fill="#e8f5e9" stroke="#2e7d32" strokeWidth="2"/>
                    <text x="300" y="240" textAnchor="middle" fontSize="11" fill="#2e7d32" fontWeight="bold">Web服务器</text>
                    <text x="300" y="255" textAnchor="middle" fontSize="9" fill="#666">CentOS 7</text>
                    <text x="300" y="270" textAnchor="middle" fontSize="9" fill="#666">192.168.6.208</text>
                    
                    {/* 服务标签 */}
                    <rect x="440" y="200" width="120" height="100" rx="5" fill="#fff" stroke="#666" strokeWidth="1"/>
                    <text x="500" y="220" textAnchor="middle" fontSize="10" fill="#333" fontWeight="bold">开放服务</text>
                    <text x="500" y="240" textAnchor="middle" fontSize="9" fill="#666">22/tcp - SSH</text>
                    <text x="500" y="255" textAnchor="middle" fontSize="9" fill="#666">80/tcp - HTTP</text>
                    <text x="500" y="270" textAnchor="middle" fontSize="9" fill="#666">3306/tcp - MySQL</text>
                    <text x="500" y="285" textAnchor="middle" fontSize="9" fill="#c62828">6379/tcp - Redis ⚠</text>
                    
                    {/* 连接线 */}
                    <line x1="160" y1="250" x2="250" y2="250" stroke="#c62828" strokeWidth="2" strokeDasharray="5,5"/>
                    <text x="205" y="240" textAnchor="middle" fontSize="9" fill="#c62828">攻击路径</text>
                    
                    <line x1="350" y1="250" x2="440" y2="250" stroke="#666" strokeWidth="1"/>
                </svg>
            </div>
            <p className="text-center text-sm font-bold mb-4">图 2-1 目标网络拓扑结构图</p>

            <h3 className="text-[14pt] font-hei font-bold mt-6 mb-4">2.2 资产清单</h3>
            <p className="mb-4 indent-8 text-justify">
                通过资产发现扫描，整理目标网络资产清单如下：
            </p>
            <div className="mb-4">
                <table className="w-full border-collapse border border-gray-400">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-gray-400 p-2 text-left">IP地址</th>
                            <th className="border border-gray-400 p-2 text-left">端口</th>
                            <th className="border border-gray-400 p-2 text-left">服务</th>
                            <th className="border border-gray-400 p-2 text-left">版本</th>
                            <th className="border border-gray-400 p-2 text-left">风险</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border border-gray-400 p-2" rowSpan={4}>192.168.6.208</td>
                            <td className="border border-gray-400 p-2">22/tcp</td>
                            <td className="border border-gray-400 p-2">SSH</td>
                            <td className="border border-gray-400 p-2">OpenSSH 7.4</td>
                            <td className="border border-gray-400 p-2 text-green-600">低</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-400 p-2">80/tcp</td>
                            <td className="border border-gray-400 p-2">HTTP</td>
                            <td className="border border-gray-400 p-2">Apache 2.4.6 + PHP 7.2.34</td>
                            <td className="border border-gray-400 p-2 text-yellow-600">中</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-400 p-2">3306/tcp</td>
                            <td className="border border-gray-400 p-2">MySQL</td>
                            <td className="border border-gray-400 p-2">MariaDB</td>
                            <td className="border border-gray-400 p-2 text-green-600">低</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-400 p-2">6379/tcp</td>
                            <td className="border border-gray-400 p-2">Redis</td>
                            <td className="border border-gray-400 p-2">Redis 7.0.2</td>
                            <td className="border border-gray-400 p-2 text-red-600 font-bold">高危</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p className="text-center text-sm font-bold mb-4">表 2-1 目标资产清单</p>
        </div>
    );
};
