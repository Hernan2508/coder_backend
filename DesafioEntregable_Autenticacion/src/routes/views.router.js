import { Router } from "express";
import Products from "../dao/dbManagers/products.manager.js";
import Carts from "../dao/dbManagers/carts.manager.js";
/* import Products from "../dao/fileManagers/products.manager.js";
import Carts from "../dao/fileManagers/carts.manager.js"; */

const router = Router();

//Creamos la instacia de la clase
const productsManager = new Products();
const cartsManager = new Carts();


/* Implementación del Login */

const publicAccess = (req, res, next) => {
  if(req.session?.user) return res.redirect('/'); //para que se vaya a su profile
  next();
}

const privateAccess = (req, res, next) => {
  if(!req.session?.user) return res.redirect('/login'); //en caso no te hayas registrado
  next();
}

//----------------------------------------------------------------------------------------------------


router.get('/products', privateAccess, async (req, res) => {

    try {

      const { page = 1, limit = 4 } = req.query;
      const { docs, hasPrevPage, hasNextPage, prevPage, nextPage } = await productsManager.getPaginatedProducts(page, limit);

      res.render('products', {

        products: docs,
        hasPrevPage,
        hasNextPage,
        prevPage,
        nextPage,
        user: req.session.user

      });

    } catch (error) {

      console.error(error.message);
    }
  });


  router.get('/products/:productId', privateAccess, async (req, res) => {
    try {

      const {productId} = req.params;
      const product = await productsManager.getById(productId);
  
      if (!product) {
        // Si el producto no se encuentra, puedes mostrar un mensaje de error o redirigir a otra página
        return res.render('error', { message: 'Producto no encontrado' });
      }
  
      res.render('products-details', { product});
    } catch (error) {
      console.error(error.message);
    }
  });



router.get('/carts', privateAccess, async (req, res) =>{
    try {

        const carts = await cartsManager.getAll();
        const products = carts.products;

        res.render('carts', { carts, products});

    } catch (error) {

        console.error(error.message);
    }
});


router.get('/carts/:cid', privateAccess, async (req, res) => {
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


router.get('/chat', privateAccess, async( req, res) =>{
    res.render('chat');
})


// Views nuevas

router.get('/register', publicAccess, (req, res) =>{
  res.render('register')
});


router.get('/login', publicAccess, (req, res) =>{
  res.render('login')
});


router.get('/', privateAccess, (req, res) =>{
  res.render('profile', {
      user: req.session.user //importamos
  })
});

export default router;