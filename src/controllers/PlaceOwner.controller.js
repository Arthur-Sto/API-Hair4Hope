import { createPlaceOwnerService, PlaceOwnerLoginService, deletePlaceOwnerService, findPlaceOwnerByIdService, updatePlaceOwnerService, generateToken } from "../services/globalAuth.service.js";
import bcrypt from "bcrypt"
import { Types } from "mongoose";
import { deleteScheduleByIdService } from "../services/schedule.service.js";
import {phone} from "phone";



export const createPlaceOwner = async (req, res) => {
    const { nome, email, senha, Telefone } = req.body

    try {

        if (!nome || !email || !senha || !Telefone) {
            return res.status(400).send({ message: "Preencha todos os campos" })
        }
        
        const phoneCheck = phone(Telefone,{"country":"br"})
        
        if(!phoneCheck.isValid){
            return res.status(400).send({ message: "Numero de telefone inválido" })
        }

        
        const PlaceOwner = await createPlaceOwnerService({...req.body, Telefone:phoneCheck.phoneNumber})

        if (!PlaceOwner) {
            return res.status(400).send({ message: "Criação de perfil deu errado" })
        }

        

        return res.send({ message: "Sucesso ao criar o perfil", user:PlaceOwner,email })

    } catch (err) {
        return res.status(500).send({ message: "Erro interno" })
    }
}

export const updatePlaceOwner = async (req, res) => {

    const { nome, email, senha, Telefone } = req.body

    try {
        if (!nome && !email && !senha && !Telefone) {
            return res.status(400).send({ message: "Preencha pelo menos um campo" })
        }

        const update = await updatePlaceOwnerService(req.userId, req.body)

        return res.send({ message: "Atualizado com sucesso" })
    } catch (err) {
        return res.status(500).send({ message: "Erro" })
    }
}

export const deletePlaceOwner = async (req, res) => {
    const userId = req.userId
    try {
        if (req.body.confirmation == 1) {
            await deletePlaceOwnerService(userId)
            res.send({ message: "Usuário apagado" })
        }
    } catch (err) {
        return res.status(500).send({ message: "Erro" })
    }
}


export const findPlaceOwnerById = async (req, res) => {
    const PlaceOwnerId = req.params.id
    try {
        const PlaceOwner = await findPlaceOwnerByIdService(PlaceOwnerId)

        if (!PlaceOwner) {
            return res.status(400).send({ message: "Algo deu errado" })
        }
        return res.send({ message: "Tudo certo", PlaceOwner })


    } catch (err) {
        return res.status(500).send({ message: "Erro" })
    }
}


export const PlaceOwnerLogin = async (req, res) => {
    const { email, senha } = req.body

    if (!email || !senha) {
        return res.status(400).send({ message: "Preencha todos os campos" })
    }

    try {

        

        const user = await PlaceOwnerLoginService(email)

        console.log(user)

        if (!user) {
            return res.status(400).send({ message: "Email ou senha incorretos" })
        }


        const comp = bcrypt.compareSync(senha, user.senha)



        if (!comp) {
            return res.status(400).send({ message: "Email ou senha incorretos" })
        }

        const token = generateToken(user._id)

        return res.send({ message: "Usuário logado", token,userId:user._id  })
    } catch (err) {
        return res.status(500).send({ message: `Erro: ${err.toString()}` })
    }
}

export const deleteSchedule = async (req, res) => {
    const { tipo, userId } = req
    const scheduleid = req.params.id
    try {
        if (tipo != 2) {
            return res.status(401).send({ message: "Desautorizado" });
        }

        if (!Types.ObjectId.isValid(scheduleid)) {
            return res.status(401).send({ message: "ID inválido" });
        }

        const scheduleDelete = await deleteScheduleByIdService(scheduleid)

        return res.send({ message: "Apagado com sucesso" })
    }
    catch (err) {
        return res.status(500).send({ message: `Erro interno no servidor` })
    }

}