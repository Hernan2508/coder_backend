import { Router } from 'express';
import { getMessages,  saveMessage} from '../controllers/messages.controller.js';
import { isUser } from '../middlewares/authMiddleware.js';

const router = Router();

//? Construcción de nuestro servicio o endpoint MongoDB
router.get('/', getMessages); // EP1. Obtener Productos
router.post('/', isUser, saveMessage); //EP3. Crear un Producto

export default router;