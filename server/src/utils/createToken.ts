import dotenv from 'dotenv';
dotenv.config();

import jwt from 'jsonwebtoken';

//get unique token using jsonwebtoken
export const createToken = (id: string) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LOGIN_TOKEN_EXPIRES_IN,
  });
};
