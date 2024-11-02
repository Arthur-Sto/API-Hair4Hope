import { Types } from "mongoose";
import { createReqService, findReqByPlaceIdService, ongConfirmByReqIdService, placeConfirmByReqIdService, verifyFullConfirmByReqIdService} from "../services/req.service.js";
import { createImageService } from "../services/Image.service.js";
import { isImage } from "../middlewares/Place.middleware.js";

export const createReq = async(req,res)=>{
    const {userId, tipo} = req
    const {PlaceId, Tamanho, Adicionais, TipoCabelo} = req.body

    if(!Types.ObjectId.isValid(PlaceId)){
        return res.status(400).send({message:"Estabelecimento inválido"})
    }

    const requerimento = await createReqService({PlaceId,Tamanho, Adicionais, TipoCabelo})

    if(!requerimento){
        return res.status(400).send({message:"Não foi possível criar o requerimento, tente novamente mais tarde"})
    }

}

export const confirmReqById =async(req,res)=> {
    const {reqId, reqType} = req.body
    let confirm = null
 /*
2->placeowner
3->rep ong
*/

    if(!Types.ObjectId.isValid(reqId)){
        return res.status(400).send({message:"Requerimento inválido"})
    }


    const fullReqConfim = await verifyFullConfirmByReqIdService(reqId)
    if(fullReqConfim){
        return res.send({message:"Requerimento concluído"})
    }


    
    if(reqType == 2){
       confirm = await placeConfirmByReqIdService(reqId)
    }

    if(reqType == 3){
        confirm = await ongConfirmByReqIdService(reqId)
    }
    
    if(!confirm){
        return res.status(400).send({message:"Não foi possível confirmar o requerimento, tente novamente mais tarde"})
    }


    
    return res.send({message:"Requerimento concluído com sucesso", req:true })
}
   
export const findUserReqs = async(req,res)=>{
    const {userId,tipo} = req
    const {PlaceId} = req.params.PlaceId

    if(tipo==2){
        
    }


    
    try{
        if(!Types.ObjectId.isValid(PlaceId)){
            return res.status(400).send({message:"Estabelecimento inválido"})
        }

        const requerimento = await findReqByPlaceIdService(PlaceId)

        if(!requerimento){
            return res.status(400).send({message:"Não foi possível encontrar requerimentos"})
        }

        return res.send({message:"Requerimento carregado", req:requerimento})

    }
    catch(err){
        console.log(err.toString())
        return res.status(500).send({message:"Estabelecimento inválido"})
    }
    
}

