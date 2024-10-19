import { Place } from "../models/place.js";
import axios from "axios"


export const createPlaceService = (body) => Place.create(body)

export const updatePlaceByIdService = (id, body) => Place.findByIdAndUpdate(id, body)

export const findPlaceByIdService = (id) => Place.findById(id)

export const deletePlaceByIdService = (id) => Place.findOneAndDelete({ _id: id })

export const findAllPlacesService =() => Place.find()

export const setHorarioByPlaceIdService = (PlaceId,horarios_func)=>Place.findOneAndUpdate({_id:PlaceId},{horarios_func})

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

/*export const getDistanceFromLatAndLong = async(lat1,lon1,lat2,lon2)=>{
    const apiUrl = `https://router.project-osrm.org/route/v1/match/${lat1},${lon1};${lat2},${lon2}`
    const res = (await axios.get(apiUrl))
    
    return res.status==200 ? res.data:false
}
export const findDistBetweenPlaces =async (body)=>{
    let Places = await Place.find()
    let response = []

    

    Places.forEach(async item=>{
        item.dist = 5
        
        response = [...response, item ]
    })
    
    return response
}*/