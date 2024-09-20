import { Hair } from "../models/Hair.js";


export const CreateHairService = (body) => Hair.create(body)
export const UpdateHairService = (id, body) => Hair.findByIdAndUpdate({id},body)
export const findAllHairService = () => Hair.find()
export const findByIdService =(id)=>Hair.find({user:id})