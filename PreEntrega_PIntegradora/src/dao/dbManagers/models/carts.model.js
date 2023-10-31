import mongoose from "mongoose";

const cartsCollection= 'carts';

const cartsSchema = new mongoose.Schema({

    description: {
        type: String,
        require: true 
    },

    store:{
        type: String,
        require: true 
    },

    purchase_date: {
        type: Date,
        default: Date.now
    },
    products: {
        type: Array,
        default: []
    }
});


export const cartsModel = mongoose.model(cartsCollection, cartsSchema);