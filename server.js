const express = require('express');
const Producto = require('./api/producto.js');
const Chat = require('./api/Chat.js');
const productoRoutes = require('./routes/routeProductos.js');
const handlebars = require('express-handlebars');
const { json } = require('express');
const faker = require('faker');
faker.locale = "es";
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const PORT = 8080;
const productoService = new Producto();

const chat = new Chat();

const cookieParser = require('cookie-parser');
const session = require('express-session');
const { use } = require('./routes/routeProductos.js');

const FileStore = require('session-file-store')(session);
const MongoStore = require('connect-mongo');
const advancedOptions = {useNewUrlParser:true, useUnifiedToplogy:true};


app.use(cookieParser());
app.use(session({
    store: MongoStore.create({
        mongoUrl: "mongodb://mario:mario@cluster0-shard-00-00.4jorw.mongodb.net:27017,cluster0-shard-00-01.4jorw.mongodb.net:27017,cluster0-shard-00-02.4jorw.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-jm0y3k-shard-0&authSource=admin&retryWrites=true&w=majority",
        //"mongodb://localhost:27017/sessiones",
        
        mongoOptions: advancedOptions,
        ttl: 10000
    }),            //new FileStore({path:'./sesiones',ttl:300, retries:0}),
    secret: 'secreto',    
    resave: false,
    saveUninitialized:false
    
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));



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

const auth = function(req,res,next){
    
    if(req.session.userName){
        return next();
    }else{
        res.render('login');
    }
}
app.post('/logon',(req,res)=>{
    let { userName } = req.body;
    req.session.userName = userName;  
    res.json({login : true});
});
app.get('/login',auth,(req,res)=>{
    res.render('login');
})
app.get('/logout',auth,(req,res)=>{
    let user = req.session.userName;
    
    req.session.destroy();
    res.render('logout',{'userName': user});
    

    //req.session.userName = undefined;
    
})

app.get('/productos/vista',async (req,res)=>{
    try{                   
        let items = await productoService.getProducts();             
        let hayProductos = items.length == 0 ?false:true;
        res.render("producto/productos", {'hayProductos': hayProductos, 'productos': items, 'userName': req.session.userName});
    } catch(err){
        res.render("producto/productos", {'hayProductos': false, 'productos': []});
    }    
});
app.get('/productos/addProducto',async (req,res)=>{
    try{                   
        let items = await productoService.getProducts();             
        let hayProductos = items.length == 0 ?false:true;
        res.render("producto/addProducto", { 'userName': req.session.userName});
    } catch(err){
        res.render("producto/addProducto", {'hayProductos': false, 'productos': []});
    }    
});


//DESAFIO 22
app.get('/productos/vista_test',(req,res)=>{
    try{                   
        let cant = req.query.cant == undefined? 5:req.query.cant;
        let items = new Array();
        for (let index = 0; index < cant -1; index++) {
            let producto = new Producto();
            
            producto.title = faker.commerce.productName();
            producto.price = faker.commerce.price();
            producto.thumbnail = faker.random.image();
            items.push(producto);
        }
        let hayProductos = items.length == 0 ?false:true;
        res.render("producto/productos", {'hayProductos': hayProductos, 'productos': items, 'userName': req.session.userName});
    } catch(err){
        res.render("producto/productos", {'hayProductos': false, 'productos': []});
    }    
});
/*
app.get('/productos/nuevoProducto',(req,res)=>{  
    
    res.render("producto/addProducto");        
});*/


app.get('/',auth,(req,res)=>{
    //res.render('index');
    res.redirect("/productos/addProducto");
});

io.on('connection',(socket) =>{

    
    productoService.getProducts().then(data => {
        socket.emit('msgProductos',data);
    })
    
    socket.on("updateProd",data=>{
        productoService.getProducts().then(data => {
            io.sockets.emit('msgProductos', data);
        })        
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

