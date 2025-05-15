import jwt from "jsonwebtoken";
export const protect = (req, res, next) => {
  let token = req.header("Authorization")?.replace("Bearer ", "");
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ success: false, message: "No token, authorization denied" });
  }

  try {
    // Add more options to the verification to see if that helps
    const decoded = jwt.verify(token, process.env.JWT_SECRET, {
      algorithms: ['HS256'] // Be explicit about the algorithm
    });
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Token verification error details:", error);
    return res.status(401).json({ 
      success: false, 
      message: "Token is not valid", 
      error: error.message 
    });
  }
}
