import { Router } from 'express';
import { getCarts, getCartById, createCart, updateCart, updateCartById, deleteProductoIdByCartId, deleteCartById } from '../controllers/carts.controller.js';

const router = Router();

//? Construcción de nuestro servicio o endpoint MongoDB
router.get('/', getCarts); // EP1. Obtener todos los carritos
router.get('/:id', getCartById) // EP2. Encontrar un carrito por Id
router.post('/', createCart) // EP3. Crear un carrito
router.put('/:cid', updateCart) // EP4. Actualizar un carrito
router.put('/:cid/products/:pid', updateCartById) // EP5. Actualizar un carrito por Id
router.delete('/:cid/products/:pid', deleteProductoIdByCartId) // EP6. Eliminar un producto por Id por el Id del carrito
router.delete('/:cid', deleteCartById); //EP7. Eliminar un carrito por Id

export default router;