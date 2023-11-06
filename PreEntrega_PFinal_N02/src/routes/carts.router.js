// Para MONGODB:de ahí vamos veremos tanto el de router para de productos para archivos y mongodb juntos
import { Router } from 'express';
import Carts from '../dao/dbManagers/carts.manager.js'
/* import Carts from '../dao/fileManagers/carts.manager.js' */

const router = Router();

//Creamos la instacia de la clase
const cartsManager = new Carts()



//Construcción de nuestro servicio o endpoint MongoDB

router.get('/', async (req, res) =>{

    try{
        const carts = await cartsManager.getAll(); 
        res.send({status: 'success', payload: carts});
  
    } catch(error){
        res.status(500).send({ status: 'error', message: error.message})
   }    

});

// Encontrar un carrito por Id

router.get('/:id', async (req, res) =>{

    try {
        const { id } = req.params;

        
        const cart = await cartsManager.getById(id);
        
        if(!cart){
            return res.status(404).send({ status: 'error', message: 'user not found'})
        }
        res.send({ status: 'success', payload: cart})

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ error: error.message});
    }
});



//Crear un recurso:
router.post('/', async (req, res) =>{

    try{
        // Crea un nuevo carrito sin requerir atributos específicos
        const result = await cartsManager.save({});

        res.status(201).send({status: 'success', payload: result });
        

    } catch(error){
        res.status(500).send({ error: 'Se produjo un error al procesar la consulta'})
   }    

});


// Ruta para actualizar el carrito con un nuevo arreglo de productos
router.put('/:cid', async (req, res) => {
    try {

      const { cid } = req.params; // Obtén el ID del carrito desde la URL
      const { products } = req.body; // Obtén el arreglo de productos desde body
  
      // Valida que se proporcione el arreglo de productos
      if (!Array.isArray(products)) {

        return res.status(400).send({ status: 'error', message: 'Invalid products format' });
      }
  
      // Busca el carrito por su ID
      const cart = await cartsManager.getById(cid);
  
      if (!cart) {

        return res.status(404).send({ status: 'error', message: 'Cart not found' });
      }
  
      const result = await cartsManager.update(cid, { products });
  
      res.send({ status: 'success', payload: result });

    } catch (error) {

      res.status(500).send({ status: 'error', message: error.message });
      
    }
  });


  router.put('/:cid/products/:pid', async (req, res) => {
    try {
      const { cid, pid } = req.params; // Obtenemos los IDs del carrito y del producto desde la URL
      const { quantity } = req.body; // Obtenemos la nueva cantidad desde el cuerpo de la solicitud
  
      // Valida que la cantidad proporcionada sea un número válido
      if (typeof quantity !== 'number' || quantity < 0) {
        return res.status(400).send({ status: 'error', message: 'Invalid quantity format' });
      }
  
      // Busca el carrito por su ID
      const cart = await cartsManager.getById(cid);
  
      if (!cart) {
        return res.status(404).send({ status: 'error', message: 'Cart not found' });
      }
  
      // Encuentra el producto en el carrito por su ID
      const productIndex = cart.products.findIndex((product) => product.product.toString() === pid);
  
      if (productIndex === -1) {
        return res.status(404).send({ status: 'error', message: 'Product not found in cart' });
      }
  
      // Actualiza la cantidad del producto en el carrito
      cart.products[productIndex].quantity = quantity;
  
      // Utiliza la función update para actualizar el carrito
      const result = await cartsManager.update(cid, cart);
  
      res.send({ status: 'success', payload: result });

    } catch (error) {

      res.status(500).send({ status: 'error', message: error.message });
      
    }
  });

//Eliminar
/* router.delete('/:id', async (req, res) =>{
    try {

        const { id } = req.params;


        const cart = await cartsManager.getById(id);
        
        if(!cart){
            return res.status(404).send({ status: 'error', message: 'user not found'})
        }
        
        const cartEliminar = await cartsManager.deleteById(id);

        if (cartEliminar) {
            res.send({ status: 'success', message: 'Carrito eliminado con éxito' });
        };
        
    } catch (error) {
        res.status(500).send({ error: 'Se produjo un error al procesar la consulta'})
    }
}); */


// Ruta para eliminar un producto del carrito
router.delete('/:cid/products/:pid', async (req, res) => {
  try {

    const { cid, pid } = req.params; // Obtén el ID del carrito y el ID del producto desde la URL

    // Busca el carrito por su ID
    const cart = await cartsManager.getById(cid);

    if (!cart) {

      return res.status(404).send({ status: 'error', message: 'Cart not found' });

    }

    // Encuentra el índice del producto a eliminar en el arreglo de productos del carrito
    const productIndex = cart.products.findIndex(product => product.product.toString() === pid); //convertimos a string porque el id es un object id y necesitamos el string

    if (productIndex === -1) {

      return res.status(404).send({ status: 'error', message: 'Product not found in the cart' });
    
    }

    // Elimina el producto del arreglo de productos del carrito
    cart.products.splice(productIndex, 1);

    // Guarda el carrito actualizado en la base de datos
    const result = await cartsManager.update(cid, { products: cart.products });

    res.send({ status: 'success', payload: result });

  } catch (error) {

    res.status(500).send({ status: 'error', message: error.message });

  }
});


router.delete('/:cid', async (req, res) => {
    try {

      const { cid } = req.params; // Obtén el ID del carrito desde la URL
  
      // Busca el carrito por su ID

      const cart = await cartsManager.getById(cid);
  
      if (!cart) {
        return res.status(404).send({ status: 'error', message: 'Cart not found' });
      }
  
      // Crea un objeto con un arreglo vacío de productos
      const updatedCartData = {
        products: []
      };
  
      // Utiliza la función update para eliminar todos los productos del carrito
      const result = await cartsManager.update(cid, updatedCartData);
  
      res.send({ status: 'success', payload: result });

    } catch (error) {

      res.status(500).send({ status: 'error', message: error.message });
    }
  });


export default router;