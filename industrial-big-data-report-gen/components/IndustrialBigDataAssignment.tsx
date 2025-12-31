import React from 'react';
import { StudentConfig } from '../types';
import { STUDENTS, BASE_STATS } from './industrial_big_data/IBDA_config';
import { IBDA_cover } from './industrial_big_data/IBDA_cover';
import { IBDA_Abstract } from './industrial_big_data/IBDA_Abstract';
import { IBDA_Chapter1 } from './industrial_big_data/IBDA_Chapter1';
import { IBDA_Chapter2 } from './industrial_big_data/IBDA_Chapter2';
import { IBDA_Chapter3 } from './industrial_big_data/IBDA_Chapter3';
import { IBDA_Chapter4 } from './industrial_big_data/IBDA_Chapter4';
import { IBDA_Chapter5 } from './industrial_big_data/IBDA_Chapter5';
import { IBDA_Chapter6 } from './industrial_big_data/IBDA_Chapter6';
import { IBDA_Chapter7 } from './industrial_big_data/IBDA_Chapter7';
import { IBDA_Chapter8 } from './industrial_big_data/IBDA_Chapter8';

interface Props { variantId: 1 | 2 | 3 | 4; }

const IndustrialBigDataAssignment: React.FC<Props> = ({ variantId }) => {
  const config: StudentConfig = STUDENTS[variantId];
  return (
    <div className="w-full max-w-[210mm] mx-auto bg-gray-100 pb-10 print:bg-white print:pb-0">
      <div id="ibda-cover"><IBDA_cover config={config} /></div>
      <div id="ibda-abstract"><IBDA_Abstract config={config} /></div>
      <div id="ibda-chapter1"><IBDA_Chapter1 config={config} /></div>
      <div id="ibda-chapter2"><IBDA_Chapter2 config={config} /></div>
      <div id="ibda-chapter3"><IBDA_Chapter3 config={config} /></div>
      <div id="ibda-chapter4"><IBDA_Chapter4 config={config} /></div>
      <div id="ibda-chapter5"><IBDA_Chapter5 config={config} /></div>
      <div id="ibda-chapter6"><IBDA_Chapter6 config={config} stats={BASE_STATS} /></div>
      <div id="ibda-chapter7"><IBDA_Chapter7 config={config} stats={BASE_STATS} /></div>
      <div id="ibda-chapter8"><IBDA_Chapter8 config={config} /></div>
    </div>
  );
};
export default IndustrialBigDataAssignment;