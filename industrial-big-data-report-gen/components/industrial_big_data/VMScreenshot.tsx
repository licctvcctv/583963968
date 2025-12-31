import React from 'react';

interface VMScreenshotProps {
  command: string; output: string;
  user?: string; host?: string; path?: string; title?: string;
  theme?: any; // Ignored for realistic Ubuntu style mostly
}

export const VMScreenshot: React.FC<VMScreenshotProps> = ({ 
  command, output, user = "student", host = "hadoop", path = "~", title = "Terminal"
}) => {
  return (
    <div className="my-6 shadow-2xl rounded-lg overflow-hidden border border-gray-400 font-mono text-xs select-none break-inside-avoid w-full bg-[#300a24] text-white">
      {/* Ubuntu Title Bar */}
      <div className="bg-[#3e3d3d] px-3 py-2 flex items-center justify-between border-b border-gray-600 rounded-t-lg bg-gradient-to-r from-[#4c4c4c] to-[#3e3d3d]">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-[#df4b16] border border-[#a83810]"></div>
          <div className="w-3 h-3 rounded-full bg-[#d0d0d0] border border-[#909090]"></div>
          <div className="w-3 h-3 rounded-full bg-[#d0d0d0] border border-[#909090]"></div>
        </div>
        <div className="text-gray-300 font-bold text-xs tracking-wide">{user}@{host}: {path}</div>
        <div className="w-10"></div> {/* Spacer for center alignment */}
      </div>

      {/* Menu Bar */}
      <div className="bg-[#4e4d4d] text-gray-200 px-2 py-1 text-[10px] flex gap-4 border-b border-gray-600">
        <span className="hover:bg-gray-600 px-1 cursor-default">File</span>
        <span className="hover:bg-gray-600 px-1 cursor-default">Edit</span>
        <span className="hover:bg-gray-600 px-1 cursor-default">View</span>
        <span className="hover:bg-gray-600 px-1 cursor-default">Search</span>
        <span className="hover:bg-gray-600 px-1 cursor-default">Terminal</span>
        <span className="hover:bg-gray-600 px-1 cursor-default">Help</span>
      </div>
      
      {/* Terminal Content */}
      <div className="p-4 min-h-[120px] bg-[#300a24] text-[#d3d7cf] relative overflow-hidden">
        {/* Scrollbar track simulation */}
        <div className="absolute right-0 top-0 bottom-0 w-3 bg-[#2b2b2b] border-l border-gray-700">
             <div className="w-full h-10 bg-[#df4b16] opacity-50 mt-2"></div>
        </div>

        <div className="mr-4">
            <div className="mb-2">
            <span className="text-[#8ae234] font-bold">{user}@{host}</span>
            <span className="text-white">:</span>
            <span className="text-[#729fcf] font-bold">{path}</span>
            <span className="text-white">$ {command}</span>
            </div>
            <div className="whitespace-pre-wrap leading-snug font-mono text-gray-300">{output}</div>
            <div className="mt-2">
            <span className="text-[#8ae234] font-bold">{user}@{host}</span>
            <span className="text-white">:</span>
            <span className="text-[#729fcf] font-bold">{path}</span>
            <span className="text-white">$ <span className="animate-pulse inline-block w-2 h-4 bg-gray-400 align-middle"></span></span>
            </div>
        </div>
      </div>
    </div>
  );
};