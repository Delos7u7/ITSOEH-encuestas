import React, { useState } from 'react'

export default function Registrarse() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState(null);
  const [succes, setSucces] = useState(false);

  const handleRegister = async () => {
    if (!email || !password || !name) {
      setError('Por favor, completa todos los campos.');
      return;
    }

    setError(null);
    setSucces(false);

    try {
      const response = await fetch('http://localhost:8080/crear-usuario', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, name }),
      });

      const data = await response.json();

      if (response.ok) {
        setSucces(true);

      } else {
        setError(data.message || 'Error en el registro');
      }
    } catch (error) {
      setError('Error en la conexión al servidor');
    }

  };

  return (
    <>
      <div className='flex flex-col w-[100%] justify-center items-center gap-5'>
        <input type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Correo electrónico' />
        <input type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Contraseña' />
        <input type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder='Nombre completo' />
        {error && <p className='text-red-500'>{error}</p>}
        <button type='button' onClick={handleRegister}>Registrarse</button>
      </div>
    </>
  )
}
