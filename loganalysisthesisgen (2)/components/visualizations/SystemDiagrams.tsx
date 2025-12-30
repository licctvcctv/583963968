import React from 'react';

// --- DIAGRAM: Standard Black & White Architecture (Optimized) ---
export const StandardBWArchDiagram: React.FC = () => (
    <div className="w-full flex justify-center items-center bg-white rounded border border-gray-300 capture-as-image p-6 my-4">
        <svg viewBox="0 0 700 400" className="w-full h-auto font-sans text-xs">
            <defs>
                <marker id="arrow-bw" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                    <path d="M0,0 L0,6 L9,3 z" fill="#000000" />
                </marker>
            </defs>

            <style>
                {`
          .box { fill: #ffffff; stroke: #000000; stroke-width: 1.5; }
          .container-box { fill: #f9f9f9; stroke: #000000; stroke-width: 1; stroke-dasharray: 5,5; }
          .text-title { font-weight: bold; font-size: 14px; font-family: 'SimHei', sans-serif; }
          .text-label { font-size: 12px; font-family: 'SimSun', serif; }
          .conn { stroke: #000000; stroke-width: 1.2; fill: none; }
        `}
            </style>

            {/* Layer 1: Presentation */}
            <rect x="20" y="40" width="660" height="70" className="container-box" />
            <text x="30" y="30" textAnchor="start" className="text-title">表现层 (Vue.js + Element UI)</text>

            <rect x="80" y="55" width="120" height="40" className="box" />
            <text x="140" y="80" textAnchor="middle" className="text-label">集群监控大屏</text>

            <rect x="290" y="55" width="120" height="40" className="box" />
            <text x="350" y="80" textAnchor="middle" className="text-label">自动化部署向导</text>

            <rect x="500" y="55" width="120" height="40" className="box" />
            <text x="560" y="80" textAnchor="middle" className="text-label">告警与自愈中心</text>

            {/* Layer 2: Business Logic */}
            <rect x="20" y="140" width="660" height="70" className="container-box" />
            <text x="30" y="130" textAnchor="start" className="text-title">业务逻辑层 (Spring Boot)</text>

            <rect x="80" y="155" width="120" height="40" className="box" />
            <text x="140" y="180" textAnchor="middle" className="text-label">任务调度引擎</text>

            <rect x="290" y="155" width="120" height="40" className="box" />
            <text x="350" y="180" textAnchor="middle" className="text-label">配置模板管理</text>

            <rect x="500" y="155" width="120" height="40" className="box" />
            <text x="560" y="180" textAnchor="middle" className="text-label">自愈规则引擎</text>

            {/* Layer 3: Execution */}
            <rect x="20" y="240" width="660" height="70" className="container-box" />
            <text x="30" y="230" textAnchor="start" className="text-title">执行与监控层</text>

            <rect x="180" y="255" width="140" height="40" className="box" />
            <text x="250" y="280" textAnchor="middle" className="text-label">Ansible (自动化执行)</text>

            <rect x="380" y="255" width="140" height="40" className="box" />
            <text x="450" y="280" textAnchor="middle" className="text-label">Prometheus (数据采集)</text>

            {/* Layer 4: Infrastructure */}
            <rect x="20" y="340" width="660" height="50" className="container-box" />
            <text x="30" y="330" textAnchor="start" className="text-title">基础设施层 (Hadoop Cluster)</text>

            <rect x="50" y="350" width="80" height="30" className="box" />
            <text x="90" y="370" textAnchor="middle" className="text-label">NameNode</text>
            <rect x="150" y="350" width="80" height="30" className="box" />
            <text x="190" y="370" textAnchor="middle" className="text-label">DataNode</text>
            <rect x="250" y="350" width="80" height="30" className="box" />
            <text x="290" y="370" textAnchor="middle" className="text-label">...</text>
            <rect x="550" y="350" width="100" height="30" className="box" />
            <text x="600" y="370" textAnchor="middle" className="text-label">Node Exporter</text>

            {/* Connections */}
            <path d="M350 110 L350 140" className="conn" markerEnd="url(#arrow-bw)" />
            <path d="M350 210 L350 240" className="conn" markerEnd="url(#arrow-bw)" />
            <path d="M350 310 L350 340" className="conn" markerEnd="url(#arrow-bw)" />

        </svg>
    </div>
);

