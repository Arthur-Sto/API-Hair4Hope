import { createPlaceOwner,updatePlaceOwner,findPlaceOwnerById, PlaceOwnerLogin, deleteSchedule} from "../controllers/placeowner.controller.js";
import { Router } from "express";
import { authMiddleware, createMiddleware } from "../middlewares/global.middleware.js";


const PlaceOwnerRouter = Router()



PlaceOwnerRouter.get("/:id",findPlaceOwnerById)
PlaceOwnerRouter.post("/create",createMiddleware,createPlaceOwner)
PlaceOwnerRouter.post("/update", authMiddleware, updatePlaceOwner)
PlaceOwnerRouter.post("/DelSchedule/:id",authMiddleware,deleteSchedule)

PlaceOwnerRouter.post("/login",PlaceOwnerLogin)

export default PlaceOwnerRouter