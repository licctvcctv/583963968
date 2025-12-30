import React, { useRef, useState, useEffect } from 'react';
import { Download, Printer, FileText, AlignLeft, Database } from 'lucide-react';
import { BigDataAssignment_LuTianwei } from './components/BigDataAssignment_LuTianwei';
import { UbuntuStylePreview } from './components/UbuntuStylePreview';
import { exportToWord } from './utils/exportUtils';

const BigDataApp: React.FC = () => {
  const reportRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState<string>('ubuntu-preview');
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
  }, []);

  const handleExport = async () => {
    if (reportRef.current && !isExporting) {
      setIsExporting(true);
      try {
        await exportToWord(reportRef.current, '大数据课程大作业_卢天威');
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

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { id: 'ubuntu-preview', label: '★ Ubuntu 样式预览' },
    { id: 'bigdata-cover', label: '封面' },
    { id: 'bigdata-task1', label: '1.1-1.3 创建用户' },
    { id: 'bigdata-task1-2', label: '1.4-1.6 HDFS操作' },
    { id: 'bigdata-task1-3', label: '1.7-1.9 上传与执行' },
    { id: 'bigdata-task1-4', label: '1.10-1.11 执行过程' },
    { id: 'bigdata-task1-5', label: '1.12-1.13 结果Top50' },
    { id: 'bigdata-task1-6', label: '1.14-1.15 分析总结' },
    { id: 'bigdata-task2', label: '任务二：应用场景' },
    { id: 'bigdata-task2-2', label: '任务二：架构设计' },
  ];

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-200 font-sans text-gray-800">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-slate-900 text-white flex-shrink-0 fixed md:sticky top-0 z-50 md:h-screen overflow-y-auto no-print shadow-xl">
        <div className="p-6 border-b border-slate-700 bg-slate-800">
          <h1 className="text-lg font-bold flex items-center gap-2">
            <Database className="w-5 h-5 text-green-500" />
            大数据报告生成器
          </h1>
          <p className="text-xs text-slate-400 mt-2">Big Data Report - 卢天威</p>
          <div className="mt-4 flex items-center gap-2 text-xs bg-slate-900 p-2 rounded border border-slate-700">
            <AlignLeft className="w-3 h-3 text-gray-400" />
            <span className="text-gray-300">中文字数: </span>
            <span className="text-green-400 font-mono font-bold">{wordCount.toLocaleString()}</span>
          </div>
        </div>

        <nav className="p-4 space-y-1">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 px-2">报告导航</div>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`w-full text-left px-3 py-2 rounded-md text-xs font-medium transition-colors border-l-2 ${activeSection === item.id
                ? 'bg-slate-800 text-green-400 border-green-500'
                : 'border-transparent text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 mt-auto border-t border-slate-800 space-y-3 bg-slate-900">
          <button
            onClick={handleExport}
            disabled={isExporting}
            className={`w-full flex items-center justify-center gap-2 text-white px-4 py-2 rounded shadow transition-all active:scale-95 text-sm font-bold ${isExporting ? 'bg-green-800 cursor-wait' : 'bg-green-600 hover:bg-green-500'}`}
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
          {activeSection === 'ubuntu-preview' ? (
            <UbuntuStylePreview />
          ) : (
            <BigDataAssignment_LuTianwei />
          )}
        </div>
      </main>
    </div>
  );
};

export default BigDataApp;
