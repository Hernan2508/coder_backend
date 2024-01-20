import * as cartsService from '../services/carts.service.js'

const purchaseCart = async (req, res) =>{
  try {
      const { cid } = req.params;
      const { user } = req //correcion

      const result = await cartsService.purchaseCart(cid, user); 
      res.send({status: 'success', payload: result});

  } catch(error){
      req.logger.error('Error purchasing cart:', error);
      res.status(500).send({ status: 'error', message: error.message})
  }    
};



//EP1 Obtener el listado de Carritos
const getCarts = async (req, res) =>{
    try {
        const carts = await cartsService.getCarts(); 
        res.send({status: 'success', payload: carts});
    } catch(error){
        req.logger.error('Error fetching carts:', error);
        res.status(500).send({ status: 'error', message: error.message})
    }    
};

//EP2 Encontrar un Carrito por Id
const getCartById = async (req, res) =>{
    try {
        const { id } = req.params;
        const cart = await cartsService.getCartById(id);

        if(!cart){
            return res.status(404).send({ status: 'error', message: 'user not found'})
        }

        res.send({ status: 'success', payload: cart})

    } catch (error) {
        console.log(error.message);
        req.logger.error(`Error fetching cart by ID ${id}: ${error.message}`);
        res.status(500).send({ error: error.message});
    }
};

//EP3 Crear un carrito
const saveCart = async (req, res) =>{
    try{
        const { cart } = req.body;
        const result = await cartsService.saveCart(cart);
        res.status(201).send({status: 'success', payload: result }); 

    } catch(error){
        req.logger.error(`Error saving cart: ${error.message}`);
        res.status(500).send({ error: 'Se produjo un error al procesar la consulta'})
    }    
};

//EP4 Actualizar un carrito
const updateCart = async (req, res) => {
    try {
      const { cid } = req.params; // Obtén el ID del carrito desde la URL
      const { products } = req.body; // Obtén el arreglo de productos desde body
  
      // Valida que se proporcione el arreglo de productos
      if (!Array.isArray(products)) {
        return res.status(400).send({ status: 'error', message: 'Invalid products format' });
      }
      // Busca el carrito por su ID
      const cart = await cartsService.getCartById(cid);
  
      if (!cart) {
        return res.status(404).send({ status: 'error', message: 'Cart not found' });
      }
  
      const result = await cartsService.updateCart(cid, { products });
  
      res.send({ status: 'success', payload: result });

    } catch (error) {
      req.logger.error(`Error updating cart by ID ${cid}: ${error.message}`);
      res.status(500).send({ status: 'error', message: error.message });
    }
};

//EP5 Actualizar un carrito por Id
const updateCartById = async (req, res) => {
    try {
      const { cid, pid } = req.params; // Obtenemos los IDs del carrito y del producto desde la URL
      const { quantity } = req.body; // Obtenemos la nueva cantidad desde el cuerpo de la solicitud
  
      // Valida que la cantidad proporcionada sea un número válido
      if (typeof quantity !== 'number' || quantity < 0) {
        return res.status(400).send({ status: 'error', message: 'Invalid quantity format' });
      }
  
      // Busca el carrito por su ID
      const cart = await cartsService.getCartById(cid);
  
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
      const result = await cartsService.updateCart(cid, cart);
  
      res.send({ status: 'success', payload: result });

    } catch (error) {
      req.logger.error(`Error updating quantity of product by ID ${pid} in cart by ID ${cid}: ${error.message}`);
      res.status(500).send({ status: 'error', message: error.message });
    }
  };

//EP6 Eliminar un producto del carrito
const deleteProductIdByCartId = async (req, res) => {
    try {
      const { cid, pid } = req.params; // Obtén el ID del carrito y el ID del producto desde la URL
      // Busca el carrito por su ID
      const cart = await cartsService.getCartById(cid);
  
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
      const result = await cartsService.updateCart(cid, { products: cart.products });
  
      res.send({ status: 'success', payload: result });
  
    } catch (error) {
      req.logger.error(`Error deleting product by ID ${pid} from cart by ID ${cid}: ${error.message}`);
      res.status(500).send({ status: 'error', message: error.message });
    }
  };

//EP7 Eliminar un carrito por Id
const deleteCartById = async (req, res) => {
    try {
      const { cid } = req.params; // Obtén el ID del carrito desde la URL
      // Busca el carrito por su ID
      const cart = await cartsService.getCartById(cid);
      if (!cart) {
        return res.status(404).send({ status: 'error', message: 'Cart not found' });
      }
      // Crea un objeto con un arreglo vacío de productos
      const updatedCartData = {
        products: []
      };
      // Utiliza la función update para eliminar todos los productos del carrito
      const result = await cartsService.updateCart(cid, updatedCartData);
  
      res.send({ status: 'success', payload: result });

    } catch (error) {
      req.logger.error(`Error deleting cart by ID ${cid}: ${error.message}`);
      res.status(500).send({ status: 'error', message: error.message });
    }
};

export {
    purchaseCart,
    getCarts, getCartById, saveCart, 
    updateCart, 
    updateCartById, 
    deleteProductIdByCartId,
    deleteCartById
}