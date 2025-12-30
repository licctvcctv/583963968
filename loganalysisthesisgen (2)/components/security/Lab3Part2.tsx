import React from 'react';
import { A4Page, CodeBlock } from '../shared';

// 实验三 第二部分 - 函数调用栈原理
export const Lab3Part2: React.FC = () => (
    <A4Page id="lab3-part2">
        <p className="text-sm mb-2 font-bold">（四）函数调用栈原理</p>
        <p className="text-sm mb-3 text-justify leading-relaxed indent-8">
            函数栈（Call Stack）是一块连续的用来保存函数运行状态的内存区域。
            在 x86 架构中，栈从内存的高地址向低地址增长。函数调用过程主要涉及三个关键寄存器：
        </p>
        <ul className="text-sm mb-3 ml-8 list-disc">
            <li>EIP（指令指针寄存器）：存储下一条要执行的指令的地址</li>
            <li>ESP（栈指针寄存器）：始终指向栈顶，随 push/pop 操作自动变化</li>
            <li>EBP（基址指针寄存器）：指向当前栈帧的底部，用于访问参数和局部变量</li>
        </ul>

        <p className="text-sm mb-3 text-justify leading-relaxed indent-8">
            当一个函数被调用时，会经历以下步骤：
        </p>
        <ol className="text-sm mb-3 ml-8 list-decimal">
            <li>调用者将函数参数从右到左依次压入栈中</li>
            <li>call 指令将返回地址（下一条指令地址）压入栈中，并跳转到被调用函数</li>
            <li>被调用函数执行 push ebp 保存调用者的栈基址</li>
            <li>执行 mov ebp, esp 建立新栈帧</li>
            <li>执行 sub esp, N 为局部变量分配栈空间</li>
            <li>函数返回时，执行 leave（等价于 mov esp, ebp; pop ebp）恢复栈帧</li>
            <li>ret 指令弹出返回地址到 EIP，程序继续执行</li>
        </ol>

        <p className="text-sm mb-2 font-bold">（五）栈溢出攻击原理</p>
        <p className="text-sm mb-3 text-justify leading-relaxed indent-8">
            栈溢出攻击的原理是：当程序使用不安全的函数（如 gets、strcpy、read 等）读取用户输入时，
            如果没有进行边界检查，攻击者可以输入超长数据覆盖栈上的返回地址。
            当函数返回时，程序会跳转到攻击者指定的地址执行，从而实现任意代码执行。
        </p>

        <p className="text-sm mb-2 font-bold">（六）获取 Shellcode 的方法</p>
        <p className="text-sm mb-3 text-justify leading-relaxed indent-8">
            获取 Shellcode 主要有三种方法：
        </p>
        <ul className="text-sm mb-3 ml-8 list-disc">
            <li>手动编写：分析系统调用的汇编实现，手动编写汇编代码并提取机器码</li>
            <li>工具生成：使用 pwntools、msfvenom 等工具自动生成</li>
            <li>网上查找：从 shell-storm.org、exploit-db 等网站获取现成的 shellcode</li>
        </ul>

        <p className="text-sm mb-2 font-bold">（七）实验环境准备</p>
        <p className="text-sm mb-3 text-justify leading-relaxed indent-8">
            本实验在 Kali Linux 虚拟机中进行，需要安装以下工具：
        </p>
        <CodeBlock title="环境配置">
{`# 安装 32 位编译支持
sudo apt-get install gcc-multilib libc6-dev-i386

# 安装汇编器和调试器
sudo apt-get install nasm gdb

# 安装 pwntools
pip3 install pwntools

# 关闭 ASLR（地址空间布局随机化）
echo 0 | sudo tee /proc/sys/kernel/randomize_va_space`}
        </CodeBlock>
    </A4Page>
);

export default Lab3Part2;
