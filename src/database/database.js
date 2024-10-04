import mongoose from "mongoose"
import dotenv from "dotenv"

export const connectDatabase = () => {
    mongoose.connect(process.env.MONGODB_URI).then(()=>console.log("Conectado na database")).catch(err=>console.log(`erro: ${err}`))
}
