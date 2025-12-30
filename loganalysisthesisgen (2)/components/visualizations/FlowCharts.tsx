import React from 'react';

// --- DIAGRAM: Standard Black & White Flowchart (Optimized) ---
export const StandardBWFlowchart: React.FC = () => (
    <div className="w-full flex justify-center items-center bg-white rounded border border-gray-300 capture-as-image p-6 my-4">
        <svg viewBox="0 0 700 250" className="w-full h-auto font-sans text-xs">
            <defs>
                <marker id="arrow-flow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                    <path d="M0,0 L0,6 L9,3 z" fill="#000000" />
                </marker>
            </defs>
            <style>
                {`
          .flow-node { fill: #ffffff; stroke: #000000; stroke-width: 1.5; }
          .flow-start { fill: #000000; stroke: none; rx: 10; }
          .flow-conn { stroke: #000000; stroke-width: 1.2; fill: none; }
          .flow-text { font-size: 12px; font-family: 'SimSun', serif; }
        `}
            </style>

            {/* Start */}
            <circle cx="50" cy="40" r="12" className="flow-start" />
            <text x="50" y="70" textAnchor="middle" className="flow-text">开始</text>

            {/* Step 1: Select Hosts */}
            <rect x="120" y="20" width="120" height="40" className="flow-node" rx="4" />
            <text x="180" y="45" textAnchor="middle" className="flow-text">1. 选择主机与角色</text>

            {/* Step 2: Gen Inventory */}
            <rect x="280" y="20" width="120" height="40" className="flow-node" rx="4" />
            <text x="340" y="45" textAnchor="middle" className="flow-text">2. 生成 Inventory</text>

            {/* Step 3: Call Ansible */}
            <rect x="440" y="20" width="120" height="40" className="flow-node" rx="4" />
            <text x="500" y="45" textAnchor="middle" className="flow-text">3. 调用 Ansible API</text>

            {/* Step 4: Exec Playbook */}
            <rect x="440" y="100" width="120" height="40" className="flow-node" rx="4" />
            <text x="500" y="125" textAnchor="middle" className="flow-text">4. 执行 Playbook</text>

            {/* Decision: Success? */}
            <polygon points="500,170 560,200 500,230 440,200" className="flow-node" />
            <text x="500" y="205" textAnchor="middle" className="flow-text">执行成功?</text>

            {/* Step 5: Update DB */}
            <rect x="280" y="180" width="120" height="40" className="flow-node" rx="4" />
            <text x="340" y="205" textAnchor="middle" className="flow-text">5. 更新集群状态</text>

            {/* End */}
            <circle cx="180" cy="200" r="12" className="flow-start" />
            <circle cx="180" cy="200" r="7" fill="white" />
            <text x="180" y="230" textAnchor="middle" className="flow-text">结束</text>

            {/* Connections */}
            <path d="M62 40 L120 40" className="flow-conn" markerEnd="url(#arrow-flow)" />
            <path d="M240 40 L280 40" className="flow-conn" markerEnd="url(#arrow-flow)" />
            <path d="M400 40 L440 40" className="flow-conn" markerEnd="url(#arrow-flow)" />

            <path d="M500 60 L500 100" className="flow-conn" markerEnd="url(#arrow-flow)" />
            <path d="M500 140 L500 170" className="flow-conn" markerEnd="url(#arrow-flow)" />

            <path d="M440 200 L400 200" className="flow-conn" markerEnd="url(#arrow-flow)" />
            <text x="420" y="195" fontSize="11" className="flow-text">是</text>

            <path d="M280 200 L200 200" className="flow-conn" markerEnd="url(#arrow-flow)" />

            {/* No branch (Retry) */}
            <path d="M560 200 L620 200 L620 120 L560 120" className="flow-conn" markerEnd="url(#arrow-flow)" />
            <text x="630" y="160" fontSize="11" className="flow-text">否 (重试)</text>

        </svg>
    </div>
);

