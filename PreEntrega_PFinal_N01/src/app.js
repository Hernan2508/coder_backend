import express from 'express';
import productsRouter from  './routes/products.router.js'
import cartsRouter from  './routes/carts.router.js'

//Creando el servidor http usando express
const app = express();

app.use(express.json()); //soporte con formato json
//Configuración adicional
app.use(express.urlencoded({extended:true}));

//Configuracion de routers para Carts y para Products
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)





app.listen(8080, () => console.log('Listening on port 8080'));

