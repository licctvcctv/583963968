import React from 'react';

export const MVAlgorithm: React.FC = () => {
    return (
        <>
            {/* 算法原理 - Part 1: 特征检测篇 */}
            <div id="mv-principle-1" className="page bg-white w-[210mm] min-h-[297mm] mx-auto shadow-lg mb-8 p-12">
                <h2 className="text-[18pt] font-family mb-6 font-bold text-center">二、算法原理与实现机制</h2>

                <h3 className="text-[15pt] font-bold mb-4">2.1 图像预处理与HSV色彩空间筛选</h3>
                <div className="text-justify indent-8 mb-4 leading-relaxed">
                    <p className="mb-2">
                        在实际工业环境中，光照条件往往复杂多变。RGB（红绿蓝）色彩空间对光照强度高度敏感，直接用于特征提取容易受到高光或阴影的干扰。
                        因此，本系统首先利用 <code className="font-mono text-sm bg-gray-100 px-1">cv2.cvtColor</code> 将视频帧从 RGB 空间转换至 <strong>HSV (Hue, Saturation, Value)</strong> 空间。
                    </p>
                    <p className="mb-2">
                        在 HSV 空间中，<strong>Value (亮度)</strong> 分量独立于色彩信息，能够更客观地反映物体的纹理特征。
                        代码实现中 `lum = img_hsv[:,:,2]` 提取了亮度通道。随后，采用 <strong>自适应阈值 (Adaptive Thresholding)</strong> 算法进行二值化。
                        算法公式如下：
                        {'$$ T(x,y) = \\frac{1}{blockSize^2} \\sum_{i=-n}^{n} \\sum_{j=-n}^{n} I(x+i, y+j) - C $$'}
                        其中 $T(x,y)$ 是像素点 $(x,y)$ 的局部阈值，$C$ 是常数项。与全局固定阈值相比，自适应阈值能有效应对图像不同区域明暗不均的问题（如局部阴影），
                        显著提高了算法的鲁棒性。
                    </p>
                </div>

                <h3 className="text-[15pt] font-bold mb-4">2.2 BRISK 特征点检测</h3>
                <div className="text-justify indent-8 mb-4 leading-relaxed">
                    <p className="mb-2">
                        为了在初始帧中定位标识，或在跟踪丢失后进行重定位，系统选用了 <strong>BRISK (Binary Robust Invariant Scalable Keypoints)</strong> 算法。
                        相比于 SIFT 或 SURF，BRISK 是一种二进制特征描述子，计算效率极高，更适合实时 AR 系统。
                    </p>
                    <p className="mb-2">
                        BRISK 的检测基于 AGAST 角点检测算法，通过在图像金字塔的多个尺度上寻找极值点，从而获得 <strong>尺度不变性 (Scale Invariance)</strong>。
                        无论标识距离相机远近（图像中大小变化），都能被稳定检测。其描述符是由采样点对的灰度比较生成的二进制串（512位），
                        不仅匹配速度快（通过汉明距离计算），还具备旋转不变性。
                        本系统中，`brisk.detectAndCompute` 函数同时完成了关键点检测与描述符生成。
                    </p>
                </div>

                <h3 className="text-[15pt] font-bold mb-4">2.3 FLANN 特征匹配与误匹配剔除</h3>
                <div className="text-justify indent-8 mb-4 leading-relaxed">
                    <p className="mb-2">
                        特征匹配是将当前帧中的特征点与预先存储的标识模板进行对应的过程。考虑到实时性要求，本系统使用了 <strong>FLANN (Fast Library for Approximate Nearest Neighbors)</strong> 库。
                        针对 BRISK 产生的二进制描述符，配置 <strong>LSH (Locality Sensitive Hashing)</strong> 索引算法进行近似最近邻搜索。
                    </p>
                    <p className="mb-2">
                        为了剔除错误的匹配点（Outliers），引入了 <strong>Lowe's Ratio Test</strong>。即对每个查询点，找到距离最近的两个匹配点 $m$ 和 $n$。
                        当且仅当最近距离 $m.distance$ 小于次近距离 $n.distance$ 的 0.7 倍时（代码：`m.distance &lt; 0.7 * n.distance`），
                        才认为该匹配是可靠的。这一策略极大地降低了背景纹理相似导致的误匹配率，保证了初始定位的准确性。
                    </p>
                </div>
            </div>

            {/* 算法原理 - Part 2: 跟踪与位姿篇 */}
            <div id="mv-principle-2" className="page bg-white w-[210mm] min-h-[297mm] mx-auto shadow-lg mb-8 p-12">
                <h3 className="text-[15pt] font-bold mb-4">2.4 Lucas-Kanade 金字塔光流跟踪</h3>
                <div className="text-justify indent-8 mb-4 leading-relaxed">
                    <p className="mb-2">
                        虽然特征匹配能进行全局定位，但逐帧计算极其耗时且伴随特征点抖动。一旦获得初始特征点位置，系统即切换至 <strong>光流跟踪 (Optical Flow Tracking)</strong> 模式。
                        光流法基于“亮度恒定”假设：
                        $$ I(x, y, t) = I(x + dx, y + dy, t + dt) $$
                        利用泰勒级数展开及最小二乘法，可以求解出像素的运动向量 $(u,v)$。
                    </p>
                    <p className="mb-2">
                        为了解决快速运动产生的大位移问题，本系统采用了 <strong>金字塔 LK 光流 (Pyramid Lucas-Kanade)</strong>。
                        通过建立图像高斯金字塔，先在顶层低分辨率图像上计算粗略运动，再逐层向下传递并修正，使得算法既能捕捉大幅度平移，
                        又能保持亚像素级的跟踪精度 `winSize=(15,15)`。在代码中，`cv2.calcOpticalFlowPyrLK` 实现了这一过程，确保了 AR 效果的平滑与流畅。
                    </p>
                </div>

                <h3 className="text-[15pt] font-bold mb-4">2.5 PnP 位姿解算与 RANSAC 鲁棒估计</h3>
                <div className="text-justify indent-8 mb-4 leading-relaxed">
                    <p className="mb-2">
                        系统的核心目标是获取相机的 <strong>6-DoF 位姿</strong>，即旋转矩阵 $R$ 和平移向量 $t$。这属于经典的 <strong>PnP (Perspective-n-Point)</strong> 问题：
                        已知一组世界坐标系下的 3D 点 $P_w$（本实验中定义为标识的四个角点 `pg_points`），以及它们在图像平面上的对应 2D 投影点 $p_c$，
                        结合相机内参矩阵 $K$ 和畸变系数 $D$，求解相机位姿。
                        $$ s \cdot p_c = K [R|t] P_w $$
                    </p>
                    <p className="mb-2">
                        实际运行中，光流跟踪可能会出现漂移，导致部分点对坐标不准确。直接使用 DLT (直接线性变换) 求解会导致巨大误差。
                        因此，本系统采用了 <strong>RANSAC (Random Sample Consensus)</strong> 算法优化 PnP 求解。
                        RANSAC 通过随机选取 4 个点对计算假设模型，并验证剩余点的投影误差（重投影误差）。经过多次迭代，
                        选出包含最多内点（Inliers）的最优模型。代码中的 `cv2.solvePnPRansac` 自动完成了这一鲁棒估计过程，
                        即使在部分遮挡或跟踪失败的情况下，也能计算出正确的相机位姿。
                    </p>
                </div>

                <h3 className="text-[15pt] font-bold mb-4">2.6 增强现实 (AR) 投影渲染</h3>
                <div className="text-justify indent-8 mb-4 leading-relaxed">
                    <p className="mb-2">
                        通过 PnP 解算出最佳的 $R$ 和 $t$ 后，即可将虚拟世界中的物体叠加到现实图像中。
                        本实验定义了一个边长为 12 单位的虚拟立方体，其坐标原点位于标识中心。
                        利用 `cv2.projectPoints` 函数，将立方体的 8 个 3D 顶点投影到 2D 图像平面。
                        随后，使用 OpenCV 的绘图函数 `cv2.line` 和 `cv2.drawContours` 依照立方体的拓扑结构连接这些投影点，
                        绘制出具有透视感的线框模型，从而实现“所见即所得”的增强现实效果。
                    </p>
                </div>
            </div>
        </>
    );
};
