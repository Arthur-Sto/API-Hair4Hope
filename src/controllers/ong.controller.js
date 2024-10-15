import { Types } from "mongoose";
import { findAllOngsService, findOngByCNPJService,findOngByIdService,findOngByNameService } from "../services/ong.service.js";


export const findONGbyName = async(req,res)=>{
    const ONGname = req.params.ONGname 

    try{
        const ong = await findOngByNameService(ONGname)
        if(!ong){
            return res.status(404).send({message:"ONG não encontrada"})
        }
        return res.send({ong})

    }
    
    catch(err){
        return res.status(500).send({message:"Erro interno no servidor"})
    }
}

export const findAllOngs = async(req,res)=>{
    try{
        const ongs = await findAllOngsService()
        return res.send(ongs)
    }catch(err){
        return res.status(500).send({message:"Erro interno no servidor"})
    }
}


export const findOngById = async(req,res)=>{
    const {ongId} = req.params

    try{
        if(!Types.ObjectId.isValid(ongId)){
            return res.status(400).send({message:"ONG não encontrada"})
        }

        const ong = await findOngByIdService(ongId)

        return res.send({ong})

    }catch(err){
        return res.status(500).send({message:"Erro interno no servidor"})
    }
}


export const validateOngPassAcesso = async (req,res)=>{
    const {userId} = req
    const {pass, ongId} = req.params 

    try{
        if(!Types.ObjectId.isValid(ongId)){
            return res.status(400).send({message: "ID de ong inválido"})
        }

        const ong = await findOngByIdService(ongId)

        if(!ong){
            return res.status(400).send({message: "Ong não encontrada"})
        }

        if(ong.pass_acesso != pass){
            return res.status(400).send({message: "Código de acesso inválido"})
        }

        return res.send({message: "Acesso autorizado."})

    }catch(err){
        return res.status(500).send({message: "Erro interno no servidor"})
    }


}