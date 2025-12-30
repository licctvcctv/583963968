import React from 'react';

interface A4PageProps {
    id?: string;
    children: React.ReactNode;
}

// A4 页面组件 - 模拟 A4 纸张样式
export const A4Page: React.FC<A4PageProps> = ({ id, children }) => (
    <div
        id={id}
        className="bg-white w-[210mm] min-h-[297mm] mx-auto my-8 p-[25mm] shadow-lg print:shadow-none print:my-0 print:p-[20mm]"
        style={{
            boxSizing: 'border-box',
        }}
    >
        {children}
    </div>
);

export default A4Page;
