import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';
export const verifyToken = async (token) => {
    const secret = process.env.JWT_SECRET;
    try {
        jwt.verify(token, secret);
        return { message: 'Valid token' };
    }
    catch (error) {
        console.log('ERROR>>>>>>', error);
        return { message: 'Invalid token' };
    }
};
