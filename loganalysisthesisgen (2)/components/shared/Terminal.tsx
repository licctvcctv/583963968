import React from 'react';

// ============================================
// 终端颜色常量 - 统一管理，避免硬编码
// ============================================
export const TERMINAL_COLORS = {
    // Kali 终端颜色
    kali: {
        background: '#0c0c0c',
        border: '#374151',        // gray-700
        promptBracket: '#4e9a06', // 绿色 ┌──( )-[ ]
        username: '#06989a',      // 青色 kali㉿kali
        path: '#ffffff',          // 白色 路径
        dollarSign: '#cc0000',    // 红色 $
        command: '#ffffff',       // 白色 命令
        output: '#d1d5db',        // gray-300 输出
        comment: '#6b7280',       // gray-500 注释
    },
    // XShell 终端颜色
    xshell: {
        background: '#000000',
        titleBar: '#f0f0f0',
        prompt: '#4ade80',        // green-400
        command: '#ffffff',
        output: '#d1d5db',
    },
    // Linux 终端颜色
    linux: {
        background: '#300a24',    // Ubuntu 紫色
        user: '#4e9a06',          // 绿色
        path: '#729fcf',          // 蓝色
        command: '#ffffff',
        output: '#d1d5db',
    },
    // 通用颜色
    common: {
        text: '#e5e7eb',          // gray-200
        textMuted: '#9ca3af',     // gray-400
    }
} as const;

// 终端类型
export type TerminalType = 'kali' | 'xshell' | 'linux' | 'ubuntu-desktop' | 'plain';

interface TerminalProps {
    command?: string;
    output?: string;
    cwd?: string;
    user?: string;
    host?: string;
    title?: string;
    type?: TerminalType;
    caption?: string;  // 图片标题，如 "图 1-1 xxx"
}

// Kali Linux 风格终端
const KaliStyle: React.FC<TerminalProps> = ({ command, output, cwd = "~" }) => (
    <div className="w-full rounded overflow-hidden my-4 font-mono text-sm capture-as-image text-left border"
        style={{ backgroundColor: TERMINAL_COLORS.kali.background, borderColor: TERMINAL_COLORS.kali.border }}>
        <div className="p-3 font-mono leading-relaxed text-xs"
            style={{ backgroundColor: TERMINAL_COLORS.kali.background, color: TERMINAL_COLORS.common.text }}>
            {command && (
                <div className="whitespace-pre-wrap">
                    <span style={{ color: TERMINAL_COLORS.kali.promptBracket }}>┌──(</span>
                    <span style={{ color: TERMINAL_COLORS.kali.username, fontWeight: 'bold' }}>kali㉿kali</span>
                    <span style={{ color: TERMINAL_COLORS.kali.promptBracket }}>)-[</span>
                    <span style={{ color: TERMINAL_COLORS.kali.path, fontWeight: 'bold' }}>{cwd}</span>
                    <span style={{ color: TERMINAL_COLORS.kali.promptBracket }}>]</span>
                    {'\n'}
                    <span style={{ color: TERMINAL_COLORS.kali.promptBracket }}>└─</span>
                    <span style={{ color: TERMINAL_COLORS.kali.dollarSign, fontWeight: 'bold' }}>$</span>
                    <span style={{ color: TERMINAL_COLORS.kali.command }} className="ml-1">{command}</span>
                </div>
            )}
            {output && (
                <div className="mt-1 whitespace-pre-wrap" style={{ color: TERMINAL_COLORS.kali.output }}>{output}</div>
            )}
        </div>
    </div>
);

