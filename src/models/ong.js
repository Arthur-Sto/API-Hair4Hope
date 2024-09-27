import { Schema,model } from "mongoose";


const ONGSchema = new Schema({
    Nome: {
        type: String,
        required: true,
      },
    Desc:{
        type:String,
        required: true
    }
})


export const ONG = model("Place",ONGSchema)

