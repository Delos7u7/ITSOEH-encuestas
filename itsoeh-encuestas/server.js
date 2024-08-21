const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // Rutas API personalizadas con Express
  server.post('/api/register', (req, res) => {
    res.json({ message: 'Hello from API!' });
  });

  // Todas las demás rutas serán manejadas por Next.js
  server.all('*', (req, res) => { 
    return handle(req, res);
  });

  server.listen(3000, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
  });
});
