import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/layout/Layout'
import LoginPage from './pages/LoginPage'
import ParameterMonitorPage from './pages/ParameterMonitorPage'
import ParameterComparePage from './pages/ParameterComparePage'
import CorrelationPage from './pages/CorrelationPage'
import Dashboard from './pages/Dashboard/Dashboard'
import StatusOverviewPage from './pages/StatusOverviewPage'
import ParameterCorrelationPage from './pages/ParameterCorrelationPage'
import PerformanceComparisonPage from './pages/PerformanceComparisonPage'
import ParameterTrendPage from './pages/ParameterTrendPage'

const App = () => {
  return (
    <div id="dashboard">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/status" replace />} />
            <Route path="status" element={<StatusOverviewPage />} />
            <Route path="correlation" element={<ParameterCorrelationPage />} />
            <Route path="performance" element={<PerformanceComparisonPage />} />
            <Route path="trend" element={<ParameterTrendPage />} />
            <Route path="monitor" element={<ParameterMonitorPage />} />
            <Route path="compare" element={<ParameterComparePage />} />
            <Route path="dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App