const { json } = require('express');
const express = require('express');
const Producto = require('./api/producto.js');

const productoRoutes = require('./routes/routeProductos.js');
const handlebars = require('express-handlebars');
const route = require('./routes/routeProductos.js');

const app = express();
const PORT = 8080;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Plantillas
app.engine('hbs',
            handlebars({
                extname:".hbs",
                defaultLayout:"index.hbs",
                layoutsDir:__dirname + '/views/layouts/',
                partialsDir:__dirname + '/views/partials/'
            })
    );
app.set('view engine', 'hbs');
app.set('views', './views');
app.use(express.static(__dirname + '/public'));

//API
app.use('/api',productoRoutes);

app.get('/productos/vista',(req,res)=>{
    try{                        
        console.log(Producto.items);
        let hayProductos = Producto.items.length == 0 ?false:true;
        res.render("producto/productos", {'hayProductos': hayProductos, 'productos': Producto.items});
    } catch(err){
        res.render("producto/productos", {'hayProductos': false, 'productos': []});
    }    
});


app.get('/productos/nuevoProducto',(req,res)=>{  
    
    res.render("producto/addProducto");        
});

const server = app.listen(PORT, () =>{
    console.log(`Escuchando en puerto http://localhost:${PORT}`);
});

server.on('error', error => {
    console.log('error en el servidor:', error);
});

