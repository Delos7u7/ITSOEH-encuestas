import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './dashboard/DashboardLayout';
import AuthLayout from './auth/AuthLayout';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/dashboard/*' element={<DashboardLayout />} />
        <Route path='/auth/*' element={<AuthLayout />} />
        <Route path='*' element={<Navigate to="/dashboard/inicio" />} />
      </Routes>
    </Router>
  );
}

export default App;