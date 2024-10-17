const express = require('express');

const http = require('http');
const path = require('path');
const { PORT } = require('./config/config');

// Configurar la aplicación Express
const app = express();

// Servir archivos estáticos desde el directorio 'public'
app.use(express.static('public'));

// Parsear el cuerpo de la solicitud como JSON
app.use(express.json());

// Establecer el motor de plantillas EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Rutas
app.get('/', async (req, res) => {
  res.render('index', { title: 'Home' });
});

const scraping = require('./routes/scraping.routes')
app.use('/', scraping)

// Crear servidor HTTP 
const server = http.createServer(app)

// Iniciar servidor
server.listen(PORT, () => {
  console.log(`La aplicación está escuchando en puerto: ${PORT}`);
});
