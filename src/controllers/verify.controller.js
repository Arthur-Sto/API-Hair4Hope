import { sendVerificationCode, validateCodeService, verifyONGrepByEmailService, verifyPlaceOwnerByEmailService, verifyUserByEmailService } from "../services/verify.service.js"


export const validateCode = async (req, res) => {
    let { email, code, tipo } = req.params

    try {

        const verifyServices = {
            "1": verifyUserByEmailService,
            "2": verifyPlaceOwnerByEmailService,
            "3": verifyONGrepByEmailService
        }

        code = code.replaceAll("-", "")
        email = email.replaceAll(" ","")

        //console.log(tipo, typeof tipo, tipo.length, verifyServices[tipo])


        if (!Object.keys(verifyServices).includes(tipo)) {
            return res.status(400).send({ message: "Algo deu errado" })
        }


        const verifiedUser = await verifyServices[tipo](email)



        if (!verifiedUser) {
            return res.status(400).send({ message: "Algo deu errado" })
        }

        const validatedCode = await validateCodeService(email, code)

        console.log("code", validatedCode)

        if (!validatedCode) {
            return res.status(400).send({ message: "Código inválido" })
        }

        


        return res.send({ message: "Email verificado com sucesso!", success: true, user: validatedCode.userId.toString(),email })
    } catch (err) {
        return res.status(500).send({ message: "Erro interno no servidor, tente novamente mais tarde." })
    }
}


export const sendValidationCode = async (req, res) => {
    const { email, userId } = req.params
    try {
        const sentCode = await sendVerificationCode(email, userId)

        await sendValidationCode(email, userId)
        return res.send({ message: 'Codigo de verificação enviado, verifique seu e-mail.' })
    } catch (err) {
        return res.status(500).send({ message: "Erro interno no servidor, tente novamente mais tarde." })
    }
}