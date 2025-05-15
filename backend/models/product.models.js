import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		image: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			default: "",
		},
		category: {
			type: String,
			default: "general",
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User", // Reference to the User model
			required: true,
		},
	},
	{
		timestamps: true, // adds createdAt and updatedAt
	}
);

const Product = mongoose.model("Product", productSchema);

export default Product;
