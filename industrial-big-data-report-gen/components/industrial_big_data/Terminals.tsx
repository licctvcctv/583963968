import React from 'react';

interface TerminalProps {
  command: string;
  output: string;
  user?: string;
  host?: string;
  cwd?: string;
  caption?: string;
}

const BaseTerminal: React.FC<{ children: React.ReactNode; caption?: string; className: string }> = ({ children, caption, className }) => (
  <div className="my-6 break-inside-avoid w-full">
    <div className={`shadow-lg rounded overflow-hidden font-mono text-xs ${className}`}>
      {children}
    </div>
    {caption && <div className="text-center text-sm font-bold mt-2 text-black">{caption}</div>}
  </div>
);

export const UbuntuTerminal: React.FC<TerminalProps> = ({ command, output, user = 'user', host = 'ubuntu', cwd = '~', caption }) => (
  <BaseTerminal caption={caption} className="bg-[#300a24] text-white border border-gray-400">
    <div className="bg-[#3e3d3d] px-3 py-1 flex justify-between items-center border-b border-gray-600 bg-gradient-to-r from-[#4c4c4c] to-[#3e3d3d]">
      <div className="flex gap-2">
        <div className="w-3 h-3 rounded-full bg-[#df4b16] border border-[#a83810]" />
        <div className="w-3 h-3 rounded-full bg-[#d0d0d0] border border-[#909090]" />
        <div className="w-3 h-3 rounded-full bg-[#d0d0d0] border border-[#909090]" />
      </div>
      <div className="text-gray-300 font-bold">{user}@{host}: {cwd}</div>
      <div className="w-8" />
    </div>
    <div className="p-4 min-h-[100px] leading-snug">
      <div><span className="text-[#8ae234] font-bold">{user}@{host}</span>:<span className="text-[#729fcf] font-bold">{cwd}</span>$ {command}</div>
      <div className="text-gray-300 whitespace-pre-wrap mt-1">{output}</div>
      <div className="mt-2"><span className="text-[#8ae234] font-bold">{user}@{host}</span>:<span className="text-[#729fcf] font-bold">{cwd}</span>$ <span className="animate-pulse">_</span></div>
    </div>
  </BaseTerminal>
);

export const KaliTerminal: React.FC<TerminalProps> = ({ command, output, user = 'root', host = 'kali', cwd = '~', caption }) => (
  <BaseTerminal caption={caption} className="bg-black text-white border border-gray-800">
    <div className="bg-[#2d2d2d] px-2 py-1 flex items-center gap-2 border-b border-gray-700">
      <span className="text-gray-400 text-[10px]">Terminal - {user}@{host}</span>
    </div>
    <div className="p-4 min-h-[100px] leading-snug font-bold">
      <div><span className="text-[#ff0000]">┌──({user}㉿{host})-[<span className="text-white">{cwd}</span>]</span></div>
      <div><span className="text-[#ff0000]">└─#</span> {command}</div>
      <div className="text-gray-300 whitespace-pre-wrap mt-1 font-normal">{output}</div>
    </div>
  </BaseTerminal>
);

export const XShellTerminal: React.FC<TerminalProps> = ({ command, output, user = 'user', host = 'host', cwd = '~', caption }) => (
  <BaseTerminal caption={caption} className="bg-[#ffffff] text-black border border-gray-300">
    <div className="bg-[#f0f0f0] px-2 py-1 flex items-center justify-between border-b border-gray-300 text-xs text-black">
      <span>{user}@{host} - Xshell 7</span>
      <div className="flex gap-1"><div className="w-3 h-3 border border-gray-400 bg-white text-center leading-3">-</div><div className="w-3 h-3 border border-gray-400 bg-white text-center leading-3">□</div><div className="w-3 h-3 border border-gray-400 bg-red-500 text-white text-center leading-3">×</div></div>
    </div>
    <div className="p-4 min-h-[100px] leading-snug font-medium">
      <div>[{user}@{host} {cwd}]$ {command}</div>
      <div className="whitespace-pre-wrap mt-1">{output}</div>
      <div className="mt-2">[{user}@{host} {cwd}]$ <span className="bg-black w-2 h-4 inline-block align-middle"></span></div>
    </div>
  </BaseTerminal>
);

export const LinuxTerminal: React.FC<TerminalProps> = ({ command, output, user = 'admin', host = 'server', cwd = '~', caption }) => (
  <BaseTerminal caption={caption} className="bg-[#0c0c0c] text-[#cccccc] border border-gray-600">
    <div className="bg-[#1f1f1f] px-2 py-1 text-center text-gray-400 text-xs border-b border-gray-700">
      {user}@{host}: {cwd}
    </div>
    <div className="p-4 min-h-[100px] leading-snug">
      <div><span className="text-[#00ff00]">{user}@{host}</span>:<span className="text-[#5555ff]">{cwd}</span>$ {command}</div>
      <div className="whitespace-pre-wrap mt-1">{output}</div>
    </div>
  </BaseTerminal>
);

export const PlainTerminal: React.FC<TerminalProps> = ({ command, output, caption }) => (
  <BaseTerminal caption={caption} className="bg-gray-100 text-gray-800 border border-gray-300 p-4">
    <div className="font-bold mb-2">$ {command}</div>
    <div className="whitespace-pre-wrap">{output}</div>
  </BaseTerminal>
);