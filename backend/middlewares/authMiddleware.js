import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];

    if(!token){
        return res.status(401).json({ message: "Acesso negado: Token não fornecido"})
    }
    try{
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET || "seu_secret_key_aqui");
        req.user = decoded;
        next();
    }catch(err){
        res.status(400).json({ message: "Acesso negado: token inválido "});
    }
};

export default verifyToken;