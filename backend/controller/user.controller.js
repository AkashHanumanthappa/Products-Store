import User from '../models/user.model.js';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import crypto from 'crypto'; 
import jwt from 'jsonwebtoken';


export const createUser = async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;
  
    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({ success: false, message: "Please provide all the fields" });
    }
  
    if (password !== confirmPassword) {
      return res.status(400).json({ success: false, message: "Passwords do not match" });
    }
  
    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
          return res.status(409).json({ success: false, message: "User already exists with this email" });
        }

      const newUser = new User({ name, email, password });
      newUser.confirmPassword = confirmPassword; // ✅ required for virtual + pre hook
      await newUser.save();
  
      res.status(201).json({ success: true, data: newUser });
    } catch (error) {
      console.error("Error in Create account:", error.message);
      res.status(500).json({ success: false, message: "Server Error" });
    }
  };

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Please provide both email and password" });
    }
  
    try {
      const user = await User.findOne({ email });
      
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
  
      if (!isMatch) {
        return res.status(400).json({ success: false, message: "Invalid credentials" });
      }
  
  
      const token = jwt.sign(
        { userId: user._id, email: user.email },
        process.env.JWT_SECRET,  // ✅ static and secure
        { expiresIn: '1h' }
      );
  
      res.status(200).json({
        success: true,
        message: "Login successful",
        token: token,
        secretUsed: process.env.JWT_SECRET 
      });
    } catch (error) {
        console.error("Error in login:", error.message);
        res.status(500).json({ success: false, message: "Server error" });
      }
    };

    
export const me = async (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // Use process.env.JWT_SECRET to get the secret from your .env file
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Optionally fetch the user from DB if needed
    const user = await User.findById(decoded.userId).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ user });
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};
