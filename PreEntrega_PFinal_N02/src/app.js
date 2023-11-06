import express from 'express';
import productsRouter from './routes/products.router.js'
import cartsRouter from './routes/carts.router.js'
import viewsRouter from './routes/views.router.js'
import handlebars from 'express-handlebars';
import mongoose from 'mongoose';
import { __dirname } from './utils.js';
import { Server } from 'socket.io';
import Messages from './dao/dbManagers/messages.manager.js'


const app = express();

// Servidor archivos estáticos
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));

//Configuración de motor de plantillas
app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

//Routes
app.use('/', viewsRouter);
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

try {
    await mongoose.connect('mongodb+srv://hernan2508rz:GatND92qWlo6GxWm@cluster55575hr.h94ultt.mongodb.net/preEntregaFinal02?retryWrites=true&w=majority');
    console.log('DB connected');
} catch (error) {
    console.log(error.message)
}

const server = app.listen(8080, () => console.log('Server running'));

//Socket io
const io = new Server(server); //Real time
app.set('socketio', io);

/* Pruebas */


const messagesManager = new Messages()
//const messages = [];


io.on('connection', socket => {
    console.log('Nuevo Cliente Conectado');

    socket.on('message', async(data) =>{
        //messages.push(data);
        const messages = await messagesManager.save(data)
        console.log(messages);
        io.emit('messageLogs', messages); //replicados a todos
    })

    socket.on('authenticated', async(data) => {
        //enviamos todos los mensajes almacelados hasta el momento solo al cliente que se acaba de conectar
        const messages = await messagesManager.getAll();
        socket.emit('messageLogs', messages);
    });
});