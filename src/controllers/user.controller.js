
import { createUserService, updateUserService, findUserByIdService, findAllUserService, loginService, generateToken } from "../services/globalAuth.service.js";
import { validate } from "email-validator";
import bcrypt from "bcrypt"
import { sendVerificationCode } from "../services/verify.service.js";

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

        await sendVerificationCode(email)

       const shortMail = `${email.substring(0,3)}...${email.substring(email.indexOf("@"),email.length)}`

        return res.send({verifyMessage:`Cadastro efetuado com sucesso, verifique o email ${shortMail}`, message:"Cadastro efetuado com sucesso" , user: { id: user._id, email, nome },email })

    } catch (erro) {
        return res.status(500).send({ message: `Erro interno: ${erro.toString()}` })
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

        return res.send({ message: "Usuário logado", token,userId:user._id })
    } catch (err) {
        return res.status(500).send({ message: "Erro interno" })
    }
}