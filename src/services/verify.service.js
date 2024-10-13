import { transport } from "../../emailConfig.js"
import ONGrep from "../models/ongrep.js"
import PlaceOwner from "../models/placeowner.js"
import { verifyModel } from "../models/verifyemail.js"


const generateCode = ()=>{
    return "#-#-#-#".replaceAll("#",()=>Math.floor(Date.now() * Math.random()).toString(36).substring(0,3))
}

export const sendVerificationCode = async(email)=>{
    let code = generateCode()
    let emailCheck = await verifyModel.findOne({email})
    
    if(!emailCheck){
        emailCheck = await verifyModel.create({email,code})
    }

    code = emailCheck.code

    const sentEmail = await transport.sendMail({
        to:email, subject:"Verificação", html:`Seu código de verificação é: <b>${code}</b>`
    })

    console.log(sentEmail)
}

export const validateCodeService = (email,code) =>  verifyModel.findOneAndDelete({email,code})


export const verifyUserByEmailService = (email) => User.findOneAndUpdate({email},{verified:true})

export const verifyONGrepByEmailService = (email) => ONGrep.findOneAndUpdate({email},{verified:true})

export const verifyPlaceOwnerByEmailService = (email) => PlaceOwner.findOneAndUpdate({email},{verified:true})