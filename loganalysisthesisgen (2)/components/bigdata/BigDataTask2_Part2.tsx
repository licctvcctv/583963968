import React from 'react';

// 任务二续：系统架构图与总结
export const BigDataTask2_Part2: React.FC = () => (
    <>
        {/* 第7页 */}
        <div id="bigdata-task2-2" className="page bg-white w-[210mm] min-h-[297mm] mx-auto shadow-lg mb-8 p-12">
            <h4 className="text-lg font-semibold mt-2 mb-3">2.3.4 应用服务层</h4>
            <ul className="list-disc list-inside ml-4 mb-4 space-y-1">
                <li><strong>交通流量预测服务</strong>：基于LSTM深度学习模型，预测未来15分钟至2小时的路段流量</li>
                <li><strong>拥堵预警服务</strong>：实时监测交通状态，当预测到拥堵时提前发出预警</li>
                <li><strong>信号灯优化服务</strong>：根据实时流量动态调整信号灯配时方案</li>
                <li><strong>路径规划服务</strong>：为导航应用提供实时最优路径推荐</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-4">2.4 系统架构图</h3>
            {/* 添加 capture-as-image 类使其可以导出 */}
            <div className="capture-as-image bg-gray-50 p-6 rounded-lg border border-gray-300 mb-4">
                <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-4">
                        <div className="w-20 text-right font-bold text-gray-600 text-sm">数据源</div>
                        <div className="flex-1 flex gap-2">
                            <div className="bg-blue-100 border border-blue-300 px-2 py-1 rounded text-xs text-center flex-1">交通卡口</div>
                            <div className="bg-blue-100 border border-blue-300 px-2 py-1 rounded text-xs text-center flex-1">GPS轨迹</div>
                            <div className="bg-blue-100 border border-blue-300 px-2 py-1 rounded text-xs text-center flex-1">手机信令</div>
                            <div className="bg-blue-100 border border-blue-300 px-2 py-1 rounded text-xs text-center flex-1">气象数据</div>
                        </div>
                    </div>
                    <div className="flex justify-center"><div className="text-gray-400">↓</div></div>
                    <div className="flex items-center gap-4">
                        <div className="w-20 text-right font-bold text-gray-600 text-sm">采集层</div>
                        <div className="flex-1 flex gap-2">
                            <div className="bg-green-100 border border-green-300 px-2 py-1 rounded text-xs text-center flex-1">Apache Kafka</div>
                            <div className="bg-green-100 border border-green-300 px-2 py-1 rounded text-xs text-center flex-1">Apache Flume</div>
                        </div>
                    </div>
                    <div className="flex justify-center"><div className="text-gray-400">↓</div></div>
                    <div className="flex items-center gap-4">
                        <div className="w-20 text-right font-bold text-gray-600 text-sm">存储层</div>
                        <div className="flex-1 flex gap-2">
                            <div className="bg-yellow-100 border border-yellow-300 px-2 py-1 rounded text-xs text-center flex-1">HDFS</div>
                            <div className="bg-yellow-100 border border-yellow-300 px-2 py-1 rounded text-xs text-center flex-1">HBase</div>
                            <div className="bg-yellow-100 border border-yellow-300 px-2 py-1 rounded text-xs text-center flex-1">Elasticsearch</div>
                        </div>
                    </div>
                    <div className="flex justify-center"><div className="text-gray-400">↓</div></div>
                    <div className="flex items-center gap-4">
                        <div className="w-20 text-right font-bold text-gray-600 text-sm">处理层</div>
                        <div className="flex-1 flex gap-2">
                            <div className="bg-purple-100 border border-purple-300 px-2 py-1 rounded text-xs text-center flex-1">Spark Streaming</div>
                            <div className="bg-purple-100 border border-purple-300 px-2 py-1 rounded text-xs text-center flex-1">Spark MLlib</div>
                            <div className="bg-purple-100 border border-purple-300 px-2 py-1 rounded text-xs text-center flex-1">Hive</div>
                        </div>
                    </div>
                    <div className="flex justify-center"><div className="text-gray-400">↓</div></div>
                    <div className="flex items-center gap-4">
                        <div className="w-20 text-right font-bold text-gray-600 text-sm">应用层</div>
                        <div className="flex-1 flex gap-2">
                            <div className="bg-red-100 border border-red-300 px-2 py-1 rounded text-xs text-center flex-1">流量预测</div>
                            <div className="bg-red-100 border border-red-300 px-2 py-1 rounded text-xs text-center flex-1">拥堵预警</div>
                            <div className="bg-red-100 border border-red-300 px-2 py-1 rounded text-xs text-center flex-1">信号优化</div>
                            <div className="bg-red-100 border border-red-300 px-2 py-1 rounded text-xs text-center flex-1">路径规划</div>
                        </div>
                    </div>
                </div>
            </div>
            <p className="text-center text-sm font-bold mb-6">图 2-1 智能交通大数据系统架构图</p>

            <h3 className="text-xl font-semibold mt-6 mb-4">2.5 实施效果预期</h3>
            <p className="mb-4 text-justify indent-8">基于上述技术方案，系统预期可实现以下效果：</p>
            <ul className="list-disc list-inside ml-4 mb-4 space-y-2">
                <li><strong>预测准确率</strong>：短期（15分钟）流量预测准确率达到90%以上</li>
                <li><strong>拥堵缓解</strong>：通过信号灯优化和路径诱导，主干道平均车速提升15%-20%</li>
                <li><strong>预警时效</strong>：拥堵预警提前量达到10-15分钟</li>
                <li><strong>处理能力</strong>：系统支持每秒处理100万条以上的交通数据记录</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-4">2.6 任务二总结</h3>
            <p className="mb-4 text-justify indent-8">
                智能交通流量预测与优化系统是大数据技术在智慧城市领域的典型应用。通过整合Hadoop、Spark、Kafka等
                大数据技术组件，构建了从数据采集、存储、处理到应用的完整技术栈。该系统能够有效处理海量、
                多源、异构的交通数据，实现交通流量的精准预测和智能调度，为缓解城市交通拥堵、
                提升居民出行体验提供了有力的技术支撑。
            </p>
        </div>
    </>
);

export default BigDataTask2_Part2;
