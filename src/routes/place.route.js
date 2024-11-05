
import { createPlace,findAllPlaces, findPlaceByPlaceOwnerId, setHorarioByPlaceId, updatePlace } from "../controllers/place.controller.js";
import { findPlaceOwnerById } from "../controllers/placeowner.controller.js";
import { cnpjMiddleware,cepMiddleware} from "../middlewares/Place.middleware.js";

import { authMiddleware } from "../middlewares/global.middleware.js";

import { Router } from "express";

const placeRoute = Router()

const fakefakeuserid=(req,res,next)=>{req.userId = '66fe20d87fbe8a660e5f0dca'; return next()}

placeRoute.post("/update",authMiddleware, cepMiddleware, updatePlace)

placeRoute.post("/create",  authMiddleware, cnpjMiddleware, cepMiddleware, createPlace  )
placeRoute.post("/sethour",setHorarioByPlaceId)
placeRoute.get("/",findAllPlaces)
placeRoute.get("/info",authMiddleware, findPlaceByPlaceOwnerId)

export default placeRoute


