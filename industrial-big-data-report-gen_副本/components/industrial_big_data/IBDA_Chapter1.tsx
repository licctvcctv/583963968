import React from 'react';
import { StudentConfig } from '../../types';
import { getChapter1Text } from './assets/chapter1';

export const IBDA_Chapter1: React.FC<{ config: StudentConfig }> = ({ config }) => {
  const content: any = getChapter1Text(config);

  return (
    <div className="page text-black">
      <h2 className="text-2xl font-bold mb-6 border-b-2 border-black pb-2">一、 作业概述</h2>
      
      <h3 className="text-xl font-bold mt-6 mb-3">1.1 实验背景与意义</h3>
      <p className="mb-4 leading-7 text-justify indent-8 whitespace-pre-line">{content.bg}</p>

      <h3 className="text-xl font-bold mt-6 mb-3">1.2 作业目的与学习目标</h3>
      <p className="mb-4 leading-7 text-justify indent-8 whitespace-pre-line">{content.purpose}</p>

      <h3 className="text-xl font-bold mt-6 mb-3">1.3 总体技术路线</h3>
      <p className="mb-4 leading-7 text-justify indent-8 whitespace-pre-line">{content.route}</p>
      
      <div className="flex flex-col items-center justify-center space-y-2 my-8 font-bold text-sm">
        <div className="border border-black p-3 rounded w-64 text-center bg-gray-50 shadow-sm">数据获取 (CSV + {config.personalizedData.addedRecords}条增量)</div>
        <div className="text-xl">↓</div>
        <div className="border border-black p-3 rounded w-64 text-center bg-gray-50 shadow-sm">预处理 (Linux Shell / Python)</div>
        <div className="text-xl">↓</div>
        <div className="border border-black p-3 rounded w-64 text-center bg-gray-50 shadow-sm">分布式存储 ({config.techStack.database})</div>
        <div className="text-xl">↓</div>
        <div className="border border-black p-3 rounded w-64 text-center bg-gray-50 shadow-sm">离线计算 ({config.techStack.mapReduceAlgorithm})</div>
        <div className="text-xl">↓</div>
        <div className="border border-black p-3 rounded w-64 text-center bg-gray-50 shadow-sm">可视化分析 ({config.analysisFocus.focusArea})</div>
      </div>
      
      <div className="text-center text-sm font-bold mt-2">图 1-1 工业大数据分析技术架构图</div>
    </div>
  );
};