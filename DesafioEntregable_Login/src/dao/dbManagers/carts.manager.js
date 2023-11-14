import { cartsModel } from '../dbManagers/models/carts.model.js'

export default class Carts {
    constructor(){
        console.log('Working carts with DB');
    }

    getAll = async () => {
        const carts = await cartsModel.find().lean() //transformar de BSON
        return carts;
    }

    getById = async (id) =>{

        const cart = await cartsModel.findOne({ _id: id});
        return cart ? cart.toObject() : null;

    }


    save = async (cart) =>{
        const result = await cartsModel.create(cart);
        return result;
    }

    update = async (id, cart) => {
        const result = await cartsModel.updateOne({ _id: id}, cart);
        return result;
    }

    deleteById = async (id) =>{
        const result = await cartsModel.deleteOne({ _id: id})
        return result;
    }

}