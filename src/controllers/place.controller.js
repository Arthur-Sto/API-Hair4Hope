import { createPlaceService, updatePlaceByIdService, deletePlaceByIdService, findPlaceByIdService } from "../services/Place.service";

export const createPlace = async (req,res)=>{
    const idPlaceOwner = req.userId
    const {foto, nome,endereco,cnpj,ong_parc,dias_func,horarios_func} = req.body

    if(!foto||!nome || !endereco|| !cnpj||!ong_parc|| !dias_func||!horarios_func){
      return res
          .status(400)
          .send({ message: "Preencha todos os campos para o registro." });
  }

}