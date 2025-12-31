import React, { useState, useEffect, useRef } from 'react';
import IndustrialBigDataAssignment from './components/IndustrialBigDataAssignment';
// Corrected relative path, ensuring no aliases like @/ are used
import { exportToWord } from './utils/exportUtils'; 
import { STUDENTS } from './components/industrial_big_data/IBDA_config';

const App: React.FC = () => {
  const [currentStudentId, setCurrentStudentId] = useState<1 | 2 | 3 | 4>(1);
  const [wordCount, setWordCount] = useState(0);
  const [isExporting, setIsExporting] = useState(false);
  const reportRef = useRef<HTMLDivElement>(null);

  // Calculate word count for the specific report
  useEffect(() => {
    const calculate = () => {
      if (reportRef.current) {
        const text = reportRef.current.innerText || "";
        // Match Chinese characters
        const chineseChars = text.match(/[\u4e00-\u9fa5]/g);
        // Match English words (approximate)
        const englishWords = text.match(/\b\w+\b/g);
        
        const count = (chineseChars ? chineseChars.length : 0) + (englishWords ? englishWords.length : 0);
        setWordCount(count);
      }
    };
    
    // Delay slightly to ensure render
    const timer = setTimeout(calculate, 1000);
    return () => clearTimeout(timer);
  }, [currentStudentId]);

  const handleExport = async () => {
    if (!reportRef.current) return;
    setIsExporting(true);
    try {
      const student = STUDENTS[currentStudentId];
      const fileName = `工业大数据分析_学生${student.id}_${student.name}`;
      await exportToWord(reportRef.current, fileName);
    } catch (error) {
      console.error("Export failed", error);
      alert("导出失败，请重试");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row font-sans">
      <aside className="w-full md:w-64 bg-slate-900 text-white p-6 flex flex-col fixed md:sticky top-0 h-auto md:h-screen overflow-y-auto z-10 no-print shadow-xl">
        <h1 className="text-xl font-bold mb-8 text-blue-400 border-b border-gray-700 pb-4">报告生成器 Pro</h1>
        
        <div className="mb-8">
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">学生变体 (Persona)</label>
          <div className="grid grid-cols-2 gap-3">
            {[1, 2, 3, 4].map((id) => (
              <button key={id} onClick={() => setCurrentStudentId(id as 1|2|3|4)}
                className={`px-3 py-2 rounded text-sm transition-all duration-200 ${currentStudentId === id ? 'bg-blue-600 text-white font-bold ring-2 ring-blue-300 shadow-lg transform scale-105' : 'bg-slate-700 hover:bg-slate-600 text-gray-300'}`}>
                {STUDENTS[id as 1|2|3|4].name}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6 flex-1">
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">章节导航</label>
          <nav className="space-y-1 text-sm text-gray-300">
            {['封面', '摘要', '一、作业概述', '二、数据准备', '三、数据预处理', '四、数据存储', '五、数据分析', '六、结果可视化', '七、分析与优化', '八、总结与反思'].map((label, idx) => {
              const ids = ['cover', 'abstract', 'chapter1', 'chapter2', 'chapter3', 'chapter4', 'chapter5', 'chapter6', 'chapter7', 'chapter8'];
              return (
                <a key={ids[idx]} href={`#ibda-${ids[idx]}`} className="block px-3 py-2 hover:bg-slate-800 rounded transition-colors border-l-2 border-transparent hover:border-blue-500">
                  {label}
                </a>
              );
            })}
          </nav>
        </div>

        <div className="mt-auto pt-6 border-t border-gray-700">
          <div className="mb-4 text-center">
             <span className="text-xs text-gray-400">当前字数</span>
             <div className={`text-2xl font-mono font-bold ${wordCount < 5000 ? 'text-yellow-500' : 'text-green-400'}`}>
               {wordCount.toLocaleString()}
             </div>
             <div className="text-xs text-gray-500">目标: 7000+</div>
          </div>

          <button 
            onClick={handleExport} 
            disabled={isExporting}
            className={`w-full font-bold py-3 rounded flex items-center justify-center gap-2 transition-all shadow-lg ${isExporting ? 'bg-gray-600 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-500 text-white'}`}
          >
            {isExporting ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>生成中...</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                <span>导出 Word</span>
              </>
            )}
          </button>
        </div>
      </aside>

      <main className="flex-1 bg-gray-200 overflow-y-auto p-0 md:p-8 print:p-0 print:overflow-visible">
        <div ref={reportRef}>
          <IndustrialBigDataAssignment variantId={currentStudentId} />
        </div>
      </main>
    </div>
  );
};

export default App;