import { Types } from "mongoose";
import { createPlaceService, updatePlaceByIdService, deletePlaceByIdService, findPlaceByIdService, validateCEP } from "../services/Place.service.js";
//import {  findOngByCNPJService } from "../services/ong.service";
//import { createImage } from "./Image.controller.js";
//import { createImageService } from "../services/Image.service";

//import fileTypeFromBuffer from "file-type"


import { cnpj as CNPJchecker } from "cpf-cnpj-validator";
import { generateToken } from "../services/globalAuth.service.js";

//quando o mano for criar a place, verificar no model ong


export const createPlaceStepOne = async (req,res)=>{
  const idPlaceOwner = req.userId
  const { foto, nome, endereco, cnpj, cep, ong_parc } = req.body

  try {
    if (!foto || !nome || !endereco || !cnpj || !cep || !ong_parc) {
        return res
            .status(400)
            .send({ message: "Preencha todos os campos para o registro." });
    }

    return res.send({message:"Deu tudo certo", res:generateToken(   JSON.stringify({foto, nome, endereco, cnpj, cep, ong_parc})   )})
   
    
   
  } catch (err) {
    return res.status(500).send({ message: "Erro interno no servidor." });
  }
}

export const createPlaceStepTwo = async (req, res) => {
  
}


export const updatePlace = async (req, res) => {
  try {
    const { foto, nome, endereco, cnpj, cep, ong_parc, dias_func, horarios_func} = req.body

    if (!foto && !nome && !endereco && !cnpj && !cep && ong_parc && !dias_func && !horarios_func) {
      return res.status(400).send({ message: "Preencha pelo menos um campo para editar" })
    }

    
    const update = await updatePlaceByIdService(id, { foto: `${req.baseUrl}/${img._id}`, nome, endereco, ong_parc, dias_func, horarios_func })

    if (!update) {
      return res.status(400).send({ message: "Não foi possível atualizar" })
    }

    return res.send({ message: "Atualizado com sucesso", update })
  } catch (err) {
    return res.status(500).send({ message: "Erro interno no servidor." });
  }
}

export const deletePlaceById = async (req, res) => {
  try {
    const PlaceId = req.params.id
    const userId = req.userId

    if (!Types.ObjectId.isValid(PlaceId)) {
      return res.status(400).send({ message: "ID inválido" })
    }

    const checkPlace = await findPlaceByIdService(PlaceId)

    if (!checkPlace) {
      return res.status(400).send({ message: "Estabelecimento inválido" })
    }

    if (checkPlace.idPlaceOwner != userId) {
      return res.status(400).send({ message: "Não foi possível excluir o estabelecimento" })
    }

    await deletePlaceByIdService(PlaceId)

    return res.send({ message: "Estabelecimento excluído" })
  } catch (err) {
    return res.status(500).send({ message: "Erro interno no servidor." });
  }
}