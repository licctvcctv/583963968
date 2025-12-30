import React from 'react';
import { A4Page } from '../shared';

// 实验三 总结
export const Lab3Summary: React.FC = () => (
    <A4Page id="lab3-summary">
        <h3 className="text-base font-bold mb-3">四、实验总结</h3>
        
        <p className="text-sm mb-3 text-justify leading-relaxed indent-8">
            通过本次实验，我系统地学习了 shellcode 的概念、编写方法和函数调用的底层原理，
            为后续的二进制漏洞利用实验打下了坚实的基础。
        </p>

        <p className="text-sm mb-2 font-bold">（一）Shellcode 编写</p>
        <p className="text-sm mb-3 text-justify leading-relaxed indent-8">
            Shellcode 是一段精心构造的机器码，用于在漏洞利用过程中执行特定功能（通常是获取 shell）。
            编写 shellcode 需要满足以下要求：位置无关（不依赖固定地址）、无空字节（避免字符串截断）、
            体积小（适应有限的缓冲区）、自包含（直接使用系统调用）。
        </p>

        <p className="text-sm mb-2 font-bold">（二）手动编写 vs pwntools</p>
        <p className="text-sm mb-3 text-justify leading-relaxed indent-8">
            本实验中，我使用两种方法生成 shellcode：手动编写汇编代码得到 23 字节的精简 shellcode，
            使用 pwntools 的 shellcraft 模块生成 44 字节的功能完整 shellcode。
            手动编写适合空间受限的场景，pwntools 适合快速开发和 CTF 比赛。
        </p>

        <p className="text-sm mb-2 font-bold">（三）execve 系统调用</p>
        <p className="text-sm mb-3 text-justify leading-relaxed indent-8">
            execve 是 Linux 系统中执行新程序的系统调用，系统调用号为 11（0x0b）。
            在 32 位系统中，通过 int 0x80 触发系统调用，参数通过 EBX、ECX、EDX 寄存器传递。
            shellcode 的核心就是构造 execve("/bin/sh", NULL, NULL) 调用。
        </p>

        <p className="text-sm mb-2 font-bold">（四）函数调用机制</p>
        <p className="text-sm mb-3 text-justify leading-relaxed indent-8">
            通过分析 funcall.c 程序，我深入理解了 x86 架构下的函数调用过程：
            参数从右到左压入栈中，call 指令保存返回地址并跳转，被调用函数保存旧 EBP 并建立新栈帧，
            通过 EBP+偏移 访问参数，leave 和 ret 指令恢复执行流程。
        </p>

        <p className="text-sm mb-2 font-bold">（五）栈帧结构</p>
        <p className="text-sm mb-3 text-justify leading-relaxed indent-8">
            函数调用时的栈帧结构为：高地址依次是参数、返回地址、saved EBP、局部变量，低地址是栈顶。
            返回地址位于 [ebp+4]，是栈溢出攻击的关键目标。通过覆盖返回地址，
            攻击者可以控制程序的执行流程，这是 ret2text、ret2shellcode、ret2libc 攻击的基础。
        </p>

        <p className="text-sm mb-2 font-bold">（六）GDB 调试技能</p>
        <p className="text-sm mb-3 text-justify leading-relaxed indent-8">
            本实验中使用了 GDB 的多个功能：break 设置断点、run 运行程序、info registers 查看寄存器、
            x/nx 查看内存内容、next 单步执行、continue 继续运行。这些调试技能对于漏洞分析和利用开发至关重要。
        </p>
    </A4Page>
);

export default Lab3Summary;
