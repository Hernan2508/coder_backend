import cartsModel from '../models/carts.model.js'

export default class Carts {
    constructor(){
        console.log('Working carts with DB');
    }

    getCarts = async () => {
        const carts = await cartsModel.find().lean() //transformar de BSON
        return carts;
    }

    getCartById = async (id) =>{
        const cart = await cartsModel.findOne({ _id: id});
        return cart ? cart.toObject() : null;
    }

    saveCart = async (cart) =>{
        const result = await cartsModel.create(cart);
        return result;
    }

    updateCart = async (id, cart) => {
        const result = await cartsModel.updateOne({ _id: id}, { $set: cart });
        return result;
    }

    deleteCartById = async (id) =>{
        const result = await cartsModel.deleteOne({ _id: id})
        return result;
    }

}