import React from 'react';

export const MVIntro: React.FC = () => {
    return (
        <div id="mv-intro" className="page bg-white w-[210mm] min-h-[297mm] mx-auto shadow-lg mb-8 p-12">
            <h2 className="text-[18pt] font-family mb-6 font-bold text-center">任务简介与背景</h2>

            <h3 className="text-[15pt] font-bold mb-4">1.1 实验背景</h3>
            <div className="text-justify indent-8 mb-6 leading-relaxed">
                <p>
                    随着工业4.0和智能制造的发展，移动机器人（AGV/AMR）在仓储物流、自动化装配等场景中的应用日益广泛。
                    在这些应用中，<strong>高精度的视觉定位（Visual Localization）</strong>是实现机器人自主导航、特别是末端精准停泊的关键技术。
                    传统的磁条或二维码导航虽然成熟，但在铺设和维护上存在局限性。基于自然特征或特定人工标识（Fiducial Markers）的视觉定位技术，
                    具有灵活性高、成本低、信息量大等优势，成为当前的研究热点。
                </p>
                <p className="mt-2">
                    本实验模拟机器人停泊前的视觉定位过程。通过在停泊位设置特定的人工标识（Marker），利用单目相机采集图像序列，
                    经过图像处理、特征提取与匹配、位姿解算等算法步骤，实时计算相机相对于标识的六自由度（6-DoF）位姿。
                    为了直观验证定位算法的精度与鲁棒性，本实验引入<strong>增强现实（Augmented Reality, AR）</strong>技术，
                    在视频流中叠加与标识相对静止的虚拟3D物体，通过虚拟物体的稳定性来定性评估算法性能。
                </p>
            </div>

            <h3 className="text-[15pt] font-bold mb-4">1.2 任务详细要求</h3>
            <div className="text-justify indent-8 mb-6 leading-relaxed">
                <p>
                    <strong>(1) 标识制作</strong>：设计并绘制一个简洁、对比度高的停泊位标识。本实验选用黑色矩形框格作为主要轮廓，
                    内部填充特定图案以利于角点检测和特征描述。
                </p>
                <p>
                    <strong>(2) 数据采集</strong>：使用手持相机模拟机器人前视摄像头，对标识进行多角度拍摄。
                    拍摄过程中相机需保持不同程度的运动（平移、旋转、抖动），以模拟机器人在崎岖路面或启停过程中的真实状态，
                    从而验证算法的抗干扰能力。
                </p>
                <p>
                    <strong>(3) 算法实现</strong>：编写基于Python和OpenCV的机器视觉程序。算法并不依赖简单的颜色分割，
                    而是采用更先进的<strong>特征点匹配（BRISK + FLANN）</strong>结合<strong>光流跟踪（Lucas-Kanade Optical Flow）</strong>的混合架构。
                    核心目标是实时解算相机的位姿矩阵 $[R|t]$。
                </p>
                <p>
                    <strong>(4) AR 验证</strong>：根据解算出的位姿，利用透视投影原理，在图像中绘制一个虚拟立方体。
                    若算法准确，该立方体应始终“锚定”在物理标识上，随标识的移动而发生相应的透视变换，无明显的漂移或抖动。
                </p>
            </div>

            <h3 className="text-[15pt] font-bold mb-4">1.3 实验环境</h3>
            <div className="text-justify indent-8 mb-6 leading-relaxed">
                <ul className="list-disc list-inside">
                    <li><strong>开发语言</strong>：Python 3.8+</li>
                    <li><strong>核心库</strong>：OpenCV (cv2) 4.5+, NumPy</li>
                    <li><strong>硬件设备</strong>：标准USB网络摄像头 / 笔记本内置摄像头 (分辨率 960x540)</li>
                    <li><strong>开发环境</strong>：PyCharm / VS Code</li>
                </ul>
            </div>
        </div>
    );
};
