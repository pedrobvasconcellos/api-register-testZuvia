import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import router from "./routes/userRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/api")
    .then(() => console.log("MongoDB Conectado"))
    .catch(err => console.log("Erro ao conectar MongoDB: ", err));

    app.use("/api/user", router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor Funcionando na porta ${PORT}`));
