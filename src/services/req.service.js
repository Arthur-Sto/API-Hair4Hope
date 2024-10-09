import { reqModel } from "../models/req.js";


export const createReqService = (body)=>reqModel.create(body)

export const findReqByPlaceIdService = (PlaceId)=>reqModel.findOne({PlaceId})

export const updateReqByPlaceIdService = (PlaceId,body) =>reqModel.findOneAndUpdate({PlaceId},body)

