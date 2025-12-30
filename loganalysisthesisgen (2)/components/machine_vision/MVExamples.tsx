import React from 'react';

export const MVExamples: React.FC = () => {
    return (
        <div id="mv-examples" className="page bg-white w-[210mm] min-h-[297mm] mx-auto shadow-lg mb-8 p-12">
            <h2 className="text-[18pt] font-family mb-6 font-bold text-center">三、实验结果展示</h2>

            <p className="mb-4 indent-8 text-justify">
                本章节展示了实验过程中的关键图像记录。实验通过摄像头采集标识图像，经过算法处理后实现特征定位与AR增强显示。
                下图分别展示了实验中不同阶段或不同场景下的运行效果，验证了算法在标识检测、位姿跟踪及虚拟投射方面的有效性。
            </p>

            <div className="flex flex-col items-center mb-8 gap-8">
                {/* 图片 1 */}
                <div className="border border-gray-300 p-2 shadow-sm w-[80%] capture-as-image">
                    <img src="/images/machine_vision/scene_1.png" alt="Experiment Record 1" className="w-full" />
                    <p className="text-center font-song text-sm mt-2 font-bold">图 3.1 实验过程记录（一）：场景影像与处理效果</p>
                </div>

                {/* 图片 2 */}
                <div className="border border-gray-300 p-2 shadow-sm w-[80%] capture-as-image">
                    <img src="/images/machine_vision/scene_2.png" alt="Experiment Record 2" className="w-full" />
                    <p className="text-center font-song text-sm mt-2 font-bold">图 3.2 实验过程记录（二）：算法运行状态展示</p>
                </div>

                {/* 图片 3 */}
                <div className="border border-gray-300 p-2 shadow-sm w-[80%] capture-as-image">
                    <img src="/images/machine_vision/scene_3.png" alt="Experiment Record 3" className="w-full" />
                    <p className="text-center font-song text-sm mt-2 font-bold">图 3.3 实验过程记录（三）：不同视角下的测试结果</p>
                </div>
            </div>
        </div>
    );
};
