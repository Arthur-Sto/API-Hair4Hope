

import { findONGrepByIdService ,createONGrepService, deleteONGrepService,updateONGrepService, ONGrepLoginService } from "../services/globalAuth.service.js";
import valid_email from "email-validator"
import { Types } from "mongoose";
import bcrypt from "bcrypt";
import phone from "phone";



export const createONGrep = async(req,res)=>{ //O QUE FAZ COM O ONGID

    const {nome ,email, senha, Telefone, ongname, ongId} = req.body

    

   
    if(!nome ||!email|| !senha|| !Telefone|| !ongname|| !ongId){
        return res.status(400).send({message:"Preencha todos os campos"})
    }
   
    try{
        if(!phone(Telefone,{country:"br"})){
            return res.status(400).send({message:"Telefone inválido"})
        }

    const user = await createONGrepService(req.body)

    if(!user){
        return res.status(400).send({message:"Algo deu errado"})
    } 
    return res.send({message:"Representante criado", user})
    }catch(err){
        return res.status(500).send({message:"erro interno"})
    }
}

export const updateONGrep = async(req,res)=>{ 
    const ONGrepID = req.userId
    const {nome ,email, senha, Telefone,ongname} = req.body
    

    if(!nome && !email && !senha && !Telefone && !ongname){
        return res.status(400).send({message:"Preencha pelo menos um campo"})
    }

   const update = await updateONGrepService(ONGrepID,req.body)

    if(!update){
        return res.status(400).send({message:"Algo deu errado, tente novamente mais tarde."})
    }

    
    return res.send({message:"Atualizado com sucesso"})

}

export const ONGrepLogin = async (req,res)=>{
    
    const {email, senha} = req.body


    if(!email|| !senha){
        return res.status(400).send({message:"Preencha todos os campos"})
    }

    try{

    const user = await ONGrepLoginService(email).select("senha")

    console.log(user)

    if(!user){
        return res.status(400).send({message:"Email ou senha incorretos"})
    }

    const compare =  bcrypt.compareSync(senha,user.senha)
       
    if(!compare){
        return res.status(400).send({message:"Email ou senha incorretos"})
    }
    

    

    const token = await ONGrepGenerateToken(user._id.toString())
    
    return res.send({message:"Representante logado.", token, id:user._id})
    
    }catch(err){
        return res.status(500).send({message:"Erro interno"})
    }

}

      
export const findONGrepById = async (req, res) => {
    const OngRepId = req.params.id
    try {

        if(!Types.ObjectId.isValid(OngRepId)){
            return res.status(400).send({ message: "ID inválido" })
        }

       const ONGrep = await findONGrepByIdService(OngRepId)

       if(!ONGrep){
            return res.status(400).send({ message: "Algo deu errado"})
       }
       return res.send({message:"Tudo certo", ONGrep})


    } catch (err) {
        return res.status(500).send({ message: "Erro" })
    }
}

      

    

