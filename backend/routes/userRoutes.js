import express from "express";
import { registerUser, loginUser } from "../controller/userController.js";
import verifyToken from "../middlewares/authMiddleware.js";
import user from "../models/user.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

// Rota de teste para verificar se o servidor está funcionando
router.get("/test", (req, res) => {
    res.status(200).json({ message: "API funcionando corretamente" });
});

router.get("/profile", verifyToken, async (req, res) => {
    try {
        console.log("Requisição de perfil recebida");
        console.log("User ID do token:", req.user.id);
        
        const userData = await user.findById(req.user.id.toString()).select('-password');
        console.log("Dados do usuário encontrados:", userData);
        
        if (!userData) {
            console.log("Usuário não encontrado no banco");
            return res.status(404).json({ error: "Usuário não encontrado" });
        }
        
        const responseData = {
            nome: userData.name,
            email: userData.email
        };
        
        console.log("Enviando resposta:", responseData);
        res.status(200).json(responseData);
    } catch (err) {
        console.error("Erro no endpoint de profile:", err);
        res.status(500).json({ error: "Erro ao buscar perfil do usuário: " + err.message });
    }
});

export default router;