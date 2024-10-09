import { createReq, findReqByPlaceId, updateReq } from "../controllers/req.controller.js";
import { Router } from "express";
import { imgMiddleware } from "../middlewares/Place.middleware.js";


const reqRoute = Router()

reqRoute.post("/create",imgMiddleware,createReq)
reqRoute.post("/update/:PlaceId", updateReq)
reqRoute.get("/:PlaceId",findReqByPlaceId)

export default reqRoute