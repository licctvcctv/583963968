import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Menu,
  MenuItem,
  Badge
} from '@mui/material';
import {
  Menu as MenuIcon,
  Assessment,
  Insights,
  Lightbulb,
  EventNote,
  Logout,
  Notifications
} from '@mui/icons-material';
import { styled } from "@mui/material/styles";

const AppBarStyled = styled(AppBar)`
  background: linear-gradient(135deg, #722ed1 0%, #9254de 100%);
  box-shadow: 0 2px 10px rgba(114, 46, 209, 0.2);
`;

const NavButton = styled(Button)`
  color: white;
  position: relative;
  font-weight: 500;
  padding: 8px 16px;
  border-radius: 8px;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.15);
  }

  &.active {
    background: rgba(255, 255, 255, 0.2);
    font-weight: 600;

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 30px;
      height: 3px;
      background: white;
      border-radius: 2px;
    }
  }
`;

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationAnchor, setNotificationAnchor] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      navigate('/');
    }
  }, [navigate]);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationClick = (event) => {
    setNotificationAnchor(event.currentTarget);
  };

  const handleNotificationClose = () => {
    setNotificationAnchor(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  const handleNavigation = (path) => {
    navigate(path);
    handleMenuClose();
  };

  const menuItems = [
    { path: '/maintenance-assessment', label: '维护评估', icon: <Assessment /> },
    { path: '/prediction', label: '预测模型', icon: <Insights /> },
    { path: '/suggestion', label: '智能建议', icon: <Lightbulb /> },
    { path: '/tracking', label: '计划跟踪', icon: <EventNote /> },
  ];

  if (!user) {
    return null;
  }

  return (
    <AppBarStyled position="sticky">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 700 }}>
          <Insights sx={{ verticalAlign: 'middle', mr: 1 }} />
          预测性维护顾问系统
        </Typography>

        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
          {menuItems.map((item) => (
            <NavButton
              key={item.path}
              color="inherit"
              startIcon={item.icon}
              onClick={() => handleNavigation(item.path)}
              className={location.pathname === item.path ? 'active' : ''}
            >
              {item.label}
            </NavButton>
          ))}
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 2 }}>
          <IconButton
            size="large"
            aria-label="notifications"
            aria-controls="notification-menu"
            aria-haspopup="true"
            onClick={handleNotificationClick}
            color="inherit"
          >
            <Badge badgeContent={3} color="error">
              <Notifications />
            </Badge>
          </IconButton>

          <Menu
            id="notification-menu"
            anchorEl={notificationAnchor}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(notificationAnchor)}
            onClose={handleNotificationClose}
            PaperProps={{
              sx: { minWidth: 300, maxHeight: 400 }
            }}
          >
            <MenuItem disabled sx={{ bgcolor: 'rgba(114, 46, 209, 0.05)', fontWeight: 600 }}>
              通知中心
            </MenuItem>
            <MenuItem onClick={handleNotificationClose}>
              <Box>
                <Typography variant="body2" fontWeight={600}>激光切割机 L-01 需要紧急维护</Typography>
                <Typography variant="caption" color="text.secondary">刀具磨损超过阈值，建议立即更换</Typography>
              </Box>
            </MenuItem>
            <MenuItem onClick={handleNotificationClose}>
              <Box>
                <Typography variant="body2" fontWeight={600}>CNC-03 温度异常</Typography>
                <Typography variant="caption" color="text.secondary">空气温度持续偏高，请检查散热系统</Typography>
              </Box>
            </MenuItem>
            <MenuItem onClick={handleNotificationClose}>
              <Box>
                <Typography variant="body2" fontWeight={600}>新维护计划已生成</Typography>
                <Typography variant="caption" color="text.secondary">P-02 预测性维护计划已创建</Typography>
              </Box>
            </MenuItem>
          </Menu>

          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenuClick}
            color="inherit"
            sx={{
              bgcolor: 'rgba(255, 255, 255, 0.15)',
              ml: 1,
              '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.25)' }
            }}
          >
            <Typography variant="body2" sx={{ mr: 1, fontWeight: 600 }}>
              {user.username}
            </Typography>
          </IconButton>

          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            PaperProps={{
              sx: { minWidth: 200 }
            }}
          >
            <MenuItem disabled sx={{ bgcolor: 'rgba(114, 46, 209, 0.05)', fontWeight: 600 }}>
              用户信息
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
              <Typography variant="body2">用户名: {user.username}</Typography>
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
              <Typography variant="body2">角色: {user.role === 'maintenance_engineer' ? '维护工程师' : user.role}</Typography>
            </MenuItem>
            {user.fullName && (
              <MenuItem onClick={handleMenuClose}>
                <Typography variant="body2">姓名: {user.fullName}</Typography>
              </MenuItem>
            )}
            {user.department && (
              <MenuItem onClick={handleMenuClose}>
                <Typography variant="body2">部门: {user.department}</Typography>
              </MenuItem>
            )}
            <MenuItem divider />
            <MenuItem onClick={handleLogout}>
              <Logout fontSize="small" sx={{ mr: 1, color: '#ff4d4f' }} />
              <Typography variant="body2" sx={{ color: '#ff4d4f', fontWeight: 600 }}>退出登录</Typography>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBarStyled>
  );
};

export default Navigation;
