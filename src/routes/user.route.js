import { createUser,LoginUser,updateUser,findAll, findById } from "../controllers/user.controller.js";
import { Router } from "express";
import { authMiddleware, createMiddleware } from "../middlewares/global.middleware.js";



const userRoute = Router()

userRoute.get("/", findAll)
userRoute.post("/create",createMiddleware,createUser)
userRoute.post("/update",authMiddleware,updateUser)
userRoute.get("/:id",findById)

userRoute.post("/login", LoginUser)




export default userRoute