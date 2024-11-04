import { Place } from "../models/place.js";
import { reqModel } from "../models/req.js";


export const createReqService = (body) => reqModel.create(body)

export const ongConfirmByReqIdService = (reqId) => reqModel.findOneAndUpdate({ _id: reqId }, { ONGConfirm: true })

export const placeConfirmByReqIdService = (reqId) => reqModel.findOneAndUpdate({ _id: reqId }, { PlaceConfirm: true })

 const verifyFullConfirmByReqIdService = async (reqId) => {
    let req = await reqModel.findOne({ _id: reqId })
    let FullConfirm = (req.PlaceConfirm + req.ONGConfirm) == 2 ? true : false
    let dataComp =  FullConfirm == true ? new Date().toLocaleDateString("pt-br",{hour:"2-digit",minute:"2-digit"}) : null

    let toUpdate = {FullConfirm,dataComp}

    if(req.dataComp){
        delete toUpdate.dataComp
    }

    await reqModel.updateOne({ _id: reqId }, toUpdate)

    
    return FullConfirm
}

export const findReqByPlaceIdService = (PlaceId) => reqModel.find({ PlaceId })

/*export const findPlaceByPlaceOwnerIdService = (idPlaceOwner) => Place.findOne({idPlaceOwner})

export const findPlaceByRepOngIdService = (RepOngId)=>Place.findOne({rep})

*/



export const addOngRepToReqByIdService = (reqId, ongRepId) => reqModel.findOneAndUpdate({ _id: reqId }, { ongRepId })

export const findOngRepService = (ongRepId) => reqModel.findOne({ ongRepId })

export const findReqsByPlaceOwnerIdService = (PlaceOwnerId) => reqModel.find({ PlaceOwnerId })

export const findReqsByOngIdService = (ongId) => reqModel.find({ ongId })

export const deleteReqByIdService = (id) => reqModel.findByIdAndDelete(id)


export const findReqByAgendIdService = (agendId)=>reqModel.findOne({agendId})




export const confirmReqService = async (option/* ong or placeowner*/, reqId, bool) => {
    let toUpdate = null 

    toUpdate = option == 2 && {PlaceConfirm:bool}  || option == 3 && {ONGConfirm:bool}

    
   
    const update = await reqModel.findByIdAndUpdate(reqId,{
        _id: reqId,
    ...toUpdate
    })

    const verify = await verifyFullConfirmByReqIdService(reqId)

    console.log(verify)

    return await reqModel.findById(reqId)
}