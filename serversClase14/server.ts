const Http = require('http');
import {Producto} from '../api/producto.js';
const PORT = 8080;
let numero: number;
let producto = new Producto();
const server = Http.createServer((peticion, respuesta) => {
    respuesta.end('Hola');
});

server.listen(3000, function () {
    console.log(`servidor esta escuchando en el puerto http:\\localhost:${PORT}`);
    
});