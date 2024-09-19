import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function IniciarSesion() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Por favor, completa todos los campos");
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });
      
      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);

      const textResponse = await response.text();
      console.log('Raw response:', textResponse);

      let data;
      try {
        data = JSON.parse(textResponse);
      } catch (parseError) {
        console.error('Error parsing JSON:', parseError);
        setError('Error en la respuesta del servidor');
        return;
      }

      console.log('Parsed data:', data);

      if (response.ok) {
        console.log("xd");
        
        navigate('/dashboard/inicio'); 
      } else {
        setError(data.message || 'Error en el inicio de sesión');
      }
    } catch (error) {
      console.error('Fetch error:', error);
      setError('Error en la conexión con el servidor');
    }
  };

  return (
    <div className='flex flex-col gap-5 w-[100%] justify-center items-center'>
      <input type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder='Usuario' />
      <input type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder='Contraseña' />
      {error && <p className='text-red-500'>{error}</p>}
      <button type="button" onClick={handleLogin}>
        Entrar
      </button>
    </div>
  )
}