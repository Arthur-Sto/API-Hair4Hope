import { Types } from "mongoose";
import { findAllOngsService, findOngByCNPJService,findOngByNameService } from "../services/ong.service.js";


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