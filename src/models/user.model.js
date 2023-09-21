import mongoose from "mongoose";
import userRouter from "../router/users.router.js";

const userColection = 'usuarios';

const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email:{
        type: String,
        unique:true,
        required: [true,'Mail is required']
    },
    age: Number,
    password: String //Se deja plano por el momento.
})

export const userModel = mongoose.model(userColection, userSchema);
