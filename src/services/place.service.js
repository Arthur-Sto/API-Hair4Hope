import { Place } from "../models/Place.js";


export const createPlaceService = (body) => Place.create(body)

export const updatePlaceByIdService = (id,body) => Place.findByIdAndUpdate(id,body)

export const findPlaceByIdService = (id) => Place.findById(id)

export const deletePlaceByIdService = (id) => Place.findOneAndDelete({_id:id})



