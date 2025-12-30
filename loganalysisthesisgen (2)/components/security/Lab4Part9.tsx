import React from 'react';
import { A4Page } from '../shared';
import { KaliTerminal } from './Lab3Part1';

// 实验四 第九部分 - ret2libc 类型2
export const Lab4Part9: React.FC = () => (
    <A4Page id="lab4-part9">
        <p className="text-sm mb-2">类型2：程序只有 system 函数，没有 "/bin/sh" 字符串</p>
        <p className="text-sm mb-3 text-justify leading-relaxed indent-8">
            当程序中有 system 函数但没有 "/bin/sh" 字符串时，我们需要通过 gets 函数将 "/bin/sh" 
            写入到程序的某个可写内存区域（如 .bss 段），然后再调用 system。
            这就需要用到函数链式调用技术：先调用 gets(sh) 将 "/bin/sh" 写入 bss 段，
            然后调用 system(sh) 执行命令。
        </p>

        <KaliTerminal>
{`// ret2libc1.c
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>

char sh[100];  // bss 段的缓冲区

int func() {
    system("echo hello");
    return 0;
}

int dofunc() {
    char buf[8] = {};
    puts("input:");
    read(0, buf, 0x100);
    return 0;
}

int main(int argc, char* argv[]) {
    dofunc();
    return 0;
}`}
        </KaliTerminal>

        <p className="text-sm mb-2">步骤1：编译并获取关键地址</p>
        <KaliTerminal>
{`┌──(kali㉿kali)-[~/lab4]
└─$ gcc -m32 -g -fno-stack-protector -no-pie ret2libc1.c -o ret2libc1
┌──(kali㉿kali)-[~/lab4]
└─$ objdump -d ret2libc1 | grep -E "<(gets|system)@plt>:"
08049040 <gets@plt>:
08049060 <system@plt>:
┌──(kali㉿kali)-[~/lab4]
└─$ objdump -t ret2libc1 | grep " sh$"
0804c040 g     O .bss   00000064              sh`}
        </KaliTerminal>

        <p className="text-sm mb-3 text-justify leading-relaxed indent-8">
            gets@plt 地址是 0x08049040，system@plt 地址是 0x08049060，sh 缓冲区地址是 0x0804c040。
        </p>
    </A4Page>
);

export default Lab4Part9;
