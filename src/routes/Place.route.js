
import { createPlaceStepOne } from "../controllers/Place.controller.js";
import { cnpjMiddleware,cepMiddleware,imgMiddleware } from "../middlewares/Place.middleware.js";

import { Router } from "express";

const placeRoute = Router()

const fakefakeuserid=(req,res,next)=>{req.userId = '66fe20d87fbe8a660e5f0dca'; return next()}

placeRoute.get("/create1",fakefakeuserid, cnpjMiddleware, cepMiddleware,/*imgMiddleware,*/ createPlaceStepOne  )


export default placeRoute