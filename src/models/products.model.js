import mongoose from 'mongoose';
import mongoosePaginate from "mongoose-paginate-v2";


const collectionName = 'Products';

const productSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    status:Boolean,
    thumbmail: {
        type:Array,
        default:[]
    },
    code:String,
    stock:Number
});

productSchema.plugin(mongoosePaginate);

export const productModel = mongoose.model(collectionName, productSchema);