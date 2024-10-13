import { validateCodeService, verifyONGrepByEmailService, verifyPlaceOwnerByEmailService, verifyUserByEmailService } from "../services/verify.service.js"


export const validateCode = async(req,res)=>{
    const {email,code,tipo} = req.params


    const validatedCode = await validateCodeService(email,code.replaceAll("-",""))

    if(!validatedCode){
        return res.status(400).send({message:"Código inválido"})
    }

    const verifyServices = {
        "1":verifyUserByEmailService,
        "2":verifyPlaceOwnerByEmailService,
        "3":verifyONGrepByEmailService
    }

    


    const verifiedUser = await verifyServices[tipo](email)

    if(!verified){
        res.status(400).send({message:"Algo deu errado"})
    }




    return res.send({message: "Email verificado com sucesso!", success:true})


    

}