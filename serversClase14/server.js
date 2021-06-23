"use strict";
exports.__esModule = true;
var Http = require('http');
var producto_js_1 = require("../api/producto.js");
var PORT = 8080;
var numero;
var producto = new producto_js_1.Producto();
var server = Http.createServer(function (peticion, respuesta) {
    respuesta.end('Hola');
});
server.listen(3000, function () {
    console.log("servidor esta escuchando en el puerto http:\\localhost:" + PORT);
});
