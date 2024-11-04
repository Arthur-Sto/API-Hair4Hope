import { Schema, model } from "mongoose";
import { type } from "os";


const reqSchema = new Schema({

 agendId:{
  type: String,
  required: true
 },

  PlaceId: {
    type: Schema.Types.ObjectId,
    ref: 'place',
    unique: true,
    required: true,
  },
  PlaceOwnerId:{
    type: Schema.Types.ObjectId,
    ref: 'PlaceOwner',
    unique: true,
    required: false,

  },
  ongId: {
    type: Schema.Types.ObjectId,
    ref: 'ong',
    unique: true,
    required: false,
  },


  Coloracao:{
    type: String,
    required: false
  },
  AdicionaisCabelo:{
    type: String,
    required: true
  },
  tipoCabelo: {
    type: String,
    required: true
  },
  Tamanho: {
    type: String,
    required: true
  },



  PlaceConfirm: {
    type: Boolean,
    required: false,
    default: false
  },
  ONGConfirm: {
    type: Boolean,
    required: false,
    default: false
  },
  foto: {
    type: String,
    required: false
  },
  FullConfirm: {
    type: Boolean,
    default:false,
    required: false
  },
  criacao:{
    type:String,
    default: new Date().toLocaleDateString("pt-br",{hour:"2-digit",minute:"2-digit"}) ,
    required:false
  },
  dataComp:{
    type:String, 
    required:false
  }
})



export const reqModel = model("Req", reqSchema)

