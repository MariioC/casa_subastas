import { genSalt, hash, compare } from 'bcrypt';

import jwt from 'jsonwebtoken'
import { config } from 'dotenv'
config()

export const hashPassword = async (password) => {
    const salt = await genSalt(15)
    return await hash(password, salt)
};

export const verifyPassword = async (password, originalPassword) => {
    return await compare(password, originalPassword)
};

export const identifyUserWithToken = (token) => {
    if (!token) return false

    try {

        if (token === 'null' || !token) return false
        
        let infoToken = jwt.verify(token, process.env.SECRET_KEY);
        if (!infoToken) return false

        return infoToken
    } catch (error) {
        console.log(error);
       return false
    }
};
