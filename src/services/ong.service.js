import { ONG } from "../models/ong.js"

export const findOngByCNPJService = (CNPJ)=> ONG.find({estab_parc:{$in:[CNPJ.replace(/\D/g, '')]}})

export const findOngByNameService = (Nome) => ONG.find({Nome:{$regex: new RegExp(Nome,"i") }})

export const findAllOngsService = () => ONG.find()