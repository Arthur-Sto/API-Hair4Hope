import { model, Schema, SchemaType } from "mongoose"


const scheduleSchema = new Schema({

  tipoCabelo: {
    type: String,
    enum: ['1A','1B','1C','1D','2A','2B','2C','2D','3A','3B','3C','3D','4A','4B','4C','4D'],
  },
  Coloracao: {
    type: String,
    enum: ['Escuro', 'Intermediário', 'Claro'],
  },
  AdicionaisCabelo: {
    type: String,
    default: null,
  },
  agendId:{
    type:String,
    default:  "##".replaceAll("#",()=>Math.floor(Date.now() * Math.random()).toString(35).substring(0,3)),
    required:false
  },
    UserId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    /*PlaceName: {
      type: String,
      required: true,
    },*/
    PlaceId:{
        type: Schema.Types.ObjectId,
        ref: 'Place',
        required: true,
       // unique: true
    },
    DayNum: {
      type:Number,
       required:true
      },
    Day: {
      type: String,
      required: false,
      // enum: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'], 
    },
   /* DayMonth: {
      type: Number,
      required: true,
      min: 1,
      max: 31, 
    },*/
    Month: {
      type: Number,
      required: true,
      min: 1,
      max: 12,
    },
    Horario: {
      type: String,
      required: true, 
    },
    done:{
      type:Boolean,
      default:false
    }
  }
)


export const Schedule = model("Schedule",scheduleSchema)

