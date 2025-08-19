import express from "express";
import { registerUser, loginUser } from "../controller/userController.js";
import verifyToken from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/profile", verifyToken, (req, res) => {
    res.status(200).json({
        message: "Acesso permitido!",
        user: req.user
    });
});

export default router;