import React, { useState } from 'react';
import axios from 'axios';

const TestConnection = () => {
  const [testResult, setTestResult] = useState('');
  const [loading, setLoading] = useState(false);

  const testAPI = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/user/test');
      setTestResult(`Sucesso: ${response.data.message}`);
    } catch (error) {
      setTestResult(`Erro: ${error.message}`);
    }
    setLoading(false);
  };

  const testToken = async () => {
    setLoading(true);
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get('/api/user/profile', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTestResult(`Token válido: ${JSON.stringify(response.data)}`);
    } catch (error) {
      setTestResult(`Token inválido: ${error.response?.data?.message || error.message}`);
    }
    setLoading(false);
  };

  return (
    <div style={{
      maxWidth: '600px',
      margin: '2rem auto',
      padding: '2rem',
      border: '1px solid #ddd',
      borderRadius: '8px',
      backgroundColor: '#f8f9fa'
    }}>
      <h3>Teste de Conexão</h3>
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        <button 
          onClick={testAPI}
          disabled={loading}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          Testar API
        </button>
        <button 
          onClick={testToken}
          disabled={loading}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          Testar Token
        </button>
      </div>
      {testResult && (
        <div style={{
          padding: '1rem',
          backgroundColor: testResult.includes('✅') ? '#d4edda' : '#f8d7da',
          color: testResult.includes('✅') ? '#155724' : '#721c24',
          borderRadius: '4px',
          border: `1px solid ${testResult.includes('✅') ? '#c3e6cb' : '#f5c6cb'}`
        }}>
          {testResult}
        </div>
      )}
      <div style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#666' }}>
        <p><strong>Token atual:</strong> {localStorage.getItem('token')?.substring(0, 30)}...</p>
      </div>
    </div>
  );
};

export default TestConnection;
