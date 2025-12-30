import React from 'react';
import { A4Page, KaliTerminal } from '../shared';

// 实验三 第八部分 - main 函数分析
export const Lab3Part8: React.FC = () => (
    <A4Page id="lab3-part8">
        <p className="text-sm mb-2">步骤4：分析 main 函数中的函数调用过程</p>
        <KaliTerminal>
{`┌──(kali㉿kali)-[~/lab3]
└─$ objdump -d funcall | grep -A25 "<main>:"
080491bc <main>:
 80491bc:	8d 4c 24 04          	lea    0x4(%esp),%ecx
 80491c0:	83 e4 f0             	and    $0xfffffff0,%esp
 80491c3:	ff 71 fc             	push   -0x4(%ecx)
 80491c6:	55                   	push   %ebp
 80491c7:	89 e5                	mov    %esp,%ebp
 80491c9:	53                   	push   %ebx
 80491ca:	51                   	push   %ecx
 80491cb:	83 ec 10             	sub    $0x10,%esp
 80491ce:	c7 45 f0 01 00 00 00 	movl   $0x1,-0x10(%ebp)
 80491d5:	c7 45 f4 02 00 00 00 	movl   $0x2,-0xc(%ebp)
 80491dc:	ff 75 f4             	push   -0xc(%ebp)
 80491df:	ff 75 f0             	push   -0x10(%ebp)
 80491e2:	e8 bf ff ff ff       	call   80491a6 <func>
 80491e7:	83 c4 08             	add    $0x8,%esp
 80491ea:	89 45 f8             	mov    %eax,-0x8(%ebp)`}
        </KaliTerminal>

        <p className="text-sm mb-3 text-justify leading-relaxed indent-8">
            main 函数调用 func 的过程分析：
        </p>
        <ul className="text-sm mb-3 ml-8 list-disc">
            <li>movl $0x1, -0x10(%ebp)：将 i=1 存储在 [ebp-16]</li>
            <li>movl $0x2, -0xc(%ebp)：将 j=2 存储在 [ebp-12]</li>
            <li>push -0xc(%ebp)：先压入参数 j（从右到左压栈）</li>
            <li>push -0x10(%ebp)：再压入参数 i</li>
            <li>call 80491a6：调用 func，同时将返回地址压栈</li>
            <li>add $0x8, %esp：调用返回后清理栈上的两个参数（8字节）</li>
            <li>mov %eax, -0x8(%ebp)：将返回值存入 res 变量</li>
        </ul>

        <p className="text-sm mb-2">步骤5：使用 GDB 动态调试观察栈帧变化</p>
        <KaliTerminal>
{`┌──(kali㉿kali)-[~/lab3]
└─$ gdb -q funcall
Reading symbols from funcall...
(gdb) break func
Breakpoint 1 at 0x80491ac: file funcall.c, line 4.
(gdb) run
Starting program: /home/kali/lab3/funcall

Breakpoint 1, func (i=1, j=2) at funcall.c:4
4	    return i + j;
(gdb) info registers ebp esp eax
ebp            0xffffd5f8          0xffffd5f8
esp            0xffffd5e8          0xffffd5e8
eax            0xf7fb4ff4          -134524940
(gdb) x/8x $ebp
0xffffd5f8:	0xffffd618	0x080491e7	0x00000001	0x00000002
0xffffd608:	0x00000000	0xf7c21519	0x00000001	0xffffd6b4`}
        </KaliTerminal>

        <p className="text-sm mb-3 text-justify leading-relaxed indent-8">
            GDB 调试结果分析：在 func 函数入口处查看栈内容，可以看到：
        </p>
        <ul className="text-sm mb-3 ml-8 list-disc">
            <li>[ebp+0x00] = 0xffffd618：保存的调用者 ebp（main 的栈基址）</li>
            <li>[ebp+0x04] = 0x080491e7：返回地址（call 指令的下一条指令地址）</li>
            <li>[ebp+0x08] = 0x00000001：第一个参数 i = 1</li>
            <li>[ebp+0x0c] = 0x00000002：第二个参数 j = 2</li>
        </ul>

        <p className="text-sm mb-2">步骤6：继续执行并观察返回值</p>
        <KaliTerminal>
{`(gdb) next
5	}
(gdb) info registers eax
eax            0x3                 3
(gdb) continue
Continuing.
res:3 
[Inferior 1 (process 12345) exited normally]
(gdb) quit`}
        </KaliTerminal>

        <p className="text-sm mb-3 text-justify leading-relaxed indent-8">
            执行 i + j 后，返回值 3 被存储在 EAX 寄存器中。这验证了 cdecl 调用约定：
            返回值通过 EAX 寄存器传递。
        </p>
    </A4Page>
);

export default Lab3Part8;
