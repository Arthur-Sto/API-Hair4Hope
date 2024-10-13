import { validateCode } from "../controllers/verify.controller.js";
import { Router } from "express";


const verifyRoute = Router()

verifyRoute.get("/:email/:code/:tipo",validateCode)

export default verifyRoute