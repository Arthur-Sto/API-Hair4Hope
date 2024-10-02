import { Place } from "../models/Place.js";


export const CreatePlaceService = (body) => Place.create(body)

export const UpdatePlaceService = (id,body)=> Place.findByIdAndUpdate({id},body)

export const FindPlaceByIdService = (id) => Place.findById(id)

export const FindAllPlacesService =() =>Place.find()