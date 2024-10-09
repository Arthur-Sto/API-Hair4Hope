import { findAllOngs } from "../controllers/ong.controller.js";


import { Router } from "express";

const ongRouter = Router()

ongRouter.get("/",findAllOngs)

export default ongRouter