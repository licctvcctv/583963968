import React from 'react';
import { A4Page, KaliTerminal, CodeBlock } from '../shared';

// 重新导出共享组件，方便其他 Lab3 组件使用
export { KaliTerminal, CodeBlock, UbuntuTerminal } from '../shared';

// 实验三 第一部分 - 实验目的和原理
export const Lab3Part1: React.FC = () => (
    <A4Page id="lab3-part1">
        <h2 className="text-lg font-bold text-center mb-6">实验三 ShellCode与函数调用</h2>

        <h3 className="text-base font-bold mb-3">一、实验目的</h3>
        <p className="text-sm mb-2 indent-8">1. 掌握 shellcode 的概念、编写（生成）、验证方法；</p>
        <p className="text-sm mb-2 indent-8">2. Pwntools 的安装与使用，利用 Pwntools 生成 shellcode；</p>
        <p className="text-sm mb-2 indent-8">3. 掌握函数调用的步骤，理解栈帧的建立和销毁过程；</p>
        <p className="text-sm mb-4 indent-8">4. Linux 下 GDB 常用调试命令的使用。</p>

        <h3 className="text-base font-bold mb-3">二、实验原理</h3>

        <p className="text-sm mb-2 font-bold">（一）ShellCode 概述</p>
        <p className="text-sm mb-3 text-justify leading-relaxed indent-8">
            Shellcode 是一段利用软件漏洞而执行的代码，常用机器语言编写，用于获取目标系统的 shell。
            之所以称为 "shellcode"，是因为这段代码的最终目的通常是启动一个命令行 shell（如 /bin/sh），
            从而让攻击者能够在目标系统上执行任意命令。Shellcode 是漏洞利用（exploit）的核心组成部分，
            它决定了攻击成功后能够执行什么样的操作。
        </p>

        <p className="text-sm mb-3 text-justify leading-relaxed indent-8">
            Shellcode 按照执行的位置分为本地 shellcode 和远程 shellcode。本地 shellcode 通常用于提权，
            攻击者利用高权限程序中的漏洞，获得与目标进程相同的权限；远程 shellcode 则用于攻击网络上的
            另一台主机，通过套接字为攻击者提供 shell 访问。
        </p>

        <p className="text-sm mb-2 font-bold">（二）Shellcode 的特点</p>
        <p className="text-sm mb-3 text-justify leading-relaxed indent-8">
            Shellcode 具有以下特点：位置无关，即 shellcode 必须能在内存的任意位置执行，不能依赖固定地址；
            无空字节，因为很多漏洞利用场景中，空字节会被当作字符串结束符，导致 shellcode 被截断；
            体积小，shellcode 通常需要尽可能小，以适应有限的缓冲区空间；
            自包含，shellcode 不能依赖外部库函数，必须直接使用系统调用。
        </p>

        <p className="text-sm mb-2 font-bold">（三）execve 系统调用</p>
        <p className="text-sm mb-3 text-justify leading-relaxed indent-8">
            execve 函数是 Linux 系统中用于执行新程序的系统调用。它的功能是替换当前进程的映像，
            执行一个新的程序，并从该程序的 main 函数开始执行。函数原型为：
        </p>

        <CodeBlock title="execve 函数原型" language="C">
            {`int execve(const char *pathname, char *const argv[], char *const envp[]);

参数说明：
pathname: 要执行的程序的路径
argv: 字符串数组，包含传递给新程序的命令行参数，以 NULL 结尾
envp: 字符串数组，包含传递给新程序的环境变量，以 NULL 结尾`}
        </CodeBlock>

        <p className="text-sm mb-3 text-justify leading-relaxed indent-8">
            在 32 位 Linux 系统中，execve 的系统调用号是 11（0x0b）。通过 int 0x80 指令触发系统调用时，
            需要将系统调用号放入 eax 寄存器，将参数依次放入 ebx、ecx、edx 寄存器。
            具体来说：EAX = 0x0B（execve 系统调用号），EBX = 程序路径字符串的地址，
            ECX = argv 数组的地址（可以为 0），EDX = envp 数组的地址（可以为 0）。
        </p>
    </A4Page>
);

export default Lab3Part1;
