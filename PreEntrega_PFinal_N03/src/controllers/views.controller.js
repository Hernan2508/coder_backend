/* import Products from "../dao/dbManagers/products.manager.js";
import Carts from "../dao/dbManagers/carts.manager.js"; */
import * as productsService from '../services/products.service.js'
import * as cartsService from '../services/carts.service.js'

//Creamos la instacia de la clase
/* const productsManager = new Products();
const cartsManager = new Carts(); */

//EP1. renderiza toda la lista de productos
const getProducts = async (req, res) => {
    try {
      const { page = 1, limit = 4 } = req.query;
      const options = {
        page: parseInt(page),
        limit: parseInt(limit)
      };
      const filter = {};
      const { docs, hasPrevPage, hasNextPage, prevPage, nextPage } = await productsService.getPaginatedProducts(filter, options);

      const products = docs.map(product => product.toObject());

      res.render('products', {
        products: products,
        hasPrevPage,
        hasNextPage,
        prevPage,
        nextPage,
        user: req.session.user
      });

    } catch (error) {
      console.error(error.message);
    }
};

// EP2. Renderiza y obtiene el detalle del producto
const getProductById = async (req, res) => {
    try {
      const {productId} = req.params;
      const product = await productsService.getProductById(productId);
  
      if (!product) {
        // Si el producto no se encuentra, puedes mostrar un mensaje de error o redirigir a otra página
        return res.render('error', { message: 'Producto no encontrado' });
      }
  
      res.render('products-details', { product});
    } catch (error) {
      console.error(error.message);
    }
  };

// EP3. Renderiza y obtiene todos los carritos
const getCarts = async (req, res) =>{
    try {
        const carts = await cartsService.getCarts();
        const products = carts.products;

        res.render('carts', { carts, products});

    } catch (error) {
        console.error(error.message);
    }
};

// EP4. Obtienes el detalle del carrito por Id
const getCartById = async (req, res) => {
    try {
        const { cid } = req.params; // Obtén el ID del carrito desde la URL
        // Busca el carrito por su ID
        const cart = await cartsService.getCartById(cid);
        if (!cart) {
            return res.status(404).send({ status: 'error', message: 'Cart not found' });
        }
        // Obtén los productos relacionados con este carrito
        const products = cart.products;

        res.render('carts-products', { cart, products }); // Renderiza una vista con el carrito y sus productos

    } catch (error) {
        res.status(500).send({ status: 'error', message: error.message });
    }
};

// EP5. Renderiza el Chat
const getChat = async( req, res) =>{
    res.render('chat');
};

// EP6. Renderiza el Register
const getRegister =  (req, res) =>{
    res.render('register')
};

// EP7. Renderiza el login
const getLogin = (req, res) =>{
    res.render('login')
};

// EP8. Renderiza el profile
const getProfile = (req, res) =>{
    res.render('profile', {
        user: req.session.user //importamos
    })
};

export {
    getProducts, getProductById, getCarts, getCartById, getChat, getRegister,
    getLogin, getProfile
}