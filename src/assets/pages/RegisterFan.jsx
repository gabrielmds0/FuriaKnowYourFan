import React from 'react';
import Layout from '../components/Layout';
import UserForm from '../components/UserForm';

const RegisterFan = () => {
  return (
    <Layout>
      <div style={{ 
        maxWidth: '800px', 
        margin: '0 auto',
        animation: 'fadeIn 0.5s ease-in-out'
      }}>
        <h1 className="heading" style={{
          fontSize: '32px',
          marginBottom: '16px',
          textAlign: 'center'
        }}>
          Cadastro de Fã
        </h1>
        
        <p style={{ 
          marginBottom: '30px',
          textAlign: 'center',
          color: '#b3b3b3',
          fontSize: '18px'
        }}>
          Preencha o formulário abaixo com seus dados. Os campos marcados com * são obrigatórios.
        </p>
        
        <UserForm />
        
        <div style={{ 
          marginTop: '30px',
          padding: '16px',
          backgroundColor: 'rgba(255, 255, 255, 0.03)',
          borderRadius: '8px',
          fontSize: '14px',
          color: '#999',
          textAlign: 'center'
        }}>
          <p>
            Ao enviar este formulário, você concorda com os termos de uso e política de privacidade da FURIA.
          </p>
          <p style={{ marginTop: '8px' }}>
            Seus dados serão tratados com segurança e utilizados apenas para melhorar sua experiência como fã.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default RegisterFan;