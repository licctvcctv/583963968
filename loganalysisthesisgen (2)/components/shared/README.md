# 通用组件库

## Terminal 终端组件

模拟各种终端样式，用于生成报告中的命令行截图。

### 支持的样式

| 类型 | 说明 | 适用场景 |
|------|------|----------|
| `kali` | Kali Linux 风格 | 渗透测试、安全报告 |
| `xshell` | XShell 风格（带窗口标题栏） | 大数据、服务器操作 |
| `linux` | Ubuntu 终端风格 | 通用 Linux 操作 |
| `plain` | 纯黑终端 | 简单命令展示 |

### 使用方法

```tsx
import { Terminal, KaliTerminal, XShellTerminal, LinuxTerminal } from '../shared/Terminal';

// 方式1：使用通用组件 + type 参数
<Terminal 
    type="kali"
    command="nmap -sV 192.168.6.208" 
    output="PORT     STATE SERVICE\n22/tcp   open  ssh\n80/tcp   open  http"
    cwd="~"
    caption="图 1-1 端口扫描结果"
/>

// 方式2：使用快捷组件
<KaliTerminal 
    command="redis-cli -h 192.168.6.208 ping" 
    output="PONG"
    caption="图 2-1 Redis连接测试"
/>

<XShellTerminal 
    user="lutianwei"
    host="sandbox"
    command="hdfs dfs -ls /"
    output="Found 10 items\ndrwxr-xr-x   - hdfs hdfs  0 /apps"
    title="lutianwei@sandbox - Xshell 7"
/>

<LinuxTerminal
    user="root"
    host="ubuntu"
    command="systemctl status nginx"
    output="● nginx.service - A high performance web server"
/>
```

### 参数说明

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `type` | `'kali' \| 'xshell' \| 'linux' \| 'plain'` | `'kali'` | 终端样式 |
| `command` | `string` | - | 要显示的命令 |
| `output` | `string` | - | 命令输出内容 |
| `cwd` | `string` | `'~'` | 当前工作目录 |
| `user` | `string` | `'root'` | 用户名（xshell/linux） |
| `host` | `string` | `'localhost'` | 主机名（xshell/linux） |
| `title` | `string` | 自动生成 | 窗口标题（xshell） |
| `caption` | `string` | - | 图片标题，如"图 1-1 xxx" |

### 样式预览

**Kali 风格：**
```
┌──(kali㉿kali)-[~]
└─$ nmap -sV 192.168.6.208
```

**XShell 风格：**
```
┌─────────────────────────────────────┐
│ >_ lutianwei@sandbox - Xshell 7  ─□×│
├─────────────────────────────────────┤
│ [lutianwei@sandbox ~]$ whoami       │
│ lutianwei                           │
└─────────────────────────────────────┘
```

**Linux 风格：**
```
root@ubuntu:~$ systemctl status nginx
```

### 注意事项

1. 所有终端组件都带有 `capture-as-image` class，方便截图导出
2. 输出内容支持 `\n` 换行
3. Shell 脚本中的 `$` 变量需要转义为 `\$`
