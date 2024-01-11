import productsModel from '../models/products.model.js'

export default class Products {
    constructor(){
        console.log('Working products with DB');
    };

    getProducts = async () =>{
        // Mongodb estan en formato BSON
        const products = await productsModel.find();
        //BSON a POJO (Plain Old JavaScript Object)
        return products.map(product => product.toObject());
    };

    getProductById = async (id) =>{

        const product = await productsModel.findOne({ _id: id});
        return product ? product.toObject() : null;

    };

    getPaginatedProducts = async (filter = {}, options = {}) => {
        const result = await productsModel.paginate(filter, options);
        return result;
    };


    saveProduct = async(product) => {
        const result = await productsModel.create(product);
        return result;
    };

    updateProduct = async (id, product) => {
        const result = await productsModel.updateOne({ _id: id}, product);
        
        return result;
    };

    deleteProductById = async (id) =>{
        const result = await productsModel.deleteOne({ _id: id})
        return result;
    };

}