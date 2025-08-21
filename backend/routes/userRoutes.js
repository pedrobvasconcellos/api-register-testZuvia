import express from "express";
import { registerUser, loginUser } from "../controller/userController.js";
import verifyToken from "../middlewares/authMiddleware.js";
import user from "../models/user.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/profile", verifyToken, async (req, res) => {
    try {
        const userData = await user.findById(req.user.id).select('-password');
        if (!userData) {
            return res.status(404).json({ error: "Usuário não encontrado" });
        }
        res.status(200).json({
            nome: userData.name,
            email: userData.email
        });
    } catch (err) {
        res.status(500).json({ error: "Erro ao buscar perfil do usuário: " + err.message });
    }
});

export default router;