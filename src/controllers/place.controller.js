import { Types } from "mongoose";
import {  findOngByCNPJService } from "../services/ong.service";
import { createPlaceService, updatePlaceByIdService, deletePlaceByIdService, findPlaceByIdService } from "../services/Place.service";
import fileTypeFromBuffer from "file-type"
import { createImage } from "./Image.controller.js";
import { createImageService } from "../services/Image.service";

import { cnpj as CNPJchecker } from "cpf-cnpj-validator";

//quando o mano for criar a place, verificar no model ong

const isImage = async (b64Image) => {
  const imageTry = Buffer.from(b64Image, "base64")
  const imageCheck = await fileTypeFromBuffer(imageTry)

  return (!imageCheck || !imageCheck.mime || !imageCheck.mime.includes("image"))
}



export const createPlace = async (req, res) => {
  const idPlaceOwner = req.userId
  const { foto, nome, endereco, cnpj, ong_parc, dias_func, horarios_func } = req.body



  try {

    if (!foto || !nome || !endereco || !cnpj || !ong_parc || !dias_func || !horarios_func) {
      return res
        .status(400)
        .send({ message: "Preencha todos os campos para o registro." });
    }
    if (!CNPJchecker.isValid(cnpj)) {
      return res.status(400).send({ message: "CNPJ inválido" });
    }
    cnpj = cnpj.replace(/\D/g, '')

    const ong = await findOngByCNPJService(cnpj)

    if (ong.length == 0) {
      return res.status(400).send({ message: "Estabelecimento não encontrado" });
    }



    if (!isImage(foto)) {
      return res.status(400).send({ message: "Não foi possível salvar a imagem/foto" });
    }
    const img = await createImageService({ Arquivo: foto })



    const place = await createPlaceService({ ...req.body, foto: `${req.baseUrl}/${img._id}` })

    if (!place) {
      return res.status(400).send({ message: "Não foi adicionar o estabelecimento" });
    }
    return res.send({ message: "Estabelecimento adicionado com sucesso.", place })
  } catch (err) {
    return res.status(500).send({ message: "Erro interno no servidor." });
  }
}


export const updatePlace = async (req, res) => {
  try {
    const { foto, nome, endereco, ong_parc, dias_func, horarios_func } = req.body

    if (!foto && !nome && !endereco && !ong_parc && !dias_func && !horarios_func) {
      return res.status(400).send({ message: "Preencha pelo menos um campo para editar" })
    }

    if (!isImage(foto)) {
      return res.status(400).send({ message: "Não foi possível salvar a imagem/foto" });
    }

    const img = await createImageService({ Arquivo: foto })
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