


import { Router } from "express";
import { createSchedule,  findHorariosByPlaceId, FindSchedulesByUser} from "../controllers/schedule.controller.js";
import { authMiddleware } from "../middlewares/global.middleware.js";

const scheduleRoute = Router()

//const fakefunc = async (req,res,next)=>{req.userId = '66eb93e4f66bd2ca42068616'; return next()}



scheduleRoute.get("/:placeid/:diasemana",findHorariosByPlaceId)

scheduleRoute.post("/create",authMiddleware, createSchedule)

scheduleRoute.get("/:userId",FindSchedulesByUser)

/*scheduleRoute.post("/update/:id",authMiddleware, updateSchedule)

scheduleRoute.get("/:id",findScheduleById)

scheduleRoute.get("/user/:id", findAllScheduleByUser)

scheduleRoute.post("/remove/:id",authMiddleware, deleteScheduleById)
*/



export default scheduleRoute