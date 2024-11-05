import { Place } from "../models/place.js";
import { Schedule } from "../models/schedule.js";

export const createScheduleService = (body) =>  Schedule.create(body)

export const updateScheduleService = (id, body) => Schedule.updateOne({ UserId: id }, body)

export const updateScheduleByIdService = (scheduleId, body)=>Schedule.updateOne({_id:scheduleId},body)

export const deleteScheduleByIdService = (scheduleId) => Schedule.deleteOne({ _id: scheduleId })

export const findAllScheduleByUserService = (id) => Schedule.find({ UserId: id })

export const findScheduleByIdService = (id) => Schedule.findById(id)

export const findScheduleByUserService = (id) => Schedule.findOne({ UserId: id })

export const findSchedulesByUserService = (id) => Schedule.find({ UserId: id }).populate("PlaceId")


export const findHorariosByPlaceIdService = (PlaceId) => Place.findOne({ _id: PlaceId })

export const findAllSchedulesService = () => Schedule.find()

export const findScheduleByAgendId = (agendId)=>Schedule.findOne({agendId})


export const findSchedulesByPlaceIdService = (PlaceId) => Schedule.find({PlaceId}).populate("UserId")


export function getIntervalos(timesObj) {
    const { Abertura, Fechamento } = timesObj;
  
    const abertura = new Date(`1970-01-01T${Abertura}`);
    const fechamento = new Date(`1970-01-01T${Fechamento}`);
  

    const horarios = [];

    const formatarHorario = (date) => {
      return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    };

    let horarioAtual = new Date(abertura);
    while (horarioAtual <= fechamento) {
      horarios.push(formatarHorario(horarioAtual));
      horarioAtual.setMinutes(horarioAtual.getMinutes() + 30);
    }
  
    return horarios;
  }
  
export const claimSchedule = (scheduleId)=>Schedule.findByIdAndUpdate(scheduleId, {done:true})