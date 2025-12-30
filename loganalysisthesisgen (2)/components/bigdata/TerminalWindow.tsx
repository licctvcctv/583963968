import React from 'react';
import { Terminal } from 'lucide-react';

// XShell 风格终端窗口组件 - 模拟连接 HDP Sandbox 虚拟机
export const TerminalWindow: React.FC<{
    command: string;
    output: string;
    cwd?: string;
    user?: string;
    host?: string;
    title?: string;
    theme?: 'xshell' | 'ubuntu';
}> = ({ command, output, cwd = "~", user = "lutianwei", host = "sandbox", title, theme = 'xshell' }) => {

    // Ubuntu 风格渲染
    if (theme === 'ubuntu') {
        return (
            <div className="w-full rounded-t-lg shadow-2xl overflow-hidden my-6 font-mono text-sm capture-as-image text-left border border-[#2c001e]">
                {/* Ubuntu 风格标题栏 */}
                <div className="bg-gradient-to-b from-[#4e4e4e] to-[#3d3d3d] px-3 py-2 flex items-center justify-between border-b border-[#2c001e]">
                    <div className="flex items-center gap-2 text-gray-300">
                        <Terminal size={14} className="text-gray-400" />
                        <span className="text-sm font-bold font-ubuntu tracking-wide text-[#dfdbd2]">
                            {title || `${user}@${host}: ${cwd}`}
                        </span>
                    </div>
                    <div className="flex gap-2">
                        <div className="w-4 h-4 rounded-full bg-[#E95420] hover:bg-[#d64010] flex items-center justify-center text-[10px] text-black font-bold cursor-pointer transition-colors shadow-inner" title="Close"></div>
                        <div className="w-4 h-4 rounded-full bg-gray-400 hover:bg-gray-300 flex items-center justify-center text-[10px] text-black font-bold cursor-pointer transition-colors shadow-inner" title="Minimize"></div>
                        <div className="w-4 h-4 rounded-full bg-gray-400 hover:bg-gray-300 flex items-center justify-center text-[10px] text-black font-bold cursor-pointer transition-colors shadow-inner" title="Maximize"></div>
                    </div>
                </div>

                {/* 终端内容区 - Ubuntu 紫色背景 (#300a24) */}
                <div className="p-4 text-white font-mono leading-relaxed text-sm min-h-[120px] bg-[#300a24] bg-opacity-95 backdrop-blur-sm selection:bg-orange-500 selection:text-white">
                    {command && (
                        <div className="flex gap-2 flex-wrap mb-1">
                            <span className="text-[#87ceeb] font-bold">[{user}@{host}</span>
                            <span className="text-white">{cwd === '~' ? '~' : cwd.split('/').pop()}]</span>
                            <span className="text-white">$</span>
                            <span className="text-white ml-1">{command}</span>
                        </div>
                    )}
                    {output && (
                        <div className="mt-1 whitespace-pre-wrap text-gray-100 font-light">
                            {output}
                        </div>
                    )}
                    {/* Cursor blinking */}
                    <div className="mt-1 animate-pulse inline-block w-2 h-4 bg-white align-middle"></div>
                </div>
            </div>
        );
    }

    // Default: XShell 风格渲染
    return (
        <div className="w-full bg-black rounded shadow-lg overflow-hidden my-4 font-mono text-sm capture-as-image text-left border border-gray-500">
            {/* XShell 风格标题栏 - Windows 窗口样式 */}
            <div className="bg-gradient-to-b from-[#f0f0f0] to-[#d8d8d8] px-2 py-1 flex items-center justify-between border-b border-gray-400">
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-black rounded-sm flex items-center justify-center">
                        <span className="text-green-400 text-[9px] font-bold">{'>'}_</span>
                    </div>
                    <span className="text-xs text-gray-700 font-sans">
                        {title || `${user}@${host} - Xshell 7`}
                    </span>
                </div>
                <div className="flex gap-1">
                    <div className="w-6 h-4 bg-gradient-to-b from-[#f5f5f5] to-[#e0e0e0] border border-gray-400 rounded-sm flex items-center justify-center text-gray-600 text-xs hover:bg-gray-200">─</div>
                    <div className="w-6 h-4 bg-gradient-to-b from-[#f5f5f5] to-[#e0e0e0] border border-gray-400 rounded-sm flex items-center justify-center text-gray-600 text-xs hover:bg-gray-200">□</div>
                    <div className="w-6 h-4 bg-gradient-to-b from-[#f5f5f5] to-[#e0e0e0] border border-gray-400 rounded-sm flex items-center justify-center text-gray-600 text-xs hover:bg-red-400 hover:text-white">×</div>
                </div>
            </div>

            {/* 终端内容区 - 黑底绿字/白字 Linux 风格 */}
            <div className="p-3 text-gray-200 font-mono leading-relaxed text-xs min-h-[60px] bg-black">
                {command && (
                    <div className="flex gap-1 flex-wrap">
                        <span className="text-green-400">[{user}@{host.split('.')[0]}</span>
                        <span className="text-green-400">{cwd === '~' ? '~' : cwd.split('/').pop()}]$</span>
                        <span className="text-white ml-1">{command}</span>
                    </div>
                )}
                {output && (
                    <div className="mt-1 whitespace-pre-wrap text-gray-300">
                        {output}
                    </div>
                )}
            </div>
        </div>
    );
};

export default TerminalWindow;
