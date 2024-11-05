import { Types } from "mongoose";
import { createPlaceService, updatePlaceByIdService, deletePlaceByIdService, findPlaceByIdService, validateCEP, findAllPlacesService, setHorarioByPlaceIdService, findPlaceByPlaceOwnerIdService } from "../services/place.service.js";
import {  findOngByCNPJService } from "../services/ong.service.js";
//import { createImage } from "./Image.controller.js";
//import { createImageService } from "../services/Image.service";

//import fileTypeFromBuffer from "file-type"


import { cnpj as CNPJchecker } from "cpf-cnpj-validator";
import { generateToken } from "../services/globalAuth.service.js";


//quando o mano for criar a place, verificar no model ong


export const createPlace = async (req, res) => {
  const idPlaceOwner = req.userId
  let { foto, nome, endereco, cnpj, cep, ong_parc } = req.body

  console.log("chegou aqui")

  if (!foto && !nome && !endereco && !cnpj && !cep && ong_parc){
    return res.status(400).send({message:"Preencha todos os campos"})
  }

  const cnpjFind = await findOngByCNPJService(cnpj)

  if(cnpjFind.length == 0){
    return res.status(400).send({message:"Cnpj não cadastrado"})
  }

  

  const createdPlace = await createPlaceService({ idPlaceOwner, foto, nome, endereco, cnpj, cep, ong_parc })

  if(!createdPlace){
    return res.status(400).send({message:"Não foi possível criar o estabelecimento"})
  }

  return res.send({message:"Estabelecimento criado com sucesso",createdPlace, PlaceId:createdPlace._id})
}

export const setHorarioByPlaceId = async(req,res)=>{
    let {horarios_func,PlaceId} = req.body
    
    try{

      if(!Types.ObjectId.isValid(PlaceId)){
        return res.status(400).send({message:"ID de estabelecimento errado."})
      }

      const horario = await setHorarioByPlaceIdService(PlaceId,horarios_func)

      if(!horario){
        return res.status(400).send({message:"Não foi possível adicionar os horários de funcionamento"})
      }

      return res.send({message:"Horário adicionado com sucesso", horario, PlaceId})
    }catch(err){
      return res.status(500).send({message:"Erro interno no servidor"})
    }
}

export const updatePlace = async (req, res) => {
  try {
    let {placeId, foto, nome, endereco, cep } = req.body

    if (!placeId && !foto && !nome && !endereco && !cep) {
      return res.status(400).send({ message: "Preencha pelo menos um campo para editar" })
    }

    

    const update = await updatePlaceByIdService(placeId,{ foto, nome, endereco, cep })

    if (!update) {
      return res.status(400).send({ message: "Não foi possível atualizar" })
    }

    return res.send({ message: "Atualizado com sucesso", update:true })
  } catch (err) {
    console.log(err.toString())
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



export const findPlaceByPlaceOwnerId = async (req,res)=>{

  const {userId} = req

  const placeInfo = await findPlaceByPlaceOwnerIdService(userId)
  

  if(!placeInfo){
    return res.status(400).send({message:"Não foi possível encontrar o estabelecimento"})
  }
  console.log(placeInfo)
  return res.send({placeInfo})

  
}