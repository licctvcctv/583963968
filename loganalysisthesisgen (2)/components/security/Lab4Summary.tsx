import React from 'react';
import { A4Page } from '../shared';

// 实验四 总结
export const Lab4Summary: React.FC = () => (
    <A4Page id="lab4-summary">
        <h3 className="text-base font-bold mb-3">五、实验总结</h3>
        
        <p className="text-sm mb-3 text-justify leading-relaxed indent-8">
            通过本次实验，我系统地学习了二进制漏洞利用的基本技术，包括 ret2text、ret2shellcode 
            和 ret2libc 三种主要的攻击方式，并成功实现了所有攻击场景。
        </p>

        <p className="text-sm mb-3 text-justify leading-relaxed indent-8">
            ret2text 是最简单的栈溢出利用方式。当程序中存在可利用的代码片段（如调用 system("/bin/sh") 
            的函数）时，我们只需要通过栈溢出覆盖返回地址，使程序跳转到目标代码即可。
            这种攻击方式不需要绕过 NX 保护，但依赖于程序本身存在可利用的代码。
        </p>

        <p className="text-sm mb-3 text-justify leading-relaxed indent-8">
            ret2shellcode 攻击通过将 shellcode 注入到可执行的内存区域，然后跳转执行来获取 shell。
            这种攻击方式需要 NX 保护关闭，因为现代系统默认将栈和数据段标记为不可执行。
            在实验中，我们通过编译选项 -z execstack 关闭了 NX 保护，成功在栈上执行了 shellcode。
        </p>

        <p className="text-sm mb-3 text-justify leading-relaxed indent-8">
            ret2libc 是绕过 NX 保护的经典技术。当无法在栈上执行代码时，我们可以利用
            程序链接的 libc 库中的函数。实验中我们学习了三种 ret2libc 攻击场景：
            类型1是程序有 system 和 "/bin/sh"，直接构造 payload 调用；
            类型2是程序有 system 但无 "/bin/sh"，通过 gets 写入后链式调用；
            类型3是程序无 system，通过 GOT 泄露计算 libc 地址后调用。
        </p>

        <p className="text-sm mb-3 text-justify leading-relaxed indent-8">
            本次实验让我深入理解了栈溢出漏洞的利用原理和各种攻击技术。通过实际操作，
            我掌握了 pwntools 工具的使用方法，学会了分析程序的保护机制和寻找利用点。
            这些知识对于理解软件安全和进行安全研究都非常重要。同时，我也认识到了
            编写安全代码的重要性，应该避免使用不安全的函数（如 gets、strcpy），
            并启用各种保护机制（如 NX、Canary、PIE、ASLR）来增强程序的安全性。
        </p>
    </A4Page>
);

export default Lab4Summary;
