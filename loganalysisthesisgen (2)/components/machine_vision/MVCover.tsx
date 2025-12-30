import React from 'react';

export const MVCover: React.FC = () => {
    return (
        <div id="mv-cover" className="page bg-white w-[210mm] min-h-[297mm] mx-auto shadow-lg mb-8 p-16 flex flex-col items-center text-center relative capture-as-image">
            <div className="absolute top-16 right-16 border border-black px-2 py-4 shadow-md">
                <div className="text-xl font-bold writing-vertical-rl" style={{ writingMode: 'vertical-rl' }}>
                    《机器视觉及应用》标识定位实验报告
                </div>
            </div>

            <div className="mt-32 w-full">
                <div className="flex text-lg mb-10 justify-center">
                    <span className="w-24 text-right font-bold">题&nbsp;&nbsp;&nbsp;&nbsp;目：</span>
                    <div className="border-b border-black w-96 text-center">基于特征匹配与光流跟踪的AR标识定位</div>
                </div>

                <div className="flex text-lg mb-10 justify-center">
                    <span className="w-24 text-right font-bold">姓&nbsp;&nbsp;&nbsp;&nbsp;名：</span>
                    <div className="border-b border-black w-96 text-center">白智羽</div>
                </div>

                <div className="flex text-lg mb-10 justify-center">
                    <span className="w-24 text-right font-bold">学&nbsp;&nbsp;&nbsp;&nbsp;号：</span>
                    <div className="border-b border-black w-96 text-center">2022XXXXXX</div>
                </div>

                <div className="flex text-lg mb-10 justify-center">
                    <span className="w-24 text-right font-bold">学&nbsp;&nbsp;&nbsp;&nbsp;院：</span>
                    <div className="border-b border-black w-96 text-center">机械工程及自动化学院</div>
                </div>

                <div className="flex text-lg mb-10 justify-center">
                    <span className="w-24 text-right font-bold">专&nbsp;&nbsp;&nbsp;&nbsp;业：</span>
                    <div className="border-b border-black w-96 text-center">机器人工程</div>
                </div>

                <div className="flex text-lg mb-10 justify-center">
                    <span className="w-24 text-right font-bold">年&nbsp;&nbsp;&nbsp;&nbsp;级：</span>
                    <div className="border-b border-black w-96 text-center">2025</div>
                </div>

                <div className="flex text-lg mb-10 justify-center">
                    <span className="w-24 text-right font-bold">指导教师：</span>
                    <div className="border-b border-black w-96 text-center"></div>
                </div>

                <div className="mt-20 text-lg">
                    <span>2025年 12 月 19 日</span>
                </div>
            </div>
        </div>
    );
};
