
import { connectDatabase } from "./src/database/database.js";
import express from "express";
import cors from "cors"
const app = express()
const port = 3500



import dotenv from "dotenv"
import userRoute from "./src/routes/user.route.js";
import PlaceOwnerRouter from "./src/routes/placeowner.js";
import imageRoute from "./src/routes/image.route.js";
import ONGrepRouter from "./src/routes/ongrep.route.js";
import scheduleRoute from "./src/routes/schedule.route.js";

import placeRoute from "./src/routes/place.route.js";
import ongRouter from "./src/routes/ong.route.js";
import reqRoute from "./src/routes/req.route.js";
import verifyRoute from "./src/routes/verify.route.js";
import { verifyModel } from "./src/models/verifyemail.js";
import { findAllOngsService } from "./src/services/ong.service.js";


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
app.use("/place",placeRoute)
app.use("/ong",ongRouter)
app.use("/req", reqRoute)
app.use("/verify",verifyRoute)

app.get("/fakeroute",async (req,res)=>{
    const time = Date.now()
    async function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }
      
      await sleep(1000 * Math.floor((Math.random()*(7-1) + 1)))
      res.send({message:"teste", espera:(new Date(Date.now()-time).getSeconds())})
})




app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));


import { Schedule } from "./src/models/schedule.js";
//await Schedule.create({UserId:'66eb93e4f66bd2ca42068616', PlaceId:"6705b10c8568d1befe33327c", Day:"Sexta", Month:2, Horario:'10:50'})

/*import { ONG } from "./src/models/ong.js";
const creation = await ONG.create({Nome:"a",Desc:"a",estab_parc:"a"})
console.log(creation)

generateToken("66fe20d87fbe8a660e5f0dca")



const enc = JSON.stringify({foto:"1234",nao:"1234"})
const tok = generateToken(enc)



//console.log(phone("11 988761028",{"country":"br"}))


//import { ONG } from "./src/models/ong.js";

//ONG.create({Nome:"Pior que é né veyr", Desc:"Tutu", estab_parc:["7322","123292"]})


//console.log(await ONG.find({estab_parc:{$in:[CNPJ]}}))

///import { findDistBetweenPlaces, validateCEP } from "./src/services/Place.service.js";
//console.log(await validateCEP("09540400"))

//import { findOngByNameService } from "./src/services/ong.service.js";

//console.log(await findOngByNameService("pior que é né veyr"))

//import { getDistanceFromLatAndLong } from "./src/services/Place.service.js";

//console.log("sex:" ,await findAllPlacesServices())

//console.log(JSON.stringify(await findDistBetweenPlaces()))

*/
