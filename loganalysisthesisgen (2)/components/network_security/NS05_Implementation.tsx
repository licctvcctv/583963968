import React from 'react';

// 五、系统实现（核心功能代码）
export const NS05_Implementation: React.FC = () => {
    const scanScript = `#!/bin/bash
# auto_scan.sh - 自动化渗透测试扫描脚本
# 作者: [学生姓名]
# 日期: 2025-12-29

TARGET=\$1
OUTPUT_DIR="./scan_results"

if [ -z "\$TARGET" ]; then
    echo "Usage: \$0 <target_ip>"
    exit 1
fi

mkdir -p \$OUTPUT_DIR

echo "[*] Starting reconnaissance on \$TARGET"
echo "[*] Output directory: \$OUTPUT_DIR"

# 1. 主机发现
echo "[+] Phase 1: Host Discovery"
nmap -sn \$TARGET -oN \$OUTPUT_DIR/host_discovery.txt

# 2. 端口扫描
echo "[+] Phase 2: Port Scanning"
nmap -sV -sC -Pn \$TARGET -oN \$OUTPUT_DIR/port_scan.txt

# 3. 全端口扫描
echo "[+] Phase 3: Full Port Scan"
nmap -p- --min-rate 5000 \$TARGET -oN \$OUTPUT_DIR/full_port_scan.txt

# 4. 漏洞扫描
echo "[+] Phase 4: Vulnerability Scanning"
nmap --script=vuln \$TARGET -oN \$OUTPUT_DIR/vuln_scan.txt

# 5. Web目录扫描
echo "[+] Phase 5: Web Directory Scanning"
dirb http://\$TARGET/ /usr/share/wordlists/dirb/common.txt \\
    -o \$OUTPUT_DIR/dirb_scan.txt

# 6. Nikto扫描
echo "[+] Phase 6: Nikto Scanning"
nikto -h http://\$TARGET/ -o \$OUTPUT_DIR/nikto_scan.txt

echo "[*] Scan completed! Results saved to \$OUTPUT_DIR"`;

    const redisScript = `#!/usr/bin/env python3
# redis_check.py - Redis未授权访问检测脚本
# 作者: [学生姓名]

import socket
import sys

def check_redis_unauth(host, port=6379, timeout=5):
    """检测Redis未授权访问漏洞"""
    try:
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        sock.settimeout(timeout)
        sock.connect((host, port))
        
        # 发送PING命令
        sock.send(b"PING\\r\\n")
        response = sock.recv(1024).decode()
        
        if "+PONG" in response:
            print(f"[!] VULNERABLE: Redis unauthorized access on {host}:{port}")
            
            # 获取服务器信息
            sock.send(b"INFO server\\r\\n")
            info = sock.recv(4096).decode()
            
            # 解析版本信息
            for line in info.split("\\n"):
                if "redis_version" in line:
                    version = line.split(":")[1].strip()
                    print(f"[*] Redis Version: {version}")
                elif "os:" in line:
                    os_info = line.split(":")[1].strip()
                    print(f"[*] OS: {os_info}")
            
            return True
        else:
            print(f"[-] Redis on {host}:{port} requires authentication")
            return False
            
    except socket.timeout:
        print(f"[-] Connection timeout to {host}:{port}")
        return False
    except ConnectionRefusedError:
        print(f"[-] Connection refused to {host}:{port}")
        return False
    except Exception as e:
        print(f"[-] Error: {e}")
        return False
    finally:
        sock.close()

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(f"Usage: {sys.argv[0]} <target_ip> [port]")
        sys.exit(1)
    
    target = sys.argv[1]
    port = int(sys.argv[2]) if len(sys.argv) > 2 else 6379
    
    check_redis_unauth(target, port)`;

    const hardenScript = `#!/bin/bash
# security_hardening.sh - 安全加固脚本
# 作者: [学生姓名]

echo "=========================================="
echo "Security Hardening Script"
echo "=========================================="

# 1. Redis安全加固
echo "[+] Hardening Redis..."
REDIS_CONF="/etc/redis/redis.conf"

if [ -f "\$REDIS_CONF" ]; then
    # 备份原配置
    cp \$REDIS_CONF \${REDIS_CONF}.bak
    
    # 绑定本地地址
    sed -i 's/^bind .*/bind 127.0.0.1/' \$REDIS_CONF
    
    # 设置密码
    REDIS_PASS=\$(openssl rand -base64 32)
    echo "requirepass \$REDIS_PASS" >> \$REDIS_CONF
    echo "[*] Redis password set to: \$REDIS_PASS"
    
    # 禁用危险命令
    echo 'rename-command FLUSHALL ""' >> \$REDIS_CONF
    echo 'rename-command CONFIG ""' >> \$REDIS_CONF
    
    # 重启Redis
    systemctl restart redis
    echo "[*] Redis hardening completed"
fi

# 2. Apache安全加固
echo "[+] Hardening Apache..."
HTTPD_CONF="/etc/httpd/conf/httpd.conf"

if [ -f "\$HTTPD_CONF" ]; then
    cp \$HTTPD_CONF \${HTTPD_CONF}.bak
    
    # 禁用TRACE方法
    echo "TraceEnable off" >> \$HTTPD_CONF
    
    # 隐藏版本信息
    echo "ServerTokens Prod" >> \$HTTPD_CONF
    echo "ServerSignature Off" >> \$HTTPD_CONF
    
    systemctl restart httpd
    echo "[*] Apache hardening completed"
fi

# 3. 删除敏感文件
echo "[+] Removing sensitive files..."
rm -f /var/www/html/phpinfo.php
echo "[*] Sensitive files removed"

echo "=========================================="
echo "Security hardening completed!"
echo "=========================================="`;

    return (
        <>
            <div id="ns-impl" className="page bg-white w-[210mm] min-h-[297mm] mx-auto shadow-lg mb-8 p-12 page-break">
                <h2 className="text-[18pt] font-hei mb-6 font-bold">五、系统实现</h2>

                <h3 className="text-[14pt] font-hei font-bold mt-6 mb-4">5.1 自动化扫描脚本</h3>
                <p className="mb-4 indent-8 text-justify">
                    为提高渗透测试效率，编写了自动化扫描脚本，整合Nmap、Dirb等工具：
                </p>
                <div className="bg-gray-100 p-4 rounded font-mono text-xs mb-4 overflow-x-auto">
                    <pre>{scanScript}</pre>
                </div>
                <p className="text-center text-sm font-bold mb-4">代码 5-1 自动化扫描脚本 auto_scan.sh</p>

                <h3 className="text-[14pt] font-hei font-bold mt-6 mb-4">5.2 Redis漏洞检测脚本</h3>
                <p className="mb-4 indent-8 text-justify">
                    编写Python脚本自动检测Redis未授权访问漏洞：
                </p>
                <div className="bg-gray-100 p-4 rounded font-mono text-xs mb-4 overflow-x-auto">
                    <pre>{redisScript}</pre>
                </div>
                <p className="text-center text-sm font-bold mb-4">代码 5-2 Redis漏洞检测脚本 redis_check.py</p>
            </div>

            <div className="page bg-white w-[210mm] min-h-[297mm] mx-auto shadow-lg mb-8 p-12 page-break">
                <h3 className="text-[14pt] font-hei font-bold mt-6 mb-4">5.3 安全加固脚本</h3>
                <p className="mb-4 indent-8 text-justify">
                    编写自动化安全加固脚本，用于修复发现的安全问题：
                </p>
                <div className="bg-gray-100 p-4 rounded font-mono text-xs mb-4 overflow-x-auto">
                    <pre>{hardenScript}</pre>
                </div>
                <p className="text-center text-sm font-bold mb-4">代码 5-3 安全加固脚本 security_hardening.sh</p>
            </div>
        </>
    );
};
