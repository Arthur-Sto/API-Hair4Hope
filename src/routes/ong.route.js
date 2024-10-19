import { addOng, createOng, findAllOngs } from "../controllers/ong.controller.js";


import { Router } from "express";

const ongRouter = Router()

ongRouter.post("/create",createOng)
ongRouter.get("/",findAllOngs)
ongRouter.get("/add",addOng)



export default ongRouter