import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  senha: {
    type: String,
    required: true,
    select: false,
  },
  Telefone: {
    type: String,
    required: false,
    default: null,
  },
  tipoCabelo:{
    type:String,
    required:true,
    enum: ['A1', 'A2', 'A3', 'B1', 'B2', 'B3', 'C1', 'C2', 'C3'],
  },
  Coloração:{
    type:String,
    required:true,
    enum: ['Escuro', 'Intermediário', 'Claro'],
  },
  AdicionaisCabelo:{
    type:String,
    required: false,
    default: null,
  },
  schedule: [
    {
      idSchedule: {
        type: String,
        required: true,
      },
      PlaceName: {
        type: String,
        required: true,
      },
      Day: {
        type: String,
        required: true,
        enum: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'], 
      },
      DayMonth: {
        type: Number,
        required: true,
        min: 1,
        max: 31, 
      },
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
    },
  ],
  default: [],
});

UserSchema.pre("save", async function (next) {
  this.senha = await bcrypt.hash(this.senha, 10);
  next();
});

const User = mongoose.model("User", UserSchema);

export default User;
