import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    console.log("Middleware de autenticação executado");
    console.log("Headers recebidos:", req.headers);
    
    const authHeader = req.headers['authorization'];
    console.log("Authorization header:", authHeader);
    
    const token = authHeader && authHeader.split(" ")[1];
    console.log("Token extraído:", token);

    if(!token){
        console.log("Token não fornecido");
        return res.status(401).json({ message: "Acesso negado: Token não fornecido"})
    }
    try{
        console.log("Verificando token...");
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET || "secret_key");
        console.log("Token decodificado:", decoded);
        req.user = decoded;
        next();
    }catch(err){
        console.error("Erro ao verificar token:", err);
        res.status(400).json({ message: "Acesso negado: token inválido "});
    }
};

export default verifyToken;