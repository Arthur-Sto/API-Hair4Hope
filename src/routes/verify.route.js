import { sendValidationCode, validateCode } from "../controllers/verify.controller.js";
import { Router } from "express";
import { authMiddleware } from "../middlewares/global.middleware.js";


const verifyRoute = Router()

verifyRoute.post("/",validateCode)
verifyRoute.get("/send/:email/:userId",sendValidationCode)

export default verifyRoute