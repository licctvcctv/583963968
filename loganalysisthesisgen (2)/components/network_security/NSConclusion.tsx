import React from 'react';

export const NSConclusion: React.FC = () => {
    return (
        <>
            <div id="ns-conclusion" className="page bg-white w-[210mm] min-h-[297mm] mx-auto shadow-lg mb-8 p-12 page-break">
                <h2 className="text-[18pt] font-hei mb-6 font-bold text-center">四、漏洞分析与攻击路径</h2>

                <h3 className="text-[14pt] font-hei font-bold mt-6 mb-4">4.1 发现的漏洞汇总</h3>
                <div className="mb-4">
                    <table className="w-full border-collapse border border-gray-400">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-gray-400 p-2 text-left">漏洞名称</th>
                                <th className="border border-gray-400 p-2 text-left">危险等级</th>
                                <th className="border border-gray-400 p-2 text-left">影响描述</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border border-gray-400 p-2">Redis未授权访问</td>
                                <td className="border border-gray-400 p-2 text-red-600 font-bold">高危</td>
                                <td className="border border-gray-400 p-2">可读取/写入数据，旧版本可导致RCE</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-400 p-2">phpinfo信息泄露</td>
                                <td className="border border-gray-400 p-2 text-yellow-600 font-bold">中危</td>
                                <td className="border border-gray-400 p-2">泄露服务器配置、路径等敏感信息</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-400 p-2">allow_url_include开启</td>
                                <td className="border border-gray-400 p-2 text-red-600 font-bold">高危</td>
                                <td className="border border-gray-400 p-2">可能导致远程文件包含漏洞</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-400 p-2">HTTP TRACE开启</td>
                                <td className="border border-gray-400 p-2 text-blue-600 font-bold">低危</td>
                                <td className="border border-gray-400 p-2">可能导致XST跨站追踪攻击</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-400 p-2">软件版本过旧</td>
                                <td className="border border-gray-400 p-2 text-yellow-600 font-bold">中危</td>
                                <td className="border border-gray-400 p-2">Apache和PHP版本过旧，存在已知漏洞</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p className="text-center text-sm font-bold mb-4">表 4-1 漏洞汇总清单</p>

                <h3 className="text-[14pt] font-hei font-bold mt-6 mb-4">4.2 攻击路径分析</h3>
                <p className="mb-4 indent-8 text-justify">
                    基于发现的漏洞，整理可行的攻击路径如下：
                </p>
                
                {/* 攻击路径图 */}
                <div className="my-4 p-4 border border-gray-300 rounded capture-as-image bg-white">
                    <svg viewBox="0 0 550 200" className="w-full h-auto">
                        <rect width="550" height="200" fill="#fafafa"/>
                        
                        {/* 步骤1 */}
                        <rect x="20" y="80" width="90" height="50" rx="5" fill="#e3f2fd" stroke="#1976d2" strokeWidth="2"/>
                        <text x="65" y="100" textAnchor="middle" fontSize="10" fill="#1976d2">1.信息收集</text>
                        <text x="65" y="115" textAnchor="middle" fontSize="8" fill="#666">Nmap扫描</text>
                        
                        {/* 箭头1 */}
                        <path d="M110 105 L130 105" stroke="#666" strokeWidth="2" markerEnd="url(#arrow)"/>
                        
                        {/* 步骤2 */}
                        <rect x="130" y="80" width="90" height="50" rx="5" fill="#fff3e0" stroke="#f57c00" strokeWidth="2"/>
                        <text x="175" y="100" textAnchor="middle" fontSize="10" fill="#e65100">2.漏洞发现</text>
                        <text x="175" y="115" textAnchor="middle" fontSize="8" fill="#666">Redis未授权</text>
                        
                        {/* 箭头2 */}
                        <path d="M220 105 L240 105" stroke="#666" strokeWidth="2" markerEnd="url(#arrow)"/>
                        
                        {/* 步骤3 */}
                        <rect x="240" y="80" width="90" height="50" rx="5" fill="#ffebee" stroke="#c62828" strokeWidth="2"/>
                        <text x="285" y="100" textAnchor="middle" fontSize="10" fill="#c62828">3.漏洞利用</text>
                        <text x="285" y="115" textAnchor="middle" fontSize="8" fill="#666">主从复制RCE</text>
                        
                        {/* 箭头3 */}
                        <path d="M330 105 L350 105" stroke="#666" strokeWidth="2" markerEnd="url(#arrow)"/>
                        
                        {/* 步骤4 */}
                        <rect x="350" y="80" width="90" height="50" rx="5" fill="#e8f5e9" stroke="#2e7d32" strokeWidth="2"/>
                        <text x="395" y="100" textAnchor="middle" fontSize="10" fill="#2e7d32">4.权限获取</text>
                        <text x="395" y="115" textAnchor="middle" fontSize="8" fill="#666">获取Shell</text>
                        
                        {/* 箭头4 */}
                        <path d="M440 105 L460 105" stroke="#666" strokeWidth="2" markerEnd="url(#arrow)"/>
                        
                        {/* 步骤5 */}
                        <rect x="460" y="80" width="70" height="50" rx="5" fill="#f3e5f5" stroke="#7b1fa2" strokeWidth="2"/>
                        <text x="495" y="100" textAnchor="middle" fontSize="10" fill="#7b1fa2">5.横向</text>
                        <text x="495" y="115" textAnchor="middle" fontSize="8" fill="#666">移动</text>
                        
                        {/* 箭头定义 */}
                        <defs>
                            <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                                <path d="M0,0 L0,6 L9,3 z" fill="#666"/>
                            </marker>
                        </defs>
                        
                        {/* 说明文字 */}
                        <text x="275" y="170" textAnchor="middle" fontSize="11" fill="#333">攻击链路：信息收集 → 漏洞发现 → 漏洞利用 → 权限获取 → 横向移动</text>
                    </svg>
                </div>
                <p className="text-center text-sm font-bold mb-4">图 4-1 攻击路径流程图</p>

                <h3 className="text-[14pt] font-hei font-bold mt-6 mb-4">4.3 攻击结果分析</h3>
                <p className="mb-4 indent-8 text-justify">
                    本次渗透测试中，成功发现了Redis未授权访问漏洞。虽然由于目标Redis版本（7.0.2）较新，
                    已修复了CONFIG SET相关的安全漏洞，无法直接通过写入文件获取Shell，但该漏洞仍然存在以下风险：
                </p>
                <ul className="list-disc ml-12 mb-4 space-y-2">
                    <li>可以读取Redis中存储的敏感数据</li>
                    <li>可以删除或篡改缓存数据，影响业务正常运行</li>
                    <li>可以作为跳板进行内网信息收集</li>
                    <li>如果Redis版本降级或配置不当，可能导致RCE</li>
                </ul>
            </div>

            <div className="page bg-white w-[210mm] min-h-[297mm] mx-auto shadow-lg mb-8 p-12 page-break">
                <h2 className="text-[18pt] font-hei mb-6 font-bold text-center">五、安全加固方案</h2>

                <h3 className="text-[14pt] font-hei font-bold mt-6 mb-4">5.1 基于分层VLAN的网络隔离方案</h3>
                <p className="mb-4 indent-8 text-justify">
                    针对发现的安全问题，建议采用分层VLAN架构进行网络隔离：
                </p>
                
                {/* VLAN架构图 */}
                <div className="my-4 p-4 border border-gray-300 rounded capture-as-image bg-white">
                    <svg viewBox="0 0 500 280" className="w-full h-auto">
                        <rect width="500" height="280" fill="#fafafa"/>
                        
                        {/* DMZ区 */}
                        <rect x="20" y="20" width="140" height="100" rx="5" fill="#ffebee" stroke="#c62828" strokeWidth="2"/>
                        <text x="90" y="40" textAnchor="middle" fontSize="11" fill="#c62828" fontWeight="bold">DMZ区 (VLAN 10)</text>
                        <rect x="40" y="55" width="100" height="25" rx="3" fill="#fff" stroke="#666"/>
                        <text x="90" y="72" textAnchor="middle" fontSize="9">Web服务器</text>
                        <rect x="40" y="85" width="100" height="25" rx="3" fill="#fff" stroke="#666"/>
                        <text x="90" y="102" textAnchor="middle" fontSize="9">邮件服务器</text>
                        
                        {/* 业务区 */}
                        <rect x="180" y="20" width="140" height="100" rx="5" fill="#e8f5e9" stroke="#2e7d32" strokeWidth="2"/>
                        <text x="250" y="40" textAnchor="middle" fontSize="11" fill="#2e7d32" fontWeight="bold">业务区 (VLAN 20)</text>
                        <rect x="200" y="55" width="100" height="25" rx="3" fill="#fff" stroke="#666"/>
                        <text x="250" y="72" textAnchor="middle" fontSize="9">应用服务器</text>
                        <rect x="200" y="85" width="100" height="25" rx="3" fill="#fff" stroke="#666"/>
                        <text x="250" y="102" textAnchor="middle" fontSize="9">缓存服务器</text>
                        
                        {/* 数据区 */}
                        <rect x="340" y="20" width="140" height="100" rx="5" fill="#e3f2fd" stroke="#1976d2" strokeWidth="2"/>
                        <text x="410" y="40" textAnchor="middle" fontSize="11" fill="#1976d2" fontWeight="bold">数据区 (VLAN 30)</text>
                        <rect x="360" y="55" width="100" height="25" rx="3" fill="#fff" stroke="#666"/>
                        <text x="410" y="72" textAnchor="middle" fontSize="9">数据库服务器</text>
                        <rect x="360" y="85" width="100" height="25" rx="3" fill="#fff" stroke="#666"/>
                        <text x="410" y="102" textAnchor="middle" fontSize="9">存储服务器</text>
                        
                        {/* 防火墙 */}
                        <rect x="150" y="150" width="200" height="40" rx="5" fill="#fff3e0" stroke="#f57c00" strokeWidth="2"/>
                        <text x="250" y="175" textAnchor="middle" fontSize="11" fill="#e65100" fontWeight="bold">核心防火墙 + ACL策略</text>
                        
                        {/* 连接线 */}
                        <line x1="90" y1="120" x2="90" y2="150" stroke="#666" strokeWidth="1"/>
                        <line x1="90" y1="150" x2="150" y2="150" stroke="#666" strokeWidth="1"/>
                        <line x1="250" y1="120" x2="250" y2="150" stroke="#666" strokeWidth="1"/>
                        <line x1="410" y1="120" x2="410" y2="150" stroke="#666" strokeWidth="1"/>
                        <line x1="350" y1="150" x2="410" y2="150" stroke="#666" strokeWidth="1"/>
                        
                        {/* 管理区 */}
                        <rect x="180" y="220" width="140" height="50" rx="5" fill="#f3e5f5" stroke="#7b1fa2" strokeWidth="2"/>
                        <text x="250" y="245" textAnchor="middle" fontSize="11" fill="#7b1fa2" fontWeight="bold">管理区 (VLAN 99)</text>
                        <text x="250" y="260" textAnchor="middle" fontSize="9" fill="#666">运维管理终端</text>
                        
                        <line x1="250" y1="190" x2="250" y2="220" stroke="#666" strokeWidth="1"/>
                    </svg>
                </div>
                <p className="text-center text-sm font-bold mb-4">图 5-1 分层VLAN网络架构图</p>

                <h3 className="text-[14pt] font-hei font-bold mt-6 mb-4">5.2 微隔离策略</h3>
                <p className="mb-4 indent-8 text-justify">
                    在VLAN隔离的基础上，实施微隔离策略，精细化控制服务间的访问权限：
                </p>
                <div className="mb-4">
                    <table className="w-full border-collapse border border-gray-400 text-sm">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-gray-400 p-2">源区域</th>
                                <th className="border border-gray-400 p-2">目标区域</th>
                                <th className="border border-gray-400 p-2">允许端口</th>
                                <th className="border border-gray-400 p-2">策略</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border border-gray-400 p-2">DMZ</td>
                                <td className="border border-gray-400 p-2">业务区</td>
                                <td className="border border-gray-400 p-2">8080/tcp</td>
                                <td className="border border-gray-400 p-2 text-green-600">允许</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-400 p-2">业务区</td>
                                <td className="border border-gray-400 p-2">数据区</td>
                                <td className="border border-gray-400 p-2">3306,6379/tcp</td>
                                <td className="border border-gray-400 p-2 text-green-600">允许</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-400 p-2">DMZ</td>
                                <td className="border border-gray-400 p-2">数据区</td>
                                <td className="border border-gray-400 p-2">*</td>
                                <td className="border border-gray-400 p-2 text-red-600">拒绝</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-400 p-2">管理区</td>
                                <td className="border border-gray-400 p-2">所有区域</td>
                                <td className="border border-gray-400 p-2">22/tcp</td>
                                <td className="border border-gray-400 p-2 text-green-600">允许</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p className="text-center text-sm font-bold mb-4">表 5-1 微隔离访问控制策略</p>
            </div>

            <div className="page bg-white w-[210mm] min-h-[297mm] mx-auto shadow-lg mb-8 p-12 page-break">
                <h3 className="text-[14pt] font-hei font-bold mt-6 mb-4">5.3 具体加固措施</h3>

                <h4 className="text-[12pt] font-hei font-bold mt-4 mb-2">5.3.1 Redis安全加固</h4>
                <div className="bg-gray-100 p-4 rounded font-mono text-xs mb-4">
                    <pre>{`# /etc/redis/redis.conf

# 1. 绑定本地地址，禁止外网访问
bind 127.0.0.1

# 2. 设置强密码认证
requirepass Your_Str0ng_P@ssw0rd_Here!

# 3. 禁用危险命令
rename-command FLUSHALL ""
rename-command FLUSHDB ""
rename-command CONFIG ""
rename-command EVAL ""
rename-command DEBUG ""
rename-command SHUTDOWN ""

# 4. 开启保护模式
protected-mode yes

# 5. 以低权限用户运行
# useradd -r -s /bin/false redis
# chown redis:redis /var/lib/redis`}</pre>
                </div>

                <h4 className="text-[12pt] font-hei font-bold mt-4 mb-2">5.3.2 Web服务器加固</h4>
                <div className="bg-gray-100 p-4 rounded font-mono text-xs mb-4">
                    <pre>{`# /etc/httpd/conf/httpd.conf

# 1. 禁用TRACE方法
TraceEnable off

# 2. 隐藏版本信息
ServerTokens Prod
ServerSignature Off

# 3. 添加安全响应头
Header always set X-Frame-Options "SAMEORIGIN"
Header always set X-Content-Type-Options "nosniff"
Header always set X-XSS-Protection "1; mode=block"
Header always set Content-Security-Policy "default-src 'self'"

# 4. 删除敏感文件
rm -f /var/www/html/phpinfo.php`}</pre>
                </div>

                <h4 className="text-[12pt] font-hei font-bold mt-4 mb-2">5.3.3 PHP安全配置</h4>
                <div className="bg-gray-100 p-4 rounded font-mono text-xs mb-4">
                    <pre>{`# /etc/php.ini

# 1. 禁用危险函数
disable_functions = exec,passthru,shell_exec,system,
    proc_open,popen,curl_exec,curl_multi_exec,
    parse_ini_file,show_source,eval

# 2. 禁用远程文件包含
allow_url_include = Off
allow_url_fopen = Off

# 3. 隐藏PHP版本
expose_php = Off

# 4. 限制上传文件大小
upload_max_filesize = 2M
post_max_size = 8M`}</pre>
                </div>
            </div>

            <div className="page bg-white w-[210mm] min-h-[297mm] mx-auto shadow-lg mb-8 p-12 page-break">
                <h2 className="text-[18pt] font-hei mb-6 font-bold text-center">六、课程实训总结</h2>

                <h3 className="text-[14pt] font-hei font-bold mt-6 mb-4">6.1 项目中用到的知识点</h3>
                <ul className="list-decimal ml-12 mb-4 space-y-2">
                    <li>Nmap端口扫描与服务识别技术</li>
                    <li>Web目录爆破与漏洞扫描方法</li>
                    <li>Redis未授权访问漏洞原理与利用</li>
                    <li>渗透测试方法论（信息收集→漏洞发现→漏洞利用→报告）</li>
                    <li>网络拓扑绘制与资产管理</li>
                    <li>分层VLAN与微隔离安全架构设计</li>
                    <li>安全加固最佳实践</li>
                </ul>

                <h3 className="text-[14pt] font-hei font-bold mt-6 mb-4">6.2 遇到的问题与解决方法</h3>
                <p className="mb-4 indent-8 text-justify">
                    <strong>问题1：</strong>Redis主从复制RCE利用失败
                </p>
                <p className="mb-4 indent-8 text-justify">
                    <strong>原因分析：</strong>Redis 7.0版本增加了保护机制，禁止通过CONFIG SET修改dir和dbfilename参数，
                    有效防止了传统的文件写入攻击。
                </p>
                <p className="mb-4 indent-8 text-justify">
                    <strong>解决思路：</strong>尝试使用Redis模块加载方式进行攻击，但由于版本兼容性问题未能成功。
                    这说明及时更新软件版本是有效的安全防护措施。
                </p>

                <h3 className="text-[14pt] font-hei font-bold mt-6 mb-4">6.3 收获与建议</h3>
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
                </ul>

                <h2 className="text-[16pt] font-hei mb-4 font-bold mt-8">参考文献</h2>
                <div className="space-y-2 text-sm">
                    <p>[1] 王佳亮. Kali Linux渗透测试全流程详解[M]. 人民邮电出版社, 2023.</p>
                    <p>[2] 维杰·库马尔·维卢. Kali Linux高级渗透测试[M]. 机械工业出版社.</p>
                    <p>[3] Nmap官方文档. https://nmap.org/docs.html</p>
                    <p>[4] Redis安全配置指南. https://redis.io/docs/management/security/</p>
                    <p>[5] OWASP Testing Guide. https://owasp.org/www-project-web-security-testing-guide/</p>
                </div>
            </div>
        </>
    );
};
