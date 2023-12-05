import mongoose from "mongoose";

const userCollection = 'users';

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    age: Number,
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'usuario'],
        default: 'usuario'
    },
    cart:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'carts'
    }
});

const usersModel = mongoose.model(userCollection, userSchema);

export default usersModel;