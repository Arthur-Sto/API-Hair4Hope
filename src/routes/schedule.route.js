import { Router } from "express";
import { createSchedule, findAllScheduleByUser, findScheduleById, FindScheduleByUser, updateSchedule,deleteScheduleById} from "../controllers/schedule.controller.js";

const scheduleRoute = Router()

const fakefunc = async (req,res,next)=>{req.userId = '66eb93e4f66bd2ca42068616'; return next()}

scheduleRoute.post("/create",fakefunc, createSchedule)
scheduleRoute.post("/update/:id", fakefunc, updateSchedule)

scheduleRoute.get("/:id",findScheduleById)
scheduleRoute.get("/user",fakefunc,findAllScheduleByUser)
scheduleRoute.get("/user/:id",fakefunc, FindScheduleByUser)

scheduleRoute.post("/remove/:id", deleteScheduleById)

export default scheduleRoute