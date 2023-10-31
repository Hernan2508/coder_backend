import express from 'express';
import productsRouter from './routes/products.router.js'
import cartsRouter from './routes/carts.router.js'
import viewsRouter from './routes/views.router.js'
import handlebars from 'express-handlebars';
import mongoose from 'mongoose';
import { __dirname } from './utils.js';


const app = express();

// Servidor archivos estáticos
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use(express.static(`${__dirname}/public`));

//Configuración de motor de plantillas
app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

//Routes
app.use('/', viewsRouter);
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

try {
    await mongoose.connect('mongodb+srv://hernan2508rz:GatND92qWlo6GxWm@cluster55575hr.h94ultt.mongodb.net/practicaIntegradora?retryWrites=true&w=majority');
    console.log('DB connected');
} catch (error) {
    console.log(error.message)
}

app.listen(8080, () => console.log('Server running'));