// --- DIAGRAM: Standard Black & White ER Diagram (Hadoop Ops) ---
export const StandardBWERDiagram: React.FC = () => (
    <div className="w-full flex justify-center items-center bg-white rounded border border-gray-300 capture-as-image p-6 my-4">
        <svg viewBox="0 0 600 250" className="w-full h-auto font-sans text-xs">
            <style>
                {`
          .er-box { fill: #ffffff; stroke: #000000; stroke-width: 1.5; }
          .er-header { fill: #e0e0e0; stroke: #000000; stroke-width: 1.5; }
          .er-text { font-family: 'Times New Roman', serif; font-size: 11px; }
          .er-title-cn { font-family: 'SimHei', sans-serif; font-size: 11px; font-weight: bold; }
          .er-conn { stroke: #000000; stroke-width: 1.2; }
        `}
            </style>

            {/* Entity: Host */}
            <g transform="translate(40, 40)">
                <rect width="130" height="25" className="er-header" />
                <text x="65" y="18" textAnchor="middle" className="er-title-cn">主机表 (Sys_Host)</text>
                <rect y="25" width="130" height="85" className="er-box" />
                <text x="10" y="45" className="er-text">+ host_id (PK) : BIGINT</text>
                <text x="10" y="65" className="er-text">+ ip_addr : VARCHAR</text>
                <text x="10" y="85" className="er-text">+ cpu_core : INT</text>
                <text x="10" y="105" className="er-text">+ memory : INT</text>
            </g>

            {/* Entity: ServiceRole */}
            <g transform="translate(240, 40)">
                <rect width="130" height="25" className="er-header" />
                <text x="65" y="18" textAnchor="middle" className="er-title-cn">服务角色表 (Service_Role)</text>
                <rect y="25" width="130" height="85" className="er-box" />
                <text x="10" y="45" className="er-text">+ id (PK) : BIGINT</text>
                <text x="10" y="65" className="er-text">+ host_id (FK) : BIGINT</text>
                <text x="10" y="85" className="er-text">+ role_name : VARCHAR</text>
                <text x="10" y="105" className="er-text">+ status : INT</text>
            </g>

            {/* Entity: Task */}
            <g transform="translate(440, 40)">
                <rect width="130" height="25" className="er-header" />
                <text x="65" y="18" textAnchor="middle" className="er-title-cn">任务表 (Sys_Task)</text>
                <rect y="25" width="130" height="85" className="er-box" />
                <text x="10" y="45" className="er-text">+ task_id (PK) : UUID</text>
                <text x="10" y="65" className="er-text">+ type : VARCHAR</text>
                <text x="10" y="85" className="er-text">+ start_time : DATETIME</text>
                <text x="10" y="105" className="er-text">+ result : TEXT</text>
            </g>

            {/* Relationship: Host -> ServiceRole */}
            <path d="M170 80 L240 80" className="er-conn" />
            <text x="180" y="70" fontSize="10">1</text>
            <text x="230" y="70" fontSize="10">N</text>
            <circle cx="170" cy="80" r="3" fill="black" />
            <line x1="230" y1="75" x2="240" y2="80" stroke="black" />
            <line x1="230" y1="85" x2="240" y2="80" stroke="black" />

        </svg>
    </div>
);

// --- DIAGRAM: PlantUML Sequence Diagram (Auto-Healing) ---
export const PlantUMLSequenceDiagram: React.FC = () => (
    <div className="w-full flex justify-center items-center bg-white rounded border border-gray-300 capture-as-image p-6 my-4">
        <svg viewBox="0 0 600 350" className="w-full h-auto font-sans text-xs">
            <defs>
                <marker id="arrow-seq" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                    <path d="M0,0 L0,6 L9,3 z" fill="#000000" />
                </marker>
            </defs>
            <style>
                {`
          .seq-line { stroke: #000000; stroke-width: 1; stroke-dasharray: 4,4; }
          .seq-box { fill: #ffffff; stroke: #000000; stroke-width: 1.5; }
          .seq-msg { stroke: #000000; stroke-width: 1.2; }
          .seq-text { font-family: 'SimSun', monospace; font-size: 11px; }
          .seq-title { font-family: 'SimHei', sans-serif; font-weight: bold; }
        `}
            </style>

            {/* Lifelines */}
            <rect x="50" y="20" width="100" height="30" className="seq-box" />
            <text x="100" y="40" textAnchor="middle" className="seq-title">Prometheus</text>
            <line x1="100" y1="50" x2="100" y2="320" className="seq-line" />

            <rect x="200" y="20" width="100" height="30" className="seq-box" />
            <text x="250" y="40" textAnchor="middle" className="seq-title">后端服务</text>
            <line x1="250" y1="50" x2="250" y2="320" className="seq-line" />

            <rect x="350" y="20" width="100" height="30" className="seq-box" />
            <text x="400" y="40" textAnchor="middle" className="seq-title">Ansible</text>
            <line x1="400" y1="50" x2="400" y2="320" className="seq-line" />

            <rect x="500" y="20" width="80" height="30" className="seq-box" />
            <text x="540" y="40" textAnchor="middle" className="seq-title">目标主机</text>
            <line x1="540" y1="50" x2="540" y2="320" className="seq-line" />

            {/* Messages */}
            {/* 1. Alert */}
            <line x1="100" y1="80" x2="250" y2="80" className="seq-msg" markerEnd="url(#arrow-seq)" />
            <text x="175" y="70" textAnchor="middle" className="seq-text">1. 触发告警(Webhook)</text>

            {/* 2. Match Rule */}
            <rect x="240" y="90" width="20" height="40" fill="#f0f0f0" stroke="black" />
            <text x="290" y="110" className="seq-text">2. 匹配自愈规则</text>

            {/* 3. Call Ansible */}
            <line x1="250" y1="150" x2="400" y2="150" className="seq-msg" markerEnd="url(#arrow-seq)" />
            <text x="325" y="140" textAnchor="middle" className="seq-text">3. 下发修复任务</text>

            {/* 4. Exec Command */}
            <line x1="400" y1="180" x2="540" y2="180" className="seq-msg" markerEnd="url(#arrow-seq)" />
            <text x="470" y="170" textAnchor="middle" className="seq-text">4. 执行重启命令</text>

            {/* 5. Return */}
            <line x1="540" y1="210" x2="400" y2="210" className="seq-msg" strokeDasharray="4,2" markerEnd="url(#arrow-seq)" />
            <text x="470" y="200" textAnchor="middle" className="seq-text">5. 返回执行结果</text>

            {/* 6. Notify */}
            <line x1="400" y1="240" x2="250" y2="240" className="seq-msg" strokeDasharray="4,2" markerEnd="url(#arrow-seq)" />
            <text x="325" y="230" textAnchor="middle" className="seq-text">6. 任务完成通知</text>

        </svg>
    </div>
);
