import { Image } from "../models/image.js";

export const createImageService = (body) => Image.create(body)

export const DeleteImageService = (id) => Image.findByIdAndDelete(id)

export const findAllImageService = () => Image.find()

export const findImageById = (id)=>Image.findById(id)

export const findAllIdsService=()=>Image.find().select(["-Arquivo"])