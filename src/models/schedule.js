import { model, Schema, SchemaType } from "mongoose"


const scheduleSchema = new Schema({
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
        unique: true
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
  }
)


export const Schedule = model("Schedule",scheduleSchema)

