
import mongoose from "mongoose"
import { CreatePlaceService, FindPlaceByIdService, FindAllPlacesService} from "../services/place.service.js"

export const CreatePlace = async (req, res) => {
    
    try {
        const { pass_acesso, ong_parc, cnpj, endereco, nome } = req.body

        if (!pass_acesso || !ong_parc || !cnpj || !endereco || !nome) {
            return res.status(404).send({ message: "Preencha todos os campos." })
        }

        const newStore = CreateStoreService(req.body)

        if (!newStore) {
            return res.status(404).send({ message: "Algo deu errado" })
        }


        return res.send({ message: "Estabelecimento criado com sucesso" })
    }
    catch(err) {
        return res.status(500).send({message:err})
    }
}


export const FindPlaceById = async (req,res) =>{
    const placeID = req.params.id 

    if(!placeID){
        return res.status(400).send({message:"Algo deu Errado"})
    }

    if (!mongoose.Types.ObjectId.isValid(placeID)){
        return res.status(400).send({message:"ID inválido"})
    }

    const place = await FindPlaceByIdService()

   

    return res.send({place})
}


export const FindAllPlaces = async (req, res)=>{
    try{
        const Places = await FindAllPlacesService()

        res.send({results:Places})
    }catch(err){
        res.status(500).send({message:err})
    }
}

