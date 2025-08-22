import express from "express";
import { registerUser, loginUser } from "../controller/userController.js";
import verifyToken from "../middlewares/authMiddleware.js";
import user from "../models/user.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/test", (req, res) => {
    res.status(200).json({ message: "API funcionando corretamente" });
});

router.get("/profile", verifyToken, async (req, res) => {
    try {
        
        const userData = await user.findById(req.user.id.toString()).select('-password');
        
        if (!userData) {
            console.log("Usuário não encontrado no banco");
            return res.status(404).json({ error: "Usuário não encontrado" });
        }
        
        const responseData = {
            nome: userData.name,
            email: userData.email
        };
        res.status(200).json(responseData);
    } catch (err) {
        res.status(500).json({ error: "Erro ao buscar perfil do usuário: " + err.message });
    }
});

export default router;