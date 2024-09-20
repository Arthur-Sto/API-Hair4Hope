import User from '../models/User.js';
import jwt from 'jsonwebtoken';

const loginService = (email) => User.findOne({email}).select("+senha");

const generateToken =  (id) => {
    const token = jwt.sign({id}, process.env.SECRET_JWT, {expiresIn:86400 })
    console.log(token)
    return token
};

export {loginService, generateToken};  