import { Router } from 'express';
import { getProducts, getProductById, createProduct, updateProductById, deleteProductById} from '../controllers/products.controller.js';

const router = Router();

//? Construcción de nuestro servicio o endpoint MongoDB
router.get('/', getProducts); // EP1. Obtener Productos
router.get('/:id', getProductById); //EP2. Obtener Productos por Id
router.post('/', createProduct); //EP3. Crear un Producto
router.put('/:id', updateProductById) //EP4. Actualizar un Producto por Id
router.delete('/:id', deleteProductById) //EP5. Eliminar un Producto por Id

export default router;