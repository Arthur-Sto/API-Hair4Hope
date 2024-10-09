import { Types } from "mongoose";
import { createPlaceService, updatePlaceByIdService, deletePlaceByIdService, findPlaceByIdService, validateCEP, findAllPlacesService } from "../services/place.service.js";
//import {  findOngByCNPJService } from "../services/ong.service";
//import { createImage } from "./Image.controller.js";
//import { createImageService } from "../services/Image.service";

//import fileTypeFromBuffer from "file-type"


import { cnpj as CNPJchecker } from "cpf-cnpj-validator";
import { generateToken } from "../services/globalAuth.service.js";

//quando o mano for criar a place, verificar no model ong


export const createPlaceStepOne = async (req, res) => {
  const idPlaceOwner = req.userId
  let { foto, nome, endereco, cnpj, cep, ong_parc, desc } = req.body

  
  
  try {
    if (!foto || !nome || !endereco || !cnpj || !cep || !ong_parc) {
      return res
        .status(400)
        .send({ message: "Preencha todos os campos para o registro." });
    }
    const dist =  (Math.random()+Math.floor(Math.random() * 20)).toFixed(2)

    if(ong_parc.toString().toLowerCase() == "vazio"){
      ong_parc = null
    }

    return res.send({ message: "Deu tudo certo", res: { idPlaceOwner, foto, nome, endereco, cnpj, cep, ong_parc, desc, dist,ong:ong_parc} })



  } catch (err) {
    return res.status(500).send({ message: "Erro interno no servidor"+err.toString() });
  }
}

export const createPlaceStepTwo = async (req, res) => {
  let { part1req, horarios_func } = req.body
  try {
    if (!part1req || !horarios_func) {
      return res.status(400).send({ message: "Algo deu errado" })
    }

    part1req = JSON.parse(part1req)
    horarios_func = JSON.parse(horarios_func)

    
    let PlaceRequestObject =Object.assign( part1req["part1_req"], {horarios_func}, {idPlaceOwner: "66fe20d87fbe8a660e5f0dca"}) 

    console.log(PlaceRequestObject)



    const createdPlace = await createPlaceService(PlaceRequestObject)
  
    
    
    if (!createdPlace) {
      return res.status(400).send({ message:"Algo deu errado"})
    }
    
    return res.send({ message: "Estabelecimento criado com sucesso", success:true, PlaceId : createdPlace._id})
  } catch (err) {
    console.log(err.toString())
    return res.status(500).send({ message: "Erro interno no servidor." })
  }
}


export const updatePlace = async (req, res) => {
  try {
    const { foto, nome, endereco, cnpj, cep, ong_parc, dias_func, horarios_func, desc } = req.body

    if (!foto && !nome && !endereco && !cnpj && !cep && ong_parc && !dias_func && !horarios_func && !desc) {
      return res.status(400).send({ message: "Preencha pelo menos um campo para editar" })
    }


    const update = await updatePlaceByIdService(id, { foto: `${req.baseUrl}/${img._id}`, nome, endereco, ong_parc, dias_func, horarios_func, desc })

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



export const findAllPlaces = async (req, res) => {
  try {
    let places = await findAllPlacesService()
    /*Places.map(item => {

      


      PlaceResponse = [...PlaceResponse, !item.dist ? Object.assign(item, { dist: 5 }) : item.dist]
    })*/
    return res.send({places})
  } catch (err) { res.status(500).send({ message: "Erro interno no servidor" }) }


}

