import {
  createUserService,
  findAllService,
  updateService,
} from "../services/user.service.js";
import email_validator from "email-validator";

export const createUser = async (req, res) => {
  try {
    const { name, email, password, tipoCabelo, Coloracao, AdicionaisCabelo } =
      req.body;

    if (
      !name ||
      !email ||
      !password ||
      !tipoCabelo ||
      !Coloracao ||
      !AdicionaisCabelo
    ) {
      return res
        .status(400)
        .send({ message: "Preencha todos os campos para o registro." });
    }

    const isValidEmail = email_validator.validate(email);

    if (!isValidEmail) {
      return res
        .status(400)
        .send({ message: "Algo deu errado, tente novamente" });
    }

    const user = await createUserService({
      nome: name,
      email: email,
      senha: password,
      tipoCabelo: tipoCabelo,
      Coloracao: Coloracao,
      AdicionaisCabelo: AdicionaisCabelo,
    });

    if (!user) {
      return res.status(400).send({ message: "Erro ao criar usuario" });
    }

    return res.status(201).send({
      message: "Usuário criado com sucesso",
      user: {
        id: user._id,
        name,
        email,
      },
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const findAll = async (req, res) => {
  try {
    const Users = await findAllService();

    if (Users.lenght === 0) {
      return res.status(400).send({ message: "Não há usuários registrados" });
    }

    res.send(Users);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { name, email, password, tipoCabelo, Coloracao, AdicionaisCabelo } = req.body;

    if (!name && !email && !password&& !tipoCabelo && !Coloracao && !AdicionaisCabelo) {
      res
        .status(400)
        .send({ message: "Tenha no minimo um campo para atualizar." });
    }
    const { id, user } = req;

    await updateService(id, name, email, password, tipoCabelo, Coloracao, AdicionaisCabelo  );

    res.send({ message: "Usuário atualizado com sucesso" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
