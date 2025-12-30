import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: '#fa8c16', // 橙色主题
      light: '#ffac4a',
      dark: '#d46b08',
    },
    secondary: {
      main: '#1890ff',
      light: '#69c0ff',
      dark: '#096dd9',
    },
    background: {
      default: '#1a1a1a',
      paper: '#2d2d2d',
    },
    text: {
      primary: '#ffffff',
      secondary: 'rgba(255, 255, 255, 0.7)',
    },
  },
  typography: {
    fontFamily: [
      'Public Sans',
      'sans-serif',
    ].join(','),
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
      color: '#fa8c16',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      color: '#fa8c16',
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 500,
      color: '#fa8c16',
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500,
      color: '#ffffff',
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
      color: '#ffffff',
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
      color: '#ffffff',
    },
    body1: {
      fontSize: '0.875rem',
      color: 'rgba(255, 255, 255, 0.7)',
    },
    body2: {
      fontSize: '0.75rem',
      color: 'rgba(255, 255, 255, 0.6)',
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#1a1a1a',
          color: '#ffffff',
          borderBottom: '1px solid rgba(250, 140, 22, 0.3)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          textTransform: 'none',
          fontWeight: 500,
          '&:hover': {
            backgroundColor: '#e58520',
          },
        },
        contained: {
          backgroundColor: '#fa8c16',
          color: '#ffffff',
          '&:hover': {
            backgroundColor: '#e58520',
            boxShadow: '0 4px 14px 0 rgba(250, 140, 22, 0.39)',
          },
        },
        outlined: {
          borderColor: '#fa8c16',
          color: '#fa8c16',
          '&:hover': {
            backgroundColor: 'rgba(250, 140, 22, 0.1)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#2d2d2d',
          border: '1px solid rgba(250, 140, 22, 0.2)',
          borderRadius: '16px',
          overflow: 'hidden',
          transition: 'all 0.3s ease',
        },
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(250, 140, 22, 0.05)',
          padding: '16px',
          borderBottom: '1px solid rgba(250, 140, 22, 0.1)',
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          '&.Mui-error': {
            backgroundColor: 'rgba(244, 67, 54, 0.1)',
            borderLeft: '4px solid #f44336',
          },
          '&.Mui-warning': {
            backgroundColor: 'rgba(255, 152, 0, 0.1)',
            borderLeft: '4px solid #ff9800',
          },
          '&.Mui-info': {
            backgroundColor: 'rgba(33, 150, 243, 0.1)',
            borderLeft: '4px solid #2196f3',
          },
          '&.Mui-success': {
            backgroundColor: 'rgba(76, 175, 80, 0.1)',
            borderLeft: '4px solid #4caf50',
          },
        },
      },
    },
  },
  shape: {
    borderRadius: 8,
  },
  shadows: [
    'none',
    '0px 2px 1px -1px rgba(0,0,0,0.1),0px 1px 1px 0px rgba(0,0,0,0.06),0px 1px 3px 0px rgba(0,0,0,0.1)',
    '0px 4px 3px -1px rgba(0,0,0,0.1),0px 2px 4px 0px rgba(0,0,0,0.06),0px 1px 6px 0px rgba(0,0,0,0.1)',
    '0px 8px 6px -1px rgba(0,0,0,0.1),0px 3px 8px 0px rgba(0,0,0,0.06),0px 3px 13px 0px rgba(0,0,0,0.1)',
    '0px 12px 10px -1px rgba(0,0,0,0.1),0px 4px 12px 0px rgba(0,0,0,0.06),0px 5px 20px 0px rgba(0,0,0,0.1)',
    '0px 16px 14px -1px rgba(0,0,0,0.1),0px 5px 16px 0px rgba(0,0,0,0.06),0px 7px 28px 0px rgba(0,0,0,0.1)',
    '0px 20px 18px -1px rgba(0,0,0,0.1),0px 6px 20px 0px rgba(0,0,0,0.06),0px 9px 36px 0px rgba(0,0,0,0.1)',
    '0px 24px 22px -1px rgba(0,0,0,0.1),0px 7px 24px 0px rgba(0,0,0,0.06),0px 11px 44px 0px rgba(0,0,0,0.1)',
    '0px 28px 26px -1px rgba(0,0,0,0.1),0px 8px 28px 0px rgba(0,0,0,0.06),0px 13px 52px 0px rgba(0,0,0,0.1)',
    '0px 32px 30px -1px rgba(0,0,0,0.1),0px 9px 32px 0px rgba(0,0,0,0.06),0px 15px 60px 0px rgba(0,0,0,0.1)',
    '0px 36px 34px -1px rgba(0,0,0,0.1),0px 10px 36px 0px rgba(0,0,0,0.06),0px 17px 68px 0px rgba(0,0,0,0.1)',
    '0px 40px 38px -1px rgba(0,0,0,0.1),0px 11px 40px 0px rgba(0,0,0,0.06),0px 19px 76px 0px rgba(0,0,0,0.1)',
    '0px 44px 42px -1px rgba(0,0,0,0.1),0px 12px 44px 0px rgba(0,0,0,0.06),0px 21px 84px 0px rgba(0,0,0,0.1)',
    '0px 48px 46px -1px rgba(0,0,0,0.1),0px 13px 48px 0px rgba(0,0,0,0.06),0px 23px 92px 0px rgba(0,0,0,0.1)',
    '0px 52px 50px -1px rgba(0,0,0,0.1),0px 14px 52px 0px rgba(0,0,0,0.06),0px 25px 100px 0px rgba(0,0,0,0.1)',
    '0px 56px 54px -1px rgba(0,0,0,0.1),0px 15px 56px 0px rgba(0,0,0,0.06),0px 27px 108px 0px rgba(0,0,0,0.1)',
    '0px 60px 58px -1px rgba(0,0,0,0.1),0px 16px 60px 0px rgba(0,0,0,0.06),0px 29px 116px 0px rgba(0,0,0,0.1)',
    '0px 64px 62px -1px rgba(0,0,0,0.1),0px 17px 64px 0px rgba(0,0,0,0.06),0px 31px 124px 0px rgba(0,0,0,0.1)',
    '0px 68px 66px -1px rgba(0,0,0,0.1),0px 18px 68px 0px rgba(0,0,0,0.06),0px 33px 132px 0px rgba(0,0,0,0.1)',
    '0px 72px 70px -1px rgba(0,0,0,0.1),0px 19px 72px 0px rgba(0,0,0,0.06),0px 35px 140px 0px rgba(0,0,0,0.1)',
    '0px 76px 74px -1px rgba(0,0,0,0.1),0px 20px 76px 0px rgba(0,0,0,0.06),0px 37px 148px 0px rgba(0,0,0,0.1)',
    '0px 80px 78px -1px rgba(0,0,0,0.1),0px 21px 80px 0px rgba(0,0,0,0.06),0px 39px 156px 0px rgba(0,0,0,0.1)',
    '0px 84px 82px -1px rgba(0,0,0,0.1),0px 22px 84px 0px rgba(0,0,0,0.06),0px 41px 164px 0px rgba(0,0,0,0.1)',
    '0px 88px 86px -1px rgba(0,0,0,0.1),0px 23px 88px 0px rgba(0,0,0,0.06),0px 43px 172px 0px rgba(0,0,0,0.1)',
    '0px 92px 90px -1px rgba(0,0,0,0.1),0px 24px 92px 0px rgba(0,0,0,0.06),0px 45px 180px 0px rgba(0,0,0,0.1)',
    '0px 96px 94px -1px rgba(0,0,0,0.1),0px 25px 96px 0px rgba(0,0,0,0.06),0px 47px 188px 0px rgba(0,0,0,0.1)',
    '0px 100px 98px -1px rgba(0,0,0,0.1),0px 26px 100px 0px rgba(0,0,0,0.06),0px 49px 196px 0px rgba(0,0,0,0.1)',
  ],
  zIndex: {
    appBar: 1200,
    drawer: 1100,
    modal: 1300,
    tooltip: 1400,
  },
})

export default theme
