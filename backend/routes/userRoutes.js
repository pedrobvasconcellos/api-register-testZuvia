import express from "express";
import bcrypt from "bcryptjs";
import user from "../models/user.js";

const router = express.Router();

router.post("/register", async (req, res) => {
    try{
        const {name, email, password} = req.body;

        const userExis = await user.findOne({ email });
        if(userExis){
            return res.status(400).json({ msg: "Usuário já existe"});
        }
        
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new user({
            name,
            email,
            password: passwordHash
        });

        await newUser.save();

        res.status(201).json({ msg: "Novo usuário registrado"});
    }catch(err){
        res.status(500).json({ msg: "Erro ao registrar usuário"});
    }
});

export default router;