import express from 'express';
import handlebars from 'express-handlebars';
import { __dirname, productsFilePath } from './utils.js';
import { Server } from 'socket.io';
import viewsRouter from './routes/views.router.js'
import ProductManager from './managers/product.manager.js';
/* import productsRouter from  './routes/products.router.js' */

const app = express();

// Servidor archivos estáticos

app.use(express.static(`${__dirname}/public`));

//Configuración de motor de plantillas
app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

//Routes
app.use('/', viewsRouter);
/* app.use('/api/products', productsRouter) */

const productManager = new ProductManager(productsFilePath);


const server = app.listen(8080, () => console.log('Server running on port 8080'));
const io = new Server(server); //Real time
app.set('socketio', io);

/* Pruebas */

io.on('connection', socket => {
    console.log('Nuevo Cliente Conectado');

    socket.on('getProducts', async () => {
        try {
            const listProductos = await productManager.getProducts();
            io.emit('getProducts', listProductos);
        } catch(error) {
            throw new Error('Error al actualizar el producto: ' + error.message);
        }
    });

    socket.on('addProduct', async (data) => {
        try {
            const productoAgregado = await productManager.createProduct(data);
            const productosActualizados = await productManager.getProducts();
            io.emit('getProducts', productosActualizados);

        } catch(error) {
            throw new Error('Error al actualizar el producto: ' + error.message);
        }
    });

    //Se escucha el evvento deleteProductById que nos enviará el Id para eliminar
    socket.on('deleteProductById', async (data) => {

        try {
            const id = Number(data)
            const productoEliminado = await productManager.deleteProductById(id);
             
            const productosActualizados = await productManager.getProducts();
            io.emit('getProducts', productosActualizados); 

        } catch(error) {
            throw new Error('Error al actualizar el producto: ' + error.message);
        }
    });
});
