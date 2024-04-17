const User = require('../models/UserModel');
const { jwt, secretKey } = require('../references/custom_refs');

const authenticateUser = async (req, res, next) => {
    try {
        // Check if Authorization header is present
        const authHeader = req.headers['authorization'];
        if (!authHeader) {
            return res.status(200).json({ message: 'Authorization header is missing', status: false, data: {} });
        }

        // Extract token from Authorization header
        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(200).json({ message: 'Token is missing', status: false, data: {} });
        }

        // Verify token
        let decodedToken;
        try {
            decodedToken = jwt.verify(token, secretKey, { ignoreExpiration: false });
        } catch (error) {
            // Check if the error is due to token expiration
            if (error.name === 'TokenExpiredError') {
                return res.status(200).json({ message: 'Token has expired, please login again', status: false, data: {} });
            }
            throw error;
        }

        // Find user by ID from decoded token
        const user = await User.findById(decodedToken.userId);
        if (!user) {
            return res.status(200).json({ message: 'User not found', status: false, data: {} });
        }

        // Attach user object to request
        req.user = user;

        // Call next middleware
        next();
    } catch (error) {
        console.error(error);
        return res.status(200).json({ message: 'Internal server error', status: false, data: {} });
    }
};

module.exports = authenticateUser;
