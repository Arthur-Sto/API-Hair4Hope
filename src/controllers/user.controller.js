
import { createUserService, updateUserService, findUserByIdService, findAllUserService, loginService, generateToken, setHairByIdService } from "../services/globalAuth.service.js";
import { validate } from "email-validator";
import bcrypt from "bcrypt"
import { sendVerificationCode } from "../services/verify.service.js";
import { Types } from "mongoose";

export const createUser = async (req, res) => {
    const { nome, email, senha } = req.body;

    try {
        const user = await createUserService({
            nome,
            email,
            senha
        });

        if (!user) {
            return res.status(400).send({ message: "Erro ao criar usuario" });
        }

        await sendVerificationCode(email, user._id)

        // const shortMail = `${email.substring(0,3)}...${email.substring(email.indexOf("@"),email.length)}`

        return res.send({ verifyMessage: `Cadastro efetuado com sucesso, verifique o email ${email}`, message: "Cadastro efetuado com sucesso", userId: user._id, email, nome })

    } catch (erro) {
        return res.status(500).send({ message: `Erro interno: ${erro.toString()}` })
    }
}


export const setUserHair = async (req, res) => {
    let { tipoCabelo, Coloracao, AdicionaisCabelo, userId } = req.body
    console.log(req.body)
    try {
        if(!Types.ObjectId.isValid(userId)){
            return res.status(400).send({message:"ID de usuário inválido"})
        }
        const hairSet = await setHairByIdService(userId, { tipoCabelo, Coloracao, AdicionaisCabelo })

        if (!hairSet) {
            return res.status(400).send({ message: "Não foi possível adicionar as informações de cabelo, tente novamente mais tarde" })
        }
        return res.send({ message: "Tudo certo", token: generateToken(userId), userId, email:hairSet.email })
    } catch (err) {
        res.status(500).send({ message: "Erro interno no servidor." })
    }
}


export const findAll = async (req, res) => {
    try {
        const users = await findAllUserService();

        if (users.lenght === 0) {
            return res.status(400).send({ message: "Não há usuários registrados" })
        }

        return res.send(users)
    }
    catch (err) {
        return res.status(500).send({ message: "Erro interno" })
    }
}

export const findById = async (req, res) => {
    const id = req.params.id
    try {
        const user = await findUserByIdService(id)
        return res.send({ user })
    } catch (err) {
        return res.status(500).send({ message: err })
    }
}

export const updateUser = async (req, res) => {
    try {
        const { nome, email, senha, tipoCabelo, Coloracao, AdicionaisCabelo } = req.body;

        if (!nome && !email && !senha && !tipoCabelo && !Coloracao && !AdicionaisCabelo) {
            return res
                .status(400)
                .send({ message: "Tenha no minimo um campo para atualizar." });
        }
        const { id, user } = req;

        await updateUserService(id, req.body);

        return res.send({ message: "Usuário atualizado com sucesso" });
    } catch (err) {
        return res.status(500).send({ message: `Erro interno: ${err.toString()}` })
    }
};


export const LoginUser = async (req, res) => {

    const { email, senha } = req.body

    if (!email || !senha) {
        return res.status(400).send({ message: "Preencha todos os campos" })
    }

    try {
        const user = await loginService(email).select("senha")

        if (!user) {
            return res.status(400).send({ message: "Email ou senha incorretos" })
        }


        const comp = bcrypt.compareSync(senha, user.senha)



        if (!comp) {
            return res.status(400).send({ message: "Email ou senha incorretos" })
        }

        const token = generateToken(user._id)

        return res.send({ message: "Usuário logado", token, userId: user._id })
    } catch (err) {
        return res.status(500).send({ message: "Erro interno" })
    }
}