module.exports = {
    generateToken: (user) => {
        const jwt = require('jsonwebtoken');
        const secretKey = process.env.JWT_SECRET || 'your_secret_key';
        const token = jwt.sign({ id: user.id }, secretKey, { expiresIn: '1h' });
        return token;
    },

    verifyToken: (token) => {
        const jwt = require('jsonwebtoken');
        const secretKey = process.env.JWT_SECRET || 'your_secret_key';
        try {
            const decoded = jwt.verify(token, secretKey);
            return decoded;
        } catch (error) {
            return null;
        }
    }
};