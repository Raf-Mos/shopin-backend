import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'
import asyncHandler from './asyncHandler.js'

const authenticate = asyncHandler(async (req, res, next) => {
    let token;
    // Read JWT from the "jwt" cookie
    token = req.cookies.jwt

    if (token) {
        try {
            // Verify the token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            // If token is valid, attach user id to the request
            req.user = await User.findById(decoded.userId).select("-password");
            next();
        } catch (error) {
            res.status(401);
            throw new Error('Not authorized, token failed.');
        }
    } else {
        res.status(401);
        throw new Error('Not authorized, no token.');
    }
});

// check for the admin token
const authorizeAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(401).send('not authorized as an admin.');
    }
};

export { authenticate, authorizeAdmin };
