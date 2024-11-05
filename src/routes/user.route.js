import { createUser,LoginUser,updateUser,findAll, findById, setUserHair,getUserInfo } from "../controllers/user.controller.js";
import { Router } from "express";
import { authMiddleware, createMiddleware } from "../middlewares/global.middleware.js";



const userRoute = Router()

userRoute.get("/", findAll)
userRoute.get("/info",authMiddleware, getUserInfo)
userRoute.post("/create",createMiddleware,createUser)
userRoute.post("/update",authMiddleware,updateUser)
userRoute.get("/:id",findById)
userRoute.post("/sethair",setUserHair)

userRoute.post("/login", LoginUser)



export default userRoute