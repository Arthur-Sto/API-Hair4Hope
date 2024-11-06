import mongoose, { Types } from "mongoose";
import { createScheduleService, findAllScheduleByUserService, updateScheduleService, findScheduleByIdService, findSchedulesByUserService, deleteScheduleByIdService, findHorariosByPlaceIdService, getIntervalos, findAllSchedulesService, updateScheduleByIdService, findSchedulesByPlaceIdService } from "../services/schedule.service.js";
import { findUserByIdService } from "../services/globalAuth.service.js";
import { findPlaceByPlaceOwnerIdService } from "../services/place.service.js";

export const createSchedule = async (req, res) => {
    const id = req.userId
    const { Day, Month, Horario, PlaceId } = req.body
    try {
        if (!Day || !Month || !Horario || !PlaceId) {

            return res.status(400).send({ message: "Preencha todos os campos" })

        }
        const user = await findUserByIdService(id)

        const { tipoCabelo, Coloracao, AdicionaisCabelo } = user





        const schedule = await createScheduleService({ tipoCabelo, Coloracao, AdicionaisCabelo, UserId: id, ...req.body })

        return res.send({ message: "Agendamento marcado com sucesso", schedule })

    } catch (err) {
        console.log(err)
        return res.status(500).send({ message: err.code == 11000 ? "Você já possui um agendamento marcado" : "Erro interno" })
    }

}

export const updateSchedule = async (req, res) => {
    const userId = req.userId
    const { scheduleId } = req.body


    if (!mongoose.Types.ObjectId.isValid(scheduleId)) {
        return res.status(400).send({ message: "ID inválido" })
    }

    try {

        const schedule = await updateScheduleByIdService(scheduleId, req.body)

        return res.send({ message: "Agendamento editado", schedule })

    } catch (err) {
        return res.status(500).send({ message: "Erro interno" })
    }
}



export const FindSchedulesByUserId = async (req, res) => {
    const userId = req.userId //|| req.params.userId

    try {

        console.log(userId)

        if (!Types.ObjectId.isValid(userId)) {
            return res.status(400).send({ message: "ID inválido" })
        }

        let schedule = await findSchedulesByUserService(userId)


        if (!schedule || schedule.length == 0) {
            return res.status(400).send({ message: "Agendamentos não encontrados", })
        }



        return res.send({ schedule })

    } catch (err) {
        console.log(err.toString())
        return res.status(500).send({ message: "Erro interno no servidor" })
    }
}




export const findHorariosByPlaceId = async (req, res) => {

    let obterDiaDaSemana = (dia, mes, ano) => {
        const data = new Date(ano || 2024, mes - 1, dia);
        const diasDaSemana = ["Domingo", "Segunda", "Terca", "Quarta", "Quinta", "Sexta", "Sabado"];
        const diaDaSemana = diasDaSemana[data.getDay()]
        return diaDaSemana;
    }




    //http:localhost/schedule/:idplace/:diasemana

    try {
        const { PlaceId, data } = req.params

        let [dia, mes, ano] = data.toString().split("-")
        console.log(dia, mes, ano)

        let diasemana = obterDiaDaSemana(dia, mes)

        console.log(PlaceId)
        if (!Types.ObjectId.isValid(PlaceId)) {
            return res.status(404).send({ message: "ID inválido" })
        }

        const horarios = await findHorariosByPlaceIdService(PlaceId)

        let horariosObj = (typeof horarios.horarios_func) == "string" ? JSON.parse(horarios.horarios_func) : horarios.horarios_func

        let intervalos = getIntervalos(horariosObj[diasemana])

        
        console.log(intervalos,intervalos.length)

        return res.send({ message: "Horário carregado...", ...horarios.horarios_func[diasemana], success: true, horarios: intervalos })
    } catch (err) {
        return res.status(500).send({ message: "Erro" })
    }


}


export const findAllSchedules = async (req, res) => {
    const schedules = await findAllSchedulesService()

    try {
        return res.send({ schedules })
    } catch (err) {
        return res.status(500).send({ message: "Erro interno no servidor" })
    }
}

export const deleteScheduleById = async (req, res) => {
    const { id } = req.body
    try {
        const del = await deleteScheduleByIdService(id)


        return res.send({ message: "Agendamento apagado", del, id })

    } catch (err) {
        console.log(err.toString())
        return res.status(500).send({ message: "Erro interno no servidor" })
    }
}


export const findScheduleByPlaceOwner = async (req, res) => {
    const { userId } = req
    let schedules = []

    try {
        const place = await findPlaceByPlaceOwnerIdService(userId)

        if (!place) {
            return res.status(400).send(schedules)
        }

        const placeId = place._id

        schedules = await findSchedulesByPlaceIdService(placeId)

        console.log(schedules)

        return res.send(schedules)
    } catch (err) {
        return res.send([])
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