// --- DIAGRAM: Standard Black & White Module Division Diagram (Vertical Leaf Nodes) ---
export const StandardBWModuleDiagram: React.FC = () => {
    // Helper to render vertical text
    const VerticalText = ({ x, y, text }: { x: number, y: number, text: string }) => (
        <text x={x} y={y} className="mod-text" style={{ letterSpacing: '2px' }}>
            {text.split('').map((char, i) => (
                <tspan key={i} x={x} dy={i === 0 ? 0 : 14}>{char}</tspan>
            ))}
        </text>
    );

    return (
        <div className="w-full flex justify-center items-center bg-white rounded border border-gray-300 capture-as-image p-6 my-4">
            <svg viewBox="0 0 700 400" className="w-full h-auto font-sans text-xs">
                <style>
                    {`
          .mod-box { fill: #ffffff; stroke: #000000; stroke-width: 1.5; }
          .mod-root { fill: #f0f0f0; stroke: #000000; stroke-width: 2; }
          .mod-sub-box { fill: #ffffff; stroke: #000000; stroke-width: 1.2; }
          .mod-text { font-size: 12px; font-family: 'SimSun', serif; text-anchor: middle; dominant-baseline: middle; }
          .mod-title { font-size: 14px; font-weight: bold; font-family: 'SimHei', sans-serif; text-anchor: middle; }
          .mod-conn { stroke: #000000; stroke-width: 1.2; fill: none; }
        `}
                </style>

                {/* Root Node */}
                <rect x="250" y="20" width="200" height="40" className="mod-root" rx="5" />
                <text x="350" y="45" className="mod-title">Hadoop 自动化运维系统</text>

                {/* Level 1: Modules */}
                {/* M1: Resource */}
                <rect x="20" y="90" width="140" height="30" className="mod-box" />
                <text x="90" y="110" className="mod-title" fontSize="12">集群资源管理</text>

                {/* M2: Deployment */}
                <rect x="190" y="90" width="140" height="30" className="mod-box" />
                <text x="260" y="110" className="mod-title" fontSize="12">自动化部署</text>

                {/* M3: Monitoring */}
                <rect x="370" y="90" width="140" height="30" className="mod-box" />
                <text x="440" y="110" className="mod-title" fontSize="12">监控与告警</text>

                {/* M4: Self-healing */}
                <rect x="540" y="90" width="140" height="30" className="mod-box" />
                <text x="610" y="110" className="mod-title" fontSize="12">故障自愈</text>

                {/* Connections Root -> Level 1 */}
                <line x1="350" y1="60" x2="350" y2="75" className="mod-conn" />
                <line x1="90" y1="75" x2="610" y2="75" className="mod-conn" />
                <line x1="90" y1="75" x2="90" y2="90" className="mod-conn" />
                <line x1="260" y1="75" x2="260" y2="90" className="mod-conn" />
                <line x1="440" y1="75" x2="440" y2="90" className="mod-conn" />
                <line x1="610" y1="75" x2="610" y2="90" className="mod-conn" />

                {/* Level 2: Sub-functions (Vertical Boxes) */}

                {/* M1 Subs (Center 90) -> 55, 90, 125 (Offset 35) */}
                <line x1="90" y1="120" x2="90" y2="135" className="mod-conn" />
                <line x1="55" y1="135" x2="125" y2="135" className="mod-conn" />

                <line x1="55" y1="135" x2="55" y2="150" className="mod-conn" />
                <rect x="40" y="150" width="30" height="130" className="mod-sub-box" />
                <VerticalText x={55} y={160} text="主机资产录入" />

                <line x1="90" y1="135" x2="90" y2="150" className="mod-conn" />
                <rect x="75" y="150" width="30" height="130" className="mod-sub-box" />
                <VerticalText x={90} y={160} text="SSH免密互信" />

                <line x1="125" y1="135" x2="125" y2="150" className="mod-conn" />
                <rect x="110" y="150" width="30" height="130" className="mod-sub-box" />
                <VerticalText x={125} y={160} text="环境初始化" />


                {/* M2 Subs (Center 260) -> 225, 260, 295 */}
                <line x1="260" y1="120" x2="260" y2="135" className="mod-conn" />
                <line x1="225" y1="135" x2="295" y2="135" className="mod-conn" />

                <line x1="225" y1="135" x2="225" y2="150" className="mod-conn" />
                <rect x="210" y="150" width="30" height="130" className="mod-sub-box" />
                <VerticalText x={225} y={160} text="角色规划分配" />

                <line x1="260" y1="135" x2="260" y2="150" className="mod-conn" />
                <rect x="245" y="150" width="30" height="130" className="mod-sub-box" />
                <VerticalText x={260} y={160} text="配置模板生成" />

                <line x1="295" y1="135" x2="295" y2="150" className="mod-conn" />
                <rect x="280" y="150" width="30" height="130" className="mod-sub-box" />
                <VerticalText x={295} y={160} text="剧本执行" />


                {/* M3 Subs (Center 440) -> 405, 440, 475 */}
                <line x1="440" y1="120" x2="440" y2="135" className="mod-conn" />
                <line x1="405" y1="135" x2="475" y2="135" className="mod-conn" />

                <line x1="405" y1="135" x2="405" y2="150" className="mod-conn" />
                <rect x="390" y="150" width="30" height="130" className="mod-sub-box" />
                <VerticalText x={405} y={160} text="资源指标采集" />

                <line x1="440" y1="135" x2="440" y2="150" className="mod-conn" />
                <rect x="425" y="150" width="30" height="130" className="mod-sub-box" />
                <VerticalText x={440} y={160} text="服务状态监控" />

                <line x1="475" y1="135" x2="475" y2="150" className="mod-conn" />
                <rect x="460" y="150" width="30" height="130" className="mod-sub-box" />
                <VerticalText x={475} y={160} text="异常实时告警" />


                {/* M4 Subs (Center 610) -> 575, 610, 645 */}
                <line x1="610" y1="120" x2="610" y2="135" className="mod-conn" />
                <line x1="575" y1="135" x2="645" y2="135" className="mod-conn" />

                <line x1="575" y1="135" x2="575" y2="150" className="mod-conn" />
                <rect x="560" y="150" width="30" height="130" className="mod-sub-box" />
                <VerticalText x={575} y={160} text="告警回调接收" />

                <line x1="610" y1="135" x2="610" y2="150" className="mod-conn" />
                <rect x="595" y="150" width="30" height="130" className="mod-sub-box" />
                <VerticalText x={610} y={160} text="自愈规则匹配" />

                <line x1="645" y1="135" x2="645" y2="150" className="mod-conn" />
                <rect x="630" y="150" width="30" height="130" className="mod-sub-box" />
                <VerticalText x={645} y={160} text="自动修复执行" />

            </svg>
        </div>
    );
};

