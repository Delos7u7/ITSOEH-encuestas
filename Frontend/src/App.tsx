import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import PieDePagina from './componets/partesdelapagina/PieDePagina'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <p className='text-3xl'>Holaxd</p>
      </div>
      <PieDePagina/>
    </>
  )
}

export default App
