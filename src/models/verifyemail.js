import {model, Schema, SchemaTypes} from "mongoose"

const emailVerifySchema = new Schema({
    email:{type:String,required:true},
    code:{type:String,required:true},
    userId:{type:SchemaTypes.ObjectId,required:true},

    createdAt: {
        type: Date,
        index: { 
          expires: '4m'
        },
        default: Date.now
    }

},{timestamps:true})

emailVerifySchema.pre("save",async function(next){
    this.code = this.code.replaceAll("-","").toLowerCase()
    return next()   
})

export const verifyModel = model("verify",emailVerifySchema)