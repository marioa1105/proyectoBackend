const express = require('express');
const handlebars = require('express-handlebars');
const app = express();
const compression = require('compression');
const server = require('http').Server(app);
const io = require('socket.io')(server);
const { fork } = require('child_process');
const cluster = require('cluster');
const faker = require('faker');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const config = require('./config/config');
const dotenv = require('dotenv');
const args = require('yargs').argv;
dotenv.config();

const Producto = require('./api/producto.js');
const Chat = require('./api/chat.js');

const productoRoutes = require('./routes/routeProductos.js');
faker.locale = "es";


let PORT = 8080;
const productoService = new Producto();
const chat = new Chat();
const FileStore = require('session-file-store')(session);
const MongoStore = require('connect-mongo');
const advancedOptions = { useNewUrlParser: true, useUnifiedToplogy: true };
const passport = require('passport');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const Factory = require('./DAO/factory/UsuarioFactory');
const usuarioService = Factory.getFactory('mongo');
const env = require('./config/config');

const { platform } = require('os');
const numCpus = require('os').cpus().length;
const {graphqlHTTP} = require('express-graphql');
const {buildSchema} = require('graphql');
const {schema, root} = require('./Routes/GraphqlApp');
let MODO = 'FORK';

let infoProcess = {};


let FACEBOOK_CLIENT_ID = env.FACEBOOK_CLIENT_ID;
let FACEBOOK_CLIENT_SECRET = env.FACEBOOK_KEY;
PORT = process.env.PORT;
const nodemailer = require('nodemailer');

//const twilioClient = require('twilio')(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);
let cmdPort = 'PORT-';
let cmdFaceId = 'FACEID-';
let cmdFaceSec = 'FACESEC-';
let cmdModo = 'MODO-';
(function () {
    console.log(`PORT: ${args.port}`);
    if (process.argv.length >= 3) {        
        for(let i = 2; i < process.argv.length; i++){
            if(process.argv[i].includes(cmdPort)){
                PORT = process.argv[i].substring(cmpPort.length, process.argv[i].length);
            }
            if(process.argv[i].includes(cmdFaceId)){
                FACEBOOK_CLIENT_ID = process.argv[i].substring(cmdFaceId.length, process.argv[i].length);
            }
            if(process.argv[i].includes(cmdFaceSec)){
                FACEBOOK_CLIENT_SECRET = process.argv[i].substring(cmdFaceSec.length, process.argv[i].length);
            }
            if(process.argv[i].includes(cmdModo)){
                MODO = process.argv[i].substring(cmdModo.length, process.argv[i].length);
            }
        }
        

        /*if (process.argv[3] != undefined && process.argv[4] != undefined) {
            FACEBOOK_CLIENT_ID = process.argv[3];
            FACEBOOK_CLIENT_SECRET = process.argv[4];
        }
        if (process.argv[5] != undefined){
            if (process.argv[5].toUpperCase() == 'FORK' || process.argv[5].toUpperCase() == 'CLUSTER') {
                MODO = process.argv[5].toUpperCase();
            }
        }*/
        
    }
    PORT = args.port || 8080;

    infoProcess = {
        ParamsIn: process.argv.map(x => { return x; }),
        SO: process.platform,
        NODEV: process.version,
        Memory: process.memoryUsage(),
        PathExec: process.execPath,
        Id: process.pid,
        Path: process.cwd(),
        CantCPU: numCpus
        , Puerto: PORT 
    };


})();

