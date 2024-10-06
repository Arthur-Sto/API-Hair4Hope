
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
import { phone } from "phone";
import axios from "axios"
import { cnpj } from "cpf-cnpj-validator";

dotenv.config()

connectDatabase()
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "50mb" }))



app.use("/user", userRoute)
app.use("/PlaceOwner", PlaceOwnerRouter)
app.use("/image", imageRoute)
app.use("/ONGrep", ONGrepRouter)
app.use("/schedule", scheduleRoute)









app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));


//generateToken("66fe20d87fbe8a660e5f0dca")

//console.log(phone("11 988761028",{"country":"br"}))


//import { ONG } from "./src/models/ong.js";

//ONG.create({Nome:"Pior que é né veyr", Desc:"Tutu", estab_parc:["7322","123292"]})


//console.log(await ONG.find({estab_parc:{$in:[CNPJ]}}))

