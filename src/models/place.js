import { Schema, model, Types } from "mongoose";


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
  //a
  endereco: {
    type: String,
    required: true
  },
  cnpj: { //tem que estar no model ong e só pode ser usado uma vez no model place
    type: String,
    unique:true,
    required: true
  },
  cep: {
    type: String,
    required: true
  },
  
  ong_parc: {
    ref: "ong",
    type: Types.ObjectId,
    required: true
  },
  /*desc: {
    type: String,
    required: false
  },*/
  dist: {
    type: Number,
    required: false
  },

  horarios_func: {
    required:false,
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