if (cluster.isMaster && MODO == 'CLUSTER') {
    
    for (let index = 0; index < numCpus; index++) {
        cluster.fork();        
    }
    
    cluster.on('exit', worker => {
        console.log('Worker', worker.process.pid, 'died');
    })
}
else {
    console.log('slave');

    passport.use(new FacebookStrategy({
        clientID: FACEBOOK_CLIENT_ID,
        clientSecret: FACEBOOK_CLIENT_SECRET,
        callbackURL: '/facebook/callback',
        profileFields: ['id', 'displayName', 'photos', 'emails'],
        scope: ['email']
    }, function (accessToken, refreshToken, profile, done) {
        let userProfile = profile;
        return done(null, userProfile);
    })
    );
    /*
    passport.use('login', new LocalStrategy({
        passReqToCallback: true
    },
        async function (req, username, password, done) {
            let usuario = await usuarioService.getUsuario(username);
            console.log('login');
            if (!usuario) {
                console.log('Usuario no encontrado con el nombre:', username);
                return done(null, false, console.log('mensaje', 'usuario no encontrado'));
            } else {
                if (!isValidPassword(usuario, password)) {
                    console.log('contraseña invalida');
                    return done(null, false, console.log('mensaje', 'contraseña invalida'));
                } else {
                    return done(null, usuario);
                }
            }
        })
    );
    passport.use('signup', new LocalStrategy({
        passReqToCallback: true
    }, async function (req, username, password, done) {
        let usuario = await usuarioService.getUsuario(username);
    
        if (usuario) {
            console.log('usuario ya existe');
            return done(null, false, console.log('mensaje', 'usuario ya existe'));
        } else {
            let newUser = {            
                UserName: username,
                Password: createHash(password)
            };
    
            await usuarioService.save(newUser);
            return done(null, newUser);
        }
    })
    );*/

    const isValidPassword = (user, password) => {
        return bcrypt.compareSync(password, user.Password);
    }

    const createHash = (password) => {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
    }
    passport.serializeUser(function (user, done) {
        //done(null, user.UserName);
        done(null, user);
    });

    passport.deserializeUser(async function (id, done) {
        done(null, id);
        /*let user = await usuarioService.getUsuario(id);
        return done(null, user);*/
    });

    app.use(cookieParser());

    app.use(session({
        store: MongoStore.create({
            mongoUrl: "mongodb://localhost:27017/sessiones",
            //"mongodb://mario:mario@cluster0-shard-00-00.4jorw.mongodb.net:27017,cluster0-shard-00-01.4jorw.mongodb.net:27017,cluster0-shard-00-02.4jorw.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-jm0y3k-shard-0&authSource=admin&retryWrites=true&w=majority",
            //        
            //mongoOptions: advancedOptions,
            ttl: 10000
        }),            //new FileStore({path:'./sesiones',ttl:300, retries:0}),
        secret: 'secreto',
        resave: false,
        saveUninitialized: false

    }));
    app.use('/graphql',graphqlHTTP({
        schema: schema,
        rootValue: root,
        graphiql: true
    }));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static(__dirname + '/public'));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(compression());

    //Plantillas
    app.engine('hbs',
        handlebars({
            extname: ".hbs",
            defaultLayout: "index.hbs",
            layoutsDir: __dirname + '/views/layouts/',
            partialsDir: __dirname + '/views/partials/'
        })
    );
    app.set('view engine', 'hbs');
    app.set('views', './views');

    //API
    app.use('/api', productoRoutes);

    const auth = function (req, res, next) {

        if (req.isAuthenticated()) {
            return next();
        } else {
            res.redirect('/logon');
        }
    }
    app.get('/info-debug', (req, res) => {
        console.log('debug info')
        res.render('info', { info: infoProcess});
        //res.send(JSON.stringify(infoProcess,null,'\t'));
    })
    app.get('/info', (req, res) => {
        
        res.render('info', { info: infoProcess});
        //res.send(JSON.stringify(infoProcess,null,'\t'));
    })
    app.get('/login', passport.authenticate('facebook'));
    app.get('/facebook/callback', passport.authenticate('facebook',
        {
            successRedirect: '/',
            failureRedirect: '/faillogin'
        }
    ));
    /*app.post('/login', passport.authenticate('login', { failureRedirect: '/faillogin' }),(req,res)=>{
        let { userName } = req.body;
        req.session.userName = userName;  
        res.redirect('/');
        //res.json({login : true});
    });*/
    /*app.get('/login', (req, res) => {
        res.render('login');
    });*/
    app.get('/signup', (req, res) => {
        res.render('signup');
    });

    app.post('/signup', passport.authenticate('signup', { failureRedirect: '/failsignup' }), (req, res) => {
        res.redirect('/login');
    });

    app.get('/failsignup', (req, res) => {
        res.status(400).render('failssignup');
    });

    app.get('/faillogin', (req, res) => {
        res.status(400).render('faillogin');
    });

    app.get('/logon', (req, res) => {
        res.render('logon');
    });

    app.get('/logout', auth, (req, res) => {
        req.session.destroy((err) => {
            if (err) return next(err)
            const transporter = getTransportEthereal();
            let subject = `Logout => ${req.user.displayName} - ${new Date().toLocaleString()}`;
            let html = '<h1 style="color: blue;">Aviso de Logout</h1>'
            sendMail(transporter,'Servidor Node Js','breana.zemlak87@ethereal.email',subject,html);
            let user = req.user.displayName;
            req.logout();
            res.render('logout', { 'userName': user });
        })

    })

    app.get('/productos/vista', async (req, res) => {
        try {
            let items = await productoService.getProducts();
            let hayProductos = items.length == 0 ? false : true;
            res.render("producto/productos", { 'hayProductos': hayProductos, 'productos': items, 'userName': req.session.userName });
        } catch (err) {
            res.render("producto/productos", { 'hayProductos': false, 'productos': [] });
        }
    });
    app.get('/productos/addProducto', async (req, res) => {
        try {
            let items = await productoService.getProducts();
            let hayProductos = items.length == 0 ? false : true;
            let email = req.user.emails.length == 0 ? "" : req.user.emails[0].value;
            let photo = req.user.photos.length == 0 ? "" : req.user.photos[0].value;
            res.render("producto/addProducto", { 'userName': req.user.displayName, 'email': email, 'photo': photo });
        } catch (err) {
            res.render("producto/addProducto", { 'hayProductos': false, 'productos': [] });
        }
    });


    //DESAFIO 22
    app.get('/productos/vista_test', (req, res) => {
        try {
            let cant = req.query.cant == undefined ? 5 : req.query.cant;
            let items = new Array();
            for (let index = 0; index < cant - 1; index++) {
                let producto = new Producto();

                producto.title = faker.commerce.productName();
                producto.price = faker.commerce.price();
                producto.thumbnail = faker.random.image();
                items.push(producto);
            }
            let hayProductos = items.length == 0 ? false : true;
            res.render("producto/productos", { 'hayProductos': hayProductos, 'productos': items, 'userName': req.session.userName });
        } catch (err) {
            res.render("producto/productos", { 'hayProductos': false, 'productos': [] });
        }
    });
    /*
    app.get('/productos/nuevoProducto',(req,res)=>{  
        
        res.render("producto/addProducto");        
    });*/

    app.get('/random', (req, res) => {
        let cant = req.query.cant || 100000000;

        const random = fork('./random.js');
        random.send(cant);
        random.on('message', numeros => {
            res.json({ Numeros: numeros, Puerto: PORT } );
        })




    })

    function getTransportEthereal(){
        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: 'breana.zemlak87@ethereal.email',
                pass: 'QgHrZgXvfQAA9h8fum'
            }
        });

        return transporter;
    }

    function getTransportGmail(){
        const transporter = nodemailer.createTransport({
            service: 'gmail',            
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS
            }
        });

        return transporter;
    }

    function sendMail(transporter, from, to, subject, html, attachment){
        let mailOption = {};
        if (attachment == undefined){
            mailOption = {
                from: from,
                to: to,
                subject: subject,
                html: html
            };
        }
        else{
            mailOption = {
                from: from,
                to: to,
                subject: subject,
                html: html,
                attachments: attachment
            };
        }
        

        transporter.sendMail(mailOption, (err,info)=>{
            if(err){
                console.log("Sendmail " + err);
                return;
            }
            console.log(info);
        })
    }

    app.get('/', auth, (req, res) => {
        
        const transporter = getTransportEthereal();
        let subject = `Login => ${req.user.displayName} - ${new Date().toLocaleString()}`;
        let html = '<h1 style="color: blue;">Aviso de Login</h1>'
        sendMail(transporter,'Servidor Node Js','breana.zemlak87@ethereal.email',subject,html);    
        
        const transporterGmail = getTransportGmail();
        let email = req.user.emails.length == 0 ? "" : req.user.emails[0].value;
        let attachment = [];

        if(req.user.photos.length > 0) {
            console.log(req.user.photos[0].value);
            attachment.push({
                path:req.user.photos[0].value
            });
        } 
        html = '<h1 style="color: blue;">Aviso de Login - Cambiar extension de adjunto a jpg</h1>'
        sendMail(transporterGmail,'Servidor Node Js',email,subject,html,attachment);    
        res.redirect("/productos/addProducto");
    });

    io.on('connection', (socket) => {


        productoService.getProducts().then(data => {
            socket.emit('msgProductos', data);
        })

        socket.on("updateProd", data => {
            productoService.getProducts().then(data => {
                io.sockets.emit('msgProductos', data);
            })
        })

        chat.getMessages().then(data => {
            io.sockets.emit('sendMessage', data);
        })

        socket.on("sendMessage", message => {
            if(message.text.includes('administrador')){
                /*twilioClient.messages.create({
                    body: `${message.author.nombre} ${message.author.apellido} => ${message.text}`,
                    from: process.env.TWILIO_PHONE_NUMBER,
                    to: process.env.TWILIO_PHONE_TO
                })
                .then(message => console.log(message.sid))
                .catch(console.log)*/
            }
            

            chat.addMessage(message).then(() => {
                chat.getMessages().then(data => {
                    io.sockets.emit('sendMessage', data);
                })
            }
            );
        });
    });


    server.listen(PORT, () => {
        console.log(`Escuchando en puerto http://localhost:${PORT}`);
    });

    server.on('error', error => {
        console.log('error en el servidor:', error);
    });
}