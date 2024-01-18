import { Router } from 'express';
import { purchaseCart, getCarts, getCartById, saveCart, updateCart, updateCartById, deleteProductIdByCartId, deleteCartById } from '../controllers/carts.controller.js';
import { isUser } from '../middlewares/authMiddleware.js';

const router = Router();

//? Construcción de nuestro servicio o endpoint MongoDB
router.get('/', getCarts); // EP1. Obtener todos los carritos
router.get('/:id', getCartById) // EP2. Encontrar un carrito por Id
router.post('/', saveCart) // EP3. Crear un carrito isUser
router.put('/:cid', isUser, updateCart) // EP4. Actualizar un carrito isUser
router.put('/:cid/products/:pid', isUser, updateCartById) // EP5. Actualizar un carrito por Id isUser
router.delete('/:cid/products/:pid', deleteProductIdByCartId) // EP6. Eliminar un producto por Id por el Id del carrito
router.delete('/:cid', deleteCartById); //EP7. Eliminar un carrito por Id
router.post('/:cid/purchase', isUser, purchaseCart);

export default router;