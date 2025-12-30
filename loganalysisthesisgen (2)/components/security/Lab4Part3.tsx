import React from 'react';
import { A4Page } from '../shared';
import { KaliTerminal } from './Lab3Part1';

// 实验四 第三部分 - ret2text 编译和分析
export const Lab4Part3: React.FC = () => (
    <A4Page id="lab4-part3">
        <p className="text-sm mb-2">步骤2：编译程序并检查保护机制</p>
        <KaliTerminal>
{`┌──(kali㉿kali)-[~/lab4]
└─$ gcc -m32 -fno-stack-protector -no-pie ret2text.c -o ret2text
┌──(kali㉿kali)-[~/lab4]
└─$ checksec --file=ret2text
[*] '/home/kali/lab4/ret2text'
    Arch:     i386-32-little
    RELRO:    Partial RELRO
    Stack:    No canary found
    NX:       NX enabled
    PIE:      No PIE (0x8048000)`}
        </KaliTerminal>

        <p className="text-sm mb-3 text-justify leading-relaxed indent-8">
            从 checksec 的输出可以看出：没有栈保护（No canary），可以直接覆盖返回地址；
            NX 开启，栈不可执行，无法使用 ret2shellcode；没有 PIE，程序地址固定，
            可以直接使用 objdump 获取的地址。
        </p>

        <p className="text-sm mb-2">步骤3：使用 objdump 获取 func 函数地址</p>
        <KaliTerminal>
{`┌──(kali㉿kali)-[~/lab4]
└─$ objdump -d ret2text | grep -A5 "<func>:"
08049186 <func>:
 8049186:	55                   	push   %ebp
 8049187:	89 e5                	mov    %esp,%ebp
 8049189:	53                   	push   %ebx
 804918a:	83 ec 04             	sub    $0x4,%esp`}
        </KaliTerminal>

        <p className="text-sm mb-3 text-justify leading-relaxed indent-8">
            func 函数的地址是 0x08049186。
        </p>

        <p className="text-sm mb-2">步骤4：分析 dofunc 函数，确定 buf 与 ebp 的距离</p>
        <KaliTerminal>
{`┌──(kali㉿kali)-[~/lab4]
└─$ objdump -d ret2text | grep -A15 "<dofunc>:"
080491b5 <dofunc>:
 80491b5:	55                   	push   %ebp
 80491b6:	89 e5                	mov    %esp,%ebp
 80491b8:	53                   	push   %ebx
 80491b9:	83 ec 14             	sub    $0x14,%esp
 ...
 80491c7:	c7 45 f0 00 00 00 00 	movl   $0x0,-0x10(%ebp)
 ...
 80491ef:	8d 45 f0             	lea    -0x10(%ebp),%eax`}
        </KaliTerminal>

        <p className="text-sm mb-3 text-justify leading-relaxed indent-8">
            从反汇编可以看出，buf 位于 ebp-0x10 的位置。因此需要填充 0x10（16）字节覆盖 buf，
            再填充 4 字节覆盖 saved ebp，总共 20 字节后就是返回地址。
        </p>
    </A4Page>
);

export default Lab4Part3;
