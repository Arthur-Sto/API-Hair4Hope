import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { Schema } from "mongoose";

const ONGrepSchema = new mongoose.Schema({
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
    required: true,
    default: null,
  },
  ongname: {
    type: String,
    required: true,
  },
  ongId: {
    type: Schema.Types.ObjectId,
    ref: "ong",
    required: true,
  },
  verified:{type:Boolean,default:false},
  pass_acesso:{type:String, required:false}
});

ONGrepSchema.pre("save", async function (next) {
  this.email = this.email.toLowerCase()
  this.senha = await bcrypt.hash(this.senha, 10);
  next();
});

const ONGrep = mongoose.model("ONGrep", ONGrepSchema);

export default ONGrep;
