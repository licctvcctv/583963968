import React, { useState, useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import MaintenanceAssessmentPage from './pages/MaintenanceAssessmentPage'
import PredictionModelPage from './pages/PredictionModelPage'
import MaintenanceSuggestionPage from './pages/MaintenanceSuggestionPage'
import MaintenanceTrackingPage from './pages/MaintenanceTrackingPage'
import Navigation from './components/Navigation'

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsAuthenticated(false);
  };

  const ProtectedRoute = ({ children }) => {
    return isAuthenticated ? (
      <div>
        <Navigation onLogout={handleLogout} />
        {children}
      </div>
    ) : (
      <LoginPage onLogin={handleLogin} />
    );
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={
            isAuthenticated ?
            <div>
              <Navigation onLogout={handleLogout} />
              <MaintenanceAssessmentPage />
            </div> :
            <LoginPage onLogin={handleLogin} />
          }
        />
        <Route path='/maintenance-assessment' element={
          <ProtectedRoute>
            <MaintenanceAssessmentPage />
          </ProtectedRoute>
        } />
        <Route path='/prediction' element={
          <ProtectedRoute>
            <PredictionModelPage />
          </ProtectedRoute>
        } />
        <Route path='/suggestion' element={
          <ProtectedRoute>
            <MaintenanceSuggestionPage />
          </ProtectedRoute>
        } />
        <Route path='/tracking' element={
          <ProtectedRoute>
            <MaintenanceTrackingPage />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App
