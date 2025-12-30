import React from 'react';
import {
    Lab3Cover,
    Lab3Part1,
    Lab3Part2,
    Lab3Part3,
    Lab3Part4,
    Lab3Part5,
    Lab3Part6,
    Lab3Part7,
    Lab3Part8,
    Lab3Part9,
    Lab3Summary
} from './security';

// 实验三 - ShellCode与函数调用 完整报告
export const SecurityLab3Assignment: React.FC = () => {
    return (
        <div className="font-song text-[12pt] leading-[1.8] text-black">
            <Lab3Cover />
            <Lab3Part1 />
            <Lab3Part2 />
            <Lab3Part3 />
            <Lab3Part4 />
            <Lab3Part5 />
            <Lab3Part6 />
            <Lab3Part7 />
            <Lab3Part8 />
            <Lab3Part9 />
            <Lab3Summary />
        </div>
    );
};

export default SecurityLab3Assignment;
