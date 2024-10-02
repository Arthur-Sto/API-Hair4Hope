import {CreatePlace, FindPlaceById, FindAllPlaces}from "../controllers/place.controller.js";
import { Router } from "express";
import { UpdatePlaceService } from "../services/place.service.js";


const route = Router()
route.post("/",CreatePlace)
route.get("/:id",FindPlaceById)
route.get("/",FindAllPlaces)


route.post("/:id",UpdatePlaceService)

export default route