// --- DIAGRAM: Standard Black & White Data Flow Diagram (Gane & Sarson Style - Enriched) ---
export const StandardBWDataFlowDiagram: React.FC = () => (
    <div className="w-full flex justify-center items-center bg-white rounded border border-gray-300 capture-as-image p-6 my-4">
        <svg viewBox="0 0 700 400" className="w-full h-auto font-sans text-xs">
            <defs>
                <marker id="arrow-dfd" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                    <path d="M0,0 L0,6 L9,3 z" fill="#000000" />
                </marker>
            </defs>
            <style>
                {`
          .dfd-proc { fill: #ffffff; stroke: #000000; stroke-width: 1.5; rx: 10; }
          .dfd-ent { fill: #f0f0f0; stroke: #000000; stroke-width: 1.5; }
          .dfd-store { fill: #ffffff; stroke: #000000; stroke-width: 1.5; }
          .dfd-text { font-size: 12px; font-family: 'SimSun', serif; text-anchor: middle; }
          .dfd-label { font-size: 10px; font-family: 'SimSun', serif; text-anchor: middle; fill: #ffffff; background-color: white; }
          .dfd-conn { stroke: #000000; stroke-width: 1.2; fill: none; }
        `}
            </style>

            {/* Entities */}
            <rect x="20" y="150" width="80" height="40" className="dfd-ent" />
            <text x="60" y="175" className="dfd-text">运维人员</text>

            <rect x="600" y="150" width="80" height="40" className="dfd-ent" />
            <text x="640" y="175" className="dfd-text">Hadoop集群</text>

            {/* Processes */}
            {/* P1: Web UI */}
            <rect x="150" y="145" width="100" height="50" className="dfd-proc" />
            <line x1="150" y1="160" x2="250" y2="160" stroke="#000000" strokeWidth="1" />
            <text x="200" y="157" className="dfd-text" fontSize="10">P1</text>
            <text x="200" y="175" className="dfd-text">Web交互</text>

            {/* P2: Business Logic */}
            <rect x="300" y="145" width="100" height="50" className="dfd-proc" />
            <line x1="300" y1="160" x2="400" y2="160" stroke="#000000" strokeWidth="1" />
            <text x="350" y="157" className="dfd-text" fontSize="10">P2</text>
            <text x="350" y="175" className="dfd-text">业务处理</text>

            {/* P3: Task Execution */}
            <rect x="450" y="60" width="100" height="50" className="dfd-proc" />
            <line x1="450" y1="75" x2="550" y2="75" stroke="#000000" strokeWidth="1" />
            <text x="500" y="72" className="dfd-text" fontSize="10">P3</text>
            <text x="500" y="90" className="dfd-text">任务执行</text>

            {/* P4: Monitoring */}
            <rect x="450" y="230" width="100" height="50" className="dfd-proc" />
            <line x1="450" y1="245" x2="550" y2="245" stroke="#000000" strokeWidth="1" />
            <text x="500" y="242" className="dfd-text" fontSize="10">P4</text>
            <text x="500" y="260" className="dfd-text">数据采集</text>

            {/* P5: Log Audit (New) */}
            <rect x="300" y="320" width="100" height="50" className="dfd-proc" />
            <line x1="300" y1="335" x2="400" y2="335" stroke="#000000" strokeWidth="1" />
            <text x="350" y="332" className="dfd-text" fontSize="10">P5</text>
            <text x="350" y="350" className="dfd-text">日志审计</text>

            {/* Data Stores */}
            {/* D1: Business DB */}
            <path d="M300 240 L400 240 L400 280 L300 280 L300 240" className="dfd-store" fill="none" />
            <line x1="330" y1="240" x2="330" y2="280" stroke="#000000" strokeWidth="1.5" />
            <text x="315" y="265" className="dfd-text">D1</text>
            <text x="365" y="265" className="dfd-text">业务数据库</text>

            {/* D2: Config Store (New) */}
            <path d="M150 60 L250 60 L250 100 L150 100 L150 60" className="dfd-store" fill="none" />
            <line x1="180" y1="60" x2="180" y2="100" stroke="#000000" strokeWidth="1.5" />
            <text x="165" y="85" className="dfd-text">D2</text>
            <text x="215" y="85" className="dfd-text">配置库</text>

            {/* Flows */}
            {/* User -> Web */}
            <line x1="100" y1="170" x2="150" y2="170" className="dfd-conn" markerEnd="url(#arrow-dfd)" />
            <text x="125" y="165" className="dfd-label">操作指令</text>

            {/* Web -> Backend */}
            <line x1="250" y1="170" x2="300" y2="170" className="dfd-conn" markerEnd="url(#arrow-dfd)" />
            <text x="275" y="165" className="dfd-label">API请求</text>

            {/* Backend <-> D1 */}
            <line x1="350" y1="195" x2="350" y2="240" className="dfd-conn" markerEnd="url(#arrow-dfd)" />
            <line x1="370" y1="240" x2="370" y2="195" className="dfd-conn" markerEnd="url(#arrow-dfd)" />

            {/* Backend -> P3 (Execution) */}
            <path d="M350 145 L350 85 L450 85" className="dfd-conn" markerEnd="url(#arrow-dfd)" fill="none" />
            <text x="400" y="80" className="dfd-label">Playbook</text>

            {/* P3 -> Cluster */}
            <path d="M550 85 L640 85 L640 150" className="dfd-conn" markerEnd="url(#arrow-dfd)" fill="none" />
            <text x="600" y="110" className="dfd-label">SSH指令</text>

            {/* Cluster -> P4 (Monitoring) */}
            <path d="M640 190 L640 255 L550 255" className="dfd-conn" markerEnd="url(#arrow-dfd)" fill="none" />
            <text x="600" y="250" className="dfd-label">Metrics</text>

            {/* P4 -> Backend */}
            <path d="M450 255 L420 255 L420 180 L400 180" className="dfd-conn" markerEnd="url(#arrow-dfd)" fill="none" />
            <text x="435" y="210" className="dfd-label">告警数据</text>

            {/* P2 -> D2 (Config Read/Write) */}
            <path d="M320 145 L320 120 L250 120 L250 100" className="dfd-conn" markerEnd="url(#arrow-dfd)" fill="none" />
            <text x="285" y="115" className="dfd-label">读写配置</text>

            {/* P2 -> P5 (Log Audit) */}
            <line x1="350" y1="195" x2="350" y2="320" className="dfd-conn" markerEnd="url(#arrow-dfd)" />
            <text x="360" y="300" className="dfd-label">操作日志</text>

            {/* P5 -> D1 (Save Log) */}
            <path d="M300 345 L280 345 L280 260 L300 260" className="dfd-conn" markerEnd="url(#arrow-dfd)" fill="none" />
            <text x="260" y="300" className="dfd-label">存储</text>

        </svg>
    </div>
);

