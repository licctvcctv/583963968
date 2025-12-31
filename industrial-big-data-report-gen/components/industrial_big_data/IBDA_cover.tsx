import React from 'react';
import { StudentConfig } from '../../types';

interface Props {
  config: StudentConfig;
}

export const IBDA_cover: React.FC<Props> = ({ config }) => {
  return (
    <div className="page flex flex-col items-center justify-between py-20 text-center h-[297mm] text-black">
      <div className="w-full">
        <h1 className="text-4xl font-bold mb-8 font-serif tracking-widest text-black">齐鲁理工学院</h1>
        <h2 className="text-2xl font-normal mb-20 text-black">大数据学院实验报告</h2>
      </div>

      <div className="flex-1 flex flex-col justify-center w-full max-w-lg">
        <div className="space-y-10 text-xl font-serif text-black">
          <div className="border-b border-black pb-2 flex justify-between">
            <span className="font-bold">课程名称：</span>
            <span>工业大数据分析与应用</span>
          </div>
          <div className="border-b border-black pb-2 flex justify-between">
            <span className="font-bold">实验项目：</span>
            <span className="text-base">工业设备预测性维护数据分析</span>
          </div>
          <div className="border-b border-black pb-2 flex justify-between">
            <span className="font-bold">专业班级：</span>
            <span>{config.className}</span>
          </div>
          <div className="border-b border-black pb-2 flex justify-between">
            <span className="font-bold">学生姓名：</span>
            <span>{config.name}</span>
          </div>
          <div className="border-b border-black pb-2 flex justify-between">
            <span className="font-bold">学号：</span>
            <span>{config.studentId}</span>
          </div>
          <div className="border-b border-black pb-2 flex justify-between">
            <span className="font-bold">指导教师：</span>
            <span>___________</span>
          </div>
        </div>
      </div>

      <div className="text-lg mt-10 text-black">
        <p>{new Date().getFullYear()} 年 {new Date().getMonth() + 1} 月</p>
      </div>
    </div>
  );
};