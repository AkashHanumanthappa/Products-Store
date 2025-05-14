import mongoose from "mongoose";
const {Schema}=mongoose;

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price : {
        type:Number,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    user_id:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
},{
timestamps:true
});

const Product = mongoose.model('Product',productSchema);

export default Product;