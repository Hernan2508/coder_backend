import CartsRepository from "../repositories/carts.repository.js";
import * as productsService from '../services/products.service.js'
import { Carts } from "../dao/factory.js";
import * as ticketsService from '../services/tickets.service.js';
import mongoose from 'mongoose';

const CartsDao = new Carts();
const cartsRepository = new CartsRepository(CartsDao);

const purchaseCart = async (cid, user) => {

    //Encapsular con transacciones
    const session = await mongoose.startSession();
    
    try {
        session.startTransaction();

        // En este punto antes de hacer purchase yo ya tengo un carrito con productos agregados
        //1. Deberia obtener el carrito por cid, buscar el carrito por Id
        const cart = await cartsRepository.getCartById(cid);

        //2. Inicializar un array para los productos sin stock
        const outStock = []; //almacenamos los productos que no tenemos stock
        let amount = 0;

        //3. Iterar sobre los productos del carrito
        cart.products.forEach(async ({ product, quantity }) => {
            // Verificar disponibilidad de stock
            if (product.stock >= quantity) {
                // Calcular el monto
                amount += product.price * quantity;
                // Restar del stock del producto
                product.stock -= quantity;
                // Actualizar el producto en el servicio de productos
                await productsService.updateProduct(product._id, product);
            } else {
                // Agregar al array de productos sin stock
                outStock.push({ product, quantity});
            }
        });

        const ticket = await ticketsService.generatePurchase(user, amount);
        //actualizar el carrito con el nuevo arreglo de productos que no pudieron comprarse
        //usar el repository de carritos para poder actualizar los productos
        await cartsRepository.updateCart(cid, outStock);

        await session.commitTransaction();

    } catch (error) {
        await session.abortTransaction();
        console.error('Error during purchase transaction:', error);
        throw error;
    } finally {
        session.endSession();
    }

};

const getCarts = async() => {
    const result = await cartsRepository.getCarts();
    return result
}

const getCartById = async (id) =>{
    const result = await cartsRepository.getCartById(id);
    return result;
}

const saveCart = async (cart) =>{
    const result = await cartsRepository.saveCart(cart);
    return result;
}

const updateCart = async (id, cart) => {
    const result = await cartsRepository.updateCart(id, cart);
    return result;
}

const deleteCartById = async (id) =>{
    const result = await cartsRepository.deleteCartById(id)
    return result;
}

export {
    purchaseCart,
    getCarts,
    getCartById,
    saveCart,
    updateCart,
    deleteCartById
};
