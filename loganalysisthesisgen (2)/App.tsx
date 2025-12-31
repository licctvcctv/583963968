
import React, { useRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { Download, Layout, Printer, Share2, FileText, AlignLeft, RefreshCw } from 'lucide-react';
import ThesisDocument from './components/ThesisDocument';
import { NetworkSecurityAssignment } from './components/NetworkSecurityAssignment';
import { MalwareAnalysisAssignment } from './components/MalwareAnalysisAssignment';
import { SecurityLab3Assignment } from './components/SecurityLab3Assignment';
import { SecurityLab4Assignment } from './components/SecurityLab4Assignment';
import { UbuntuExperience } from './components/security/UbuntuExperience';
import { IndustrialBigDataAssignment } from './components/IndustrialBigDataAssignment';
import { exportToWord } from './utils/exportUtils';

type ReportType = 'network' | 'malware' | 'lab3' | 'lab4' | 'ubuntu' | 'industrial-big-data';

const App: React.FC = () => {
  const reportRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState<string>('page-cover');
  const [isExporting, setIsExporting] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [reportType, setReportType] = useState<ReportType>('ubuntu');
  const [studentVariant, setStudentVariant] = useState<number>(1);

  // Calculate word count on mount and update
  useEffect(() => {
    const calculateWordCount = () => {
      if (reportRef.current) {
        // Strict Chinese character count (excluding English, numbers, punctuation)
        const text = reportRef.current.innerText || "";
        const chineseChars = text.match(/[\u4e00-\u9fa5]/g);
        setWordCount(chineseChars ? chineseChars.length : 0);
      }
    };

    // Initial calculation
    setTimeout(calculateWordCount, 1000);

    // Re-calculate every few seconds to capture dynamic content loading
    const interval = setInterval(calculateWordCount, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleExport = async () => {
    if (reportRef.current && !isExporting) {
      setIsExporting(true);
      try {
        await exportToWord(reportRef.current, getExportFileName());
      } catch (e) {
        console.error("Export failed", e);
      } finally {
        setIsExporting(false);
      }
    }
  };

  const handleBatchExport = async () => {
    if (isExporting) return;
    setIsExporting(true);

    try {
      // Import the component dynamically for each student variant
      const { IndustrialBigDataAssignment } = await import('./components/IndustrialBigDataAssignment');
      const { exportToWord } = await import('./utils/exportUtils');

      // Create a temporary container for each student
      for (let i = 1; i <= 4; i++) {
        const tempDiv = document.createElement('div');
        tempDiv.style.position = 'absolute';
        tempDiv.style.left = '-9999px';
        document.body.appendChild(tempDiv);

        // Render the component for this student
        const root = ReactDOM.createRoot(tempDiv);
        root.render(
          React.createElement(IndustrialBigDataAssignment, { variantId: i })
        );

        // Wait for render to complete
        await new Promise(resolve => setTimeout(resolve, 500));

        // Export this student's report
        const fileName = `工业大数据分析报告_学生${i}_${new Date().toISOString().slice(0, 10)}.docx`;
        await exportToWord(tempDiv, fileName);

        // Clean up
        root.unmount();
        document.body.removeChild(tempDiv);
      }

      console.log('Batch export completed!');
    } catch (e) {
      console.error('Batch export failed:', e);
    } finally {
      setIsExporting(false);
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

  const networkNavItems = [
    { id: 'ns-cover', label: '封面' },
    { id: 'ns-background', label: '一、项目背景' },
    { id: 'ns-requirements', label: '二、需求分析' },
    { id: 'ns-design', label: '三、数据库设计' },
    { id: 'ns-detail', label: '四、详细设计' },
    { id: 'ns-impl', label: '五、系统实现' },
    { id: 'ns-results', label: '六、运行效果' },
    { id: 'ns-testing', label: '七、测试分析' },
    { id: 'ns-summary', label: '八、总结' },
  ];

  const malwareNavItems = [
    { id: 'ma-cover', label: '封面' },
    { id: 'ma-background', label: '一、项目背景' },
    { id: 'ma-requirements', label: '二、需求分析' },
    { id: 'ma-design', label: '三、环境架构' },
    { id: 'ma-detail', label: '四、详细设计' },
    { id: 'ma-impl', label: '五、系统实现' },
    { id: 'ma-results', label: '六、运行效果' },
    { id: 'ma-testing', label: '七、测试分析' },
    { id: 'ma-summary', label: '八、总结' },
  ];

  const lab3NavItems = [
    { id: 'lab3-cover', label: '封面' },
    { id: 'lab3-part1', label: '一、实验目的' },
    { id: 'lab3-part2', label: '二、实验原理' },
    { id: 'lab3-part3', label: '三、手动编写Shellcode' },
    { id: 'lab3-part4', label: '四、编译汇编代码' },
    { id: 'lab3-part5', label: '五、测试Shellcode' },
    { id: 'lab3-part6', label: '六、pwntools生成' },
    { id: 'lab3-part7', label: '七、函数调用分析' },
    { id: 'lab3-part8', label: '八、main函数分析' },
    { id: 'lab3-part9', label: '九、栈帧结构' },
    { id: 'lab3-summary', label: '十、实验总结' },
  ];

  const lab4NavItems = [
    { id: 'lab4-cover', label: '封面' },
    { id: 'lab4-part1', label: '一、实验目的' },
    { id: 'lab4-part2', label: '二、ret2text开始' },
    { id: 'lab4-part3', label: '三、ret2text分析' },
    { id: 'lab4-part4', label: '四、ret2text结果' },
    { id: 'lab4-part5', label: '五、ret2shellcode' },
    { id: 'lab4-part6', label: '六、ret2shellcode结果' },
    { id: 'lab4-part7', label: '七、ret2libc介绍' },
    { id: 'lab4-part8', label: '八、ret2libc类型1' },
    { id: 'lab4-part9', label: '九、ret2libc类型2' },
    { id: 'lab4-part10', label: '十、ret2libc类型2结果' },
    { id: 'lab4-part11', label: '十一、ret2libc类型3' },
    { id: 'lab4-part12', label: '十二、ret2libc类型3结果' },
    { id: 'lab4-summary', label: '十三、实验总结' },
  ];

  const industrialNavItems = [
    { id: 'ibda-cover', label: '封面' },
    { id: 'ibda-section1', label: '一、项目背景' },
    { id: 'ibda-section2', label: '二、需求分析' },
    { id: 'ibda-section3', label: '三、数据库设计' },
    { id: 'ibda-section4', label: '四、详细设计' },
    { id: 'ibda-section5', label: '五、系统实现' },
    { id: 'ibda-section6', label: '六、运行效果' },
    { id: 'ibda-section7', label: '七、测试分析' },
  ];

  const getNavItems = () => {
    switch (reportType) {
      case 'network': return networkNavItems;
      case 'malware': return malwareNavItems;
      case 'lab3': return lab3NavItems;
      case 'lab4': return lab4NavItems;
      case 'industrial-big-data': return industrialNavItems;
      case 'ubuntu': return [{ id: 'ubuntu-preview-page', label: 'Ubuntu 风格预览' }];
    }
  };

  const navItems = getNavItems();

  const getReportTitle = () => {
    switch (reportType) {
      case 'network': return '题目一：企业内网纵深渗透';
      case 'malware': return '题目二：恶意流量分析与逆向';
      case 'lab3': return '实验三：ShellCode与函数调用';
      case 'lab4': return '实验四：二进制漏洞挖掘';
      case 'industrial-big-data': return '工业大数据分析与应用';
      case 'ubuntu': return 'Ubuntu 风格体验馆';
    }
  };

  const getExportFileName = () => {
    switch (reportType) {
      case 'network': return '网络安全_题目一_企业内网纵深渗透';
      case 'malware': return '网络安全_题目二_恶意流量分析';
      case 'lab3': return '逆向工程_实验三_ShellCode与函数调用';
      case 'lab4': return '逆向工程_实验四_二进制漏洞挖掘';
      case 'industrial-big-data': return '工业大数据_课程大作业_预测性维护';
      case 'ubuntu': return 'Ubuntu_风格预览';
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-200 font-sans text-gray-800">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-slate-900 text-white flex-shrink-0 fixed md:sticky top-0 z-50 md:h-screen overflow-y-auto no-print shadow-xl">
        <div className="p-6 border-b border-slate-700 bg-slate-800">
          <h1 className="text-lg font-bold flex items-center gap-2">
            <FileText className="w-5 h-5 text-orange-500" />
            报告生成器
          </h1>
          <p className="text-xs text-slate-400 mt-2">
            {getReportTitle()}
          </p>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <button
              onClick={() => setReportType('lab3')}
              className={`text-xs py-1 px-2 rounded ${reportType === 'lab3' ? 'bg-green-600 text-white' : 'bg-slate-700 text-slate-300'}`}
            >
              实验三
            </button>
            <button
              onClick={() => setReportType('lab4')}
              className={`text-xs py-1 px-2 rounded ${reportType === 'lab4' ? 'bg-green-600 text-white' : 'bg-slate-700 text-slate-300'}`}
            >
              实验四
            </button>
            <button
              onClick={() => setReportType('network')}
              className={`text-xs py-1 px-2 rounded ${reportType === 'network' ? 'bg-orange-600 text-white' : 'bg-slate-700 text-slate-300'}`}
            >
              题目一
            </button>
            <button
              onClick={() => setReportType('malware')}
              className={`text-xs py-1 px-2 rounded ${reportType === 'malware' ? 'bg-orange-600 text-white' : 'bg-slate-700 text-slate-300'}`}
            >
              题目二
            </button>
            <button
              onClick={() => setReportType('industrial-big-data')}
              className={`text-xs py-1 px-2 rounded col-span-2 ${reportType === 'industrial-big-data' ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-300'}`}
            >
              工业大数据
            </button>
            <button
              onClick={() => setReportType('ubuntu')}
              className={`text-xs py-1 px-2 rounded col-span-2 ${reportType === 'ubuntu' ? 'bg-purple-600 text-white' : 'bg-slate-700 text-slate-300'}`}
            >
              Ubuntu 体验
            </button>
          </div>
          {/* 学生切换器 - 仅在工业大数据模式下显示 */}
          {reportType === 'industrial-big-data' && (
            <div className="mt-3 p-2 bg-slate-900 rounded border border-slate-700">
              <div className="text-xs text-slate-400 mb-2">选择学生报告:</div>
              <div className="grid grid-cols-4 gap-1">
                {[1, 2, 3, 4].map((v) => (
                  <button
                    key={v}
                    onClick={() => setStudentVariant(v)}
                    className={`text-xs py-1 px-2 rounded ${studentVariant === v ? 'bg-blue-500 text-white' : 'bg-slate-700 text-slate-300'}`}
                  >
                    学生{v}
                  </button>
                ))}
              </div>
            </div>
          )}
          {/* 批量导出按钮 - 仅在工业大数据模式下显示 */}
          {reportType === 'industrial-big-data' && (
            <div className="mt-2">
              <button
                onClick={handleBatchExport}
                disabled={isExporting}
                className={`w-full flex items-center justify-center gap-2 text-white px-3 py-2 rounded shadow transition-all active:scale-95 text-xs font-bold ${isExporting ? 'bg-purple-800 cursor-wait' : 'bg-purple-600 hover:bg-purple-500'}`}
              >
                <Download className="w-3 h-3" />
                {isExporting ? '批量生成中...' : '一键导出4份学生报告'}
              </button>
            </div>
          )}
          <div className="mt-4 flex items-center gap-2 text-xs bg-slate-900 p-2 rounded border border-slate-700">
            <AlignLeft className="w-3 h-3 text-gray-400" />
            <span className="text-gray-300">中文字数: </span>
            <span className="text-orange-400 font-mono font-bold">{wordCount.toLocaleString()}</span>
          </div>
        </div>

        <nav className="p-4 space-y-1">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 px-2">作业导航</div>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`w-full text-left px-3 py-2 rounded-md text-xs font-medium transition-colors border-l-2 ${activeSection === item.id
                ? 'bg-slate-800 text-orange-400 border-orange-500'
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
            className={`w-full flex items-center justify-center gap-2 text-white px-4 py-2 rounded shadow transition-all active:scale-95 text-sm font-bold ${isExporting ? 'bg-orange-800 cursor-wait' : 'bg-orange-600 hover:bg-orange-500'}`}
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

      {/* Main Content Area */}
      <main className="flex-1 p-8 overflow-y-auto flex justify-center bg-slate-200 print:bg-white print:p-0">
        <div ref={reportRef} className="print:w-full">
          {reportType === 'network' && <NetworkSecurityAssignment />}
          {reportType === 'malware' && <MalwareAnalysisAssignment />}
          {reportType === 'lab3' && <SecurityLab3Assignment />}
          {reportType === 'lab4' && <SecurityLab4Assignment />}
          {reportType === 'industrial-big-data' && <IndustrialBigDataAssignment variantId={studentVariant} />}
          {reportType === 'ubuntu' && <UbuntuExperience />}
        </div>
      </main>
    </div>
  );
};

export default App;
