import React from 'react';

export const NSIntro: React.FC = () => {
    return (
        <div id="ns-intro" className="page bg-white w-[210mm] min-h-[297mm] mx-auto shadow-lg mb-8 p-12 page-break">
            <h2 className="text-[18pt] font-hei mb-6 font-bold text-center">一、项目背景与需求分析</h2>

            <h3 className="text-[14pt] font-hei font-bold mt-6 mb-4">1.1 项目背景</h3>
            <p className="mb-4 indent-8 text-justify">
                随着企业信息化程度的不断提高，内网安全已成为网络安全防护的重中之重。企业内网通常部署了大量关键业务系统，
                一旦被攻击者突破边界防护进入内网，将面临数据泄露、业务中断等严重风险。本项目以Kali Linux为攻击平台，
                模拟外部攻击者穿透多层内网的攻击场景，通过实战演练深入理解内网渗透技术与防御策略。
            </p>
            <p className="mb-4 indent-8 text-justify">
                本次实验选择题目一"企业内网纵深渗透"，主要目标是利用Kali Linux工具链完成资产发现、漏洞利用、
                横向移动等攻击流程，并针对发现的安全问题提出基于分层VLAN与微隔离的修复方案。
            </p>

            <h3 className="text-[14pt] font-hei font-bold mt-6 mb-4">1.2 实验环境</h3>
            <div className="mb-4">
                <table className="w-full border-collapse border border-gray-400">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-gray-400 p-2 text-left">角色</th>
                            <th className="border border-gray-400 p-2 text-left">系统/服务</th>
                            <th className="border border-gray-400 p-2 text-left">IP地址</th>
                            <th className="border border-gray-400 p-2 text-left">说明</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border border-gray-400 p-2">攻击机</td>
                            <td className="border border-gray-400 p-2">Kali Linux 2024</td>
                            <td className="border border-gray-400 p-2">192.168.6.210</td>
                            <td className="border border-gray-400 p-2">渗透测试平台</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-400 p-2">Web服务器</td>
                            <td className="border border-gray-400 p-2">CentOS 7 + Apache + PHP</td>
                            <td className="border border-gray-400 p-2">192.168.6.208</td>
                            <td className="border border-gray-400 p-2">目标靶机</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <h3 className="text-[14pt] font-hei font-bold mt-6 mb-4">1.3 实验目标</h3>
            <p className="mb-4 indent-8 text-justify">
                根据题目要求，本次实验需要完成以下目标：
            </p>
            <ul className="list-decimal ml-12 mb-4 space-y-2">
                <li>使用Nmap、Masscan完成资产发现并绘制网络拓扑</li>
                <li>发现并利用目标系统漏洞，尝试获取服务器Shell</li>
                <li>全程记录流量与截图，编写可复现的攻击路径报告</li>
                <li>给出基于分层VLAN与微隔离的修复方案</li>
            </ul>

            <h3 className="text-[14pt] font-hei font-bold mt-6 mb-4">1.4 使用工具</h3>
            <div className="mb-4">
                <table className="w-full border-collapse border border-gray-400">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-gray-400 p-2 text-left">工具名称</th>
                            <th className="border border-gray-400 p-2 text-left">主要用途</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border border-gray-400 p-2">Nmap</td>
                            <td className="border border-gray-400 p-2">端口扫描、服务识别、漏洞检测</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-400 p-2">Dirb</td>
                            <td className="border border-gray-400 p-2">Web目录爆破</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-400 p-2">Nikto</td>
                            <td className="border border-gray-400 p-2">Web漏洞扫描</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-400 p-2">Redis-cli</td>
                            <td className="border border-gray-400 p-2">Redis数据库连接与利用</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-400 p-2">Hydra</td>
                            <td className="border border-gray-400 p-2">弱口令爆破</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-400 p-2">redis-rogue-server</td>
                            <td className="border border-gray-400 p-2">Redis主从复制RCE利用</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};
