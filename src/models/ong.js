import { Schema,model } from "mongoose";


const ONGSchema = new Schema({
    Nome: {
        type: String,
        required: true,
      },
    Desc:{
        type:String,
        required: true
    },
    estab_parc:{
        type:Array,
        default:[] //cnpj
    }
})


export const ONG = model("ong",ONGSchema)

