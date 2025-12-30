import React, { useRef, useState, useEffect } from 'react';
import { Download, Printer, FileText, AlignLeft, Shield } from 'lucide-react';
import { SecurityLab3Assignment } from './components/SecurityLab3Assignment';
import { SecurityLab4Assignment } from './components/SecurityLab4Assignment';
import { exportToWord } from './utils/exportUtils';

const SecurityLabApp: React.FC = () => {
    const reportRef = useRef<HTMLDivElement>(null);
    const [activeTab, setActiveTab] = useState<'lab3' | 'lab4'>('lab3');
    const [isExporting, setIsExporting] = useState(false);
    const [wordCount, setWordCount] = useState(0);

    useEffect(() => {
        const calculateWordCount = () => {
            if (reportRef.current) {
                const text = reportRef.current.innerText || "";
                const chineseChars = text.match(/[\u4e00-\u9fa5]/g);
                setWordCount(chineseChars ? chineseChars.length : 0);
            }
        };
        setTimeout(calculateWordCount, 1000);
        const interval = setInterval(calculateWordCount, 3000);
        return () => clearInterval(interval);
    }, [activeTab]);

    const handleExport = async () => {
        if (reportRef.current && !isExporting) {
            setIsExporting(true);
            try {
                const filename = activeTab === 'lab3' 
                    ? '实验三_ShellCode与函数调用_实验报告' 
                    : '实验四_二进制漏洞挖掘_实验报告';
                await exportToWord(reportRef.current, filename);
            } catch (e) {
                console.error("Export failed", e);
            } finally {
                setIsExporting(false);
            }
        }
    };

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-slate-200 font-sans text-gray-800">
            {/* Sidebar */}
            <aside className="w-full md:w-64 bg-slate-900 text-white flex-shrink-0 fixed md:sticky top-0 z-50 md:h-screen overflow-y-auto no-print shadow-xl">
                <div className="p-6 border-b border-slate-700 bg-slate-800">
                    <h1 className="text-lg font-bold flex items-center gap-2">
                        <Shield className="w-5 h-5 text-red-500" />
                        逆向工程实验报告
                    </h1>
                    <p className="text-xs text-slate-400 mt-2">Security Lab Reports</p>
                    <div className="mt-4 flex items-center gap-2 text-xs bg-slate-900 p-2 rounded border border-slate-700">
                        <AlignLeft className="w-3 h-3 text-gray-400" />
                        <span className="text-gray-300">中文字数: </span>
                        <span className="text-red-400 font-mono font-bold">{wordCount.toLocaleString()}</span>
                    </div>
                </div>

                <nav className="p-4 space-y-2">
                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 px-2">选择实验</div>
                    <button
                        onClick={() => setActiveTab('lab3')}
                        className={`w-full text-left px-3 py-3 rounded-md text-sm font-medium transition-colors border-l-2 ${
                            activeTab === 'lab3'
                                ? 'bg-slate-800 text-red-400 border-red-500'
                                : 'border-transparent text-slate-400 hover:bg-slate-800 hover:text-white'
                        }`}
                    >
                        <div className="font-bold">实验三</div>
                        <div className="text-xs opacity-70">ShellCode与函数调用</div>
                    </button>
                    <button
                        onClick={() => setActiveTab('lab4')}
                        className={`w-full text-left px-3 py-3 rounded-md text-sm font-medium transition-colors border-l-2 ${
                            activeTab === 'lab4'
                                ? 'bg-slate-800 text-red-400 border-red-500'
                                : 'border-transparent text-slate-400 hover:bg-slate-800 hover:text-white'
                        }`}
                    >
                        <div className="font-bold">实验四</div>
                        <div className="text-xs opacity-70">二进制漏洞挖掘</div>
                    </button>
                </nav>

                <div className="p-4 mt-auto border-t border-slate-800 space-y-3 bg-slate-900">
                    <button
                        onClick={handleExport}
                        disabled={isExporting}
                        className={`w-full flex items-center justify-center gap-2 text-white px-4 py-2 rounded shadow transition-all active:scale-95 text-sm font-bold ${
                            isExporting ? 'bg-red-800 cursor-wait' : 'bg-red-600 hover:bg-red-500'
                        }`}
                    >
                        <Download className="w-4 h-4" />
                        {isExporting ? '文档生成中...' : '导出 Word'}
                    </button>
                    <button
                        onClick={handlePrint}
                        className="w-full flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded shadow transition-all active:scale-95 text-sm"
                    >
                        <Printer className="w-4 h-4" />
                        打印预览
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-y-auto flex justify-center bg-slate-200 print:bg-white print:p-0">
                <div ref={reportRef} className="print:w-full">
                    {activeTab === 'lab3' ? <SecurityLab3Assignment /> : <SecurityLab4Assignment />}
                </div>
            </main>
        </div>
    );
};

export default SecurityLabApp;
