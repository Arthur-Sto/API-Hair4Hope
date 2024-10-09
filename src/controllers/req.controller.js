import { Types } from "mongoose";
import { createReqService, findReqByPlaceIdService, updateReqByPlaceIdService } from "../services/req.service.js";
import { createImageService } from "../services/image.service.js";
import { isImage } from "../middlewares/Place.middleware.js";

export const createReq = async (req, res) => {
    let {foto, ONGConfirm, PlaceConfirm, PlaceId, TipoCabelo, Tamanho } = req.body

    try {
        if (!Types.ObjectId.isValid(PlaceId) ) {
            return res.status(400).send({ message: "Algo deu errado" })
        }

        

        const creation = await createReqService({ Nome, foto, ONGConfirm, PlaceConfirm, PlaceId, TipoCabelo, Tamanho })

        console.log(creation)
        return res.send({ message: "Requerimento criado", creation })


    } catch (err) {
        return res.status(500).send({ message: "Erro interno no servidor" + err.toString() })
    }

}

export const updateReq = async (req, res) => {
    const PlaceId = req.params.PlaceId
    try {
        if (!Types.ObjectId.isValid(PlaceId)){
            return res.status(400).send({message:"ID inválido"})
        }
        const update = await updateReqByPlaceIdService(PlaceId, req.body)

        return res.send({update,message:"Dados atualizados"})
    }catch(err){
        return res.status(500).send({message:"Erro interno no servidor"})
    }

}



export const findReqByPlaceId = async(req,res)=>{
    const PlaceId = req.params.PlaceId
    try{    
        if (!Types.ObjectId.isValid(PlaceId)){
            return res.status(400).send({message:"ID inválido"})
        }

        const req = await findReqByPlaceIdService(PlaceId)

        if(!req){
            return res.send({message:"Requerimento não encontrado"})
        }

        return res.send({req})

    }catch(err){
        return res.status(500).send({message:"Erro interno no servidor"+err.toString()})
    }
}
//full-> dois lados confirmados   -> body:{ONGconfirm:true AND PlaceConfirm:true}
//após isso, no update(que vai fazer um dos lados ficar true)
