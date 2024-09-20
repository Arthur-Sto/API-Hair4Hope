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
    unique: false,
  },
  Informacoes: {
    type: String,
    required: false,
    default: null,
  },
  tipoCabelo:{
    type:String,
    required:false,
  }
});

UserSchema.pre("save", async function (next) {
  this.senha = await bcrypt.hash(this.senha, 10);
  next();
});

const User = mongoose.model("User", UserSchema);

export default User;
