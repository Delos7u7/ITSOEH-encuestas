import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthLayout from './AuthLayout';
import IniciarSesion from './auth/IniciarSesion';
import Registrarse from './auth/Registrarse';

function AppRoutes() {
    return (
      <Router>
        <Routes>
          {/* Rutas para el Dashboard */}
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>
  
          {/* Rutas para Auth */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<IniciarSesion />} />
            <Route path="/register" element={<Registrarse />} />
          </Route>
        </Routes>
      </Router>
    );
  }
  
  export default AppRoutes;