import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div style={{
      maxWidth: '800px',
      margin: '0 auto',
      padding: '2rem',
      textAlign: 'center'
    }}>
      <h1>Bem-vindo ao Sistema de Usuários</h1>
      <p style={{ fontSize: '1.2rem', marginBottom: '2rem', color: '#666' }}>
        Faça login ou cadastre-se para acessar seu perfil
      </p>
      
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
        <Link to="/register" style={{
          textDecoration: 'none',
          color: '#fff',
          backgroundColor: '#28a745',
          padding: '1rem 2rem',
          borderRadius: '8px',
          fontSize: '1.1rem'
        }}>
          Cadastrar
        </Link>
        <Link to="/login" style={{
          textDecoration: 'none',
          color: '#fff',
          backgroundColor: '#007bff',
          padding: '1rem 2rem',
          borderRadius: '8px',
          fontSize: '1.1rem'
        }}>
          Fazer Login
        </Link>
      </div>
    </div>
  );
}

export default Home;
