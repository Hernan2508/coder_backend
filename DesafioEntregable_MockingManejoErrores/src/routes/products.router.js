import { Router } from 'express';
import { getProducts, getProductById, saveProduct, updateProduct, deleteProductById, generateMockingProducts} from '../controllers/products.controller.js';
import { isAdmin } from '../middlewares/authMiddleware.js';
import toAsyncRouter from 'async-express-decorator';

const router = toAsyncRouter(Router());

//? Construcción de nuestro servicio o endpoint MongoDB
router.get('/', getProducts); // EP1. Obtener Productos
router.get('/mockingproducts', generateMockingProducts); //EP6
router.get('/:id', getProductById); //EP2. Obtener Productos por Id
router.post('/', saveProduct); //EP3. Crear un Producto isAdmin
router.put('/:id', isAdmin, updateProduct); //EP4. Actualizar un Producto por Id isAdmin
router.delete('/:id', isAdmin, deleteProductById); //EP5. Eliminar un Producto por Id

export default router;