import React from 'react';

// 三、数据库设计（网络拓扑与资产设计）
export const NS03_Design: React.FC = () => {
    return (
        <div id="ns-design" className="page bg-white w-[210mm] min-h-[297mm] mx-auto shadow-lg mb-8 p-12 page-break">
            <h2 className="text-[18pt] font-hei mb-6 font-bold">三、数据库设计</h2>

            <p className="mb-4 indent-8 text-justify">
                本项目为渗透测试类项目，不涉及传统意义上的数据库设计。本章节主要描述目标网络的资产信息结构设计，
                包括网络拓扑结构、资产清单数据结构等。
            </p>

            <h3 className="text-[14pt] font-hei font-bold mt-6 mb-4">3.1 网络拓扑设计</h3>
            <p className="mb-4 indent-8 text-justify">
                通过Nmap扫描结果，绘制目标网络拓扑结构如下：
            </p>
            
            {/* 网络拓扑图 */}
            <div className="my-6 p-4 border border-gray-300 rounded capture-as-image bg-white">
                <svg viewBox="0 0 600 320" className="w-full h-auto">
                    <rect width="600" height="320" fill="#f8f9fa"/>
                    
                    {/* 互联网云 */}
                    <ellipse cx="300" cy="35" rx="70" ry="22" fill="#e3f2fd" stroke="#1976d2" strokeWidth="2"/>
                    <text x="300" y="40" textAnchor="middle" fontSize="11" fill="#1976d2">互联网</text>
                    
                    {/* 路由器 */}
                    <rect x="260" y="80" width="80" height="35" rx="5" fill="#fff3e0" stroke="#f57c00" strokeWidth="2"/>
                    <text x="300" y="102" textAnchor="middle" fontSize="10" fill="#e65100">路由器</text>
                    <text x="300" y="128" textAnchor="middle" fontSize="9" fill="#666">192.168.6.1</text>
                    
                    <line x1="300" y1="57" x2="300" y2="80" stroke="#666" strokeWidth="2"/>
                    
                    {/* 内网区域框 */}
                    <rect x="30" y="150" width="540" height="150" rx="10" fill="none" stroke="#4caf50" strokeWidth="2" strokeDasharray="5,5"/>
                    <text x="50" y="170" fontSize="11" fill="#4caf50" fontWeight="bold">内网区域 (192.168.6.0/24)</text>
                    
                    <line x1="300" y1="115" x2="300" y2="150" stroke="#666" strokeWidth="2"/>
                    
                    {/* 攻击机 Kali */}
                    <rect x="60" y="200" width="100" height="55" rx="5" fill="#ffebee" stroke="#c62828" strokeWidth="2"/>
                    <text x="110" y="222" textAnchor="middle" fontSize="10" fill="#c62828" fontWeight="bold">Kali Linux</text>
                    <text x="110" y="236" textAnchor="middle" fontSize="9" fill="#666">攻击机</text>
                    <text x="110" y="250" textAnchor="middle" fontSize="9" fill="#666">192.168.6.210</text>
                    
                    {/* 目标服务器 */}
                    <rect x="250" y="200" width="100" height="55" rx="5" fill="#e8f5e9" stroke="#2e7d32" strokeWidth="2"/>
                    <text x="300" y="218" textAnchor="middle" fontSize="10" fill="#2e7d32" fontWeight="bold">Web服务器</text>
                    <text x="300" y="232" textAnchor="middle" fontSize="9" fill="#666">CentOS 7</text>
                    <text x="300" y="246" textAnchor="middle" fontSize="9" fill="#666">192.168.6.208</text>
                    
                    {/* 服务标签 */}
                    <rect x="440" y="185" width="120" height="90" rx="5" fill="#fff" stroke="#666" strokeWidth="1"/>
                    <text x="500" y="205" textAnchor="middle" fontSize="10" fill="#333" fontWeight="bold">开放服务</text>
                    <text x="500" y="222" textAnchor="middle" fontSize="9" fill="#666">22/tcp - SSH</text>
                    <text x="500" y="237" textAnchor="middle" fontSize="9" fill="#666">80/tcp - HTTP</text>
                    <text x="500" y="252" textAnchor="middle" fontSize="9" fill="#666">3306/tcp - MySQL</text>
                    <text x="500" y="267" textAnchor="middle" fontSize="9" fill="#c62828">6379/tcp - Redis ⚠</text>
                    
                    <line x1="160" y1="227" x2="250" y2="227" stroke="#c62828" strokeWidth="2" strokeDasharray="5,5"/>
                    <text x="205" y="218" textAnchor="middle" fontSize="9" fill="#c62828">攻击路径</text>
                    
                    <line x1="350" y1="227" x2="440" y2="227" stroke="#666" strokeWidth="1"/>
                </svg>
            </div>
            <p className="text-center text-sm font-bold mb-4">图 3-1 目标网络拓扑结构图</p>

            <h3 className="text-[14pt] font-hei font-bold mt-6 mb-4">3.2 资产数据结构</h3>
            <p className="mb-4 indent-8 text-justify">
                资产信息采用结构化方式存储，数据结构设计如下：
            </p>
            <div className="bg-gray-100 p-4 rounded font-mono text-xs mb-4">
                <pre>{`// 资产信息数据结构
{
  "target": {
    "ip": "192.168.6.208",
    "hostname": "centos7-server",
    "os": "Linux 3.10.0-1160.119.1.el7.x86_64",
    "services": [
      {"port": 22, "protocol": "tcp", "service": "ssh", "version": "OpenSSH 7.4"},
      {"port": 80, "protocol": "tcp", "service": "http", "version": "Apache 2.4.6"},
      {"port": 3306, "protocol": "tcp", "service": "mysql", "version": "MariaDB"},
      {"port": 6379, "protocol": "tcp", "service": "redis", "version": "7.0.2"}
    ],
    "vulnerabilities": [
      {"name": "Redis未授权访问", "severity": "high", "cvss": 9.8},
      {"name": "phpinfo信息泄露", "severity": "medium", "cvss": 5.3}
    ]
  }
}`}</pre>
            </div>
            <p className="text-center text-sm font-bold mb-4">图 3-2 资产信息数据结构</p>
        </div>
    );
};
