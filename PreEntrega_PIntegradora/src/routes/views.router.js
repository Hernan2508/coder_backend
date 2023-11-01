import { Router } from "express";
import Products from "../dao/dbManagers/products.manager.js";
import Carts from "../dao/dbManagers/carts.manager.js";

/* import Products from "../dao/fileManagers/products.manager.js";
import Carts from "../dao/fileManagers/carts.manager.js"; */

const router = Router();

//Creamos la instacia de la clase
const productsManager = new Products();
const cartsManager = new Carts();


router.get('/products-view', async (req, res) =>{
    try {
        const products = await productsManager.getAll();
        res.render('products', { products });
    } catch (error) {
        console.error(error.message);
    }
});

router.get('/carts-view', async (req, res) =>{
    try {
        const carts = await cartsManager.getAll();
        res.render('carts', { carts });
    } catch (error) {
        console.error(error.message);
    }
});

router.get('/', async( req, res) =>{
    res.render('chat');
})

export default router;