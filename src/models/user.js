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
  tipoCabelo: {
    type: String,
    //required:true,
    enum: ['1A','1B','1C','1D','2A','2B','2C','2D','3A','3B','3C','3D','4A','4B','4C','4D'],
  },
  Coloracao: {
    type: String,
    // required:true,
    enum: ['Escuro', 'Intermediário', 'Claro'],
  },
  AdicionaisCabelo: {
    type: String,
    //required: false,
    default: null,
  },

  verified: { type: Boolean, default: false }
}, { versionKey: false });

UserSchema.pre("save", async function (next) {
  this.senha = await bcrypt.hash(this.senha, 10);
  next();
});

const User = mongoose.model("User", UserSchema);

export default User;
