import User from "../models/User.js";
import { CreateHairService, findAllHairService, findByIdService } from "../services/hair.service.js";


export const findById = async (req, res) => {
    //req.id = id;
    //req.user = user;

    const id = req.id
    try {
        const results = await findByIdService(id)
        return res.send({results})
    }
    catch (e) {
        return res.status(500).send({ message: err })
    }
}

export const findAll = async (req, res) => {
    try {
        const Hairs = await findAllHairService()
        return res.send({ results: Hairs })
    }
    catch (e) {
        return res.status(500).send({ message: e })
    }
}

export const CreateHair = async (req, res) => {
    const {tipo,adicionais} = req.body
    if (!tipo ) {
        return res.status(404).send({ message: "Preencha todos os campos" })
    }

    try {
        await CreateHairService({tipo, user:req.userId, adicionais})
        res.send({ message: "Tudo certo" })
    }
    catch (err) {
        return res.status(500).send({ message: err })
    }
}
