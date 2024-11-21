import { createReq, /*findReqByPlaceId, updateReq */ deleteReqById, findReqsByUserType, confirmReqById, findReqByAgendId, findReqByNormalUser} from "../controllers/req.controller.js";
import { Router } from "express";
import { authMiddleware } from "../middlewares/global.middleware.js";


const reqRoute = Router()

/*reqRoute.post("/create",imgMiddleware,createReq)
reqRoute.post("/update/:PlaceId", updateReq)
reqRoute.get("/:PlaceId",findReqByPlaceId)*/

reqRoute.post("/create", authMiddleware, createReq)
reqRoute.get("/find", authMiddleware, findReqsByUserType) //<-
reqRoute.post("/delete",deleteReqById)
reqRoute.post("/confirm", authMiddleware, confirmReqById)
reqRoute.get("/agend/:agendId",findReqByAgendId)
reqRoute.get("/user",authMiddleware, findReqByNormalUser)
export default reqRoute 