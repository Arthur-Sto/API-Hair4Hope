
import { connectDatabase } from "./src/database/database.js";
import express from "express";
import cors from "cors" 
const app = express()
const port = 3500



import dotenv from "dotenv"
import { generateToken } from "./src/services/globalAuth.service.js";
import userRoute from "./src/routes/user.route.js";
import PlaceOwnerRouter from "./src/routes/PlaceOwner.route.js";
import imageRoute from "./src/routes/Image.route.js";
import ONGrepRouter from "./src/routes/ONGrep.route.js";
import scheduleRoute from "./src/routes/schedule.route.js";

dotenv.config()

connectDatabase()
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended:true, limit:"50mb"}))



app.use("/user",userRoute)
app.use("/PlaceOwner",PlaceOwnerRouter)
app.use("/image",imageRoute)
app.use("/ONGrep", ONGrepRouter)
app.use("/schedule",scheduleRoute)


app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));


generateToken("66fe20d87fbe8a660e5f0dca")

import {phone} from "phone";

console.log(phone("11 988761028",{"country":"br"}))