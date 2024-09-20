import mongoose from "mongoose";

const connectDatabase = () => {

  mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB Atlas Está Conectado!"))
  .catch((err) => console.log(`Encontramos um erro ao conectar com o MongoDB Atlas. Identificação: ${err}`));
};

export default connectDatabase;
