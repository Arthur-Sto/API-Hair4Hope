import { Place } from "../models/place.js";
import { reqModel } from "../models/req.js";


export const createReqService = (body) => reqModel.create(body)

export const ongConfirmByReqIdService = (reqId) => reqModel.findOneAndUpdate({_id:reqId},{ONGConfirm:true})

export const placeConfirmByReqIdService = (reqId) => reqModel.findOneAndUpdate({_id:reqId},{PlaceConfirm:true})

export const verifyFullConfirmByReqIdService = async (reqId)=>{
    let req = await reqModel.findOne({_id:reqId})
    let FullConfirm =  (req.PlaceConfirm + req.ONGConfirm) == 2 ? true : false

   await reqModel.updateOne({_id:reqId},{FullConfirm})
   return FullConfirm
}

export const findReqByPlaceIdService = (PlaceId)=>reqModel.findOne({PlaceId})

/*export const findPlaceByPlaceOwnerIdService = (idPlaceOwner) => Place.findOne({idPlaceOwner})

export const findPlaceByRepOngIdService = (RepOngId)=>Place.findOne({rep})

*/

export const addOngRepToReqByIdService = (reqId,ongRepId)=>reqModel.findOneAndUpdate({_id: reqId},{ongRepId})

export const findOngRepService = (ongRepId) => reqModel.findOne({ongRepId})
