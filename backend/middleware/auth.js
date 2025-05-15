import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const authenticate = async (req, res, next) => {
	const token = req.header("Authorization")?.replace("Bearer ", "");

	if (!token) {
		return res.status(401).json({ success: false, message: "No token, authorization denied" });
	}

	try {
		const decoded = jwt.verify(token, "your_jwt_secret"); // use env var in production
		const user = await User.findById(decoded._id).select("-password");

		if (!user) {
			return res.status(401).json({ success: false, message: "User not found" });
		}

		req.user = user;
		next();
	} catch (err) {
		console.error("Auth Error:", err.message);
		res.status(401).json({ success: false, message: "Invalid token" });
	}
};
export const authorizeRoles = (...roles) => {
	return (req, res, next) => {
		if (!roles.includes(req.user.role)) {
			return res.status(403).json({ success: false, message: "Access denied" });
		}
		next();
	};
};


