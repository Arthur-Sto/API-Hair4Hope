import { validateCodeService, verifyONGrepByEmailService, verifyPlaceOwnerByEmailService, verifyUserByEmailService } from "../services/verify.service.js"


export const validateCode = async (req, res) => {
    let { email, code, tipo } = req.params
    
    const verifyServices = {
        "1": verifyUserByEmailService,
        "2": verifyPlaceOwnerByEmailService,
        "3": verifyONGrepByEmailService
    }

    code = code.replaceAll("-", "")


    if (!Object.keys(verifyServices).includes(tipo)) {
        return res.status(400).send({ message: "Algo deu errado" })
    }

   


    const verifiedUser = await verifyServices[tipo](email)

    if (!verifiedUser) {
        res.status(400).send({ message: "Algo deu errado1" })
    }

    const validatedCode = await validateCodeService(email,code)
     
    if (!validatedCode) {
        return res.status(400).send({ message: "Código inválido" })
    }

    return res.send({ message: "Email verificado com sucesso!", success: true })




}