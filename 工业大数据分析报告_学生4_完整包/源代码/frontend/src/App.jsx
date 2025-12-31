import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import theme from './theme'
import LoginPage from './pages/LoginPage'
import Layout from './components/layout/Layout'
import Dashboard from './pages/Dashboard/Dashboard'
import Calender from './pages/Dashboard/Calender/Calender'
import MonitoringDashboardPage from './pages/MonitoringDashboardPage'
import BoardPage from './components/Board/BoardPage'
import DataGrid from './pages/Dashboard/DataGrid/DataGrid'
import DataPivotPage from './pages/DataPivotPage'
import AlertCenterPage from './pages/AlertCenterPage'
import ReportExportPage from './pages/ReportExportPage'

const App = () => {
  return (
    <div id="dashboard">
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<LoginPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/dashboard' element={<Layout />}>
              <Route path='' element={<Dashboard />} />
              <Route path='dashboard' element={<Dashboard />} />
              <Route path='calender' element={<Calender />} />
              <Route path='board' element={<BoardPage />} />
              <Route path='users' element={<DataGrid />} />
              <Route path='monitoring' element={<MonitoringDashboardPage />} />
              <Route path='data-pivot' element={<DataPivotPage />} />
              <Route path='alerts' element={<AlertCenterPage />} />
              <Route path='reports' element={<ReportExportPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  )
}

export default App
