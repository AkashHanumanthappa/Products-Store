// import jwt from 'jsonwebtoken';

// const authMiddleware = (req, res, next) => {
//   // Get token from Authorization header
//   const token = req.header('Authorization')?.split(' ')[1];

//   if (!token) return res.status(401).json({ message: 'Unauthorized' });

//   try {
//     // Verify the token using the secret key
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded; // Assuming decoded contains the user info
//     next();
//   } catch (error) {
//     return res.status(403).json({ message: 'Forbidden' });
//   }
// };

// export default authMiddleware; 
