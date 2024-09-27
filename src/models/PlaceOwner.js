import mongoose from "mongoose";
import bcrypt from "bcrypt";

const PlaceOwnerSchema = new mongoose.Schema({
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
  }
});

UserSchema.pre("save", async function (next) {
  this.senha = await bcrypt.hash(this.senha, 10);
  next();
});

const PlaceOwner = mongoose.model("User", PlaceOwnerSchema);

export default PlaceOwner;
