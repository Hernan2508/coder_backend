import { Router } from "express";
import { getProducts, getProductById, getCarts, getCartById, getChat, getRegister, getLogin, getProfile } from "../controllers/views.controller.js";
import { addLogger } from '../utils/logger.js';

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

// Ruta de prueba para el logger
router.get('/loggerTest', addLogger, (req, res) => {
  try {
      // Ejemplo de logs en diferentes niveles
      req.logger.debug('Este es un mensaje de debug');
      req.logger.http('Este es un mensaje de http');
      req.logger.info('Este es un mensaje de info');
      req.logger.warning('Este es un mensaje de warning');
      req.logger.error('Este es un mensaje de error');
      req.logger.fatal('Este es un mensaje de fatal');

      res.send({ status: 'success', message: 'Logs de prueba enviados.' });
  } catch (error) {
      req.logger.error('Error en el endpoint /loggerTest:', error);
      res.status(500).send({ status: 'error', message: 'Internal Server Error' });
  }
});

export default router;