import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/layout/Layout'
import LoginPage from './pages/LoginPage'
import FailureAnalysisPage from './pages/FailureAnalysisPage'
import DashboardPage from './pages/DashboardPage'
import DeviceListPage from './pages/DeviceListPage'
import FailureDiagnosisPage from './pages/FailureDiagnosisPage'
import FailureHistoryPage from './pages/FailureHistoryPage'

const App = () => {
  return (
    <div id="dashboard">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LoginPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/dashboard' element={<Layout />}>
            <Route path='' element={<DashboardPage />} />
            <Route path='devices' element={<DeviceListPage />} />
            <Route path='failure-analysis' element={<FailureAnalysisPage />} />
            <Route path='failure-diagnosis' element={<FailureDiagnosisPage />} />
            <Route path='failure-history' element={<FailureHistoryPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
