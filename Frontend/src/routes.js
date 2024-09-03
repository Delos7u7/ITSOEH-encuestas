

import React from 'react'
import Home from './dashboard/components/Home'
import Encuesta from './dashboard//components/Encuesta'

const routes = [
    {
        layout: 'dashboard',
        privileges: 'user',
        pages: [
            {
                name: 'Inicio',
                path: '/inicio',
                element: <Home/>
            },

            {
                name: 'Encuestas',
                path: '/encuestas',
                element: <Encuesta/>
            },
            
        ],
    },
    {
        layout: 'auth',
        privileges: 'none',
        pages: [
            {
                name: 'Inicio',
                path: '/inicio',
                element: <Home/>
            },

            {
                name: 'Encuestas',
                path: '/encuestas',
                element: <Encuesta/>
            },
            
        ],
    },
]

export default routes