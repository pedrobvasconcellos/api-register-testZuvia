import React, {useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import TestConnection from "../../components/TestConnection";

function Profile() {
    const [user, setUser] = useState(null);
    const [erro, setErro] = useState("");
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        if (!isAuthenticated) {
            setErro("Atenção. Você precisa estar logado.");
            return;
        }

        const token = localStorage.getItem("token");
        
        if (!token) {
            setErro("Token não encontrado no localStorage");
            return;
        }
        
        axios.get("/api/user/profile", {
            headers: { 
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        })
        .then((res) => {
            setUser(res.data);
        })
        .catch((err) => {
            setErro("Erro ao carregar perfil: " + (err.response?.data?.error || err.message));
        });
    }, [isAuthenticated]);

    if(erro) return (
        <div style={{
            maxWidth: '400px',
            margin: '0 auto',
            padding: '2rem',
            textAlign: 'center',
            color: '#721c24',
            backgroundColor: '#f8d7da',
            border: '1px solid #f5c6cb',
            borderRadius: '8px'
        }}>
            {erro}
        </div>
    );
    
    if(!user) return (
        <div style={{
            maxWidth: '400px',
            margin: '0 auto',
            padding: '2rem',
            textAlign: 'center'
        }}>
            <p>Carregando...</p>
        </div>
    );

    return(
        <div>
            <div style={{
                maxWidth: '500px',
                margin: '0 auto',
                padding: '2rem',
                border: '1px solid #ddd',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
                <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: '#333' }}>Perfil do Usuário</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{
                        padding: '1rem',
                        backgroundColor: '#f8f9fa',
                        borderRadius: '4px',
                        border: '1px solid #dee2e6'
                    }}>
                        <strong>Nome:</strong> {user.nome}
                    </div>
                    <div style={{
                        padding: '1rem',
                        backgroundColor: '#f8f9fa',
                        borderRadius: '4px',
                        border: '1px solid #dee2e6'
                    }}>
                        <strong>Email:</strong> {user.email}
                    </div>
                    <div style={{
                        padding: '1rem',
                        backgroundColor: '#e9ecef',
                        borderRadius: '4px',
                        border: '1px solid #dee2e6',
                        fontSize: '0.9rem',
                        color: '#666'
                    }}>
                        <strong>Token:</strong> {localStorage.getItem("token")?.substring(0, 20)}...
                    </div>
                </div>
            </div>
            
            <TestConnection />
        </div>
    );
}

export default Profile;