import { Place } from "../models/Place.js";
import axios from "axios"


export const createPlaceService = (body) => Place.create(body)

export const updatePlaceByIdService = (id, body) => Place.findByIdAndUpdate(id, body)

export const findPlaceByIdService = (id) => Place.findById(id)

export const deletePlaceByIdService = (id) => Place.findOneAndDelete({ _id: id })



export const validateCEP = async (cep) => {
    const url = `https://cep.awesomeapi.com.br/json/${cep}`
    try {
        const req = await axios.get(url)
        const res = req.data
        return { ...res, success: true }
    } catch (err) {
        return { message: "CEP inválido", success: false }
    }
}

