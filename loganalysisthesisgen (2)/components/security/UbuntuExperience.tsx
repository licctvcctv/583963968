import React from 'react';
import { A4Page, UbuntuTerminal } from '../shared';

export const UbuntuExperience: React.FC = () => {
    return (
        <div className="font-song text-[12pt] leading-[1.8] text-black">
            <A4Page id="ubuntu-preview-page">
                <h2 className="text-2xl font-bold text-center mb-8 pt-4">Ubuntu 风格虚拟机终端体验</h2>

                <div className="mb-6 bg-yellow-50 border-l-4 border-yellow-400 p-4">
                    <p className="text-sm text-yellow-700">
                        这是为您专门准备的预览页面，用于展示新的 Ubuntu 虚拟机终端样式。
                        包含了多种常见的使用场景。
                    </p>
                </div>

                <h3 className="text-lg font-bold mb-4 border-b pb-2">场景一：系统信息查看</h3>
                <p className="text-sm mb-2 text-gray-600">展示 `uname` 和 `lsb_release` 命令的输出效果。</p>
                <UbuntuTerminal
                    title="student@ubuntu-vm: ~"
                    user="student"
                    host="ubuntu-vm"
                    cwd="~"
                    command="uname -a && lsb_release -a"
                >
                    {`Linux ubuntu-vm 5.15.0-91-generic #101-Ubuntu SMP Tue Nov 14 13:30:08 UTC 2023 x86_64 x86_64 x86_64 GNU/Linux
No LSB modules are available.
Distributor ID:	Ubuntu
Description:	Ubuntu 22.04.3 LTS
Release:	22.04
Codename:	jammy`}
                </UbuntuTerminal>

                <h3 className="text-lg font-bold mb-4 mt-8 border-b pb-2">场景二：软件安装过程</h3>
                <p className="text-sm mb-2 text-gray-600">展示 `apt-get` 命令执行时的绿色成功提示和进度感。</p>
                <UbuntuTerminal
                    title="root@ubuntu-vm: /etc/apt"
                    user="root"
                    host="ubuntu-vm"
                    cwd="/etc/apt"
                    command="apt-get install nmap"
                >
                    {`Reading package lists... Done
Building dependency tree... Done
Reading state information... Done
The following additional packages will be installed:
  liblinear4 lua-lpeg nmap-common
Suggested packages:
  liblinear-dev liblinear-tools ncat ndiff zenmap
The following NEW packages will be installed:
  liblinear4 lua-lpeg nmap nmap-common
0 upgraded, 4 newly installed, 0 to remove and 12 not upgraded.
Need to get 5,843 kB of archives.
After this operation, 26.3 MB of additional disk space will be used.
Do you want to continue? [Y/n] Y
Process: [=========================> ] 98%`}
                </UbuntuTerminal>

                <h3 className="text-lg font-bold mb-4 mt-8 border-b pb-2">场景三：代码编译与错误</h3>
                <p className="text-sm mb-2 text-gray-600">展示 `gcc` 编译错误时的红色高亮效果。</p>
                <UbuntuTerminal
                    title="student@ubuntu-vm: ~/projects/lab1"
                    user="student"
                    host="ubuntu-vm"
                    cwd="~/projects/lab1"
                    command="gcc -o exploit exploit.c"
                >
                    {`exploit.c: In function 'main':
exploit.c:12:5: error: 'buffer' undeclared (first use in this function)
   12 |     buffer[256] = 0;
      |     ^~~~~~
exploit.c:12:5: note: each undeclared identifier is reported only once for each function it appears in
make: *** [Makefile:10: exploit] Error 1`}
                </UbuntuTerminal>

            </A4Page>
        </div>
    );
};

export default UbuntuExperience;
