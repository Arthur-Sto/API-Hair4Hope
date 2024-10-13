import {model, Schema} from "mongoose"

const emailVerifySchema = new Schema({
    email:{type:String,required:true},
    code:{type:String,required:true}
},{expireAfterSeconds:150})

emailVerifySchema.pre("save",async function(next){
    this.code = this.code.replaceAll("-","")
    return next()   
})

export const verifyModel = model("verify",emailVerifySchema)