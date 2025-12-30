import React from 'react';

export const MVCode: React.FC = () => {
    return (
        <>
            <div id="mv-code-1" className="page bg-white w-[210mm] min-h-[297mm] mx-auto shadow-lg mb-8 p-12">
                <h2 className="text-[18pt] font-family mb-6 font-bold text-center">四、程序清单</h2>
                <h3 className="text-[14pt] font-bold mb-4">4.1 核心算法库 (process_func.py) - 图像预处理与匹配</h3>
                <div className="bg-gray-50 border border-gray-200 rounded p-4 text-xs font-mono mb-6 overflow-hidden">
                    <pre className="whitespace-pre-wrap break-words">
                        {`import cv2
import numpy as np

# 图像预处理函数：将图像处理为接近二值化的线稿风格以利于特征提取
def image_proc(img, scale_factor):
    # 转换颜色空间 RGB -> HSV
    img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    img_hsv = cv2.cvtColor(img_rgb, cv2.COLOR_RGB2HSV)
    
    # 获取亮度通道
    lum = img_hsv[:,:,2]
    
    # 自适应阈值二值化，参数经过调优以适应光照变化
    lum_thresh = cv2.adaptiveThreshold(lum, 255, 
        cv2.ADAPTIVE_THRESH_MEAN_C, cv2.THRESH_BINARY_INV, 11, 15)
    
    # 连通域分析，去除噪点
    nb_components, output, stats, centroids = \
        cv2.connectedComponentsWithStats(lum_thresh, connectivity=8)
    sizes = stats[1:, -1]
    min_size = 90 * scale_factor
    
    lum_clean = np.zeros((output.shape))
    for i in range(0, nb_components - 1):
        if sizes[i] >= min_size:
            lum_clean[output == i + 1] = 255
            
    # 高斯模糊平滑
    lum_seg = cv2.GaussianBlur(lum_clean, (3,3), 1)
    return lum_seg

# BRISK特征检测与FLANN匹配
def brisk_flann(img1, img2):
    brisk = cv2.BRISK_create()
    kp1, des1 = brisk.detectAndCompute(img1, None) # 模板图
    kp2, des2 = brisk.detectAndCompute(img2, None) # 目标图
    
    # FLANN LSH 索引参数配置
    index_params = dict(algorithm=6, table_number=6, key_size=12, multi_probe_level=1)
    search_params = dict(checks=50)
    flann = cv2.FlannBasedMatcher(index_params, search_params)
    
    matches = flann.knnMatch(des1, des2, k=2)
    good = []
    # Lowe's Ratio Test
    for m, n in matches:
        if m.distance < 0.7 * n.distance:
            good.append(m)
            
    if len(good) > 50:
        src_pts = np.float32([kp1[m.queryIdx].pt for m in good]).reshape(-1, 1, 2)
        dst_pts = np.float32([kp2[m.trainIdx].pt for m in good]).reshape(-1, 1, 2)
        M = computeHomography(src_pts, dst_pts)
        
        # 计算初始变换后的边界框
        h, w = img1.shape
        pts = np.float32([[0, 0], [0, h - 1], [w - 1, h - 1], [w - 1, 0]]).reshape(-1, 1, 2)
        dst = cv2.perspectiveTransform(pts, M)
        return dst_pts, dst
    else:
        return None, None`}
                    </pre>
                </div>
            </div>

            <div id="mv-code-2" className="page bg-white w-[210mm] min-h-[297mm] mx-auto shadow-lg mb-8 p-12">
                <h3 className="text-[14pt] font-bold mb-4">4.2 核心算法库 (process_func.py) - 辅助计算与绘制</h3>
                <div className="bg-gray-50 border border-gray-200 rounded p-4 text-xs font-mono mb-6 overflow-hidden">
                    <pre className="whitespace-pre-wrap break-words">
                        {`# 计算单应性矩阵
def computeHomography(src_pts, dst_pts):
    # 使用RANSAC算法剔除误匹配点
    M, mask = cv2.findHomography(src_pts, dst_pts, cv2.RANSAC, 10.0)
    return M

# 绘制虚拟立方体
def plot_cube(img_marked, rvecs, tvecs, camera_matrix, dist_coefs):
    # 定义立方体8个顶点 (世界坐标系)
    # y轴垂直于平面，z轴向上
    axis8 = np.float32([[0, 0, 0], [12, 0, 0], [12, 12, 0], [0, 12, 0],
                        [0, 0, -12], [12, 0, -12], [12, 12, -12], [0, 12, -12]]).reshape(-1, 3)

    # 3D投影到2D平面
    imgpts, jac = cv2.projectPoints(axis8, rvecs, tvecs, camera_matrix, dist_coefs)
    
    imgpts = np.int32(imgpts).reshape(-1, 2)
    face1 = imgpts[:4] # 底面
    face4 = imgpts[4:] # 顶面
    
    # 绘制底面 (蓝色填充)
    cv2.drawContours(img_marked, [face1], -1, (255, 0, 0), -3)
    
    # 绘制连接柱 (红色线条)
    cv2.line(img_marked, tuple(imgpts[0]), tuple(imgpts[4]), (0, 0, 255), 2)
    cv2.line(img_marked, tuple(imgpts[1]), tuple(imgpts[5]), (0, 0, 255), 2)
    cv2.line(img_marked, tuple(imgpts[2]), tuple(imgpts[6]), (0, 0, 255), 2)
    cv2.line(img_marked, tuple(imgpts[3]), tuple(imgpts[7]), (0, 0, 255), 2)

    # 绘制顶面 (绿色填充)
    cv2.drawContours(img_marked, [face4], -1, (0, 255, 0), -3)

    return img_marked`}
                    </pre>
                </div>
            </div>

            <div id="mv-code-3" className="page bg-white w-[210mm] min-h-[297mm] mx-auto shadow-lg mb-8 p-12">
                <h3 className="text-[14pt] font-bold mb-4">4.3 主程序逻辑 (main_tracker.py)</h3>
                <div className="bg-gray-50 border border-gray-200 rounded p-4 text-xs font-mono mb-6 overflow-hidden">
                    <pre className="whitespace-pre-wrap break-words">
                        {`import cv2
import numpy as np
import process_func as pf

# ... (路径配置略) ...

# 世界坐标系下的参考点
pg_points = np.array([
    (93.0, 135.0, 0.0), (93.0, -135.0, 0.0), 
    (-93.0, -135.0, 0.0), (-93.0, 135.0, 0.0)
])

# 加载相机参数
cam_params = np.load(camera_params_filename)
camera_matrix = cam_params['camera_matrix']
dist_coefs = cam_params['dist_coefs']

# 初始化处理
img_org = cv2.imread(template_filename)
img1 = pf.image_proc(cv2.resize(img_org, (540,960)), 0.25)

# 读取视频第一帧
cap = cv2.VideoCapture(video_filename)
_, img_fframe = cap.read()
img2_fframe = pf.image_proc(cv2.resize(img_fframe, None, fx=0.5, fy=0.5), 0.5)

# 第一阶段：特征匹配初始化
dst_pts, dst = pf.brisk_flann(img1, img2_fframe)

# 准备第二阶段：光流跟踪参数
lk_params = dict(winSize=(15,15), maxLevel=2,
                 criteria=(cv2.TERM_CRITERIA_EPS | cv2.TERM_CRITERIA_COUNT, 10, 0.03))
src_pts = np.copy(dst_pts)
img2_old = np.copy(img2_fframe)

while True:
    ret, img_scn = cap.read()
    if not ret: break
    
    img_scn_resize = cv2.resize(img_scn, None, fx=0.5, fy=0.5)
    img2 = pf.image_proc(img_scn_resize, 0.5)
    
    # 计算稀疏光流 (Optical Flow)
    dst_pts, st, err = cv2.calcOpticalFlowPyrLK(img2_old, img2, src_pts, None, **lk_params)
    
    # 筛选有效跟踪点
    good_new = dst_pts[st == 1]
    good_old = src_pts[st == 1]
    
    # 计算单应性并更新边界
    M = pf.computeHomography(good_old, good_new)
    dst = cv2.perspectiveTransform(dst, M)
    
    # 更新下一帧的数据
    src_pts = np.copy(good_new).reshape(-1,1,2)
    img2_old = np.copy(img2)
    
    # PnP RANSAC 位姿解算
    ret, rvecs, tvecs, inliers = \
        cv2.solvePnPRansac(pg_points, dst, camera_matrix, dist_coefs)
    
    # 实时AR渲染
    img_marked = pf.plot_cube(img_scn_resize, rvecs, tvecs, camera_matrix, dist_coefs)
    
    cv2.imshow('Video', img_marked)
    if cv2.waitKey(25) & 0xFF == ord('q'): break

cv2.destroyAllWindows()
cap.release()`}
                    </pre>
                </div>
            </div>
        </>
    );
};
