import { Router } from "express";
import ProductManager from "../managers/product.manager.js";
import { productsFilePath } from '../utils.js';


const router = Router();

//Creamos la instacia de la clase
const productManager = new ProductManager(productsFilePath)

router.get('/', async (req, res) =>{
    const products = await productManager.getProducts();
    res.render('home',{
        products
    });
});

router.get('/realtimeproducts', (req, res) => {
    const style = 'index.css'
    res.render('realTimeProducts', { style });
});

export default router;