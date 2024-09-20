
import { CreatePlaceService } from "../services/place.service.js"

export const CreatePlace = async (req, res) => {
    
    try {
        const { pass_acesso, ong_parc, cnpj, endereco, nome } = req.body

        if (!pass_acesso || !ong_parc || !cnpj || !endereco || !nome) {
            return res.status(404).send({ message: "Preencha todos os campos." })
        }

        const newStore = CreateStoreService(req.body)

        if (!newStore) {
            return res.status(404).send({ message: "Algo deu errado" })
        }


        return res.send({ message: "Estabelecimento criado com sucesso" })
    }
    catch(err) {
        return res.status(500).send({message:err})
    }
}