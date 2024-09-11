import React from 'react'
import { routes } from '../Route/routes'
import { Navigate, Route, Routes } from 'react-router-dom'

export default function AuthLayout() {
  const dashboardRoutes = routes.find(route => route.layout === "auth").pages
  return (
    <>
    <Routes>
        {dashboardRoutes.map((route) => (
        <Route key={route.path} path={route.path} element={route.element}/>
      ))}
        <Route path='*' element={<Navigate to="/auth/iniciarSesion"/>}/>
    </Routes>
    </>
  )
}
