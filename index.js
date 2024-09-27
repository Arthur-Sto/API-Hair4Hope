const app = express();
import express from "express";
import connectDatabase from "./src/database/database.js";
import dotenv from "dotenv";
import bcrypt from "bcrypt"


import userRoute from './src/routes/user.route.js';
import authRoute from './src/routes/auth.route.js';
import storeRoute from "./src/routes/place.route.js";

dotenv.config();

const port = process.env.PORT || 3500;

connectDatabase();
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use("/user", userRoute);
app.use("/auth", authRoute);
app.use("/store", storeRoute);

app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));