// XShell 风格终端 (Windows 窗口样式)
const XShellStyle: React.FC<TerminalProps> = ({
    command, output, cwd = "~", user = "root", host = "sandbox", title
}) => (
    <div className="w-full bg-black rounded shadow-lg overflow-hidden my-4 font-mono text-sm capture-as-image text-left border border-gray-500">
        {/* XShell 标题栏 */}
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
                <div className="w-6 h-4 bg-gradient-to-b from-[#f5f5f5] to-[#e0e0e0] border border-gray-400 rounded-sm flex items-center justify-center text-gray-600 text-xs">─</div>
                <div className="w-6 h-4 bg-gradient-to-b from-[#f5f5f5] to-[#e0e0e0] border border-gray-400 rounded-sm flex items-center justify-center text-gray-600 text-xs">□</div>
                <div className="w-6 h-4 bg-gradient-to-b from-[#f5f5f5] to-[#e0e0e0] border border-gray-400 rounded-sm flex items-center justify-center text-gray-600 text-xs">×</div>
            </div>
        </div>
        {/* 终端内容 */}
        <div className="p-3 text-gray-200 font-mono leading-relaxed text-xs min-h-[60px] bg-black">
            {command && (
                <div className="flex gap-1 flex-wrap">
                    <span className="text-green-400">[{user}@{host.split('.')[0]}</span>
                    <span className="text-green-400">{cwd === '~' ? '~' : cwd.split('/').pop()}]$</span>
                    <span className="text-white ml-1">{command}</span>
                </div>
            )}
            {output && (
                <div className="mt-1 whitespace-pre-wrap text-gray-300">{output}</div>
            )}
        </div>
    </div>
);

// 普通 Linux 终端风格
const LinuxStyle: React.FC<TerminalProps> = ({
    command, output, cwd = "~", user = "root", host = "localhost"
}) => (
    <div className="w-full bg-[#300a24] rounded overflow-hidden my-4 font-mono text-sm capture-as-image text-left border border-gray-600">
        <div className="p-3 text-gray-200 font-mono leading-relaxed text-xs">
            {command && (
                <div className="flex gap-1 flex-wrap">
                    <span className="text-[#4e9a06] font-bold">{user}@{host}</span>
                    <span className="text-white">:</span>
                    <span className="text-[#729fcf] font-bold">{cwd}</span>
                    <span className="text-white">$</span>
                    <span className="text-white ml-1">{command}</span>
                </div>
            )}
            {output && (
                <div className="mt-1 whitespace-pre-wrap text-gray-300">{output}</div>
            )}
        </div>
    </div>
);

// 纯黑终端 (无装饰)
const PlainStyle: React.FC<TerminalProps> = ({ command, output }) => (
    <div className="w-full bg-black rounded overflow-hidden my-4 font-mono text-sm capture-as-image text-left">
        <div className="p-3 text-gray-200 font-mono leading-relaxed text-xs">
            {command && <div className="text-green-400">$ {command}</div>}
            {output && <div className="mt-1 whitespace-pre-wrap text-gray-300">{output}</div>}
        </div>
    </div>
);

