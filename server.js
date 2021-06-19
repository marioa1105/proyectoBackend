const express = require('express');
const Producto = require('./api/producto.js');
const Chat = require('./api/Chat.js');
const productoRoutes = require('./routes/routeProductos.js');
const handlebars = require('express-handlebars');
const { json } = require('express');


const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const PORT = 8080;

const chat = new Chat();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

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

//API
app.use('/api',productoRoutes);

app.get('/productos/vista',(req,res)=>{
    try{                                
        let hayProductos = Producto.items.length == 0 ?false:true;
        res.render("producto/productos", {'hayProductos': hayProductos, 'productos': Producto.items});
    } catch(err){
        res.render("producto/productos", {'hayProductos': false, 'productos': []});
    }    
});


app.get('/productos/nuevoProducto',(req,res)=>{  
    
    res.render("producto/addProducto");        
});


app.get('/',(req,res)=>{

});

io.on('connection',(socket) =>{

    
    socket.emit('msgProductos',Producto.items);
    socket.on("updateProd",data=>{
        io.sockets.emit('msgProductos', Producto.items);
    })

    
    chat.getMessages().then(data => {                
        io.sockets.emit('sendMessage', data);
    }) 

    socket.on("sendMessage",message => {  
        
        chat.addMessage(message).then(() => {            
            chat.getMessages().then(data => {
                io.sockets.emit('sendMessage', data);
            })            
        }
        );        
    });
});


server.listen(PORT, () =>{
    console.log(`Escuchando en puerto http://localhost:${PORT}`);
});

server.on('error', error => {
    console.log('error en el servidor:', error);
});