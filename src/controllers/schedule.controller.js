import mongoose from "mongoose";
import { createScheduleService, findAllScheduleByUserService, updateScheduleService, findScheduleByIdService, findScheduleByUserService, deleteScheduleByIdService } from "../services/schedule.service.js";

export const createSchedule = async (req, res) => {
    const id = req.userId
    const { PlaceName, Day, DayMonth, Month, Horario } = req.body
    try {
        if (!PlaceName || !Day || !DayMonth || !Month || !Horario) {

            return res.status(400).send({ message: "Preencha todos os campos" })

        }

        const schedule = await createScheduleService({ UserId: id, ...req.body })

        return res.send(schedule)

    } catch (err) {
        return res.status(500).send({ message: "Erro interno" })
    }

}

export const updateSchedule = async (req, res) => {
    const userId = req.userId
    const scheduleId = req.params.id 


    if(!mongoose.Types.ObjectId.isValid(scheduleId)){
        return res.status(400).send({message:"ID inválido"})
    }
    
    try {
        
        const schedule = await updateScheduleService(userId, req.body)

        return res.send(schedule)

    } catch (err) {
        return res.status(500).send({ message: "Erro interno" })
    }
}


export const findAllScheduleByUser = async (req,res)=>{
    const userId = req.userId
    try{
        const schedules = await findAllScheduleByUserService(userId)
        return res.send({schedules})
    }catch(err){
        return res.status(500).send({message:"Erro interno no servidor"})
    }
}

export const findScheduleById = async(req,res)=>{
    const scheduleId = req.params.id 
    const userId = req.userId
    try{

        if(!mongoose.Types.ObjectId.isValid(scheduleId)){
            return res.status(400).send({message:"ID inválido"})
        }

        const schedule =await findScheduleByIdService(scheduleId)
        

        if(!schedule){
            res.status(400).send({message:"Agendamento não encontrado"})
        }

        return res.send(schedule)
    }catch(err){
        return res.status(500).send({message:"Algo deu errado"})
    }
}

export const FindScheduleByUser = async (req,res) =>{
    const userId = req.userId

    try{
        const schedule  =await findScheduleByUserService(userId)

        return res.send(schedule)

    }catch(err){
        return res.status(500).send({message:"Algo deu errado"})
    }
}


export const deleteScheduleById = async(req,res)=>{
    const {id} = req.body
    try{
        const del  =await deleteScheduleByIdService(id)

        return res.send(del)

    }catch(err){
        return res.status(500).send({message:"Algo deu errado"})
    }
}



