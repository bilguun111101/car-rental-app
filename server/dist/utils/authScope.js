import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';
// for middleware in index.ts
const authScope = async (token) => {
    if (!token) {
        return null;
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded;
    }
    catch (error) {
        return error;
    }
};
export default authScope;
