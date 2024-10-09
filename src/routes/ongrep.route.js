
import { Router } from "express";
import { authMiddleware, createMiddleware } from "../middlewares/global.middleware.js";

import {ONGrepLogin,createONGrep,findONGrepById,updateONGrep }  from "../controllers/ongrep.controller.js";

const ONGrepRouter = Router()

ONGrepRouter.post("/login", ONGrepLogin)
ONGrepRouter.post("/create",createMiddleware, createONGrep )
ONGrepRouter.post("/update", authMiddleware, updateONGrep)
ONGrepRouter.get("/:id",findONGrepById)
ONGrepRouter.get("/createpass")

export default ONGrepRouter
