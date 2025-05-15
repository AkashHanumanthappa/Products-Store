import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

// Register a new user
export const registerUser = async (req, res) => {
	const { username, email, password, profilePic } = req.body;

	if (!username || !email || !password) {
		return res.status(400).json({ success: false, message: "All fields are required" });
	}

	try {
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(400).json({ success: false, message: "Email already in use" });
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const newUser = new User({
			username,
			email,
			password: hashedPassword,
			profilePic,
		});

		await newUser.save();

		res.status(201).json({ success: true, data: newUser });
	} catch (error) {
		console.error("Register Error:", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
};

// Login user
export const loginUser = async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return res.status(400).json({ success: false, message: "Email and password are required" });
	}

	try {
		const user = await User.findOne({ email });

		if (!user) {
			return res.status(404).json({ success: false, message: "User not found" });
		}

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(401).json({ success: false, message: "Invalid credentials" });
		}

			const token = jwt.sign(
			{ _id: user._id, role: user.role }, 
			process.env.JWT_SECRET,  // Use environment variable here
			{ expiresIn: "7d" }
			);

		res.status(200).json({
			success: true,
			message: "Login successful",
			data: {
				token,
				user: {
					_id: user._id,
					username: user.username,
					email: user.email,
					role: user.role,
					profilePic: user.profilePic,
				},
			},
		});
	} catch (error) {
		console.error("Login Error:", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
};

// Get all users (admin-only typically)
export const getAllUsers = async (req, res) => {
	try {
		const users = await User.find().select("-password");
		res.status(200).json({ success: true, data: users });
	} catch (error) {
		res.status(500).json({ success: false, message: "Server Error" });
	}
};

// Get single user by ID
export const getUserById = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ success: false, message: "Invalid User ID" });
	}

	try {
		const user = await User.findById(id).select("-password");
		if (!user) {
			return res.status(404).json({ success: false, message: "User not found" });
		}
		res.status(200).json({ success: true, data: user });
	} catch (error) {
		res.status(500).json({ success: false, message: "Server Error" });
	}
};

// Update user
export const updateUser = async (req, res) => {
	const { id } = req.params;
	const updates = req.body;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ success: false, message: "Invalid User ID" });
	}

	if (updates.password) {
		updates.password = await bcrypt.hash(updates.password, 10);
	}

	try {
		const updatedUser = await User.findByIdAndUpdate(id, updates, { new: true }).select("-password");
		res.status(200).json({ success: true, data: updatedUser });
	} catch (error) {
		res.status(500).json({ success: false, message: "Server Error" });
	}
};

// Delete user
export const deleteUser = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ success: false, message: "Invalid User ID" });
	}

	try {
		await User.findByIdAndDelete(id);
		res.status(200).json({ success: true, message: "User deleted successfully" });
	} catch (error) {
		res.status(500).json({ success: false, message: "Server Error" });
	}
};
