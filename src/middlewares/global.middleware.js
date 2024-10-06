import dotenv from "dotenv"
import jwt from "jsonwebtoken";
import { findONGrepByIdService, findPlaceOwnerByIdService, findUserByIdService } from "../services/globalAuth.service.js";
import { validate } from "email-validator";

dotenv.config();

export const authMiddleware = (req, res, next) => {

    try {
        const { authorization } = req.headers;
        if (!authorization) {
            return res.status(401).send({ message: "Desautorizado" });
        }

        const parts = authorization.split(" ");

        if (parts.length !== 3) {
            return res.status(401).send({ message: "Desautorizado" });
        };
        const [schema, token, tipo] = parts;

        if (schema !== "Bearer") {
            return res.status(401).send({ message: "Desautorizado" });
        };

        if (!parseInt(tipo) || !([1, 2, 3].includes(parseInt(tipo)))) {
            return res.status(401).send({ message: "Desautorizado" });
        }

        jwt.verify(token, process.env.SECRET_JWT, async (error, decoded) => {
            if (error) {
                return res.status(401).send({ message: "Token invalid!" });
            };

            const decodedID = decoded.id
            let user
            if (tipo == 1) {
                console.log("user normal")
                user = await findUserByIdService(decodedID)
            }

            if (tipo == 2) {
                console.log("dono de estabelecimento")
                user = await findPlaceOwnerByIdService(decodedID)
            }

            if (tipo == 3) {
                console.log("representante de ong")
                user = await findONGrepById(decodedID)
            }

            if (!user || !user.id) {
                return res.status(401).send({ message: "Invalid Token!" });
            }

            console.log(user)
            req.userId = user._id
            req.id = user._id
            req.user = user
            req.tipo = tipo

            return next();
        });
    } catch (err) {
        res.status(500).send(err.message);
    }
};

export const createMiddleware = (req, res, next) => {
    const { nome, email, senha, senhaconf } = req.body

    if (
        !nome ||
        !email ||
        !senha
    ) {
        return res
            .status(400)
            .send({ message: "Preencha todos os campos para o registro." });
    }

    const isValidEmail = validate(email);

    if (!isValidEmail) {
        return res
            .status(400)
            .send({ message: "Tente outro e-mail." });
    }

    if (senha !== senhaconf) {
        return res
            .status(400)
            .send({ message: "As senhas são diferentes." });
    }

    if(!strongpass(senha)){
        return res
            .status(400)
            .send({ message: "Senha muito fraca, tente adicionar números, letras maiúsculas ou até mesmo caractéres especiais" });
    }
    return next()
}

const strongpass= (pass)=> /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d.*\d.*\d.*\d)(?=.*\d)(?=.*[_$!@$*&#-])[^ ]{8,}$/.test(pass)

//console.log(strongpass("Meudeusnaonao1234"))