const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    let token = req.cookies.admin_token; // Check in cookies first

    // If token is not in cookies, check Authorization header
    if (!token && req.headers.authorization) {
      const authHeader = req.headers.authorization;
      if (authHeader.startsWith("Bearer ")) {
        token = authHeader.split(" ")[1]; // Extract token from "Bearer <token>"
      }
    }

    if (!token) {
      return res
        .status(401)
        .send({ success: false, message: "Access denied. No token provided." });
    }

    // Verify the token
    const decode = jwt.verify(token, process.env.JWT_SECRET);

    // Check if the decoded token matches the admin credentials
    if (
      decode.email === process.env.ADMIN_EMAIL &&
      decode.password === process.env.ADMIN_PASSWORD
    ) {
      req.admin = decode; // Attach admin data to req object
      next(); // Allow access
    } else {
      return res
        .status(401)
        .send({ success: false, message: "Invalid or expired token." });
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({ success: false, message: "Auth failed!" });
  }
};
