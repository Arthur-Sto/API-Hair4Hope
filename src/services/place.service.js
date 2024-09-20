import { Place } from "../models/Place.js";


export const CreatePlaceService = (body) => Store.create(body)

export const UpdatePlaceService = (id,body)=>Store.findByIdAndUpdate({id},body)