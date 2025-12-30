import React from 'react';
import { TerminalWindow, VimEditor } from './MockUI';

// 4.1.1 Inventory (Vim Style)
export const DiagramInventory: React.FC = () => (
    <VimEditor
        filename="hosts.ini"
        language="ini"
        content={`[namenode]
192.168.1.101 hostname=master-01

[datanode]
192.168.1.102 hostname=slave-01
192.168.1.103 hostname=slave-02

[resourcemanager]
192.168.1.101

[nodemanager]
192.168.1.102
192.168.1.103

[hadoop:children]
namenode
datanode
resourcemanager
nodemanager`}
    />
);

// 4.1.2 SSH Trust (Terminal Style)
export const DiagramSSHTrust: React.FC = () => (
    <TerminalWindow
        cwd="~/.ssh"
        command="./distribute_keys.sh"
        output={`Generating public/private rsa key pair.
Created directory '/root/.ssh'.
Your identification has been saved in /root/.ssh/id_rsa.
Your public key has been saved in /root/.ssh/id_rsa.pub.
--------------------------------------------------
Distributing keys to 192.168.1.102...
/usr/bin/ssh-copy-id: INFO: Source of key(s) to be installed: "/root/.ssh/id_rsa.pub"
root@192.168.1.102's password: 
Number of key(s) added: 1
--------------------------------------------------
Distributing keys to 192.168.1.103...
Number of key(s) added: 1
[SUCCESS] SSH trust established for all nodes.`}
    />
);

// 4.2.1 Common Role (Vim Style)
export const DiagramCommonRole: React.FC = () => (
    <VimEditor
        filename="roles/common/tasks/main.yml"
        language="yaml"
        content={`- name: Install Java JDK 1.8
  yum:
    name: java-1.8.0-openjdk-devel
    state: present

- name: Set JAVA_HOME environment variable
  lineinfile:
    path: /etc/profile
    line: 'export JAVA_HOME=/usr/lib/jvm/java-1.8.0-openjdk'
    state: present

- name: Create Hadoop Group
  group:
    name: hadoop
    state: present

- name: Create Hadoop User
  user:
    name: hadoop
    group: hadoop
    shell: /bin/bash`}
    />
);

// 4.2.2 Config Template (Vim Style)
export const DiagramConfigTemplate: React.FC = () => (
    <VimEditor
        filename="roles/hadoop/templates/core-site.xml.j2"
        language="xml"
        content={`<configuration>
    <!-- 指定 NameNode 的地址 -->
    <property>
        <name>fs.defaultFS</name>
        <value>hdfs://{{ namenode_ip }}:9000</value>
    </property>

    <!-- 指定 Hadoop 运行时产生文件的存储目录 -->
    <property>
        <name>hadoop.tmp.dir</name>
        <value>{{ hadoop_data_dir }}/tmp</value>
    </property>

    <!-- 配置 HDFS 网页登录使用的静态用户 -->
    <property>
        <name>hadoop.http.staticuser.user</name>
        <value>hadoop</value>
    </property>
</configuration>`}
    />
);

// 4.2.3 JMX Config (Vim Style)
export const DiagramJMXConfig: React.FC = () => (
    <VimEditor
        filename="hadoop-env.sh"
        language="bash"
        content={`# 配置 NameNode JMX Exporter
export HDFS_NAMENODE_OPTS="$HDFS_NAMENODE_OPTS -javaagent:/opt/exporter/jmx_prometheus_javaagent.jar=7070:/opt/exporter/namenode.yaml"

# 配置 DataNode JMX Exporter
export HDFS_DATANODE_OPTS="$HDFS_DATANODE_OPTS -javaagent:/opt/exporter/jmx_prometheus_javaagent.jar=7070:/opt/exporter/datanode.yaml"

# 配置 ResourceManager JMX Exporter
export YARN_RESOURCEMANAGER_OPTS="$YARN_RESOURCEMANAGER_OPTS -javaagent:/opt/exporter/jmx_prometheus_javaagent.jar=7070:/opt/exporter/resourcemanager.yaml"`}
    />
);

