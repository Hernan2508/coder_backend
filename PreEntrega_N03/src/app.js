import express from 'express';
import ProductManager from './ProductManager.js';

//Creando el servidor http usando express
const app = express();

//Creamos la instacia de la clase
const productManager = new ProductManager('./files/productos.json')

//Configuración adicional
app.use(express.urlencoded({extended:true}));

//Construcción de nuestro servicio o endpoint
app.get('/products', async (req, res) =>{

    try {
        // Creamos una constante para obtener mediante query params el limit, y convertirlo a numero
        const limit = Number(req.query.limit);
        
        // Obtenemos todos los Productos
        const products = await productManager.getProducts();

        // Validacion
        //? Si el limit no está presente, devuelve el objeto products conteniendo los productos.
        if(!limit){
            res.send({products});

        //? Si el limit es un número y mayor igual que 0 devuelve products con el limite.
        } else if (!isNaN(limit) && limit >= 0){ 
            const productsLimit = products.slice(0,limit)
            res.send({productsLimit});

        //? Caso contrario error 400: solicitud incorrecta bad request
        } else{ 
            res.status(400).send({error: 'El valor limit debe ser un número y mayor igual que 0'})
        }

    } catch(error){
        //Manejo de Errores en General: Codigo 500 :Internal Server Error
        res.status(500).send({ error: 'Se produjo un error al procesar la consulta'})
    }
});


app.get('/products/:pid', async (req, res) =>{

    try{

        // Creamos una constante para obtener el pid y convertirlo a numero
        const pid = Number(req.params.pid);

        // Obtenemos todos los Productos
        const products = await productManager.getProducts();

        // Creamos una constante para obtener el productoEncontrado
        const productoEncontrado = products.find(product => product.id === pid);

        //Validacion
        if(!productoEncontrado){
            res.status(404).send({error: 'Product not found'}); //Error 404: Not Found
        } else {
            res.send({productoEncontrado});
        }

    } catch(error){
        ///Manejo de Errores en General: Codigo 500 :Internal Server Error
        res.status(500).send({ error: 'Se produjo un error al procesar la consulta'})
    }

});


//? ------  Testing-------
//* 1) Se mandará a llamar desde el navegador a la url http://localhost:8080/products sin query, eso debe devolver todos los 10 productos.
//* 2) Se mandará a llamar desde el navegador a la url http://localhost:8080/products?limit=5 , eso debe devolver sólo los primeros 5 de los 10 productos.
//* 3) Se mandará a llamar desde el navegador a la url http://localhost:8080/products/2, eso debe devolver sólo el producto con id=2.
//* 4) Se mandará a llamar desde el navegador a la url http://localhost:8080/products/34123123, al no existir el id del producto, 
//*    debe devolver un objeto con un error indicando que el producto no existe.



app.listen(8080, () => console.log('Listening on port 8080'));

