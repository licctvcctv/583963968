import React from 'react';

// 一、项目背景
export const NS01_Background: React.FC = () => {
    return (
        <div id="ns-background" className="page bg-white w-[210mm] min-h-[297mm] mx-auto shadow-lg mb-8 p-12 page-break">
            <h2 className="text-[18pt] font-hei mb-6 font-bold">一、项目背景</h2>

            <p className="mb-4 indent-8 text-justify">
                随着企业信息化程度的不断提高，内网安全已成为网络安全防护的重中之重。企业内网通常部署了大量关键业务系统，
                包括Web服务器、数据库服务器、缓存服务器等，一旦被攻击者突破边界防护进入内网，将面临数据泄露、业务中断等严重风险。
            </p>

            <p className="mb-4 indent-8 text-justify">
                本项目选择"题目一：企业内网纵深渗透"作为期末大作业选题。项目以Kali Linux为攻击平台，
                模拟外部攻击者穿透多层内网的攻击场景，通过实战演练深入理解内网渗透技术与防御策略。
                项目要求使用Nmap、Masscan完成资产发现并绘制网络拓扑，利用发现的漏洞尝试获取服务器权限，
                全程记录流量与截图，编写可复现的攻击路径报告，并给出基于分层VLAN与微隔离的修复方案。
            </p>

            <p className="mb-4 indent-8 text-justify">
                渗透测试是一种主动的安全评估方法，通过模拟真实攻击者的行为，在授权范围内对目标系统进行安全测试。
                这种方法能够有效发现系统中存在的安全隐患，为安全加固提供依据。本项目通过完整的渗透测试流程，
                包括信息收集、漏洞发现、漏洞利用、权限维持等阶段，全面评估目标系统的安全状况。
            </p>

            <h3 className="text-[14pt] font-hei font-bold mt-6 mb-4">1.1 项目目的</h3>
            <ul className="list-decimal ml-12 mb-4 space-y-2">
                <li>巩固和加深对《网络安全综合实践》课程基本知识的理解和掌握</li>
                <li>通过攻防实战任务检验对Kali Linux工具链的熟练度与综合应用能力</li>
                <li>强化对课程所授漏洞原理、攻击路径及修复策略的系统性理解</li>
                <li>激发创新思维，通过自定义脚本或工具优化现有攻击/防御方案并验证其有效性</li>
            </ul>

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
                            <td className="border border-gray-400 p-2">靶机</td>
                            <td className="border border-gray-400 p-2">CentOS 7</td>
                            <td className="border border-gray-400 p-2">192.168.6.208</td>
                            <td className="border border-gray-400 p-2">目标服务器</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p className="text-center text-sm font-bold mb-4">表 1-1 实验环境配置</p>
        </div>
    );
};
