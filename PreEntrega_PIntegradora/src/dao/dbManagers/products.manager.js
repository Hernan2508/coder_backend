import { productsModel } from '../dbManagers/models/products.model.js'

export default class Products {
    constructor(){
        console.log('Working products with DB');
    }

    getAll = async () =>{
        // Mongodb estan en formato BSON
        const products = await productsModel.find();
        //BSON a POJO (Plain Old JavaScript Object)
        return products.map(product => product.toObject());
    }

    getById = async (id) =>{

        const product = await productsModel.findOne({ _id: id});
        return product ? product.toObject() : null;

    }


    save = async(product) => {
        const result = await productsModel.create(product);
        return result;
    }

    update = async (id, product) => {
        const result = await productsModel.updateOne({ _id: id}, product);
        
        return result;
    }

    deleteById = async (id) =>{
        const result = await productsModel.deleteOne({ _id: id})
        return result;
    }

}