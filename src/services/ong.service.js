import { ONG } from "../models/ong.js"

export const findOngByCNPJService = (CNPJ)=> ONG.find({estab_parc:{$in:[CNPJ.replace(/\D/g, '')]}})

