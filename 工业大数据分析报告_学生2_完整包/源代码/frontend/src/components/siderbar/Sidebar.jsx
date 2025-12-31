import React from 'react'
import css from './Sidebar.module.css'
import {MdSpaceDashboard, MdSpeed, MdAssessment, MdShowChart, MdTimeline} from "react-icons/md"
import {FaProjectDiagram} from 'react-icons/fa'
import {NavLink} from'react-router-dom'

const Sidebar = () => {
  const menuItems = [
    { path: 'status', icon: MdSpeed, title: '状态总览' },
    { path: 'correlation', icon: FaProjectDiagram, title: '参数关联' },
    { path: 'performance', icon: MdAssessment, title: '性能对比' },
    { path: 'trend', icon: MdShowChart, title: '参数趋势' },
    { path: 'dashboard', icon: MdSpaceDashboard, title: '仪表盘' },
  ]

  return (
    <div className={css.container}>
      <div className={css.logoContainer}>
        <div className={css.logoIcon}>
          <MdSpeed size={32} style={{ color: '#52c41a' }} />
        </div>
        <div className={css.logoText}>
          <div className={css.logoTitle}>设备参数分析</div>
          <div className={css.logoSubtitle}>参数分析师</div>
        </div>
      </div>

      <div className={css.menu}>
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={css.item}
            title={item.title}
            style={({ isActive }) => ({
              background: isActive ? '#f6ffed' : 'transparent',
              borderLeft: isActive ? '3px solid #52c41a' : '3px solid transparent',
            })}
          >
            <item.icon size={24} color="#52c41a" />
            <span className={css.menuLabel}>{item.title}</span>
          </NavLink>
        ))}
      </div>

      <div className={css.userInfo}>
        <div className={css.userAvatar}>李</div>
        <div className={css.userDetails}>
          <div className={css.userName}>李四</div>
          <div className={css.userRole}>参数分析师</div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar