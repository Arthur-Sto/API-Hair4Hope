import  { Schema,SchemaTypes,model } from "mongoose";

const HairSchema = new Schema({
    tipo:{
        type:String,
        required:true
    },
    adicionais:{
        type:String, 
        required:false
    },
    user:{
        type:SchemaTypes.ObjectId, required:true,
        unique:true
    }
})


export const Hair = model("Hair",HairSchema)