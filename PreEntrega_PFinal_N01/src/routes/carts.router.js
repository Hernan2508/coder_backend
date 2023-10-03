import { Router } from 'express';
import CartManager from '../managers/cart.manager.js'


const router = Router();

//Creamos la instacia de la clase
const cartManager = new CartManager('./files/carritos.json')


router.get('/', async (req, res) => {

    try {
        // Creamos una constante para obtener mediante query params el limit, y convertirlo a numero
        const limit = Number(req.query.limit);
        
        // Obtenemos todos los Carrtiso
        const carts = await cartManager.getCarts();

        // Validacion
        //? Si el limit no está presente, devuelve el objeto carts conteniendo los cartitos.
        if(!limit){
            res.send({carts});

        //? Si el limit es un número y mayor igual que 0 devuelve carts con el limite.
        } else if (!isNaN(limit) && limit >= 0){ 
            const cartsLimit = carts.slice(0,limit)
            res.send({cartsLimit});

        //? Caso contrario error 400: solicitud incorrecta bad request
        } else{ 
            res.status(400).send({error: 'El valor limit debe ser un número y mayor igual que 0'})
        }

    } catch(error){
        //Manejo de Errores en General: Codigo 500 :Internal Server Error
        res.status(500).send({ error: 'Se produjo un error al procesar la consulta'})
    }

})


//Construcción de nuestro servicio o endpoint
router.post('/', async(req, res) =>{
     
    try{
        
        const carritoCreado = await cartManager.createCart();

        //retornar un 201 porque estamos creando un nuevo recurso
        res.status(201).send({status: 'success', payload: carritoCreado});
        

    } catch(error){
        ///Manejo de Errores en General: Codigo 500 :Internal Server Error
        res.status(500).send({ error: 'Se produjo un error al procesar la consulta'})
   }    
    
})

//get con cid para obtener los productos que pertenezcan al carrito

router.get('/:cid', async (req, res) => {

    try{

        // Creamos una constante para obtener el cid y convertirlo a numero
        const cid = Number(req.params.cid);

        // Obtenemos todos los carritos
        const cart = await cartManager.getCartById(cid);

        //Validacion

        if (cart !== "Carrito No Encontrado") {
            res.send({ status: 'success', cart });
        } else {
            res.status(404).send({ status: 'error', message: 'Carrito no encontrado' });
        }

    } catch(error){
        ///Manejo de Errores en General: Codigo 500 :Internal Server Error
        res.status(500).send({ error: 'Se produjo un error al procesar la consulta'})
    }

});

//post pid debera agregar el producto al rreglo products del carrito propocionado
router.post('/:cid/product/:pid', async (req, res) =>{

    try{

        const cid = req.params.cid;
        const pid = req.params.pid;

        //Validación si el carrito existe
        
        const cart = await cartManager.getCartById(cid);

        if(cart === "Carrito No Encontrado"){
            res.status(404).send({status: 'error', message: "Carrito no Encontrado"});
            return;
        }

        //


    //const carts = await cartManager.ge
    //obtengo todos los carritos
    //busco en ese arreglo el carrito con el cid
    //insertar en el arreglo de productos de ese carritoy y hago un push de un objeto
    //{id:pid}
    //Guardar en el archivo
    //Validación adicional en el caso de que el producto ya se encuentre en el carrito
    //Busco en el arreglo del producto de ese carrito si el producto que quiero agregar ya existe
    //Si existe product.quantity ++
    //Si no existe producto.quantit = 1

    //Guardar en el archivo
    } catch(error){
        ///Manejo de Errores en General: Codigo 500 :Internal Server Error
        res.status(500).send({ error: 'Se produjo un error al procesar la consulta'})
    }
});


export default router;