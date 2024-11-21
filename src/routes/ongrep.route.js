
import { Router } from "express";
import { authMiddleware, bodyVerification, createMiddleware } from "../middlewares/global.middleware.js";

import {ONGrepLogin,createONGrep,findONGrepById,updateONGrep, addOngRepByPage }  from "../controllers/ongrep.controller.js";

const ONGrepRouter = Router()

ONGrepRouter.post("/login", ONGrepLogin)
ONGrepRouter.post("/create",createMiddleware, createONGrep )
ONGrepRouter.post("/update", authMiddleware, bodyVerification, updateONGrep)
ONGrepRouter.get("/info",authMiddleware,findONGrepById)
ONGrepRouter.get("/add", addOngRepByPage)
//ONGrepRouter.get("/createpass")

export default ONGrepRouter
