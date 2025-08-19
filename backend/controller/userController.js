import bcrypt from "bcryptjs";
import user from "../models/user.js";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const userExis = await user.findOne({ email });
        if (userExis) {
            return res.status(400).json({ msg: "Usuário já existe" });
        }

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new user({
            name,
            email,
            password: passwordHash
        });

        await newUser.save();

        res.status(201).json({ msg: "Novo usuário registrado" });
    } catch (err) {
        res.status(500).json({ msg: "Erro ao registrar usuário" });
    }
};

export const loginUser = async (req, res) => {
    try{
        const { email, password } = req.body;

        if(!email || !password)
        {
            res.status(422).json({message:"O e-mail e senha são obrigatórios"});
            return;
        }
        const userExist = await user.findOne({email:email});
        if(!userExist)
        {
            return res.status(422).json({message: "Usuário não encontrado"});
        }

        const checkPassword = await bcrypt.compare(password, userExist.password);
        if(!checkPassword)
        {
            return res.status(422).json({message:"Credenciais inválidas"});
        }

        const token = jwt.sign(
            { id: userExist._id },
            process.env.TOKEN_SECRET,
            { expiresIn: "1h" }
        );

        res.status(200).json({ message: "Login realizado com sucesso", token: token});

    }catch(err){
        res.status(500).json({ message: "Erro ao realizar login" });
    }
};