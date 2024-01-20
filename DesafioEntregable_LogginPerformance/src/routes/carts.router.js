import { Router } from 'express';
import { purchaseCart, getCarts, getCartById, saveCart, updateCart, updateCartById, deleteProductIdByCartId, deleteCartById } from '../controllers/carts.controller.js';
import { addLogger } from '../utils/logger.js';
import { isUser } from '../middlewares/authMiddleware.js';

const router = Router();

//? Construcción de nuestro servicio o endpoint MongoDB
router.get('/', addLogger, getCarts); // EP1. Obtener todos los carritos
router.get('/:id',addLogger, getCartById) // EP2. Encontrar un carrito por Id
router.post('/',addLogger, saveCart) // EP3. Crear un carrito isUser
router.put('/:cid', isUser, addLogger,updateCart) // EP4. Actualizar un carrito isUser
router.put('/:cid/products/:pid', isUser, addLogger, updateCartById) // EP5. Actualizar un carrito por Id isUser
router.delete('/:cid/products/:pid', addLogger, deleteProductIdByCartId) // EP6. Eliminar un producto por Id por el Id del carrito
router.delete('/:cid', addLogger, deleteCartById); //EP7. Eliminar un carrito por Id
router.post('/:cid/purchase', isUser, addLogger, purchaseCart);

export default router;