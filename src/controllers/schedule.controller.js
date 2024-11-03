import mongoose, { Types } from "mongoose";
import { createScheduleService, findAllScheduleByUserService, updateScheduleService, findScheduleByIdService, findSchedulesByUserService, deleteScheduleByIdService, findHorariosByPlaceIdService, getIntervalos, findAllSchedulesService, updateScheduleByIdService } from "../services/schedule.service.js";
import { findUserByIdService } from "../services/globalAuth.service.js";

export const createSchedule = async (req, res) => {
    const id = req.userId
    const { Day, Month, Horario,PlaceId } = req.body
    try {
        if (!Day || !Month || !Horario|| !PlaceId) {

            return res.status(400).send({ message: "Preencha todos os campos" })

        }
        const user = await findUserByIdService(id)

        const {tipoCabelo,Coloracao,AdicionaisCabelo} = user

        



        const schedule = await createScheduleService({tipoCabelo,Coloracao,AdicionaisCabelo, UserId: id, ...req.body })

        return res.send({message:"Agendamento marcado com sucesso", schedule})

    } catch (err) {
        console.log(err)
        return res.status(500).send({ message: err.code == 11000 ? "Você já possui um agendamento marcado": "Erro interno" })
    }

}

export const updateSchedule = async (req, res) => {
    const userId = req.userId
    const {scheduleId} = req.body


    if(!mongoose.Types.ObjectId.isValid(scheduleId)){
        return res.status(400).send({message:"ID inválido"})
    }
    
    try {
        
        const schedule = await updateScheduleByIdService(scheduleId,req.body)

        return res.send({message:"Agendamento editado", schedule})

    } catch (err) {
        return res.status(500).send({ message: "Erro interno" })
    }
}



export const FindSchedulesByUserId = async (req,res) =>{
    const userId = req.userId //|| req.params.userId

    try{

        console.log(userId)

        if(!Types.ObjectId.isValid(userId)){
            return res.status(400).send({message:"ID inválido"})
        }

        let schedule  =await findSchedulesByUserService(userId)

        
        if(!schedule || schedule.length == 0){
            return res.status(400).send({message:"Agendamentos não encontrados",})
        }


        
        return res.send({schedule})

    }catch(err){
        console.log(err.toString())
        return res.status(500).send({message:"Erro interno no servidor"})
    }
}




export const findHorariosByPlaceId = async (req,res)=>{

    
    //http:localhost/schedule/:idplace/:diasemana
    const PlaceId = req.params.placeid 
    const diasemana = req.params.diasemana

    

    if(!Types.ObjectId.isValid(PlaceId)){
        res.status(404).send({message:"ID inválido"})
    }

    const horarios = await findHorariosByPlaceIdService(PlaceId)

    if(horarios.horarios_func && horarios.horarios_func[diasemana]){

        let intervalos = getIntervalos(horarios.horarios_func[diasemana])

        console.log(intervalos)

        return res.send({message:"Horário carregado...",...horarios.horarios_func[diasemana], success:true, horarios:intervalos})
    }

    return res.status(400).send({message:"Algo deu errado",success:false})
}


export const findAllSchedules =async(req,res)=>{
   const schedules = await findAllSchedulesService() 

   try{
    return res.send({schedules})
   }catch(err){
    return res.status(500).send({message:"Erro interno no servidor"})
   }
}

export const deleteScheduleById = async(req,res)=>{
    const {id} = req.body
    try{
        const del  =await deleteScheduleByIdService(id)
        

        return res.send({message:"Agendamento apagado", del, id})

    }catch(err){
        console.log(err.toString())
        return res.status(500).send({message:"Erro interno no servidor"})
    }
}


/*
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

        const schedule =(await findScheduleByIdService(scheduleId))
        

        if(!schedule){
            res.status(400).send({message:"Agendamento não encontrado"})
        }
        console.log(schedule.populate("PlaceId"))
        return res.send(schedule)
    }catch(err){
        return res.status(500).send({message:"Algo deu errado"})
    }
}

*/