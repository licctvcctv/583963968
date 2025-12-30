import React from 'react';

export const NSCover: React.FC = () => {
    return (
        <div id="ns-cover" className="page bg-white w-[210mm] min-h-[297mm] mx-auto shadow-lg mb-8 p-12 flex flex-col justify-center items-center">
            <div className="text-center space-y-8">
                <h1 className="text-[22pt] font-bold font-hei">三亚学院</h1>
                <h2 className="text-[18pt] font-bold font-hei mt-4">信息与智能工程学院</h2>
                
                <div className="my-16">
                    <h1 className="text-[26pt] font-bold font-hei">《网络安全综合实践》</h1>
                    <h2 className="text-[22pt] font-bold font-hei mt-4">期末项目大作业报告</h2>
                </div>

                <div className="mt-20 text-[14pt] space-y-4 text-left w-[70%] mx-auto">
                    <div className="flex">
                        <span className="w-36 font-bold">大作业选题：</span>
                        <span className="border-b border-black flex-1 text-center">题目一：企业内网纵深渗透</span>
                    </div>
                    <div className="flex">
                        <span className="w-36 font-bold">专业班级：</span>
                        <span className="border-b border-black flex-1 text-center">计算机科学与技术 2201</span>
                    </div>
                    <div className="flex">
                        <span className="w-36 font-bold">学生学号：</span>
                        <span className="border-b border-black flex-1 text-center">[填写学号]</span>
                    </div>
                    <div className="flex">
                        <span className="w-36 font-bold">学生姓名：</span>
                        <span className="border-b border-black flex-1 text-center">[填写姓名]</span>
                    </div>
                    <div className="flex">
                        <span className="w-36 font-bold">任课老师：</span>
                        <span className="border-b border-black flex-1 text-center">[填写老师]</span>
                    </div>
                </div>

                <div className="mt-20 text-[14pt]">
                    <p>2025年06月</p>
                </div>
            </div>
        </div>
    );
};
