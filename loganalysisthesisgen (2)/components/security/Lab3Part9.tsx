import React from 'react';
import { A4Page, TERMINAL_COLORS } from '../shared';

// 实验三 第九部分 - 栈帧图示
export const Lab3Part9: React.FC = () => (
    <A4Page id="lab3-part9">
        <p className="text-sm mb-2">步骤7：函数调用时的栈帧结构图解</p>
        <p className="text-sm mb-3 text-justify leading-relaxed indent-8">
            当 main 函数调用 func(1, 2) 时，栈的布局如下图所示。理解这个栈帧结构对于
            后续的栈溢出攻击非常重要，因为攻击者需要精确计算返回地址在栈上的位置。
        </p>

        <div className="bg-gray-900 text-gray-200 p-4 rounded font-mono text-xs my-4">
            <pre>{`高地址 (栈底)
┌─────────────────────────────────────┐
│           main 的栈帧               │
├─────────────────────────────────────┤
│      参数 j = 2                     │  [ebp + 0x0c]
├─────────────────────────────────────┤
│      参数 i = 1                     │  [ebp + 0x08]
├─────────────────────────────────────┤
│      返回地址 (0x080491e7)          │  [ebp + 0x04]  ← 攻击目标!
├─────────────────────────────────────┤
│      saved ebp (0xffffd618)         │  [ebp + 0x00]  ← EBP 指向这里
├─────────────────────────────────────┤
│      局部变量空间                   │  [ebp - 0x04]
├─────────────────────────────────────┤
│      ...                            │
├─────────────────────────────────────┤
│      栈顶                           │  ← ESP 指向这里
└─────────────────────────────────────┘
低地址 (栈顶)`}</pre>
        </div>

        <p className="text-sm mb-3 text-justify leading-relaxed indent-8">
            栈帧结构要点：
        </p>
        <ul className="text-sm mb-3 ml-8 list-disc">
            <li>栈从高地址向低地址增长</li>
            <li>EBP 指向当前栈帧的基址，用于访问参数和局部变量</li>
            <li>参数通过 [ebp+8]、[ebp+12] 等正偏移访问</li>
            <li>局部变量通过 [ebp-4]、[ebp-8] 等负偏移访问</li>
            <li>返回地址位于 [ebp+4]，是栈溢出攻击的关键目标</li>
        </ul>

        <p className="text-sm mb-2">步骤8：cdecl 调用约定总结</p>
        <div className="bg-gray-100 p-3 rounded text-xs mb-3">
            <table className="w-full">
                <thead>
                    <tr className="border-b">
                        <th className="text-left py-1">特性</th>
                        <th className="text-left py-1">cdecl 约定</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="border-b">
                        <td className="py-1">参数传递顺序</td>
                        <td className="py-1">从右到左压栈</td>
                    </tr>
                    <tr className="border-b">
                        <td className="py-1">栈清理责任</td>
                        <td className="py-1">调用者清理（add esp, n）</td>
                    </tr>
                    <tr className="border-b">
                        <td className="py-1">返回值位置</td>
                        <td className="py-1">EAX 寄存器</td>
                    </tr>
                    <tr>
                        <td className="py-1">栈帧指针</td>
                        <td className="py-1">EBP 寄存器</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <p className="text-sm mb-3 text-justify leading-relaxed indent-8">
            从栈帧结构可以看出，如果 func 函数中存在缓冲区溢出漏洞，攻击者可以通过
            覆盖 saved ebp 和返回地址来控制程序的执行流程。这就是栈溢出攻击的基本原理，
            在实验四中我们将利用这个原理实现 ret2text、ret2shellcode 和 ret2libc 攻击。
        </p>
    </A4Page>
);

export default Lab3Part9;
