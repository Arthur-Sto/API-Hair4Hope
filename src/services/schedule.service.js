import { Schedule } from "../models/schedule.js";

export const createScheduleService = (body)=>Schedule.create(body)

export const updateScheduleService = (id, body) => Schedule.updateOne({UserId:id},body)

export const deleteScheduleByIdService = (scheduleId) => Schedule.deleteOne({_id:scheduleId})

export const findAllScheduleByUserService = (id) => Schedule.find({UserId:id})

export const findScheduleByIdService = (id) => Schedule.findById(id)

export const findScheduleByUserService = (id) =>Schedule.findOne({UserId:id})