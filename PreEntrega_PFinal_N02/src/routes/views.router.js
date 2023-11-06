import { Router } from "express";
import Products from "../dao/dbManagers/products.manager.js";
import Carts from "../dao/dbManagers/carts.manager.js";
/* import Products from "../dao/fileManagers/products.manager.js";
import Carts from "../dao/fileManagers/carts.manager.js"; */

const router = Router();

//Creamos la instacia de la clase
const productsManager = new Products();
const cartsManager = new Carts();

router.get('/products', async (req, res) => {

    try {

      const { page = 1, limit = 4 } = req.query;
      const { docs, hasPrevPage, hasNextPage, prevPage, nextPage } = await productsManager.getPaginatedProducts(page, limit);

      res.render('products', {

        products: docs,
        hasPrevPage,
        hasNextPage,
        prevPage,
        nextPage,

      });

    } catch (error) {

      console.error(error.message);
    }
  });


  router.get('/products/:productId', async (req, res) => {
    try {

      const {productId} = req.params;
      const product = await productsManager.getById(productId);
  
      if (!product) {
        // Si el producto no se encuentra, puedes mostrar un mensaje de error o redirigir a otra página
        return res.render('error', { message: 'Producto no encontrado' });
      }
  
      res.render('products-details', { product });
    } catch (error) {
      console.error(error.message);
    }
  });



router.get('/carts', async (req, res) =>{
    try {

        const carts = await cartsManager.getAll();
        const products = carts.products;

        res.render('carts', { carts, products});

    } catch (error) {

        console.error(error.message);
    }
});


router.get('/carts/:cid', async (req, res) => {
    try {
        const { cid } = req.params; // Obtén el ID del carrito desde la URL

        // Busca el carrito por su ID
        const cart = await cartsManager.getById(cid);

        if (!cart) {
            return res.status(404).send({ status: 'error', message: 'Cart not found' });
        }

        // Obtén los productos relacionados con este carrito
        const products = cart.products;

        res.render('carts-products', { cart, products }); // Renderiza una vista con el carrito y sus productos

    } catch (error) {

        res.status(500).send({ status: 'error', message: error.message });
    }
});



router.get('/', async( req, res) =>{
    res.render('chat');
})

export default router;