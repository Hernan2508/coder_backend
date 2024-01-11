import { Router } from "express";
import { getProducts, getProductById, getCarts, getCartById, getChat, getRegister, getLogin, getProfile } from "../controllers/views.controller.js";

const router = Router();

/* Implementación de Middlewares */

const publicAccess = (req, res, next) => {
  if(req.session?.user) return res.redirect('/'); //para que se vaya a su profile
  next();
}

const privateAccess = (req, res, next) => {
  if(!req.session?.user) return res.redirect('/login'); //en caso no te hayas registrado
  next();
}

/* EndPoints */
router.get('/products', privateAccess, getProducts); //EP1. renderiza toda la lista de productos
router.get('/products/:productId', privateAccess, getProductById); // EP2. Renderiza y obtiene el detalle del producto
router.get('/carts', privateAccess, getCarts);// EP3. Renderiza y obtiene todos los carritos
router.get('/carts/:cid', privateAccess, getCartById); // EP4. Obtienes el detalle del carrito por Id
router.get('/chat', privateAccess, getChat); // EP5. Renderiza el Chat
router.get('/register', getRegister); // EP6. Renderiza el Register
router.get('/login', publicAccess, getLogin); // EP7. Renderiza el login
router.get('/', privateAccess, getProfile); // EP8. Renderiza el profile

export default router;