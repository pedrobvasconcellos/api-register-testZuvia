import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";

function Login(){
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [mensagem, setMensagem] = useState("");
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            console.log("Tentando fazer login com:", { email, senha });
            const res = await axios.post("/api/user/login", { email, senha });
            const token = res.data.token;

            console.log("Dados completos da resposta:", res.data);
            login(token, res.data.user);
            setMensagem("Login realizado com sucesso!");
            console.log("Token recebido:", res.data.token);
            console.log("Token salvo no localStorage:", localStorage.getItem("token"));
            console.log("Dados do usuário:", res.data.user);
            
            setTimeout(() => {
                navigate('/profile');
            }, 1000);
        } catch (err){
            console.error("Erro no login:", err);
            setMensagem("Erro ao logar: " + err.response?.data?.error || err.message);
        }
    };

    return(
        <div style={{
            maxWidth: '400px',
            margin: '0 auto',
            padding: '2rem',
            border: '1px solid #ddd',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
            <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: '#333' }}>Login</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <input 
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                        padding: '0.75rem',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        fontSize: '1rem'
                    }}
                />
                <input 
                    type="password"
                    placeholder="Senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    style={{
                        padding: '0.75rem',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        fontSize: '1rem'
                    }}
                />
                <button 
                    type="submit"
                    style={{
                        padding: '0.75rem',
                        backgroundColor: '#007bff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        fontSize: '1rem',
                        cursor: 'pointer'
                    }}
                >
                    Entrar
                </button>
            </form>
            {mensagem && (
                <p style={{
                    marginTop: '1rem',
                    padding: '0.75rem',
                    borderRadius: '4px',
                    backgroundColor: mensagem.includes('sucesso') ? '#d4edda' : '#f8d7da',
                    color: mensagem.includes('sucesso') ? '#155724' : '#721c24',
                    textAlign: 'center'
                }}>
                    {mensagem}
                </p>
            )}
        </div>
    );
}

export default Login;