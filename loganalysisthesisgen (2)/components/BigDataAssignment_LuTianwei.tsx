import React from 'react';
import { BigDataCover } from './bigdata/BigDataCover';
import { BigDataTask1 } from './bigdata/BigDataTask1';
import { BigDataTask1_Part2 } from './bigdata/BigDataTask1_Part2';
import { BigDataTask1_Summary } from './bigdata/BigDataTask1_Summary';
import { BigDataTask2 } from './bigdata/BigDataTask2';
import { BigDataTask2_Part2 } from './bigdata/BigDataTask2_Part2';

// 大数据课程大作业 - 卢天威
export const BigDataAssignment_LuTianwei: React.FC = () => {
    return (
        <div className="font-song text-[12pt] leading-[1.8] text-black">
            <BigDataCover />
            <BigDataTask1 />
            <BigDataTask1_Part2 />
            <BigDataTask1_Summary />
            <BigDataTask2 />
            <BigDataTask2_Part2 />
        </div>
    );
};

export default BigDataAssignment_LuTianwei;
