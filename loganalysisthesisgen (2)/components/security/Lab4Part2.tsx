import React from 'react';
import { A4Page } from '../shared';
import { KaliTerminal, UbuntuTerminal } from './Lab3Part1';

// 实验四 第二部分 - 实验环境和 ret2text 开始
export const Lab4Part2: React.FC = () => (
    <A4Page id="lab4-part2">
        <h3 className="text-base font-bold mb-3">三、实验环境</h3>
        <p className="text-sm mb-3 text-justify leading-relaxed indent-8">
            操作系统：Kali Linux 2024 (64-bit)；编译器：GCC 15.2.0；
            调试工具：GDB + Pwndbg；漏洞利用框架：pwntools 4.15.0；目标架构：i386 (32-bit)。
        </p>

        <h3 className="text-base font-bold mb-3">四、实验步骤</h3>

        <p className="text-sm mb-2 font-bold">（一）ret2text 攻击</p>
        <p className="text-sm mb-3 text-justify leading-relaxed indent-8">
            ret2text 是最简单的 ROP 攻击形式。当程序中存在一个可以获取 shell 的函数时，
            我们只需要通过栈溢出覆盖返回地址，使程序跳转到该函数执行即可。
        </p>

        <p className="text-sm mb-2">步骤0：关闭 ASLR 保护</p>
        <UbuntuTerminal title="kali@kali:~/lab4" user="kali" host="kali" cwd="~/lab4">
            {`┌──(kali㉿kali)-[~/lab4]
└─$ cat /proc/sys/kernel/randomize_va_space
2
┌──(kali㉿kali)-[~/lab4]
└─$ echo 0 | sudo tee /proc/sys/kernel/randomize_va_space
0
┌──(kali㉿kali)-[~/lab4]
└─$ cat /proc/sys/kernel/randomize_va_space
0`}
        </UbuntuTerminal>

        <p className="text-sm mb-2">步骤1：编写漏洞程序 ret2text.c</p>
        <p className="text-sm mb-3 text-justify leading-relaxed indent-8">
            这个程序包含一个 func 函数，它会调用 system(sh)，其中 sh 是全局变量 "/bin/sh"。
            dofunc 函数存在栈溢出漏洞：buf 只有 8 字节，但 read 函数读取 256 字节。
        </p>

        <KaliTerminal>
            {`// ret2text.c
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>

char sh[] = "/bin/sh";

int func() {
    system(sh);
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
    </A4Page>
);

export default Lab4Part2;
