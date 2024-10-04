


import { Router } from "express";
import { createSchedule, findAllScheduleByUser, findScheduleById, FindScheduleByUser, updateSchedule,deleteScheduleById} from "../controllers/schedule.controller.js";
import { authMiddleware } from "../middlewares/global.middleware.js";

const scheduleRoute = Router()

//const fakefunc = async (req,res,next)=>{req.userId = '66eb93e4f66bd2ca42068616'; return next()}

scheduleRoute.post("/create",authMiddleware, createSchedule)
scheduleRoute.post("/update/:id",authMiddleware, updateSchedule)

scheduleRoute.get("/:id",findScheduleById)

scheduleRoute.get("/user/:id", findAllScheduleByUser)

scheduleRoute.post("/remove/:id",authMiddleware, deleteScheduleById)

export default scheduleRoute