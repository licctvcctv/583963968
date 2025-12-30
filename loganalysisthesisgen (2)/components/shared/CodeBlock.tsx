import React from 'react';
import { TERMINAL_COLORS } from './Terminal';

// ============================================
// 代码块组件 - 用于显示源代码
// ============================================
interface CodeBlockProps {
    title?: string;
    children: string;
    language?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ title, children }) => (
    <div className="w-full rounded overflow-hidden my-4 font-mono text-sm capture-as-image text-left border"
         style={{ backgroundColor: TERMINAL_COLORS.kali.background, borderColor: TERMINAL_COLORS.kali.border }}>
        {title && (
            <div className="px-3 py-1 text-xs border-b"
                 style={{ backgroundColor: '#1f2937', color: TERMINAL_COLORS.common.textMuted, borderColor: TERMINAL_COLORS.kali.border }}>
                {title}
            </div>
        )}
        <div className="p-3 font-mono leading-relaxed text-xs"
             style={{ backgroundColor: TERMINAL_COLORS.kali.background }}>
            <div className="whitespace-pre-wrap" style={{ color: '#d0d0d0' }}>{children}</div>
        </div>
    </div>
);

export default CodeBlock;
