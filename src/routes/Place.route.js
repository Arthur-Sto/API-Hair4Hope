
import { createPlaceStepOne,createPlaceStepTwo, findAllPlaces } from "../controllers/place.controller.js";
import { cnpjMiddleware,cepMiddleware,imgMiddleware, pass_acessoMiddleware } from "../middlewares/Place.middleware.js";

import { Router } from "express";

const placeRoute = Router()

const fakefakeuserid=(req,res,next)=>{req.userId = '66fe20d87fbe8a660e5f0dca'; return next()}

placeRoute.post("/create1",fakefakeuserid, pass_acessoMiddleware, cnpjMiddleware, cepMiddleware,imgMiddleware, createPlaceStepOne  )
placeRoute.post("/create2",createPlaceStepTwo)
placeRoute.get("/",findAllPlaces)

export default placeRoute