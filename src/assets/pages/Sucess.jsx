import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

const Success = () => {
  return (
    <Layout>
      <div className="success-container">
        <svg 
          className="success-icon"
          width="80" 
          height="80" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
        
        <h1 className="success-heading">
          Cadastro Realizado com Sucesso!
        </h1>
        
        <p className="success-message">
          Obrigado por se cadastrar no FURIA KNOW YOUR FAN. 
          Seus dados foram recebidos com sucesso.
        </p>
        
        <Link to="/" className="home-button" style={{
          backgroundColor: '#333',
          color: '#fff',
          padding: '12px 24px',
          textDecoration: 'none',
          borderRadius: '4px',
          fontWeight: '500',
          transition: 'all 0.2s'
        }}>
          Voltar para Home
        </Link>
      </div>
    </Layout>
  );
};

export default Success;