import React from 'react';
import { A4Page, KaliTerminal } from '../shared';

// 实验三 第四部分 - 编译汇编代码
export const Lab3Part4: React.FC = () => (
    <A4Page id="lab3-part4">
        <p className="text-sm mb-2">步骤4：编译和链接汇编代码</p>
        <KaliTerminal>
{`┌──(kali㉿kali)-[~/lab3]
└─$ nasm -f elf32 -o shellcode.o shellcode.asm
┌──(kali㉿kali)-[~/lab3]
└─$ ld -m elf_i386 shellcode.o -o shellcode1
┌──(kali㉿kali)-[~/lab3]
└─$ ./shellcode1
$ whoami
kali
$ exit`}
        </KaliTerminal>

        <p className="text-sm mb-3 text-justify leading-relaxed indent-8">
            汇编程序测试成功，手动编写的汇编代码成功执行，获取了 shell 环境。
        </p>

        <p className="text-sm mb-2">步骤5：使用 objdump 提取机器码</p>
        <KaliTerminal>
{`┌──(kali㉿kali)-[~/lab3]
└─$ objdump -d shellcode1

shellcode1:     file format elf32-i386

Disassembly of section .text:

08049000 <_start>:
 8049000:	31 c9                	xor    %ecx,%ecx
 8049002:	31 d2                	xor    %edx,%edx
 8049004:	52                   	push   %edx
 8049005:	68 2f 2f 73 68       	push   $0x68732f2f
 804900a:	68 2f 62 69 6e       	push   $0x6e69622f
 804900f:	89 e3                	mov    %esp,%ebx
 8049011:	31 c0                	xor    %eax,%eax
 8049013:	b0 0b                	mov    $0xb,%al
 8049015:	cd 80                	int    $0x80`}
        </KaliTerminal>

        <p className="text-sm mb-3 text-justify leading-relaxed indent-8">
            从 objdump 的输出中，我们可以提取出每条指令的机器码。将这些机器码按顺序拼接起来，
            就得到了完整的 shellcode：\x31\xc9\x31\xd2\x52\x68\x2f\x2f\x73\x68\x68\x2f\x62\x69\x6e\x89\xe3\x31\xc0\xb0\x0b\xcd\x80，
            总长度为 23 字节，不包含 NULL 字节。
        </p>
    </A4Page>
);

export default Lab3Part4;
