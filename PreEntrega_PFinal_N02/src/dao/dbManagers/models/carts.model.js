import mongoose from "mongoose";

const cartsCollection= 'carts';

const cartsSchema = new mongoose.Schema({

    /* description: {
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
    }, */

    
    products: {
        //Vamos a definir la referencia a la colección de cursos
        type: [
            {
                product:{
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'products'
                },
                quantity:{
                    type:Number,
                    default:1
                }
            }
        ],
        default: []
    }
});

//Especificar un middleware
// cada vez que yo haga un find aplicamos esta population
cartsSchema.pre(['find','findOne'], function(){
    this.populate('products.product');
});

export const cartsModel = mongoose.model(cartsCollection, cartsSchema);