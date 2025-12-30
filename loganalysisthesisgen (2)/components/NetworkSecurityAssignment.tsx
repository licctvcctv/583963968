import React from 'react';
import { NSCover } from './network_security/NSCover';
import { NS01_Background } from './network_security/NS01_Background';
import { NS02_Requirements } from './network_security/NS02_Requirements';
import { NS03_Design } from './network_security/NS03_Design';
import { NS04_DetailDesign } from './network_security/NS04_DetailDesign';
import { NS05_Implementation } from './network_security/NS05_Implementation';
import { NS06_Results } from './network_security/NS06_Results';
import { NS07_Testing } from './network_security/NS07_Testing';
import { NS08_Summary } from './network_security/NS08_Summary';

// 网络安全综合实践期末大作业 - 题目一：企业内网纵深渗透
export const NetworkSecurityAssignment: React.FC = () => {
    return (
        <div className="font-song text-[12pt] leading-[1.8] text-black">
            <NSCover />
            <NS01_Background />
            <NS02_Requirements />
            <NS03_Design />
            <NS04_DetailDesign />
            <NS05_Implementation />
            <NS06_Results />
            <NS07_Testing />
            <NS08_Summary />
        </div>
    );
};

export default NetworkSecurityAssignment;
