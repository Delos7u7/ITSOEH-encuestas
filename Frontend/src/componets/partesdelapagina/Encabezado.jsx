import React from 'react'
import { routes } from '../../Route/routes'

export default function Encabezado() {
  const routeWithLayout = routes.find(route => route.layout === 'dashboard');
  return (
    <ul className='flex justify-evenly'>
      {routeWithLayout.pages.map(page => (
        <li key={page.path}>{page.name}</li>
      ))}
    </ul>
  )
}
