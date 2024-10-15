import { Schema,Types,model } from "mongoose";

const ONGSchema = new Schema({
    Nome: {
        type: String,
        required: true,
        unique:true
      },
    Desc:{
        type:String,
        required: true
    },
    estab_parc:{
        type:Array,
        default:[] //cnpj
    },
    pass_acesso:{
        type:String,
        default:"####".replaceAll("#",()=>Math.floor(Date.now() * Math.random()).toString(36).substring(0,3))
    }
})

export const ONG = model("ong",ONGSchema)

/*const passSchema = new Schema({
    pass: {type:String, 
        default:"####".replaceAll("#",()=>Math.floor(Date.now() * Math.random()).toString(36).substring(0,3))
    },

    ongId:{
        type:Types.ObjectId,
        ref: "ong",
        required:true
    },
    createdAt:{
        type:Date,
        index:{
            expires:'5m'
        },
        default:Date.now
    }
})

export const PASS = model("pass",passSchema)*/


