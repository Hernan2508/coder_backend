import express from "express";
import productsRouter from './routes/products.router.js'
import cartsRouter from './routes/carts.router.js'
import messagesRouter from './routes/messages.router.js'
import viewsRouter from './routes/views.router.js'
import sessionsRouter from './routes/sessions.router.js'
import handlebars from 'express-handlebars';
import mongoose from 'mongoose';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUiExpress from 'swagger-ui-express';
import MongoStore from 'connect-mongo';
import session from 'express-session';
import { __dirname, __mainDirname } from './utils.js';
import { Server } from 'socket.io';
import * as messagesService from './services/messages.service.js'
import { initializePassport } from './config/passport.config.js';
import passport from 'passport';
import configs from "./config/config.js";
import errorHandler from './middlewares/errors/index.js'

const app = express();

// Swagger
console.log(__mainDirname);

const swaggerOptions = {
    definition: {
        openapi: '3.0.1',
        info:{
            title: 'Documentación del proyecto de Desarrollo Backend',
            description: 'API pensada en resolver el proceso de ecommerce'
        }
    },
    apis: [`${__mainDirname}/docs/**/*.yaml`] //todas las carpetas
}

const specs = swaggerJSDoc(swaggerOptions);
app.use('/api/docs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs))


//abc
// Servidor de Archivos Estáticos
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));

// Configuración de motor de plantillas
app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

// Configuración de Sessions
app.use(session({
    store: MongoStore.create({
        client: mongoose.connection.getClient(),
        ttl: 3600 //tiempo de sesions en segundos
    }),
    secret: 'Coder5575Secret', 
    resave: true, 
    saveUninitialized: true, 
}));

// Configuración de Passport
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/', viewsRouter);
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/api/sessions', sessionsRouter);
app.use('/api/messages', messagesRouter);

//Configuracion de Manejo de Errores debe estar despué de los Routes
app.use(errorHandler);

const server = app.listen(configs.port, () => console.log(`Server running on port ${configs.port}`));

//Socket io
const io = new Server(server); //Real time
app.set('socketio', io);

io.on('connection', socket => {
    console.log('Nuevo Cliente Conectado');

    socket.on('message', async(data) =>{
        //messages.push(data);
        const messages = await messagesService.saveMessage(data)
        console.log(messages);
        io.emit('messageLogs', messages); //replicados a todos
    })

    socket.on('authenticated', async(data) => {
        //enviamos todos los mensajes almacelados hasta el momento solo al cliente que se acaba de conectar
        const messages = await messagesService.getMessages();
        socket.emit('messageLogs', messages);
    });
});