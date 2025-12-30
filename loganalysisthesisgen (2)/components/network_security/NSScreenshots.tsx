import React from 'react';

export const NSScreenshots: React.FC = () => {
    return (
        <div id="ns-screenshots" className="page bg-white w-[210mm] min-h-[297mm] mx-auto shadow-lg mb-8 p-12 page-break">
            <h2 className="text-[18pt] font-hei mb-6 font-bold text-center">三、实验截图展示</h2>

            <p className="mb-4 indent-8 text-justify">
                本章节展示了渗透测试过程中的关键操作截图，记录了从信息收集到漏洞发现的完整过程。
            </p>

            <div className="flex flex-col items-center mb-8 gap-8">
                {/* 截图 1 - Nmap扫描 */}
                <div className="border border-gray-300 p-2 shadow-sm w-[90%] capture-as-image">
                    <img src="/images/network_security/nmap_scan.svg" alt="Nmap Scan Result" className="w-full" />
                    <p className="text-center font-song text-sm mt-2 font-bold">图 3.1 Nmap 端口扫描结果</p>
                </div>

                {/* 截图 2 - 目录扫描 */}
                <div className="border border-gray-300 p-2 shadow-sm w-[90%] capture-as-image">
                    <img src="/images/network_security/dirb_scan.svg" alt="Dirb Scan Result" className="w-full" />
                    <p className="text-center font-song text-sm mt-2 font-bold">图 3.2 Dirb 目录扫描结果</p>
                </div>

                {/* 截图 3 - Redis未授权 */}
                <div className="border border-gray-300 p-2 shadow-sm w-[90%] capture-as-image">
                    <img src="/images/network_security/redis_unauth.svg" alt="Redis Unauthorized Access" className="w-full" />
                    <p className="text-center font-song text-sm mt-2 font-bold">图 3.3 Redis 未授权访问漏洞验证</p>
                </div>
            </div>
        </div>
    );
};
