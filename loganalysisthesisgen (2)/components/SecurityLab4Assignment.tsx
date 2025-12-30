import React from 'react';
import {
    Lab4Cover,
    Lab4Part1,
    Lab4Part2,
    Lab4Part3,
    Lab4Part4,
    Lab4Part5,
    Lab4Part6,
    Lab4Part7,
    Lab4Part8,
    Lab4Part9,
    Lab4Part10,
    Lab4Part11,
    Lab4Part12,
    Lab4Summary
} from './security';

// 实验四 - 二进制漏洞挖掘 完整报告
export const SecurityLab4Assignment: React.FC = () => {
    return (
        <div className="font-song text-[12pt] leading-[1.8] text-black">
            <Lab4Cover />
            <Lab4Part1 />
            <Lab4Part2 />
            <Lab4Part3 />
            <Lab4Part4 />
            <Lab4Part5 />
            <Lab4Part6 />
            <Lab4Part7 />
            <Lab4Part8 />
            <Lab4Part9 />
            <Lab4Part10 />
            <Lab4Part11 />
            <Lab4Part12 />
            <Lab4Summary />
        </div>
    );
};

export default SecurityLab4Assignment;
