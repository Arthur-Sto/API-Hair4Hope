import { Schema,model } from "mongoose";


const reqSchema = new Schema({
    idPlace: {
        type: Schema.Types.ObjectId,
        ref: 'place', 
        required: true,
      },
      idONGRep: {
        type: Schema.Types.ObjectId,
        ref: 'ongrep', 
        required: true,
      },
      TipoCabelo:{
        type:String,
        required: true
    },
    Tamanho:{
        type:String,
        required: true
    },
    PlaceConfirm: {
        type: Boolean,
        required: true,
        default: false
      },
    ONGConfirm:{
        type: Boolean,
        required: true,
        default: false
    },
    FullConfirm:{
        type: Number,
        enum: [0, 0.5, 1], 
        default: 0,
        required: true,
    },
    foto:{
      type:String, 
      required:false
    },
})


export const reqModel = model("Req",reqSchema)

