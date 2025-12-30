import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  FormControl,
  FormHelperText,
  Card,
  CardContent,
  Grid,
  Divider,
  Icon,
} from '@mui/material';
import {
  PrecisionManufacturing,
  Settings,
  Analytics,
  Speed,
  Security,
  Build
} from '@mui/icons-material';
import { styled } from "@mui/material/styles";

const LoginPageContainer = styled(Box)`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #722ed1 0%, #9254de 50%, #b37feb 100%);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image:
      repeating-linear-gradient(0deg, transparent, transparent 35px, rgba(255,255,255,.05) 35px, rgba(255,255,255,.05) 36px),
      repeating-linear-gradient(90deg, transparent, transparent 35px, rgba(255,255,255,.05) 35px, rgba(255,255,255,.05) 36px);
    pointer-events: none;
  }
`;

const LoginPaper = styled(Paper)`
  padding: 48px;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  background: rgba(255, 255, 255, 0.98);
  width: 100%;
  max-width: 420px;
  z-index: 1;
  backdrop-filter: blur(10px);
`;

const LogoBox = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
`;

const LogoIcon = styled(Box)`
  width: 64px;
  height: 64px;
  background: linear-gradient(135deg, #722ed1 0%, #9254de 100%);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 16px;
  box-shadow: 0 8px 24px rgba(114, 46, 209, 0.3);
`;

const TitleTypography = styled(Typography)`
  font-size: 28px;
  font-weight: 700;
  color: #722ed1;
  margin-bottom: 8px;
  text-align: center;
`;

const SubtitleTypography = styled(Typography)`
  font-size: 14px;
  color: #8c8c8c;
  text-align: center;
  margin-bottom: 32px;
`;

const FeatureCard = styled(Card)`
  height: 100%;
  background: linear-gradient(135deg, rgba(114, 46, 209, 0.05) 0%, rgba(146, 84, 222, 0.05) 100%);
  border: 1px solid rgba(114, 46, 209, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(114, 46, 209, 0.15);
  }
`;

const IconBox = styled(Box)`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: linear-gradient(135deg, #722ed1 0%, #9254de 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
  color: white;
`;

const DividerStyled = styled(Divider)`
  margin: 32px 0;
  background: linear-gradient(90deg, transparent, #722ed1, transparent);
  height: 2px;
`;

const InfoBox = styled(Box)`
  background: linear-gradient(135deg, rgba(114, 46, 209, 0.08) 0%, rgba(146, 84, 222, 0.08) 100%);
  border-radius: 12px;
  padding: 16px;
  margin-top: 24px;
  border: 1px solid rgba(114, 46, 209, 0.15);
`;

const LoginPage = ({ onLogin }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = '请输入用户名';
    }

    if (!formData.password) {
      newErrors.password = '请输入密码';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      if (formData.username === '王五' && formData.password === '123456') {
        const userData = {
          username: formData.username,
          role: 'maintenance_engineer',
          fullName: '王五',
          department: '设备维护部'
        };
        onLogin(userData);
        navigate('/maintenance-assessment');
      } else {
        setErrors({ submit: '用户名或密码错误！' });
      }
    } catch (error) {
      console.error('登录失败:', error);
      setErrors({ submit: '登录失败，请重试！' });
    }
  };

  const features = [
    {
      icon: <PrecisionManufacturing />,
      title: '设备健康监控',
      description: '实时监控设备运行状态'
    },
    {
      icon: <Analytics />,
      title: 'AI 预测分析',
      description: '基于机器学习的故障预测'
    },
    {
      icon: <Build />,
      title: '智能维护建议',
      description: '优化维护计划与资源配置'
    }
  ];

  const stats = [
    { icon: <Speed />, label: '预测准确率', value: '94.5%' },
    { icon: <Security />, label: '故障减少', value: '23%' },
    { icon: <Settings />, label: '设备管理', value: '8台' }
  ];

  return (
    <LoginPageContainer>
      <Grid container spacing={4} sx={{ maxWidth: 1200, mx: 'auto', px: 3 }}>
        <Grid item xs={12} md={6} sx={{ display: { xs: 'none', md: 'block' } }}>
          <Box sx={{ mt: 8 }}>
            <Typography
              variant="h3"
              sx={{
                color: 'white',
                fontWeight: 700,
                mb: 2,
                textShadow: '0 2px 10px rgba(0,0,0,0.2)'
              }}
            >
              智能预测性维护系统
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: 'rgba(255,255,255,0.9)',
                mb: 6,
                fontWeight: 300
              }}
            >
              基于 AI 的工业设备健康管理平台
            </Typography>

            <Grid container spacing={3}>
              {features.map((feature, index) => (
                <Grid item xs={12} sm={4} key={index}>
                  <FeatureCard>
                    <CardContent sx={{ p: 2, textAlign: 'center' }}>
                      <IconBox sx={{ mx: 'auto', width: 40, height: 40 }}>
                        {feature.icon}
                      </IconBox>
                      <Typography variant="subtitle2" fontWeight="bold" sx={{ color: '#722ed1' }}>
                        {feature.title}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {feature.description}
                      </Typography>
                    </CardContent>
                  </FeatureCard>
                </Grid>
              ))}
            </Grid>

            <Box sx={{ mt: 6, display: 'flex', gap: 4, justifyContent: 'center' }}>
              {stats.map((stat, index) => (
                <Box key={index} sx={{ textAlign: 'center' }}>
                  <Icon sx={{ fontSize: 32, color: 'white', mb: 1 }}>
                    {stat.icon}
                  </Icon>
                  <Typography variant="h4" sx={{ color: 'white', fontWeight: 700 }}>
                    {stat.value}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                    {stat.label}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} md={6} sx={{ display: 'flex', alignItems: 'center' }}>
          <LoginPaper>
            <LogoBox>
              <LogoIcon>
                <PrecisionManufacturing sx={{ fontSize: 32, color: 'white' }} />
              </LogoIcon>
              <Box>
                <TitleTypography variant="h5">
                  设备维护系统
                </TitleTypography>
              </Box>
            </LogoBox>

            <SubtitleTypography>
              登录以访问预测性维护仪表板
            </SubtitleTypography>

            <form onSubmit={handleSubmit}>
              <FormControl fullWidth margin="normal" error={!!errors.username}>
                <TextField
                  label="用户名"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="请输入用户名"
                  variant="outlined"
                  error={!!errors.username}
                  InputProps={{
                    startAdornment: (
                      <Box sx={{ mr: 1, color: '#722ed1' }}>
                        <PrecisionManufacturing fontSize="small" />
                      </Box>
                    ),
                  }}
                />
                {errors.username && (
                  <FormHelperText>{errors.username}</FormHelperText>
                )}
              </FormControl>

              <FormControl fullWidth margin="normal" error={!!errors.password}>
                <TextField
                  label="密码"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="请输入密码"
                  variant="outlined"
                  error={!!errors.password}
                  InputProps={{
                    startAdornment: (
                      <Box sx={{ mr: 1, color: '#722ed1' }}>
                        <Security fontSize="small" />
                      </Box>
                    ),
                  }}
                />
                {errors.password && (
                  <FormHelperText>{errors.password}</FormHelperText>
                )}
              </FormControl>

              {errors.submit && (
                <Typography variant="body2" color="error" sx={{ mt: 2, textAlign: 'center' }}>
                  {errors.submit}
                </Typography>
              )}

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 4,
                  mb: 2,
                  padding: '14px',
                  fontSize: '16px',
                  fontWeight: 600,
                  background: 'linear-gradient(135deg, #722ed1 0%, #9254de 100%)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #531db8 0%, #722ed1 100%)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 20px rgba(114, 46, 209, 0.3)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                登 录
              </Button>

              <DividerStyled />

              <InfoBox>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: '#722ed1' }}>
                  演示账号
                </Typography>
                <Typography variant="body2" sx={{ color: '#666' }}>
                  用户名：王五
                </Typography>
                <Typography variant="body2" sx={{ color: '#666' }}>
                  密码：123456
                </Typography>
              </InfoBox>
            </form>
          </LoginPaper>
        </Grid>
      </Grid>
    </LoginPageContainer>
  );
};

export default LoginPage;
