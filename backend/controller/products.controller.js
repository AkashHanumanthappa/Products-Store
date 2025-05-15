import Product from '../models/product.models.js';
import mongoose from 'mongoose';

// GET all products
export const getProducts = async (req, res) => {
	try {
		const products = await Product.find({}).populate("user", "username email"); // optional populate
		res.status(200).json({ success: true, data: products });
	} catch (error) {
		console.log("Error in fetching products:", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
};

// CREATE a new product
export const createProduct = async (req, res) => {
	const { name, price, image, description, category } = req.body;

	if (!name || !price || !image) {
		return res.status(400).json({ success: false, message: "Please provide all required fields" });
	}

	if (!req.user || !req.user._id) {
		return res.status(401).json({ success: false, message: "Unauthorized: User ID missing" });
	}

	const newProduct = new Product({
		name,
		price,
		image,
		description,
		category,
		user: req.user._id, // associate product with user
	});

	try {
		await newProduct.save();
		res.status(201).json({ success: true, data: newProduct });
	} catch (error) {
		console.error("Error in creating product:", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
};

// UPDATE a product
export const updateProduct = async (req, res) => {
	const { id } = req.params;
	const productUpdates = req.body;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ success: false, message: "Invalid Product Id" });
	}

	try {
		const updatedProduct = await Product.findByIdAndUpdate(id, productUpdates, { new: true });
		res.status(200).json({ success: true, data: updatedProduct });
	} catch (error) {
		console.error("Error in updating product:", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
};

// DELETE a product
export const deleteProduct = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ success: false, message: "Invalid Product Id" });
	}

	try {
		await Product.findByIdAndDelete(id);
		res.status(200).json({ success: true, message: "Product deleted" });
	} catch (error) {
		console.log("Error in deleting product:", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
};
export const getMyProducts = async (req, res) => {
	try {
		if (!req.user || !req.user._id) {
			return res.status(401).json({ success: false, message: "Unauthorized: User not found" });
		}

		const userId = req.user._id;
		const myProducts = await Product.find({ user: userId });

		res.status(200).json({ success: true, data: myProducts });
	} catch (error) {
		console.error("Error in fetching user's products:", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
};
