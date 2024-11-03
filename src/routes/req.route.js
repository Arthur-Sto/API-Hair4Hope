import { createReq, findReqsByPlaceOwnerId, /*findReqByPlaceId, updateReq */} from "../controllers/req.controller.js";
import { Router } from "express";
import { imgMiddleware } from "../middlewares/Place.middleware.js";
import { authMiddleware } from "../middlewares/global.middleware.js";


const reqRoute = Router()

/*reqRoute.post("/create",imgMiddleware,createReq)
reqRoute.post("/update/:PlaceId", updateReq)
reqRoute.get("/:PlaceId",findReqByPlaceId)*/

reqRoute.post("/create",imgMiddleware, authMiddleware, createReq)
reqRoute.get("/find", findReqsByPlaceOwnerId)

export default reqRoute 