import React from 'react'
import css from './Sidebar.module.css'
import {MdSpaceDashboard, MdAnalytics, MdHistory} from "react-icons/md"
import {FaTools} from 'react-icons/fa'
import {FiList} from 'react-icons/fi'
import {NavLink} from 'react-router-dom'
import {PrecisionManufacturing, Troubleshoot, Timeline} from '@mui/icons-material'

const Sidebar = () => {
  const menuItems = [
    { path: '/dashboard', icon: <MdSpaceDashboard size={26} />, title: '仪表板' },
    { path: '/dashboard/failure-analysis', icon: <MdAnalytics size={26} />, title: '故障分析' },
    { path: '/dashboard/failure-diagnosis', icon: <Troubleshoot sx={{ fontSize: 26 }} />, title: '故障诊断' },
    { path: '/dashboard/failure-history', icon: <Timeline sx={{ fontSize: 26 }} />, title: '历史记录' },
    { path: '/dashboard/devices', icon: <PrecisionManufacturing sx={{ fontSize: 26 }} />, title: '设备列表' }
  ]

  return (
    <div className={css.container}>
      {/* Logo Section */}
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <div style={{
          width: '50px',
          height: '50px',
          borderRadius: '12px',
          background: 'linear-gradient(135deg, #1890ff 0%, #096dd9 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 10px'
        }}>
          <PrecisionManufacturing sx={{ fontSize: 30, color: '#fff' }} />
        </div>
        <div style={{
          fontSize: '12px',
          fontWeight: 600,
          color: 'rgba(255,255,255,0.7)',
          textAlign: 'center',
          lineHeight: '1.4'
        }}>
          故障分析<br/>专家系统
        </div>
      </div>

      {/* Menu Items */}
      <div className={css.menu}>
        {menuItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={css.item}
            title={item.title}
            style={({ isActive }) => ({
              background: isActive ? 'rgba(24,144,255,0.2)' : 'transparent',
              borderLeft: isActive ? '3px solid #1890ff' : '3px solid transparent'
            })}
          >
            {item.icon}
          </NavLink>
        ))}
      </div>
    </div>
  )
}

export default Sidebar
