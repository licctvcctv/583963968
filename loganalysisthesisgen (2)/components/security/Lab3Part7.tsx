import React from 'react';
import { A4Page, KaliTerminal, CodeBlock } from '../shared';

// 实验三 第七部分 - 函数调用分析
export const Lab3Part7: React.FC = () => (
    <A4Page id="lab3-part7">
        <p className="text-sm mb-2 font-bold">方法3：函数调用过程分析</p>
        <p className="text-sm mb-3 text-justify leading-relaxed indent-8">
            为了深入理解函数调用的底层机制，我们编写一个简单的程序，通过反汇编和 GDB 调试
            观察函数调用过程中栈帧的建立和销毁过程。这对于理解栈溢出攻击原理至关重要。
        </p>

        <p className="text-sm mb-2">步骤1：编写测试程序</p>
        <CodeBlock title="funcall.c">
{`#include <stdio.h>

int func(int i, int j) {
    return i + j;
}

int main(int argc, char* argv[]) {
    int i = 1;
    int j = 2;
    int res = func(i, j);
    printf("res:%d \\n", res);
    return 0;
}`}
        </CodeBlock>

        <p className="text-sm mb-2">步骤2：编译程序（保留调试信息，关闭优化）</p>
        <KaliTerminal>
{`┌──(kali㉿kali)-[~/lab3]
└─$ gcc -m32 -g funcall.c -o funcall
┌──(kali㉿kali)-[~/lab3]
└─$ ./funcall
res:3`}
        </KaliTerminal>

        <p className="text-sm mb-2">步骤3：使用 objdump 分析 func 函数的汇编代码</p>
        <KaliTerminal>
{`┌──(kali㉿kali)-[~/lab3]
└─$ objdump -d funcall | grep -A15 "<func>:"
080491a6 <func>:
 80491a6:	55                   	push   %ebp
 80491a7:	89 e5                	mov    %esp,%ebp
 80491a9:	83 ec 10             	sub    $0x10,%esp
 80491ac:	8b 55 08             	mov    0x8(%ebp),%edx
 80491af:	8b 45 0c             	mov    0xc(%ebp),%eax
 80491b2:	01 d0                	add    %edx,%eax
 80491b4:	89 45 fc             	mov    %eax,-0x4(%ebp)
 80491b7:	8b 45 fc             	mov    -0x4(%ebp),%eax
 80491ba:	c9                   	leave
 80491bb:	c3                   	ret`}
        </KaliTerminal>

        <p className="text-sm mb-3 text-justify leading-relaxed indent-8">
            func 函数的汇编代码分析：
        </p>
        <ul className="text-sm mb-3 ml-8 list-disc">
            <li>push %ebp：保存调用者的栈基址（函数序言）</li>
            <li>mov %esp, %ebp：建立新的栈帧基址</li>
            <li>sub $0x10, %esp：为局部变量分配 16 字节空间</li>
            <li>mov 0x8(%ebp), %edx：获取第一个参数 i（ebp+8）</li>
            <li>mov 0xc(%ebp), %eax：获取第二个参数 j（ebp+12）</li>
            <li>add %edx, %eax：计算 i + j，结果存入 eax</li>
            <li>leave：恢复调用者的栈帧（等价于 mov %ebp, %esp; pop %ebp）</li>
            <li>ret：返回到调用者（弹出返回地址并跳转）</li>
        </ul>
    </A4Page>
);

export default Lab3Part7;
