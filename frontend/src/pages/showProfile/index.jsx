import React, {useEffect, useState } from "react";
import axios from "axios";

function Profile() {
    const [user, setUser] = useState(null);
    const [erro, setErro] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("token");
        console.log("Token no localStorage:", token);
        
        if(!token){
            setErro("Atenção. Você precisa estar logado.");
            return;
        }

        console.log("Fazendo requisição para /api/user/profile");
        axios.get("/api/user/profile", {
            headers: { Authorization: `Bearer ${token}`},
        })
        .then((res) => {
            console.log("Resposta do perfil:", res.data);
            setUser(res.data);
        })
        .catch((err) => {
            console.error("Erro na requisição do perfil:", err);
            setErro("Erro ao carregar perfil: " + (err.response?.data?.error || err.message));
        });
    }, []);

    if(erro) return<p>{erro}</p>;
    if(!user) return <p>Loading...</p>

    return(
        <div>
            <h2>Perfil do Usuário</h2>
            <p><b>Nome:</b> {user.nome}</p>
            <p><b>Email:</b> {user.email}</p>
        </div>
    );
}

export default Profile;