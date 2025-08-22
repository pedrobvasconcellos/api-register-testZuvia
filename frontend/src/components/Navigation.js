import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navigation = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={{
      background: '#f8f9fa',
      padding: '1rem',
      marginBottom: '2rem',
      borderBottom: '1px solid #dee2e6'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div>
          <Link to="/" style={{
            textDecoration: 'none',
            color: '#333',
            fontSize: '1.5rem',
            fontWeight: 'bold'
          }}>
            Sistema de Usuários
          </Link>
        </div>
        
        <div style={{ display: 'flex', gap: '1rem' }}>
          {!isAuthenticated ? (
            <>
              <Link to="/register" style={{
                textDecoration: 'none',
                color: '#007bff',
                padding: '0.5rem 1rem',
                border: '1px solid #007bff',
                borderRadius: '4px'
              }}>
                Cadastrar
              </Link>
              <Link to="/login" style={{
                textDecoration: 'none',
                color: '#fff',
                padding: '0.5rem 1rem',
                backgroundColor: '#007bff',
                borderRadius: '4px'
              }}>
                Login
              </Link>
            </>
          ) : (
            <>
              <Link to="/profile" style={{
                textDecoration: 'none',
                color: '#007bff',
                padding: '0.5rem 1rem',
                border: '1px solid #007bff',
                borderRadius: '4px'
              }}>
                Meu Perfil
              </Link>
              <button
                onClick={handleLogout}
                style={{
                  background: 'none',
                  border: '1px solid #dc3545',
                  color: '#dc3545',
                  padding: '0.5rem 1rem',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Sair
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
