import { validateCEP } from "../services/place.service.js";

import { findOngByCNPJService } from "../services/ong.service.js";

import { cnpj as CNPJchecker } from "cpf-cnpj-validator";

import { createImageService } from "../services/image.service.js";
import { fileTypeFromBuffer } from "file-type";


export const cepMiddleware = async (req, res, next) => {
    const { cep } = req.body
    if (!cep) { return next() }

    const validCEP = await validateCEP(cep)
    if (!validCEP.success || !cep) {
        return res.status(400).send({ message: "CEP inválido" });
    }
    req.body.cep = validCEP.cep

    return next()
}


export const imgMiddleware = async (req, res, next) => {
    let { foto } = req.body
    if (!foto) { return next() }

    let isImgCheck = await isImage(foto)

    if (!isImgCheck) {
        return res.status(400).send({ message: "Não foi possível salvar a imagem/foto" });
    }
    const img = await createImageService({ Arquivo: foto })
    req.body.foto = `/image/${img._id}`

    return next()

}

export const cnpjMiddleware = async (req, res, next) => {
    let { cnpj } = req.body
    if (!cnpj) { return next() }

    cnpj = cnpj.replace(/\D/g, '')

    /*if (!CNPJchecker.isValid(cnpj)) {
        return res.status(400).send({ message: "CNPJ inválido" });
    }*/

    const ong = await findOngByCNPJService(cnpj)

    if (ong.length == 0) {
        return res.status(400).send({ message: "Estabelecimento não encontrado" });
    }

    req.body.cnpj = cnpj
    return next()
}

export const pass_acessoMiddleware= async(req,res,next)=>{
    const {pass_acesso} = req.body

    if(pass_acesso.toString().toLowerCase() != "tamanduabandeira"){
        return res.status(400).send({message:"Senha de acesso inválida"})
    }
    console.log("nao")
    return next()
}











export const isImage = async (b64Image) => {
    const imageTry = Buffer.from(b64Image, "base64")
    const imageCheck = await fileTypeFromBuffer(imageTry)

    return (imageCheck || imageCheck.mime || imageCheck.mime.includes("image"))
}
