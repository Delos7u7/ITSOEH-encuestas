import React from 'react';
import Home from '../dashboard/components/Home';
import Encuesta from '../dashboard/components/Encuesta';
import IniciarSesion from '../auth/IniciarSesion';
import Registrarse from '../auth/Registrarse';
import ProtectedRoute from './ProtectedRoute';

export const routes = [
    {
        layout: 'dashboard',
        privileges: 'user',
        pages: [
            {
                name: 'Inicio',
                path: '/inicio',
                element: <ProtectedRoute element={<Home />}/>
            },

            {
                name: 'Encuestas',
                path: '/encuestas',
                element: <ProtectedRoute element={<Encuesta />}/>
            },
            
        ],
    },
    {
        layout: 'dashboardadmin',
        privileges: 'admin',
        pages: [
            {
                name: 'Inicio',
                path: '/inicio-admin',
                element: <ProtectedRoute element={<Home />}/>
            },

            {
                name: 'Encuestas',
                path: '/encuestas',
                element: <ProtectedRoute element={<Encuesta />}/>
            },
            
        ],
    },
    {
        layout: 'auth',
        privileges: 'none',
        pages: [
            {
                name: 'InicioSesion',
                path: '/iniciarSesion',
                element: <IniciarSesion/>
            },
            
            {
                name: 'Registrarse',
                path: '/registrarse',
                element: <Registrarse/>
            },
            
        ],
    },
];