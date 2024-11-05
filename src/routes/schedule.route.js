


import { Router } from "express";
import { createSchedule,  deleteScheduleById,  findAllSchedules,  findHorariosByPlaceId, findScheduleByPlaceOwner, FindSchedulesByUserId, updateSchedule} from "../controllers/schedule.controller.js";
import { authMiddleware } from "../middlewares/global.middleware.js";
import { findAllScheduleByUserService } from "../services/schedule.service.js";

const scheduleRoute = Router()

const fakefunc = async (req,res,next)=>{req.userId = '66eb93e4f66bd2ca42068616'; return next()}

scheduleRoute.get("/user", authMiddleware , FindSchedulesByUserId)

scheduleRoute.get("/all", findAllSchedules)

scheduleRoute.get("/search/:placeid/:diasemana",findHorariosByPlaceId)

scheduleRoute.post("/create",authMiddleware, createSchedule)

scheduleRoute.post("/delete", deleteScheduleById)

scheduleRoute.post("/update",authMiddleware, updateSchedule)

scheduleRoute.get("/placeowner",authMiddleware,findScheduleByPlaceOwner)



/*scheduleRoute.post("/update/:id",authMiddleware, updateSchedule)

scheduleRoute.get("/:id",findScheduleById)

scheduleRoute.get("/user/:id", findAllScheduleByUser)

scheduleRoute.post("/remove/:id",authMiddleware, deleteScheduleById)
*/



export default scheduleRoute