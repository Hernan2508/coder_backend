import mongoose from "mongoose";

const userCollection = 'users';

const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    age: Number,
    password: String,
    role: {
        type: String,
        enum: ['admin', 'usuario'],
        default: 'usuario'
    }
});

const usersModel = mongoose.model(userCollection, userSchema);

export default usersModel;