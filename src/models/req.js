import { Schema, model } from "mongoose";
import { type } from "os";


const reqSchema = new Schema({
  PlaceId: {
    type: Schema.Types.ObjectId,
    ref: 'place',
    required: true,
  },
  ONGrepId: {
    type: Schema.Types.ObjectId,
    ref: 'ongrep',
    required: false,
  },
  TipoCabelo: {
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
  FullConfirm :{
    type:Boolean,
    required:false
  }
})

/*reqSchema.pre("findOneAndUpdate",async function(next){
  if ((this.ONGConfirm + this.PlaceConfirm) ==2){
    this.FullConfirm = true
  }
  return next()
})*/

export const reqModel = model("Req", reqSchema)

