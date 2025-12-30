import React from 'react';
import { A4Page } from '../shared';

// 实验三封面
export const Lab3Cover: React.FC = () => (
    <A4Page id="lab3-cover">
        <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="mb-16">
                <h1 className="text-2xl font-bold mb-4">逆向工程</h1>
                <h2 className="text-xl font-bold">实验三 ShellCode与函数调用</h2>
            </div>
            
            <div className="text-lg space-y-4 mt-8">
                <div className="flex justify-center gap-4">
                    <span className="font-bold">班级：</span>
                    <span className="border-b border-black px-8">智慧信安2101B</span>
                </div>
                <div className="flex justify-center gap-4">
                    <span className="font-bold">姓名：</span>
                    <span className="border-b border-black px-8">___________</span>
                </div>
                <div className="flex justify-center gap-4">
                    <span className="font-bold">学号：</span>
                    <span className="border-b border-black px-8">___________</span>
                </div>
            </div>
        </div>
    </A4Page>
);

export default Lab3Cover;
