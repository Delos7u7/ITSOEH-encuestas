import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';
import PieDePagina from '../componets/partesdelapagina/PieDePagina'
import { routes } from '../Route/routes';
import Encabezado from '../componets/partesdelapagina/Encabezado';

function DashboardLayout() {
  const dashboardRoutes = routes.find(route => route.layout === "dashboard").pages
  return (
    <div className='min-h-dvh grid grid-rows-[auto,1fr,auto]'>
      <Encabezado/>
      <main className='mt-11'>
        <Routes>
            {dashboardRoutes.map((route) => (
              <Route key={route.path} path={route.path} element={route.element}/>
            ))}
            <Route path='*' element={<Navigate to="/inicio"/>} />
        </Routes>
      </main>
      <PieDePagina/>
    </div>
  )
}

export default DashboardLayout;