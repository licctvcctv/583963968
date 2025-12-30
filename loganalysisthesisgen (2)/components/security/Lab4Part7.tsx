import React from 'react';
import { A4Page } from '../shared';
import { KaliTerminal } from './Lab3Part1';

// 实验四 第七部分 - ret2libc 介绍
export const Lab4Part7: React.FC = () => (
    <A4Page id="lab4-part7">
        <p className="text-sm mb-2 font-bold">（三）ret2libc 攻击</p>
        <p className="text-sm mb-3 text-justify leading-relaxed indent-8">
            ret2libc 是一种绕过 NX 保护的攻击技术。当 NX 开启时，我们无法在栈上执行 shellcode，
            但可以利用程序链接的 libc 库中的函数。最常见的目标是调用 system("/bin/sh") 获取 shell。
            ret2libc 攻击根据程序中可用的资源，可以分为以下几种情况：
            类型1是程序有 system 函数和 "/bin/sh" 字符串，可以直接调用；
            类型2是程序只有 system 函数，无 "/bin/sh"，需要用 gets 写入后再调用；
            类型3是程序无 system，但 libc.so 已知，需要泄露 libc 地址后计算 system 地址。
        </p>

        <p className="text-sm mb-2">类型1：程序含有 system 函数和 "/bin/sh" 字符串</p>
        <KaliTerminal>
{`// ret2libc.c
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>

char sh[] = "/bin/sh";

int func() {
    system("abc");  // 程序有 system 函数
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
└─$ gcc -m32 -g -fno-stack-protector -no-pie ret2libc.c -o ret2libc
┌──(kali㉿kali)-[~/lab4]
└─$ objdump -d ret2libc | grep "<system@plt>:"
08049050 <system@plt>:
┌──(kali㉿kali)-[~/lab4]
└─$ objdump -t ret2libc | grep " sh$"
0804c020 g     O .data  00000008              sh`}
        </KaliTerminal>

        <p className="text-sm mb-3 text-justify leading-relaxed indent-8">
            system@plt 地址是 0x08049050，sh 字符串地址是 0x0804c020。
        </p>
    </A4Page>
);

export default Lab4Part7;
