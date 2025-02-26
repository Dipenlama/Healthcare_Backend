const jwt = require('jsonwebtoken');

// Secret key for JWT signing
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Middleware to authenticate the token and attach user info to the request
function authenticateToken(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1]; // Extract token from "Bearer <token>"

    if (!token) {
        return res.status(403).json({ message: 'Access denied. No token provided.' });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid or expired token.' });
        }

        req.user = decoded; // Attach the decoded user info to the request
        next(); // Proceed to the next middleware or route handler
    });
}

// Middleware to ensure the user is a doctor (for protected doctor routes)
function isDoctor(req, res, next) {
    if (req.user.role !== 'doctor') {
        return res.status(403).json({ message: 'Access denied. You are not authorized to access this route.' });
    }
    next();
}

module.exports = { authenticateToken, isDoctor };
