import { Schema, model } from "mongoose";


const PlaceSchema = new Schema({
  idPlaceOwner: {
    type: Schema.Types.ObjectId,
    ref: 'PlaceOwner',
    required: true,
  },
  foto: {
    type: String,
    required: false
  },
  nome: {
    type: String,
    required: true
  },
  endereco: {
    type: String,
    required: true
  },
  cnpj: {
    type: String,
    required: true
  },
  cep:{
    type:String,
  required:true
},
  ong_parc: {
    type: Array,
    required: true
  },

  horarios_func: {
    Segunda: {
      Abertura: { type: String, required: true },
      Fechamento: { type: String, required: true },
    },
    Terca: {
      Abertura: { type: String, required: true },
      Fechamento: { type: String, required: true },
    },
    Quarta: {
      Abertura: { type: String, required: true },
      Fechamento: { type: String, required: true },
    },
    Quinta: {
      Abertura: { type: String, required: true },
      Fechamento: { type: String, required: true },
    },
    Sexta: {
      Abertura: { type: String, required: true },
      Fechamento: { type: String, required: true },
    },
    Sabado: {
      Abertura: { type: String, required: true },
      Fechamento: { type: String, required: true },
    },
    Domingo: {
      Abertura: { type: String, required: true },
      Fechamento: { type: String, required: true },
    },
  },
})


export const Place = model("Place", PlaceSchema)

