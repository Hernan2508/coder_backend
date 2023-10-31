import mongoose from "mongoose";

const productsCollection= 'products';

const productsSchema = new mongoose.Schema({
    title:{
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    thumbnail: {
        type: String,
        require: true
    },
    code: {
        type: String,
        require: true,
        unique: true
    },
    stock: {
        type: Number,
        require: true
    },
    carts:{
        type: Array,
        default: []
    }
})


export const productsModel = mongoose.model(productsCollection, productsSchema);
