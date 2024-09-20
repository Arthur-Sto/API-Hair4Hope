import { Router } from "express";
import { CreateHair, findAll, findById } from "../controllers/hair.controller.js";
import { validUser } from "../middlewares/global.middlewares.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const HairRoute = Router()

HairRoute.get("/", findAll)
HairRoute.get("/:id", validUser, findById)
HairRoute.post("/", authMiddleware, CreateHair)



export default HairRoute