// Ubuntu 桌面版终端风格 (带紫色标题栏和窗口控制按钮)
// Ubuntu 桌面版终端风格 (高度还原 Yaru 风格，带菜单栏)
const UbuntuDesktopStyle: React.FC<TerminalProps> = ({
    command, output, cwd = "~", user = "user", host = "ubuntu", title
}) => {
    return (
        <div className="w-full rounded-lg shadow-[0_10px_30px_rgba(0,0,0,0.5)] overflow-hidden my-6 font-mono text-sm capture-as-image text-left border border-black/40 font-ubuntu">
            {/* 1. 顶部标题栏 (HeaderBar) - 深灰色 */}
            <div className="bg-[#2c2c2c] h-10 flex items-center justify-between px-3 select-none relative shadow-sm z-10">
                {/* 左侧：搜索图标 (Common in GNOME Terminal) */}
                <div className="w-8 flex justify-center opacity-0"></div> {/* Spacer for balance */}

                {/* 中间：标题 */}
                <div className="text-[#eeeeec] font-bold text-sm tracking-wide opacity-90 text-center flex-1 truncate px-4">
                    {title || `${user}@${host}: ${cwd}`}
                </div>

                {/* 右侧：窗口控制按钮 (Min, Max, Close) */}
                <div className="flex items-center gap-3 w-20 justify-end">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-[#3e3e3e] transition-colors cursor-pointer group" title="Minimize">
                        {/* Underscore icon */}
                        <div className="w-2.5 h-[2px] bg-[#9a9a9a] group-hover:bg-white translate-y-1"></div>
                    </div>
                    <div className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-[#3e3e3e] transition-colors cursor-pointer group" title="Maximize">
                        {/* Square icon */}
                        <div className="w-2.5 h-2.5 border-[2px] border-[#9a9a9a] group-hover:border-white rounded-[1px]"></div>
                    </div>
                    <div className="w-6 h-6 rounded-full bg-[#E95420] hover:bg-[#d84615] flex items-center justify-center transition-colors cursor-pointer shadow-md group border border-[#c74619] relative" title="Close">
                        {/* X icon */}
                        <span className="text-white text-[10px] font-bold pb-0.5">✕</span>
                    </div>
                </div>
            </div>

            {/* 2. 菜单栏 (传统的 GNOME Terminal 菜单栏) - 稍微浅一点的灰色 */}
            <div className="bg-[#383838] px-2 py-1 flex items-center border-b border-[#1e1e1e] text-[#eeeeec] text-xs font-sans">
                <div className="px-3 py-1 hover:bg-[#484848] rounded cursor-pointer transition-colors">File</div>
                <div className="px-3 py-1 hover:bg-[#484848] rounded cursor-pointer transition-colors">Edit</div>
                <div className="px-3 py-1 hover:bg-[#484848] rounded cursor-pointer transition-colors">View</div>
                <div className="px-3 py-1 hover:bg-[#484848] rounded cursor-pointer transition-colors">Search</div>
                <div className="px-3 py-1 hover:bg-[#484848] rounded cursor-pointer transition-colors">Terminal</div>
                <div className="px-3 py-1 hover:bg-[#484848] rounded cursor-pointer transition-colors">Help</div>
            </div>

            {/* 3. 终端内容区 - 经典 Ubuntu 紫 (#300a24) + 滚动条轨道 */}
            <div className="flex bg-[#300a24] min-h-[150px] relative">
                {/* 文本内容 */}
                <div className="flex-1 p-3 text-white font-mono leading-relaxed text-sm overflow-x-auto selection:bg-[#E95420] selection:text-white pb-6">
                    {command && (
                        <div className="flex flex-wrap items-center break-all mb-1">
                            {/* Prompt: user@host (bold green) : path (bold blue) $ (white) */}
                            <span className="text-[#8ae234] font-bold">{user}@{host}</span>
                            <span className="text-[#eeeeec] mx-[1px] font-normal">:</span>
                            <span className="text-[#729fcf] font-bold">{cwd}</span>
                            <span className="text-[#eeeeec] ml-1 mr-2">$</span>
                            <span className="text-[#eeeeec]">{command}</span>
                        </div>
                    )}

                    {output && (
                        <div className="whitespace-pre-wrap text-[#eeeeec] font-normal leading-snug font-ubuntumono">
                            {output}
                        </div>
                    )}

                    {/* Blinking Block Cursor (Classic Terminal) */}
                    <div className="mt-1 inline-block w-2.5 h-4 bg-white animate-pulse align-text-bottom ml-0.5"></div>
                </div>

                {/* 模拟右侧滚动条 (Overlay Scrollbar style) */}
                <div className="w-3 bg-[#300a24] border-l border-white/5 flex flex-col justify-between py-1 items-center opacity-80 hover:opacity-100 transition-opacity">
                    <div className="w-1.5 h-1/3 bg-[#5e5e5e] rounded-full hover:bg-[#888888] cursor-pointer"></div>
                </div>
            </div>
        </div>
    );
};

// 通用终端组件
export const Terminal: React.FC<TerminalProps> = (props) => {
    const { type = 'kali', caption } = props;

    const renderTerminal = () => {
        switch (type) {
            case 'kali':
                return <KaliStyle {...props} />;
            case 'xshell':
                return <XShellStyle {...props} />;
            case 'linux':
                return <LinuxStyle {...props} />;
            case 'ubuntu-desktop':
                return <UbuntuDesktopStyle {...props} />;
            case 'plain':
                return <PlainStyle {...props} />;
            default:
                return <KaliStyle {...props} />;
        }
    };

    return (
        <div className="my-4">
            {renderTerminal()}
            {caption && (
                <p className="text-center text-sm font-bold mt-2">{caption}</p>
            )}
        </div>
    );
};

// 便捷导出
export const KaliTerminal: React.FC<Omit<TerminalProps, 'type'> & { children?: React.ReactNode }> = (props) => {
    // 如果有 children，解析并渲染成和 command/output 一样的样式
    if (props.children) {
        const text = String(props.children);
        const lines = text.split('\n');

        return (
            <div className="w-full rounded overflow-hidden my-4 font-mono text-sm capture-as-image text-left border"
                style={{ backgroundColor: TERMINAL_COLORS.kali.background, borderColor: TERMINAL_COLORS.kali.border }}>
                <div className="p-3 font-mono leading-relaxed text-xs"
                    style={{ backgroundColor: TERMINAL_COLORS.kali.background, color: TERMINAL_COLORS.common.text }}>
                    {lines.map((line, idx) => {
                        // 匹配 Kali 提示符行 ┌──(kali㉿kali)-[xxx]
                        if (line.startsWith('┌──(kali')) {
                            const cwdMatch = line.match(/\]-\[([^\]]+)\]/);
                            const cwd = cwdMatch ? cwdMatch[1] : '~';
                            return (
                                <div key={idx} className="whitespace-pre-wrap">
                                    <span style={{ color: TERMINAL_COLORS.kali.promptBracket }}>┌──(</span>
                                    <span style={{ color: TERMINAL_COLORS.kali.username, fontWeight: 'bold' }}>kali㉿kali</span>
                                    <span style={{ color: TERMINAL_COLORS.kali.promptBracket }}>)-[</span>
                                    <span style={{ color: TERMINAL_COLORS.kali.path, fontWeight: 'bold' }}>{cwd}</span>
                                    <span style={{ color: TERMINAL_COLORS.kali.promptBracket }}>]</span>
                                </div>
                            );
                        }
                        // 匹配命令行 └─$ xxx
                        if (line.startsWith('└─$') || line.startsWith('└─#')) {
                            const cmd = line.replace(/^└─[$#]\s*/, '');
                            return (
                                <div key={idx} className="whitespace-pre-wrap">
                                    <span style={{ color: TERMINAL_COLORS.kali.promptBracket }}>└─</span>
                                    <span style={{ color: TERMINAL_COLORS.kali.dollarSign, fontWeight: 'bold' }}>$</span>
                                    <span style={{ color: TERMINAL_COLORS.kali.command }} className="ml-1">{cmd}</span>
                                </div>
                            );
                        }
                        // 匹配 $ 开头的命令
                        if (line.startsWith('$ ')) {
                            return (
                                <div key={idx} className="whitespace-pre-wrap">
                                    <span style={{ color: TERMINAL_COLORS.kali.promptBracket }}>$</span>
                                    <span style={{ color: TERMINAL_COLORS.kali.command }} className="ml-1">{line.slice(2)}</span>
                                </div>
                            );
                        }
                        // 匹配 # 开头的注释
                        if (line.startsWith('# ') && !line.startsWith('#include')) {
                            return (
                                <div key={idx} className="whitespace-pre-wrap" style={{ color: TERMINAL_COLORS.kali.comment }}>{line}</div>
                            );
                        }
                        // 普通输出行
                        return (
                            <div key={idx} className="whitespace-pre-wrap" style={{ color: TERMINAL_COLORS.kali.output }}>{line}</div>
                        );
                    })}
                </div>
            </div>
        );
    }
    // 否则使用 command/output 模式
    return <Terminal {...props} type="kali" />;
};

export const XShellTerminal: React.FC<Omit<TerminalProps, 'type'>> = (props) => (
    <Terminal {...props} type="xshell" />
);

export const LinuxTerminal: React.FC<Omit<TerminalProps, 'type'>> = (props) => (
    <Terminal {...props} type="linux" />
);

export const UbuntuTerminal: React.FC<Omit<TerminalProps, 'type'>> = (props) => (
    <Terminal {...props} type="ubuntu-desktop" />
);

export default Terminal;
