import { useState, useEffect } from 'react'
import css from './Dashboard.module.css'

const Dashboard = () => {
  const [summary, setSummary] = useState(null)
  const [faults, setFaults] = useState(null)
  const [paramStats, setParamStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [summaryRes, faultsRes, statsRes] = await Promise.all([
          fetch('http://localhost:8004/api/data/summary'),
          fetch('http://localhost:8004/api/data/faults/distribution'),
          fetch('http://localhost:8004/api/data/parameters/stats')
        ])
        
        const summaryData = await summaryRes.json()
        const faultsData = await faultsRes.json()
        const statsData = await statsRes.json()
        
        setSummary(summaryData)
        setFaults(faultsData)
        setParamStats(statsData)
        setLoading(false)
      } catch (error) {
        console.error('获取数据失败:', error)
        setLoading(false)
      }
    }
    
    fetchData()
  }, [])

  if (loading) {
    return <div className={css.loading}>加载中...</div>
  }

  // 故障类型中文映射
  const faultNames = {
    TWF: '刀具磨损故障',
    HDF: '散热故障',
    PWF: '功率故障',
    OSF: '过载故障',
    RNF: '随机故障'
  }

  // 计算故障总数（不含无故障）
  const totalFaults = faults ? (faults.TWF + faults.HDF + faults.PWF + faults.OSF + faults.RNF) : 0

  return (
    <div className={css.container}>
      <div className={css.dashboard}>
        <div className={`${css.dashboardHead} theme-container`}>
          <div className={css.head}>
            <span>工业设备预测性维护系统</span>
          </div>
          
          {/* 概览卡片 */}
          <div className={css.cards}>
            <div className={css.card}>
              <div className={css.cardHead}>
                <span>总记录数</span>
              </div>
              <div className={css.cardAmount}>
                <span>{summary?.totalRecords?.toLocaleString() || 0}</span>
              </div>
            </div>
            
            <div className={css.card}>
              <div className={css.cardHead}>
                <span>故障记录</span>
              </div>
              <div className={css.cardAmount}>
                <span style={{color: '#ff6b6b'}}>{summary?.failureCount?.toLocaleString() || 0}</span>
              </div>
            </div>
            
            <div className={css.card}>
              <div className={css.cardHead}>
                <span>故障率</span>
              </div>
              <div className={css.cardAmount}>
                <span style={{color: '#ffa502'}}>{summary?.failureRate || '0%'}</span>
              </div>
            </div>
            
            <div className={css.card}>
              <div className={css.cardHead}>
                <span>产品类型</span>
              </div>
              <div className={css.cardAmount}>
                <span>{summary?.productTypes?.length || 0} 种</span>
              </div>
            </div>
          </div>
        </div>

        {/* 故障类型分布 */}
        <div className={`${css.statsSection} theme-container`}>
          <h3>故障类型分布</h3>
          <div className={css.faultGrid}>
            {faults && Object.entries(faultNames).map(([key, name]) => (
              <div key={key} className={css.faultCard}>
                <div className={css.faultName}>{name}</div>
                <div className={css.faultCode}>({key})</div>
                <div className={css.faultCount}>{faults[key] || 0}</div>
                <div className={css.faultPercent}>
                  {totalFaults > 0 ? ((faults[key] / totalFaults) * 100).toFixed(1) : 0}%
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 设备参数统计 */}
        <div className={`${css.statsSection} theme-container`}>
          <h3>设备参数统计</h3>
          <div className={css.paramTable}>
            <table>
              <thead>
                <tr>
                  <th>参数</th>
                  <th>最小值</th>
                  <th>最大值</th>
                  <th>平均值</th>
                  <th>中位数</th>
                </tr>
              </thead>
              <tbody>
                {paramStats && Object.entries(paramStats).map(([param, stats]) => (
                  <tr key={param}>
                    <td>{param}</td>
                    <td>{stats?.min || '-'}</td>
                    <td>{stats?.max || '-'}</td>
                    <td>{stats?.avg || '-'}</td>
                    <td>{stats?.median || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 产品类型和负载等级 */}
        <div className={`${css.statsSection} theme-container`}>
          <h3>数据分类</h3>
          <div className={css.categoryInfo}>
            <div className={css.categoryItem}>
              <span className={css.categoryLabel}>产品类型：</span>
              <span className={css.categoryValue}>
                {summary?.productTypes?.join('、') || '无数据'}
              </span>
            </div>
            <div className={css.categoryItem}>
              <span className={css.categoryLabel}>负载等级：</span>
              <span className={css.categoryValue}>
                {summary?.loadLevels?.join('、') || '无数据'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
