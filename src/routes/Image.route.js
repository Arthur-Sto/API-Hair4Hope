import { createImage, deleteImage, findImage,getAllImageIds } from "../controllers/image.controller.js";
import { Router } from "express";


const imageRoute = Router()

imageRoute.post("/create",createImage)
imageRoute.post("/delete",deleteImage)
imageRoute.get("/:id",findImage)
imageRoute.get("/", getAllImageIds)


export default imageRoute