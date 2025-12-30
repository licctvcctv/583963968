import React from 'react';
import { A4Page } from '../shared';

// 实验四 第一部分 - 实验目的和原理
export const Lab4Part1: React.FC = () => (
    <A4Page id="lab4-part1">
        <h2 className="text-lg font-bold text-center mb-6">实验四 二进制漏洞挖掘</h2>
        
        <h3 className="text-base font-bold mb-3">一、实验目的</h3>
        <p className="text-sm mb-2 indent-8">1. 掌握 Python 中的 pwntools 工具，利用 pwntools 生成 shellcode 和编写漏洞利用脚本；</p>
        <p className="text-sm mb-2 indent-8">2. 掌握 ROP 攻击的三种形式：ret2text、ret2shellcode、ret2libc；</p>
        <p className="text-sm mb-2 indent-8">3. 理解栈溢出漏洞的原理和利用方法，掌握漏洞利用的基本流程；</p>
        <p className="text-sm mb-4 indent-8">4. 了解 Linux 系统的安全保护机制及其绕过方法。</p>

        <h3 className="text-base font-bold mb-3">二、实验原理</h3>
        
        <p className="text-sm mb-2 font-bold">（一）pwntools 简介</p>
        <p className="text-sm mb-3 text-justify leading-relaxed indent-8">
            pwntools 是一个用于 CTF 比赛和漏洞利用开发的 Python 库。它提供了丰富的功能，
            包括本地程序执行、远程程序连接、shellcode 生成、ROP 链构建、ELF 文件解析等。
            常用函数包括：process() 连接本地程序，remote() 连接远程主机，send()/sendline() 发送数据，
            recv()/recvline() 接收数据，p32()/p64() 将整数转换为小端序字节，
            u32()/u64() 将字节转换为整数，ELF() 解析 ELF 文件，flat() 打包数据，
            asm(shellcraft.sh()) 生成 shellcode，interactive() 进入交互模式。
        </p>

        <p className="text-sm mb-2 font-bold">（二）Linux 安全保护机制</p>
        <p className="text-sm mb-3 text-justify leading-relaxed indent-8">
            现代 Linux 系统提供了多种安全保护机制来防止漏洞利用。NX（No-Execute）将内存区域标记为不可执行，
            攻击者无法在栈、堆等区域执行注入的 shellcode，编译时使用 -z execstack 可关闭此保护。
            Canary（栈保护）在栈上的返回地址前插入一个随机值，函数返回前检查该值是否被修改，
            编译时使用 -fno-stack-protector 可关闭此保护。PIE（位置无关可执行文件）使程序每次加载时基地址随机，
            编译时使用 -no-pie 可关闭此保护。ASLR（地址空间布局随机化）随机化栈、堆、共享库的加载地址，
            通过 echo 0 &gt; /proc/sys/kernel/randomize_va_space 可关闭此保护。
        </p>

        <p className="text-sm mb-2 font-bold">（三）ROP 攻击概述</p>
        <p className="text-sm mb-3 text-justify leading-relaxed indent-8">
            ROP（Return Oriented Programming）是一种高级的漏洞利用技术。当 NX 保护开启时，
            攻击者无法直接执行注入的 shellcode，但可以利用程序中已有的代码片段来构造攻击链。
            ROP 攻击主要有三种形式：ret2text 返回到程序自身的代码段执行已有的函数；
            ret2shellcode 返回到注入的 shellcode 执行，需要 NX 保护关闭；
            ret2libc 返回到 libc 库中的函数执行，通常是调用 system("/bin/sh")。
        </p>
    </A4Page>
);

export default Lab4Part1;
