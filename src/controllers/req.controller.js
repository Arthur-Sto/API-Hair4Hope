import { Types } from "mongoose";
import { createReqService, findReqByPlaceIdService, findReqsByOngIdService, findReqsByPlaceOwnerIdService, ongConfirmByReqIdService, placeConfirmByReqIdService, verifyFullConfirmByReqIdService } from "../services/req.service.js";
import { createImageService } from "../services/Image.service.js";
import { isImage } from "../middlewares/Place.middleware.js";
import { findScheduleByAgendId } from "../services/schedule.service.js";
import { Place } from "../models/place.js";
import { findPlaceByIdService, findPlaceByPlaceOwnerIdService } from "../services/place.service.js";
import { findONGrepByIdService } from "../services/globalAuth.service.js";

export const createReq = async (req, res) => {
    const { userId, tipo } = req
    let {agendId, foto, PlaceId, ongId, Tamanho} = req.body

    
    

    PlaceId = await findPlaceByPlaceOwnerIdService(userId)



    if(!PlaceId){
        return res.status(400).send({message:"Estabelecimento indisponível"})
    }

    ongId = PlaceId.ong_parc

    console.log("ong",PlaceId.toString())

    const schedule = await findScheduleByAgendId(agendId)


    if (!schedule) {
        return res.status(400).send({ message: "Código de agendamento inválido" })
    }

   let {tipoCabelo, AdicionaisCabelo, Coloracao} = schedule

   
  


    const requerimento = await createReqService({ PlaceOwnerId:userId, PlaceId, Tamanho, tipoCabelo,Coloracao, AdicionaisCabelo, foto, ongId, agendId })

    if (!requerimento) {
        return res.status(400).send({ message: "Não foi possível criar o requerimento, tente novamente mais tarde" })
    }

    console.log(requerimento)

    return res.send({ requerimento })
}

export const findReqsByPlaceOwnerId = async (req, res) => {
    console.log("aqui")
    const { userId } = req

    try {
        const requerimentos = await findReqsByPlaceOwnerIdService(userId)

        console.log(userId)

        if (!requerimentos || requerimentos.length == 0) {
            return res.status(400).send({ message: "Não foi possível encontrar requerimentos", empty:true })
        }

        console.log(requerimentos)

        res.send(requerimentos)
    } catch (err) {
        return res.status(500).send({ message: "erro interno no servidor" })
    }

}

export const findReqsByOngId = async (req, res) => {
    const {userId, tipo} = req 
    
    try {
        const user = await findONGrepByIdService(userId)
        const {ongId} = user


        console.log("user",user)

        const requerimentos = await findReqsByOngIdService(ongId)

        if(!requerimentos || requerimentos.length == 0){
            return res.status(400).send({ message: "Não há requerimentos", empty:true})
        }

        return res.send(requerimentos)

    } catch (err) {
        console.log(err.toString())
        return res.status(400).send({ message: "erro interno no servidor" })
    }
}

export const confirmReqById = async (req, res) => {
    const { reqId, reqType } = req.body
    let confirm = null
    /*
   2->placeowner
   3->rep ong
   */

    if (!Types.ObjectId.isValid(reqId)) {
        return res.status(400).send({ message: "Requerimento inválido" })
    }


    const fullReqConfim = await verifyFullConfirmByReqIdService(reqId)
    if (fullReqConfim) {
        return res.send({ message: "Requerimento concluído" })
    }



    if (reqType == 2) {
        confirm = await placeConfirmByReqIdService(reqId)
    }

    if (reqType == 3) {
        confirm = await ongConfirmByReqIdService(reqId)
    }

    if (!confirm) {
        return res.status(400).send({ message: "Não foi possível confirmar o requerimento, tente novamente mais tarde" })
    }

    return res.send({ message: "Requerimento concluído com sucesso", req: true })
}

export const findUserReqs = async (req, res) => {
    const { userId, tipo } = req
    const { PlaceId } = req.params.PlaceId

    if (tipo == 2) {

    }



    try {
        if (!Types.ObjectId.isValid(PlaceId)) {
            return res.status(400).send({ message: "Estabelecimento inválido" })
        }

        const requerimento = await findReqByPlaceIdService(PlaceId)

        if (!requerimento) {
            return res.status(400).send({ message: "Não foi possível encontrar requerimentos" })
        }

        return res.send({ message: "Requerimento carregado", req: requerimento })

    }
    catch (err) {
        console.log(err.toString())
        return res.status(500).send({ message: "Estabelecimento inválido" })
    }

}

