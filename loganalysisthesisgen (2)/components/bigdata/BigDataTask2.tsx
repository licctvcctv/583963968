import React from 'react';

// 任务二：大数据应用场景分析
export const BigDataTask2: React.FC = () => (
    <>
        {/* 第6页 */}
        <div id="bigdata-task2" className="page bg-white w-[210mm] min-h-[297mm] mx-auto shadow-lg mb-8 p-12">
            <h2 className="text-2xl font-bold mb-6 border-b-2 border-gray-300 pb-2">任务二：大数据应用场景分析</h2>

            <h3 className="text-xl font-semibold mt-6 mb-4">2.1 应用场景：智能交通流量预测与优化系统</h3>
            <p className="mb-4 text-justify indent-8">
                随着城市化进程的加速，交通拥堵已成为影响城市运行效率和居民生活质量的重要问题。
                智能交通流量预测与优化系统利用大数据技术，通过采集、存储、分析海量交通数据，
                实现对城市交通流量的实时监控、精准预测和智能调度，从而有效缓解交通拥堵，提升道路通行效率。
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-4">2.2 数据来源</h3>
            <p className="mb-4 text-justify indent-8">该系统的数据来源主要包括以下几个方面：</p>
            <ul className="list-disc list-inside ml-4 mb-4 space-y-2">
                <li><strong>交通卡口数据</strong>：通过城市各主要路口的摄像头和传感器，采集车辆通过时间、车牌号、车型等信息，日均数据量可达数十TB</li>
                <li><strong>GPS轨迹数据</strong>：来自出租车、网约车、公交车等运营车辆的实时位置信息，每秒产生数百万条定位记录</li>
                <li><strong>手机信令数据</strong>：通过与运营商合作获取脱敏后的手机信令数据，用于分析人群出行规律</li>
                <li><strong>气象数据</strong>：天气状况对交通流量有显著影响，需要整合气象部门的实时天气数据</li>
                <li><strong>社会活动数据</strong>：大型活动、节假日等信息，用于预测特殊时段的交通需求</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-4">2.3 技术架构设计</h3>
            <p className="mb-4 text-justify indent-8">基于大数据技术栈，设计如下分层架构：</p>

            <h4 className="text-lg font-semibold mt-4 mb-3">2.3.1 数据采集层</h4>
            <ul className="list-disc list-inside ml-4 mb-4 space-y-1">
                <li><strong>Apache Kafka</strong>：作为消息中间件，实现各类数据源的实时接入，支持每秒百万级消息吞吐</li>
                <li><strong>Apache Flume</strong>：用于日志类数据的采集和传输</li>
                <li><strong>自定义数据接口</strong>：对接交通卡口系统、GPS平台等数据源</li>
            </ul>

            <h4 className="text-lg font-semibold mt-4 mb-3">2.3.2 数据存储层</h4>
            <ul className="list-disc list-inside ml-4 mb-4 space-y-1">
                <li><strong>HDFS</strong>：存储历史交通数据，支持PB级数据存储，为离线分析提供数据基础</li>
                <li><strong>HBase</strong>：存储实时交通状态数据，支持毫秒级随机读写</li>
                <li><strong>Elasticsearch</strong>：存储交通事件日志，支持全文检索和快速查询</li>
            </ul>

            <h4 className="text-lg font-semibold mt-4 mb-3">2.3.3 数据处理层</h4>
            <ul className="list-disc list-inside ml-4 mb-4 space-y-1">
                <li><strong>Apache Spark Streaming</strong>：实时流处理引擎，处理实时交通数据流</li>
                <li><strong>Apache Spark MLlib</strong>：机器学习库，用于训练交通流量预测模型</li>
                <li><strong>Apache Hive</strong>：数据仓库工具，支持SQL查询，用于历史数据的统计分析</li>
            </ul>
        </div>
    </>
);

export default BigDataTask2;
