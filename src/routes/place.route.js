import {CreatePlace}from "../controllers/place.controller.js";
import { Router } from "express";


const route = Router()
route.post("/",CreatePlace)


export default route