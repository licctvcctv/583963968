import React from 'react';
import { IBDA_Cover, IBDA_Abstract } from './industrial_big_data/IBDA_cover';
import { IBDASection1Overview } from './industrial_big_data/IBDA_section1_overview';
import { IBDASection2DataPrep } from './industrial_big_data/IBDA_section2_data_prep';
import { IBDASection3Preprocessing } from './industrial_big_data/IBDA_section3_preprocessing';
import { IBDASection4Storage } from './industrial_big_data/IBDA_section4_storage';
import { IBDA_Section5Analysis } from './industrial_big_data/IBDA_section5_analysis';
import { IBDA_Section6Visualization } from './industrial_big_data/IBDA_section6_visualization';
import { IBDA_Section7Results } from './industrial_big_data/IBDA_section7_results';
import { IBDA_Section8Summary } from './industrial_big_data/IBDA_section8_summary';

interface IndustrialBigDataAssignmentProps {
    variantId?: number;
}

// 工业大数据分析课程大作业
export const IndustrialBigDataAssignment: React.FC<IndustrialBigDataAssignmentProps> = ({ variantId = 1 }) => {
    return (
        <div className="font-song text-[12pt] leading-[1.8] text-black">
            <IBDA_Cover variantId={variantId} />
            <IBDA_Abstract variantId={variantId} />
            <IBDASection1Overview variantId={variantId} />
            <IBDASection2DataPrep variantId={variantId} />
            <IBDASection3Preprocessing variantId={variantId} />
            <IBDASection4Storage variantId={variantId} />
            <IBDA_Section5Analysis variantId={variantId} />
            <IBDA_Section6Visualization variantId={variantId} />
            <IBDA_Section7Results variantId={variantId} />
            <IBDA_Section8Summary variantId={variantId} />
        </div>
    );
};

export default IndustrialBigDataAssignment;
