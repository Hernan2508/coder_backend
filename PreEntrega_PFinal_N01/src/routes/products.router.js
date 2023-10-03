import { Router } from 'express';
import ProductManager from '../managers/product.manager.js'
import { productsFilePath } from '../utils.js';

const router = Router();

//Creamos la instacia de la clase
const productManager = new ProductManager(productsFilePath)//ProductManager('./files/productos.json')

//Construcción de nuestro servicio o endpoint
router.get('/', async (req, res) =>{

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


router.get('/:pid', async (req, res) =>{

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


//Crear un recurso:
router.post('/', async (req, res) =>{

    try{
        const product = req.body; //OBtenemos los datos del nuevo producto 

        // realizamos la validación
        if(!product.title || !product.description || !product.price  || !product.code || !product.stock){
            //Error del cliente que no envia los atributos obligatorios
            return res.status(400).send({status: 'error', error: 'incomplete values'}); //finalizamos la ejecucioón
        
        } else {
    
        const productoRegistrado = await productManager.createProduct(product);
        
        //retornar un 201 porque estamos creando un nuevo recurso
        res.status(201).send({status: 'success', payload: productoRegistrado});
        }

    } catch(error){
        ///Manejo de Errores en General: Codigo 500 :Internal Server Error
        res.status(500).send({ error: 'Se produjo un error al procesar la consulta'})
   }    

});


router.put('/:pid', async (req, res) => {
    try {
        const productToUpdated = req.body;
        const productId = Number(req.params.pid);

        // Realizamos la validación
        if (!productToUpdated.title || !productToUpdated.description || !productToUpdated.price || !productToUpdated.code || !productToUpdated.stock) {
            return res.status(400).send({ status: 'error', error: 'incomplete values' }); // Finalizamos la ejecución
        }

        const updateProduct = await productManager.updateProductById(productId, productToUpdated);

        if (updateProduct) {
            res.send({ status: 'success', message: 'user updated' });
        } else {
            res.status(404).send({ status: 'error', message: 'Producto no encontrado' });
        }

    } catch (error) {
        // Manejo de Errores en General: Código 500 :Internal Server Error
        res.status(500).send({ error: 'Se produjo un error al procesar la consulta' });
    }
});

router.delete('/:pid', async(req, res) => {
    try{

        const productId = Number(req.params.pid);

        const deleteProduct = await productManager.deleteProductById(productId);

        if (deleteProduct.status === 'success') {

            res.send({ status: 'success', message: 'user deleted'});

        } else {
            res.status(404).send({ status: 'error', message:'user not found'});
        }


    } catch (error) {
        // Manejo de Errores en General: Código 500 :Internal Server Error
        res.status(500).send({ error: 'Se produjo un error al procesar la consulta' });
    }
})



export default router;