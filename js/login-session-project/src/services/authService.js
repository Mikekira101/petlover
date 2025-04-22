import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserModel from '../models/userModel.js';

class AuthService {
    async register(userData) {
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        const newUser = new UserModel({
            username: userData.username,
            password: hashedPassword,
            email: userData.email
        });
        return await newUser.save();
    }

    async login(username, password) {
        const user = await UserModel.findOne({ username });
        if (!user) {
            throw new Error('User not found');
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error('Invalid credentials');
        }
        const token = this.generateToken(user._id);
        return { user, token };
    }

    generateToken(userId) {
        return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
    }
}

export default new AuthService();