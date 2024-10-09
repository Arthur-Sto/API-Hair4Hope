import {Types}from "mongoose";
import { createImageService, findImageById ,findAllIdsService, DeleteImageService} from "../services/image.service.js";
import { fileTypeFromBuffer } from "file-type";


export const createImage =  async (req,res) =>{

    const {Arquivo,Ext} = req.body


    if (!Arquivo || !Ext){
        return res.status(400).send({message:"Preencha todos os campos"})
    }

    const img = await createImageService(req.body)

    if (!img){
        return res.status(400).send({message:"Algo deu errado"})
    }

    return res.send({message: "Imagem carregada.", img})

}


export const findImage = async(req,res)=>{
    const idImg = req.params.id
    

    if(!Types.ObjectId.isValid(idImg)){
        return res.status(400).send({message:"Algo deu errado."})
    }
    const img = await findImageById(idImg)

  
    if (!img){
        return res.status(400).send({message:"Não foi possível carregar a imagem"})
    }

    

    const imgObj = Buffer.from(img.Arquivo, "base64")

    


    return res.end(imgObj)

}

export const getAllImageIds = async (req,res)=>{

    const images  = await findAllIdsService()

    res.send({results:images})
    
}

export const deleteImage = async (req,res)=>{

    const {id} = req.body

    if(!Types.ObjectId.isValid(id)){
        return res.status(400).send({message:"Algo deu errado."})
    }

    const del  = await DeleteImageService(id)

    return res.send({message:"Apagado"})
    
}


