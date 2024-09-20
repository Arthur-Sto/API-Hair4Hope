import { Schema,model } from "mongoose";


const PlaceSchema = new Schema({
    nome:{
        type:String,
        required: true
    },
    endereco:{
        type:String,
        required: true
    },
    cnpj:{
        type:String,
        required: true
    },
    ong_parc:{
        type:String,
        required: true
    },
    pass_acesso:{
        type:String,
        required: true,
        unique:true
    }

})


export const Place = model("Place",PlaceSchema)

