import React from 'react';
import { A4Page } from '../shared';
import { KaliTerminal } from './Lab3Part1';

// 实验四 第五部分 - ret2shellcode
export const Lab4Part5: React.FC = () => (
    <A4Page id="lab4-part5">
        <p className="text-sm mb-2 font-bold">（二）ret2shellcode 攻击</p>
        <p className="text-sm mb-3 text-justify leading-relaxed indent-8">
            ret2shellcode 是将 shellcode 注入到内存中，然后通过覆盖返回地址跳转到 shellcode 执行。
            这种攻击方式需要目标内存区域具有可执行权限，即 NX 保护关闭。
        </p>

        <p className="text-sm mb-2">步骤1：编写漏洞程序 ret2shellcode1.c</p>
        <KaliTerminal>
{`// ret2shellcode1.c
#include <stdio.h>

extern char *gets(char *s);

void main(int argc, char* argv[]) {
    char buf[0x500];
    gets(buf);
    ((void(*)(void))buf)();
}`}
        </KaliTerminal>

        <p className="text-sm mb-3 text-justify leading-relaxed indent-8">
            这个程序读取用户输入到 buf 中，然后直接将 buf 作为函数指针调用。
            如果我们输入 shellcode，程序就会执行它。
        </p>

        <p className="text-sm mb-2">步骤2：编译程序（开启栈执行权限）</p>
        <KaliTerminal>
{`┌──(kali㉿kali)-[~/lab4]
└─$ gcc -m32 -g -fno-stack-protector -z execstack -no-pie ret2shellcode1.c -o ret2shellcode1
┌──(kali㉿kali)-[~/lab4]
└─$ checksec --file=ret2shellcode1
[*] '/home/kali/lab4/ret2shellcode1'
    Arch:     i386-32-little
    RELRO:    Partial RELRO
    Stack:    No canary found
    NX:       NX disabled
    PIE:      No PIE (0x8048000)
    RWX:      Has RWX segments`}
        </KaliTerminal>

        <p className="text-sm mb-3 text-justify leading-relaxed indent-8">
            NX disabled 表示栈可执行，可以在栈上执行 shellcode。
        </p>
    </A4Page>
);

export default Lab4Part5;