// --- DIAGRAM: Standard Black & White Sequence Diagram (Automated Deployment) ---
export const StandardBWSequenceDiagram: React.FC = () => (
    <div className="w-full flex justify-center items-center bg-white rounded border border-gray-300 capture-as-image p-6 my-4">
        <svg viewBox="0 0 700 500" className="w-full h-auto font-sans text-xs">
            <defs>
                <marker id="arrow-seq" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                    <path d="M0,0 L0,6 L9,3 z" fill="#000000" />
                </marker>
                <marker id="arrow-open" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                    <path d="M0,0 L9,3 L0,6" fill="none" stroke="#000000" />
                </marker>
            </defs>
            <style>
                {`
          .seq-actor { fill: #ffffff; stroke: #000000; stroke-width: 1.5; }
          .seq-line { stroke: #000000; stroke-width: 1; stroke-dasharray: 4; }
          .seq-act { fill: #f0f0f0; stroke: #000000; stroke-width: 1; }
          .seq-msg { stroke: #000000; stroke-width: 1.2; fill: none; }
          .seq-text { font-size: 12px; font-family: 'SimSun', serif; text-anchor: middle; }
          .seq-title { font-size: 12px; font-weight: bold; font-family: 'SimHei', sans-serif; text-anchor: middle; }
        `}
            </style>

            {/* Lifelines */}
            {/* User */}
            <rect x="20" y="20" width="80" height="30" className="seq-actor" />
            <text x="60" y="40" className="seq-title">运维人员</text>
            <line x1="60" y1="50" x2="60" y2="450" className="seq-line" />

            {/* Web UI */}
            <rect x="160" y="20" width="80" height="30" className="seq-actor" />
            <text x="200" y="40" className="seq-title">Web前端</text>
            <line x1="200" y1="50" x2="200" y2="450" className="seq-line" />

            {/* Backend */}
            <rect x="300" y="20" width="80" height="30" className="seq-actor" />
            <text x="340" y="40" className="seq-title">后端服务</text>
            <line x1="340" y1="50" x2="340" y2="450" className="seq-line" />

            {/* Ansible */}
            <rect x="440" y="20" width="80" height="30" className="seq-actor" />
            <text x="480" y="40" className="seq-title">Ansible引擎</text>
            <line x1="480" y1="50" x2="480" y2="450" className="seq-line" />

            {/* Cluster */}
            <rect x="580" y="20" width="80" height="30" className="seq-actor" />
            <text x="620" y="40" className="seq-title">Hadoop集群</text>
            <line x1="620" y1="50" x2="620" y2="450" className="seq-line" />

            {/* Activations & Messages */}

            {/* 1. Login & Request */}
            <rect x="55" y="60" width="10" height="380" className="seq-act" />
            <line x1="60" y1="80" x2="200" y2="80" className="seq-msg" markerEnd="url(#arrow-seq)" />
            <text x="130" y="75" className="seq-text">1. 发起部署请求</text>

            <rect x="195" y="80" width="10" height="340" className="seq-act" />
            <line x1="200" y1="100" x2="340" y2="100" className="seq-msg" markerEnd="url(#arrow-seq)" />
            <text x="270" y="95" className="seq-text">2. 提交参数(JSON)</text>

            {/* 2. Validation & Generation */}
            <rect x="335" y="100" width="10" height="300" className="seq-act" />
            <line x1="340" y1="120" x2="350" y2="120" className="seq-msg" />
            <line x1="350" y1="120" x2="350" y2="140" className="seq-msg" />
            <line x1="350" y1="140" x2="340" y2="140" className="seq-msg" markerEnd="url(#arrow-seq)" />
            <text x="380" y="135" className="seq-text">3. 参数校验</text>

            <line x1="340" y1="160" x2="480" y2="160" className="seq-msg" markerEnd="url(#arrow-seq)" />
            <text x="410" y="155" className="seq-text">4. 生成Playbook</text>

            {/* 3. Execution */}
            <rect x="475" y="160" width="10" height="200" className="seq-act" />
            <line x1="480" y1="180" x2="620" y2="180" className="seq-msg" markerEnd="url(#arrow-seq)" />
            <text x="550" y="175" className="seq-text">5. 执行安装任务</text>

            <rect x="615" y="180" width="10" height="100" className="seq-act" />
            <line x1="620" y1="220" x2="630" y2="220" className="seq-msg" />
            <line x1="630" y1="220" x2="630" y2="240" className="seq-msg" />
            <line x1="630" y1="240" x2="620" y2="240" className="seq-msg" markerEnd="url(#arrow-seq)" />
            <text x="660" y="235" className="seq-text">6. 软件安装</text>

            {/* 4. Feedback */}
            <line x1="620" y1="280" x2="480" y2="280" className="seq-msg" strokeDasharray="4" markerEnd="url(#arrow-open)" />
            <text x="550" y="275" className="seq-text">7. 返回执行结果</text>

            <line x1="480" y1="320" x2="340" y2="320" className="seq-msg" strokeDasharray="4" markerEnd="url(#arrow-open)" />
            <text x="410" y="315" className="seq-text">8. 更新任务状态</text>

            <line x1="340" y1="360" x2="200" y2="360" className="seq-msg" strokeDasharray="4" markerEnd="url(#arrow-open)" />
            <text x="270" y="355" className="seq-text">9. 推送部署日志</text>

            <line x1="200" y1="400" x2="60" y2="400" className="seq-msg" strokeDasharray="4" markerEnd="url(#arrow-open)" />
            <text x="130" y="395" className="seq-text">10. 展示部署成功</text>

        </svg>
    </div>
);
