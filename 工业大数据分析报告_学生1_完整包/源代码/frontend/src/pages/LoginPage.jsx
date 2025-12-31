import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Avatar,
  CssBaseline,
  Container,
  Paper,
  InputAdornment,
  IconButton,
  Divider
} from '@mui/material';
import {
  LockOutlined,
  Visibility,
  VisibilityOff,
  PrecisionManufacturing,
  Settings,
  Analytics
} from '@mui/icons-material';

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '张三',
    password: '123456'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate login - in production, call actual API
    setTimeout(() => {
      localStorage.setItem('token', 'demo-token-123456');
      localStorage.setItem('username', formData.username);
      localStorage.setItem('userRole', 'analyst');
      setLoading(false);
      navigate('/dashboard');
    }, 1000);
  };

  const featureCards = [
    {
      icon: <PrecisionManufacturing sx={{ fontSize: 40, color: '#1890ff' }} />,
      title: '设备监控',
      desc: '实时监控工业设备运行状态'
    },
    {
      icon: <Analytics sx={{ fontSize: 40, color: '#1890ff' }} />,
      title: '故障分析',
      desc: 'AI驱动的智能故障诊断'
    },
    {
      icon: <Settings sx={{ fontSize: 40, color: '#1890ff' }} />,
      title: '预测维护',
      desc: '基于数据的预测性维护建议'
    }
  ];

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: `linear-gradient(135deg, #001529 0%, #002847 50%, #1890ff 100%)`,
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(24,144,255,0.3) 0%, transparent 70%)',
          top: '-200px',
          right: '-200px',
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(24,144,255,0.2) 0%, transparent 70%)',
          bottom: '-150px',
          left: '-150px',
        }
      }}
    >
      <CssBaseline />
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
            <PrecisionManufacturing sx={{ fontSize: 60, color: '#1890ff', mr: 2 }} />
            <Typography
              variant="h3"
              component="h1"
              style={{
                fontWeight: 700,
                color: '#ffffff',
                letterSpacing: '2px',
                textShadow: '0 2px 10px rgba(24,144,255,0.5)'
              }}
            >
              工业设备故障分析专家系统
            </Typography>
          </Box>
          <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.7)', fontWeight: 300 }}>
            Industrial Equipment Failure Analysis Expert System
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 4, alignItems: 'stretch', flexWrap: 'wrap-reverse', justifyContent: 'center' }}>
          {/* Login Card */}
          <Card
            sx={{
              padding: 4,
              borderRadius: 4,
              boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
              width: '100%',
              maxWidth: 420,
              backgroundColor: 'rgba(255, 255, 255, 0.98)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <CardContent sx={{ p: 0 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
                <Avatar
                  sx={{
                    m: 1,
                    bgcolor: '#1890ff',
                    width: 64,
                    height: 64,
                    boxShadow: '0 4px 20px rgba(24,144,255,0.4)'
                  }}
                >
                  <LockOutlined sx={{ fontSize: 32 }} />
                </Avatar>
                <Typography component="h2" variant="h5" fontWeight="bold" sx={{ mt: 2 }}>
                  系统登录
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  请输入您的账号信息
                </Typography>
              </Box>

              <Box component="form" onSubmit={handleSubmit}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="用户名"
                  name="username"
                  autoComplete="username"
                  autoFocus
                  value={formData.username}
                  onChange={handleChange}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '&:hover fieldset': {
                        borderColor: '#1890ff',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#1890ff',
                      }
                    }
                  }}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="密码"
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleChange}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '&:hover fieldset': {
                        borderColor: '#1890ff',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#1890ff',
                      }
                    }
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={loading}
                  sx={{
                    mt: 4,
                    mb: 2,
                    py: 1.8,
                    fontSize: 16,
                    fontWeight: 600,
                    background: 'linear-gradient(135deg, #1890ff 0%, #096dd9 100%)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #40a9ff 0%, #1890ff 100%)',
                      boxShadow: '0 6px 20px rgba(24,144,255,0.4)',
                    },
                    '&:disabled': {
                      background: 'rgba(24,144,255,0.5)',
                    }
                  }}
                >
                  {loading ? '登录中...' : '登录系统'}
                </Button>

                <Divider sx={{ my: 3 }}>

                  <Typography variant="caption" color="text.secondary">
                    测试账号
                  </Typography>
                </Divider>

                <Box
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    bgcolor: 'rgba(24,144,255,0.08)',
                    border: '1px dashed #1890ff',
                    textAlign: 'center'
                  }}
                >
                  <Typography variant="body2" sx={{ fontWeight: 600, color: '#1890ff' }}>
                    用户名: 张三
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: '#1890ff', mt: 0.5 }}>
                    密码: 123456
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>

          {/* Feature Cards */}
          <Box sx={{ flex: 1, minWidth: 320, maxWidth: 480 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {featureCards.map((feature, index) => (
                <Paper
                  key={index}
                  elevation={0}
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    background: 'rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      background: 'rgba(255,255,255,0.15)',
                      transform: 'translateX(10px)',
                    }
                  }}
                >
                  <Box sx={{
                    p: 2,
                    borderRadius: 2,
                    background: 'rgba(24,144,255,0.2)',
                  }}>
                    {feature.icon}
                  </Box>
                  <Box>
                    <Typography variant="h6" sx={{ color: '#fff', fontWeight: 600, mb: 0.5 }}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                      {feature.desc}
                    </Typography>
                  </Box>
                </Paper>
              ))}
            </Box>
          </Box>
        </Box>

        {/* Footer */}
        <Box sx={{ mt: 6, textAlign: 'center' }}>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)' }}>
            © 2025 工业设备故障分析系统 | AI-Powered Predictive Maintenance
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default LoginPage;
