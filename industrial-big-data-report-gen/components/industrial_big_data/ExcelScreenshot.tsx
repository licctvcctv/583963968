import React from 'react';

export const ExcelScreenshot: React.FC<{ rows: any[], title: string }> = ({ rows, title }) => {
  return (
    <div className="my-6 border border-gray-400 shadow-lg font-sans text-xs bg-white select-none w-full">
      {/* Title Bar */}
      <div className="bg-[#217346] text-white px-4 py-1 flex justify-between items-center">
        <div className="flex gap-4">
          <span>Autosave (On)</span>
          <span className="font-bold">{title}.xlsx - Excel</span>
        </div>
        <div className="flex gap-2"><span>-</span><span>□</span><span>×</span></div>
      </div>
      {/* Menu */}
      <div className="bg-[#f3f2f1] text-black px-2 py-1 border-b border-gray-300 flex gap-4">
        <span>File</span><span className="font-bold border-b-2 border-[#217346]">Home</span><span>Insert</span><span>Data</span><span>Review</span><span>View</span>
      </div>
      {/* Formula Bar */}
      <div className="flex bg-white border-b border-gray-300 p-1">
        <div className="w-10 bg-gray-100 border-r border-gray-300 text-center text-gray-600">A1</div>
        <div className="px-2 w-full text-black">UDI</div>
      </div>
      {/* Grid */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-black">
          <thead>
            <tr className="bg-gray-100">
              <th className="w-8 border border-gray-300 text-gray-500 font-normal"></th>
              {Object.keys(rows[0]).map(k => (
                <th key={k} className="border border-gray-300 font-normal px-2 py-0.5 bg-gray-100">{k}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className="bg-white">
                <td className="border border-gray-300 bg-gray-100 text-center text-gray-500">{i + 1}</td>
                {Object.values(row).map((val: any, j) => (
                  <td key={j} className="border border-gray-300 px-2 py-0.5 text-right">{val}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="bg-gray-100 border-t border-gray-300 px-2 text-gray-600">Sheet1</div>
    </div>
  );
};