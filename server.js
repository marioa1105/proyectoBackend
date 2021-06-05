const { json } = require('express');
const express = require('express');
const Producto = require('./api/producto.js');
const route = require('./routes/routeProductos.js');
const productoRoutes = require('./routes/routeProductos.js');

const app = express();

const PORT = 8080;
let productos = new Producto();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use('/api',route);


const server = app.listen(PORT, () =>{
    console.log(`Escuchando en puerto http://localhost:${PORT}`);
});

server.on('error', error => {
    console.log('error en el servidor:', error);
});

