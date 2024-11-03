
import { createPlace,findAllPlaces, findPlaceByPlaceOwnerId, setHorarioByPlaceId, updatePlace } from "../controllers/place.controller.js";
import { cnpjMiddleware,cepMiddleware,imgMiddleware} from "../middlewares/Place.middleware.js";

import { authMiddleware } from "../middlewares/global.middleware.js";

import { Router } from "express";

const placeRoute = Router()

const fakefakeuserid=(req,res,next)=>{req.userId = '66fe20d87fbe8a660e5f0dca'; return next()}

placeRoute.post("/update",authMiddleware, cepMiddleware, imgMiddleware, updatePlace)


placeRoute.post("/create",  authMiddleware ,cnpjMiddleware, cepMiddleware,imgMiddleware, createPlace  )
placeRoute.post("/sethour",setHorarioByPlaceId)
placeRoute.get("/",findAllPlaces)
placeRoute.get("/placeowner/:idPlaceOwner",findPlaceByPlaceOwnerId)

export default placeRoute


