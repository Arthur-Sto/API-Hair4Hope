import { Schema,model } from "mongoose";


const PlaceSchema = new Schema({
    idPlaceOwner: {
        type: Schema.Types.ObjectId,
        ref: 'PlaceOwner', 
        required: true,
      },
      foto:{
        type:String,
         required:false
      },
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
    dias_func: {
      type: [String], 
      required: true,
      enum: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'], 
    },
    horarios_func: [
      {
        dia: {
          type: String,
          required: true,
          enum: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'], 
        },
        abertura: {
          type: String, 
          required: true,
        },
        fechamento: {
          type: String, 
          required: true,
        },
      },
    ],
})


export const Place = model("Place",PlaceSchema)

