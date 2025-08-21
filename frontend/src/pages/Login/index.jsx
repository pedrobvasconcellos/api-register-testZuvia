import React, { useState } from "react";
import axios from "axios";

function Login(){
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [mensagem, setMensagem] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            console.log("Tentando fazer login com:", { email, senha });
            const res = await axios.post("/api/user/login", { email, senha });
            const token = res.data.token;

            localStorage.setItem("token", token);
            setMensagem("Login realizado com sucesso!");
            console.log("Token recebido:", res.data.token);
            console.log("Token salvo no localStorage:", localStorage.getItem("token"));
        } catch (err){
            console.error("Erro no login:", err);
            setMensagem("Erro ao logar: " + err.response?.data?.error || err.message);
        }
    };

    return(
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <br />
                <input 
                    type="password"
                    placeholder="Senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                />
                <br />
                <button type="submit">Entrar</button>
            </form>
            {mensagem && <p>{mensagem}</p>}
        </div>
    );
}

export default Login;