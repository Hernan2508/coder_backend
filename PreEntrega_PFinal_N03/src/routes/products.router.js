import { Router } from 'express';
import { getProducts, getProductById, saveProduct, updateProduct, deleteProductById} from '../controllers/products.controller.js';
import { isAdmin } from '../middlewares/authMiddleware.js';

const router = Router();

//? Construcción de nuestro servicio o endpoint MongoDB
router.get('/', getProducts); // EP1. Obtener Productos
router.get('/:id', getProductById); //EP2. Obtener Productos por Id
router.post('/', isAdmin, saveProduct); //EP3. Crear un Producto
router.put('/:id', isAdmin, updateProduct) //EP4. Actualizar un Producto por Id
router.delete('/:id', isAdmin, deleteProductById) //EP5. Eliminar un Producto por Id

export default router;