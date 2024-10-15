

import { findONGrepByIdService, createONGrepService, deleteONGrepService, updateONGrepService, ONGrepLoginService, generateToken } from "../services/globalAuth.service.js";
import valid_email from "email-validator"
import { Types } from "mongoose";
import bcrypt from "bcrypt";
import { phone } from "phone";
import { findOngByIdService, findOngByNameService } from "../services/ong.service.js";
import { sendVerificationCode } from "../services/verify.service.js";


export const createONGrep = async (req, res) => { //O QUE FAZ COM O ONGID
    try {
        let { nome, email, senha, Telefone, ongname, ongId, pass_acesso } = req.body


        if (!nome || !email || !senha || !Telefone || !ongname || !ongId) {
            return res.status(400).send({ message: "Preencha todos os campos" })
        }

        /*if(!Types.ObjectId.isValid(ongId) ){
           return res.status(404).send({message:"ONG não encontrada"})
        }*/

        const findOng =await findOngByNameService(ongname)

        if(!findOng){
            return res.status(400).send({ message: "Ong não encontrada" })
        }

        req.body.ongId = findOng._id
        

        if (!phone(Telefone, { country: "BR" }).isValid) {
            return res.status(400).send({ message: "Telefone inválido" })
        }


        const ong = await findOngByIdService(ongId)

        if(!ong){
            return res.status(400).send({ message: "ONG não disponível" })
        }

        if(ong.pass_acesso != pass_acesso){
            return res.status(400).send({ message: "Código de acesso inválido, consulte algum administrador" })
        }

        const user = await createONGrepService(req.body)

        if (!user) {
            return res.status(400).send({ message: "Algo deu errado" })
        }

        await sendVerificationCode(email,user._id)
    
        return res.send({ verifyMessage:`Cadastro efetuado com sucesso, verifique o email ${email}`, message: "Sucesso ao criar o perfil", userId:user._id, user:user,email,nome })

   
    } catch (err) {
        console.log(err)
        return res.status(500).send({ message: `Erro interno no servidor: ${err.toString()}` })
    }
}

export const updateONGrep = async (req, res) => {
    const ONGrepID = req.userId
    const { nome, email, senha, Telefone, ongname } = req.body


    if (!nome && !email && !senha && !Telefone && !ongname) {
        return res.status(400).send({ message: "Preencha pelo menos um campo" })
    }

    const update = await updateONGrepService(ONGrepID, req.body)

    if (!update) {
        return res.status(400).send({ message: "Algo deu errado, tente novamente mais tarde." })
    }


    return res.send({ message: "Atualizado com sucesso" })

}

export const ONGrepLogin = async (req, res) => {

    const { email, senha } = req.body


    if (!email || !senha) {
        return res.status(400).send({ message: "Preencha todos os campos" })
    }

    try {

        const user = await ONGrepLoginService(email).select("senha")

        console.log(user)

        if (!user) {
            return res.status(400).send({ message: "Email ou senha incorretos" })
        }

        const compare = bcrypt.compareSync(senha, user.senha)

        if (!compare) {
            return res.status(400).send({ message: "Email ou senha incorretos" })
        }




        const token =  generateToken(user._id.toString())

        return res.send({ message: "Representante logado.", token, userId:user._id  })

    } catch (err) {
        return res.status(500).send({ message: "Erro interno" })
    }

}


export const findONGrepById = async (req, res) => {
    const OngRepId = req.params.id
    try {

        if (!Types.ObjectId.isValid(OngRepId)) {
            return res.status(400).send({ message: "ID inválido" })
        }

        const ONGrep = await findONGrepByIdService(OngRepId)

        if (!ONGrep) {
            return res.status(400).send({ message: "Algo deu errado" })
        }
        return res.send({ message: "Tudo certo", ONGrep })


    } catch (err) {
        return res.status(500).send({ message: "Erro" })
    }
}





