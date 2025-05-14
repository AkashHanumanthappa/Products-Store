import Product from '../models/product.models.js'
import mongoose from 'mongoose';

export const getProduct =async (req,res) => {
    try{
    const products = await Product.find({});
    console.log(res.status(200).json({success : true , data:products }));
    }catch(error){
        console.log("error in fetching products :", error.message);
        res.status(500).json({ success: false, message:"Server Error"});
    }
};

export const createProduct =async(req,res) => {
    const { name, price, image }=req.body;

    if(!name||!price||!image){
        return res.status(400).json({success:false, message:"Please fill all the fields"});
    }
    const newProduct= new Product(product)
    
    try{
        await newProduct.save();
        res.status(201).json({success:true, data:newProduct});
    
    }catch(error){
        console.error("Error in Create products:", error.message);
        res.status(500).json({ success: false, message:"Server Error"});
    }
};

export const deleteProduct =  async (req,res) =>{
    const { id } = req.params;

    console.log("id:", id);
    try{
        await Product.findByIdAndDelete(id);
        res.status(200).json({success : true , message:"post deleted successfully"});
    }catch(error){
        res.status(404).json({ success: false, message:"Product not found"});  
    }
};

export const updateProduct =  async(req,res) => {
    const { id } = req.params;
    const product=req.body;
if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({ success:false, message:"Invalid product id"})
}
    try{
        
        const updatedProduct=await Product.findByIdAndUpdate(id, product,{new:true});
        res.status(200).json({ success:true, data:updatedProduct});
    }catch(error){
        res.status(500).json({ success: false, message:"Server Error"});
    }
};