// 4.2.4 Main Playbook (Vim Style)
export const DiagramMainPlaybook: React.FC = () => (
    <VimEditor
        filename="site.yml"
        language="yaml"
        content={`- hosts: all
  roles:
    - common
    - node-exporter

- hosts: namenode
  roles:
    - hadoop-namenode

- hosts: datanode
  roles:
    - hadoop-datanode

- hosts: resourcemanager
  roles:
    - hadoop-resourcemanager

- hosts: nodemanager
  roles:
    - hadoop-nodemanager`}
    />
);

// 4.2.5 Execution Log (Terminal Style)
export const DiagramExecutionLog: React.FC = () => (
    <TerminalWindow
        cwd="~/deploy-logs"
        command="tail -f deploy_20240520.log"
        output={`TASK [hadoop-namenode : Format NameNode] ***************************************
changed: [192.168.1.101]

TASK [hadoop-namenode : Start NameNode Service] ********************************
changed: [192.168.1.101]

TASK [hadoop-datanode : Start DataNode Service] ********************************
changed: [192.168.1.102]
changed: [192.168.1.103]

PLAY RECAP *********************************************************************
192.168.1.101              : ok=12   changed=5    unreachable=0    failed=0
192.168.1.102              : ok=10   changed=4    unreachable=0    failed=0
192.168.1.103              : ok=10   changed=4    unreachable=0    failed=0`}
    />
);

// 4.2.6 Verification (Terminal Style)
export const DiagramVerification: React.FC = () => (
    <TerminalWindow
        cwd="~"
        command="ansible all -m shell -a 'jps'"
        output={`192.168.1.101 | CHANGED | rc=0 >>
12345 NameNode
12346 ResourceManager
12347 Jps
12348 NodeExporter

192.168.1.102 | CHANGED | rc=0 >>
23456 DataNode
23457 NodeManager
23458 Jps
23459 NodeExporter

192.168.1.103 | CHANGED | rc=0 >>
34567 DataNode
34568 NodeManager
34569 Jps
34570 NodeExporter`}
    />
);

// 4.3.1 Prometheus Config (Vim Style)
export const DiagramPrometheusConfig: React.FC = () => (
    <VimEditor
        filename="prometheus.yml"
        language="yaml"
        content={`scrape_configs:
  - job_name: 'hadoop-namenode'
    file_sd_configs:
      - files:
        - 'targets/namenode/*.json'

  - job_name: 'hadoop-datanode'
    file_sd_configs:
      - files:
        - 'targets/datanode/*.json'

  - job_name: 'node-exporter'
    static_configs:
      - targets: ['192.168.1.101:9100', '192.168.1.102:9100', '192.168.1.103:9100']`}
    />
);

// 4.4.1 Healing Log (Terminal Style)
export const DiagramHealingLog: React.FC = () => (
    <TerminalWindow
        cwd="/var/log/sys-backend"
        command="tail -n 10 healing.log"
        output={`[INFO] MonitorThread: Detected alert 'DataNodeDown' on instance 192.168.1.103
[INFO] RuleEngine: Matched rule 'Restart DataNode' (ID: RULE_005)
[INFO] ActionExecutor: Generating temporary playbook for 192.168.1.103...
[INFO] ActionExecutor: Executing command: ansible-playbook /tmp/healing_103.yml
[INFO] AnsibleOutput: TASK [Restart DataNode Service] ****************************
[INFO] AnsibleOutput: changed: [192.168.1.103]
[INFO] ActionExecutor: Execution successful.
[INFO] Notification: Sent recovery email to admin@example.com
[INFO] MonitorThread: Alert 'DataNodeDown' cleared on instance 192.168.1.103`}
    />
);
