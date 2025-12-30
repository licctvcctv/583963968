import React from 'react';
import { A4Page, KaliTerminal, CodeBlock } from '../shared';

// 实验三 第六部分 - pwntools 生成 shellcode
export const Lab3Part6: React.FC = () => (
    <A4Page id="lab3-part6">
        <p className="text-sm mb-2 font-bold">方法2：使用 pwntools 生成 Shellcode</p>
        <p className="text-sm mb-3 text-justify leading-relaxed indent-8">
            pwntools 是一个用于 CTF 比赛和漏洞利用开发的 Python 库，提供了强大的 shellcode 生成功能。
            使用 pwntools 可以快速生成各种架构和功能的 shellcode，大大提高漏洞利用开发的效率。
        </p>

        <p className="text-sm mb-2">步骤1：安装 pwntools</p>
        <KaliTerminal>
{`┌──(kali㉿kali)-[~/lab3]
└─$ pip3 install pwntools -i https://pypi.tuna.tsinghua.edu.cn/simple --break-system-packages
Collecting pwntools
  Downloading pwntools-4.15.0-py3-none-any.whl
Installing collected packages: capstone, colored_traceback, intervaltree, plumbum, 
  pyelftools, ropgadget, rpyc, unicorn, unix-ar, pwntools
Successfully installed pwntools-4.15.0
┌──(kali㉿kali)-[~/lab3]
└─$ python3 -c 'from pwn import *; print("pwntools 版本:", version)'
pwntools 版本: 4.15.0`}
        </KaliTerminal>

        <p className="text-sm mb-2">步骤2：编写 Python 脚本生成 shellcode</p>
        <CodeBlock title="shellcode_pwntools.py">
{`from pwn import *

# 设置目标架构为 32 位 Linux
context(os = "linux", arch = "i386")

# 使用 shellcraft 生成 execve("/bin/sh") 的汇编代码
shellcode_asm = shellcraft.sh()
print("生成的汇编代码:")
print(shellcode_asm)

# 将汇编代码转换为机器码
shellcode_bytes = asm(shellcode_asm)
print(f"\\nShellcode 长度: {len(shellcode_bytes)} 字节")
print("机器码 (hex):", shellcode_bytes.hex())`}
        </CodeBlock>

        <p className="text-sm mb-2">步骤3：运行脚本查看生成的 shellcode</p>
        <KaliTerminal>
{`┌──(kali㉿kali)-[~/lab3]
└─$ python3 shellcode_pwntools.py
生成的汇编代码:
    /* execve(path='/bin///sh', argv=['sh'], envp=0) */
    /* push b'/bin///sh\\x00' */
    push 0x68
    push 0x732f2f2f
    push 0x6e69622f
    mov ebx, esp
    /* push argument array ['sh\\x00'] */
    /* push 'sh\\x00\\x00' */
    push 0x1010101
    xor dword ptr [esp], 0x1016972
    xor ecx, ecx
    push ecx /* null terminate */
    push 4
    pop ecx
    add ecx, esp
    push ecx /* 'sh\\x00' */
    mov ecx, esp
    xor edx, edx
    /* call execve() */
    push SYS_execve /* 0xb */
    pop eax
    int 0x80

Shellcode 长度: 44 字节`}
        </KaliTerminal>

        <p className="text-sm mb-3 text-justify leading-relaxed indent-8">
            pwntools 生成的 shellcode 长度为 44 字节，比手动编写的 23 字节要长。
            这是因为 pwntools 生成的代码功能更完整，包含了 argv 参数数组的设置，
            并且使用了更多的技巧来避免 NULL 字节（如使用 xor 和 push/pop 组合）。
        </p>

        <p className="text-sm mb-2">步骤4：对比两种方法生成的 shellcode</p>
        <div className="bg-gray-100 p-3 rounded text-xs mb-3">
            <table className="w-full">
                <thead>
                    <tr className="border-b">
                        <th className="text-left py-1">对比项</th>
                        <th className="text-left py-1">手动编写</th>
                        <th className="text-left py-1">pwntools 生成</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="border-b">
                        <td className="py-1">长度</td>
                        <td className="py-1">23 字节</td>
                        <td className="py-1">44 字节</td>
                    </tr>
                    <tr className="border-b">
                        <td className="py-1">argv 参数</td>
                        <td className="py-1">NULL</td>
                        <td className="py-1">["sh"]</td>
                    </tr>
                    <tr className="border-b">
                        <td className="py-1">NULL 字节</td>
                        <td className="py-1">无</td>
                        <td className="py-1">无</td>
                    </tr>
                    <tr>
                        <td className="py-1">适用场景</td>
                        <td className="py-1">空间受限</td>
                        <td className="py-1">快速开发</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </A4Page>
);

export default Lab3Part6;
