import React from 'react';

// 封面组件
export const BigDataCover: React.FC = () => (
    <div id="bigdata-cover" className="page bg-white w-[210mm] min-h-[297mm] mx-auto shadow-lg mb-8 p-16 flex flex-col items-center justify-center text-center">
        <div className="mt-20"></div>
        <h1 className="text-3xl font-bold mb-20">"大数据"课程大作业</h1>

        <div className="text-left space-y-6 text-lg mt-10 w-80">
            <div className="flex">
                <span className="w-32">课程名称：</span>
                <span className="border-b border-black flex-1 text-center">大数据</span>
            </div>
            <div className="flex">
                <span className="w-32">学生姓名：</span>
                <span className="border-b border-black flex-1 text-center">卢天威</span>
            </div>
            <div className="flex">
                <span className="w-32">学生学号：</span>
                <span className="border-b border-black flex-1 text-center">2022XXXXXX</span>
            </div>
            <div className="flex">
                <span className="w-32">提交时间：</span>
                <span className="border-b border-black flex-1 text-center">2025-12-21</span>
            </div>
        </div>
    </div>
);

export default BigDataCover;
