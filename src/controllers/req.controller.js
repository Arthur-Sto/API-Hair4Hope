import { Types } from "mongoose";
import { confirmReqService, createReqService, deleteReqByIdService, findReqByAgendIdService, findReqByPlaceIdService, findReqsByOngIdService, findReqsByPlaceOwnerIdService, ongConfirmByReqIdService, placeConfirmByReqIdService } from "../services/req.service.js";
import { findAllScheduleByUserService, findScheduleByAgendId, findScheduleByUserService } from "../services/schedule.service.js";
import { Place } from "../models/place.js";
import { findPlaceByIdService, findPlaceByOngIdService, findPlaceByPlaceOwnerIdService } from "../services/place.service.js";
import { findONGrepByIdService } from "../services/globalAuth.service.js";
import { reqModel } from "../models/req.js";

export const createReq = async (req, res) => {
    try{
    const { userId, tipo } = req
    let {agendId, foto, PlaceId, ongId, Tamanho} = req.body

    
    

    PlaceId = await findPlaceByPlaceOwnerIdService(userId)



    if(!PlaceId){
        return res.status(400).send({message:"Estabelecimento indisponível"})
    }

    ongId = PlaceId.ong_parc


    const schedule = await findScheduleByAgendId(agendId.toLowerCase())


    if (!schedule) {
        return res.status(400).send({ message: "Código de agendamento inválido" })
    }

   let {tipoCabelo, AdicionaisCabelo, Coloracao} = schedule

    const requerimento = await createReqService({ PlaceOwnerId:userId, PlaceId, Tamanho, tipoCabelo,Coloracao, AdicionaisCabelo, foto, ongId, agendId, PlaceConfirm:true })

    if (!requerimento) {
        return res.status(400).send({ message: "Não foi possível criar o requerimento, tente novamente mais tarde" })
    }

    console.log(requerimento)

    return res.send({ requerimento })
}catch(err){
    return res.status(500).send({message:"Algo deu errado"})
}
}


export const findReqsByUserType = async (req, res) => {
    const { userId, tipo } = req
    let requerimento=[]

    if(tipo == 2){
         requerimento = await findReqsByPlaceOwnerIdService(userId)
    }

    if(tipo == 3){
        const repOngInfo = await findONGrepByIdService(userId)
        let ongId = repOngInfo.ongId 

       requerimento =  await findReqsByOngIdService(ongId) 
    }


   return res.send(requerimento)
}



export const findReqsByOngId = async (req, res) => {
    const {userId, tipo} = req 
    
    try {
        const user = await findONGrepByIdService(userId)
        const {ongId} = user


        console.log("user",user)

        const requerimentos = await findReqsByOngIdService(ongId)

        /*if(!requerimentos || requerimentos.length == 0){
            return res.status(400).send({ message: "Não há requerimentos", empty:true})
        }*/

        return res.send(requerimentos)

    } catch (err) {
        console.log(err.toString())
        return res.status(400).send({ message: "erro interno no servidor" })
    }
}

export const deleteReqById = async(req,res)=>{
    const {id} = req.body 

    if(!Types.ObjectId.isValid(id)){
        return res.status(400).send({message:"Requerimento inválido"})
    }

     await deleteReqByIdService(id)

    return res.send({del:true, message:"Requerimento apagado"})
}

export const confirmReqById = async ( req , res)=>{
    const {tipo} = req
    const {id,confirm} = req.body

    await confirmReqService(tipo,id, confirm || true)

    res.send({conf:true, message:"Requerimento confirmado"})

}

export const findReqByNormalUser = async(req,res)=>{
    const {userId} = req
    const allSchedules = await findAllScheduleByUserService(userId)
    let requerimentos = []

    for(const schedule of allSchedules){
        let agendId = schedule.agendId

        const findReq = await findReqByAgendIdService(agendId)
        if(findReq){
            console.log(findReq)
            requerimentos.push(findReq)
        }else{
            console.log("nao tem")
        }
    }

   return res.send(requerimentos)
}

export const findReqByAgendId = async(req,res)=>{
    const {agendId} = req.params

    try{
        const requerimento = await findReqByAgendIdService(agendId)


        if(!requerimento){
            return res.status(400).send({empty:true})
        }

        return res.send(requerimento)
    }catch(err){
        console.log(err.toString())
        return res.status(500).send({message:"Erro interno no servidor"})
    }
}



/*export const findReqsByPlaceOwnerId = async (req, res) => {
    console.log("aqui")
    const { userId } = req

    try {
        const requerimentos = await findReqsByPlaceOwnerIdService(userId)

        console.log(userId)

          if(!requerimentos || requerimentos.length == 0){
            return res.status(400).send({ message: "Não há requerimentos", empty:true})
        
        console.log(requerimentos)

        res.send(requerimentos)
    } catch (err) {
        return res.status(500).send({ message: "erro interno no servidor" })
    }

}
*/
