import User from '../models/user.js';
import ONGrep from '../models/ongrep.js';
import PlaceOwner from '../models/placeowner.js';

import jwt from 'jsonwebtoken';



//-------------------------------------------USER----------------------------------------------\\
export const createUserService = (body) => User.create(body);

export const findAllUserService = () => User.find();

export const findUserByIdService = (id) => User.findById(id);

export const updateUserService = (id, body) => User.findOneAndUpdate({_id: id}, body);

export const setHairByIdService = (id,infos) =>User.findOneAndUpdate({_id:id},infos)

export const generateToken =  (id) => {
    const token = jwt.sign({id}, process.env.SECRET_JWT, {expiresIn:999999 })
    console.log(token)
    return token
};

export const loginService = (email) => User.findOne({email:{$regex: new RegExp(email, "i")}}).select("+senha");



//-------------------------------------------ONG----------------------------------------------\\
export const createONGrepService = (body) => ONGrep.create(body)

export const updateONGrepService = (ONGrepId, body)=>ONGrep.findOneAndUpdate({_id:ONGrepId},body)

export const deleteONGrepService = (id) => ONGrep.deleteOne({_id:id})

export const findONGrepByIdService = (_id)=>ONGrep.findOne({_id}).populate("ongId")

export const ONGrepLoginService = (email)=>ONGrep.findOne({email:{$regex: new RegExp(email, "i")}}).select("+senha");


//-------------------------------------------PLACEOWNER----------------------------------------------\\
export const createPlaceOwnerService = (body) => PlaceOwner.create(body)

export const updatePlaceOwnerService = (id, toUpdate) =>PlaceOwner.updateOne({_id:id}, toUpdate)

export const deletePlaceOwnerService = (id) =>PlaceOwner.deleteOne({_id:id})

export const findPlaceOwnerByIdService = (id) =>PlaceOwner.findById(id)

export const findAllPlaceOwnerService = () =>PlaceOwner.find()

export const PlaceOwnerLoginService = (email) =>PlaceOwner.findOne({email:{$regex: new RegExp(email, "i")}}).select("+senha");

