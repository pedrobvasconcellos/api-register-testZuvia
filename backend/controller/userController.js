import bcrypt from "bcryptjs";
import user from "../models/user.js";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
    try {
        const { nome, email, senha } = req.body;

        if (!nome || !email || !senha) {
            return res.status(400).json({ error: "Todos os campos são obrigatórios" });
        }

        const userExis = await user.findOne({ email });
        if (userExis) {
            return res.status(400).json({ error: "Usuário já existe" });
        }

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(senha, salt);

        const newUser = new user({
            name: nome,
            email,
            password: passwordHash
        });

        await newUser.save();
        console.log("Usuário registrado com sucesso:", newUser.email);

        res.status(201).json({ msg: "Novo usuário registrado" });
    } catch (err) {
        console.error("Erro no registro:", err);
        res.status(500).json({ error: "Erro ao registrar usuário: " + err.message });
    }
};

export const loginUser = async (req, res) => {
    try{
        const { email, senha } = req.body;

        if(!email || !senha)
        {
            res.status(422).json({error:"O e-mail e senha são obrigatórios"});
            return;
        }
        const userExist = await user.findOne({email:email});
        if(!userExist)
        {
            return res.status(422).json({error: "Usuário não encontrado"});
        }

        const checkPassword = await bcrypt.compare(senha, userExist.password);
        if(!checkPassword)
        {
            return res.status(422).json({error:"Credenciais inválidas"});
        }

        const token = jwt.sign(
            { id: userExist._id },
            process.env.TOKEN_SECRET || "secret_key",
            { expiresIn: "1h" }
        );

        res.status(200).json({ message: "Login realizado com sucesso", token: token});

    }catch(err){
        console.error("Erro no login:", err);
        res.status(500).json({ error: "Erro ao realizar login" });
    }
};