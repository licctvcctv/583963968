import React, { useState } from 'react'
import {
  Container,
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
  Alert,
  Divider,
  Grid,
  Fade
} from '@mui/material'
import {
  Visibility,
  VisibilityOff,
  PrecisionManufacturing,
  Settings,
  Monitor,
  Warning
} from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    if (error) setError('')
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    // Simulate authentication
    setTimeout(() => {
      if (formData.username === '赵六' && formData.password === 'password') {
        localStorage.setItem('user', JSON.stringify({
          username: formData.username,
          role: 'admin',
          loginTime: new Date().toISOString()
        }))
        navigate('/dashboard')
      } else {
        setError('用户名或密码错误')
        setLoading(false)
      }
    }, 1000)
  }

  const handleQuickLogin = () => {
    setFormData({ username: '赵六', password: 'password' })
    setTimeout(() => {
      localStorage.setItem('user', JSON.stringify({
        username: '赵六',
        role: 'admin',
        loginTime: new Date().toISOString()
      }))
      navigate('/dashboard')
    }, 500)
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
            radial-gradient(circle at 20% 50%, rgba(250, 140, 22, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(250, 140, 22, 0.08) 0%, transparent 50%)
          `,
          animation: 'pulse 8s ease-in-out infinite',
          '@keyframes pulse': {
            '0%, 100%': { opacity: 0.5 },
            '50%': { opacity: 1 }
          }
        }
      }}
    >
      {/* Animated Background Elements */}
      <Box sx={{
        position: 'absolute',
        width: '500px',
        height: '500px',
        border: '1px solid rgba(250, 140, 22, 0.1)',
        borderRadius: '50%',
        top: '-250px',
        right: '-250px',
        animation: 'rotate 20s linear infinite'
      }} />
      <Box sx={{
        position: 'absolute',
        width: '300px',
        height: '300px',
        border: '1px solid rgba(250, 140, 22, 0.1)',
        borderRadius: '50%',
        bottom: '-150px',
        left: '-150px',
        animation: 'rotate 15s linear infinite reverse'
      }} />

      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          {/* Left Side - System Info */}
          <Grid item xs={12} md={6}>
            <Fade in={true} timeout={1000}>
              <Box sx={{ color: 'white' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <PrecisionManufacturing
                    sx={{
                      fontSize: 60,
                      color: '#fa8c16',
                      mr: 2,
                      animation: 'spin 10s linear infinite'
                    }}
                  />
                  <Typography
                    variant="h2"
                    sx={{
                      fontWeight: 700,
                      background: 'linear-gradient(45deg, #fa8c16, #ffac4a)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent'
                    }}
                  >
                    工业设备综合监控中心
                  </Typography>
                </Box>

                <Typography variant="h5" sx={{ mb: 4, color: 'rgba(255,255,255,0.8)' }}>
                  Student 4 System - 智能监控平台
                </Typography>

                <Box sx={{ mb: 4 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Monitor sx={{ color: '#fa8c16', mr: 2 }} />
                    <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                      实时监控设备运行状态
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Settings sx={{ color: '#fa8c16', mr: 2 }} />
                    <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                      智能预警与故障诊断
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Warning sx={{ color: '#fa8c16', mr: 2 }} />
                    <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                      数据分析与可视化报告
                    </Typography>
                  </Box>
                </Box>

                <Box
                  sx={{
                    p: 3,
                    background: 'rgba(250, 140, 22, 0.1)',
                    border: '1px solid rgba(250, 140, 22, 0.3)',
                    borderRadius: 2
                  }}
                >
                  <Typography variant="h6" sx={{ color: '#fa8c16', mb: 1 }}>
                    系统特性
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)' }}>
                    支持 AI 预测性维护 · 多维度数据分析 · 实时告警推送 · 智能报表导出
                  </Typography>
                </Box>
              </Box>
            </Fade>
          </Grid>

          {/* Right Side - Login Form */}
          <Grid item xs={12} md={6}>
            <Fade in={true} timeout={1500}>
              <Card
                sx={{
                  background: 'rgba(45, 45, 45, 0.95)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(250, 140, 22, 0.3)',
                  borderRadius: 4,
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Typography
                    variant="h4"
                    sx={{
                      color: '#fa8c16',
                      fontWeight: 600,
                      mb: 1,
                      textAlign: 'center'
                    }}
                  >
                    用户登录
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'rgba(255, 255, 255, 0.5)',
                      mb: 4,
                      textAlign: 'center'
                    }}
                  >
                    访问工业设备综合监控系统
                  </Typography>

                  {error && (
                    <Alert severity="error" sx={{ mb: 3 }}>
                      {error}
                    </Alert>
                  )}

                  <form onSubmit={handleLogin}>
                    <TextField
                      fullWidth
                      name="username"
                      label="用户名"
                      value={formData.username}
                      onChange={handleChange}
                      variant="outlined"
                      autoComplete="username"
                      autoFocus
                      sx={{
                        mb: 3,
                        '& .MuiOutlinedInput-root': {
                          color: 'white',
                          '& fieldset': { borderColor: 'rgba(250, 140, 22, 0.3)' },
                          '&:hover fieldset': { borderColor: 'rgba(250, 140, 22, 0.6)' },
                          '&.Mui-focused fieldset': { borderColor: '#fa8c16' }
                        },
                        '& .MuiInputLabel-root': { color: 'rgba(255, 255, 255, 0.7)' },
                        '& .MuiInputLabel-root.Mui-focused': { color: '#fa8c16' }
                      }}
                    />

                    <TextField
                      fullWidth
                      name="password"
                      label="密码"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={handleChange}
                      variant="outlined"
                      autoComplete="current-password"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowPassword(!showPassword)}
                              edge="end"
                              sx={{ color: 'rgba(255, 255, 255, 0.7)' }}
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        )
                      }}
                      sx={{
                        mb: 4,
                        '& .MuiOutlinedInput-root': {
                          color: 'white',
                          '& fieldset': { borderColor: 'rgba(250, 140, 22, 0.3)' },
                          '&:hover fieldset': { borderColor: 'rgba(250, 140, 22, 0.6)' },
                          '&.Mui-focused fieldset': { borderColor: '#fa8c16' }
                        },
                        '& .MuiInputLabel-root': { color: 'rgba(255, 255, 255, 0.7)' },
                        '& .MuiInputLabel-root.Mui-focused': { color: '#fa8c16' }
                      }}
                    />

                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      disabled={loading}
                      sx={{
                        py: 1.5,
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        mb: 2,
                        background: 'linear-gradient(45deg, #fa8c16, #ffac4a)',
                        '&:hover': {
                          background: 'linear-gradient(45deg, #e58520, #fa8c16)'
                        }
                      }}
                    >
                      {loading ? '登录中...' : '登录'}
                    </Button>

                    <Divider sx={{ my: 3, borderColor: 'rgba(250, 140, 22, 0.2)' }} />

                    <Button
                      fullWidth
                      variant="outlined"
                      onClick={handleQuickLogin}
                      sx={{
                        py: 1.2,
                        borderColor: 'rgba(250, 140, 22, 0.5)',
                        color: '#fa8c16',
                        '&:hover': {
                          borderColor: '#fa8c16',
                          backgroundColor: 'rgba(250, 140, 22, 0.1)'
                        }
                      }}
                    >
                      快速登录 (测试用户: 赵六)
                    </Button>
                  </form>

                  <Box sx={{ mt: 3, textAlign: 'center' }}>
                    <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.4)' }}>
                      系统版本: v4.0.0 | 最后更新: 2024-12-30
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Fade>
          </Grid>
        </Grid>
      </Container>

      <style>{`
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </Box>
  )
}

export default LoginPage
