import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

const Home = () => {
  return (
    <Layout>
      <div style={{ 
        textAlign: 'center', 
        marginTop: '60px',
        marginBottom: '60px'
      }}>
        <h1 style={{ 
          fontSize: '42px', 
          marginBottom: '24px',
          fontWeight: '700',
          letterSpacing: '-0.5px'
        }}>
          FURIA KNOW YOUR FAN
        </h1>
        
        <p style={{ 
          fontSize: '20px', 
          maxWidth: '700px', 
          margin: '0 auto 40px',
          color: '#b3b3b3',
          lineHeight: '1.6'
        }}>
          Ajude-nos a conhecer melhor nossos fãs. Cadastre-se e compartilhe sua paixão pela FURIA.
        </p>
        
        <Link 
          to="/register" 
          style={{
            display: 'inline-block',
            backgroundColor: '#333',
            color: '#fff',
            padding: '16px 32px',
            fontSize: '18px',
            textDecoration: 'none',
            borderRadius: '4px',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-3px)';
            e.currentTarget.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.15)';
            e.currentTarget.style.backgroundColor = '#444';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
            e.currentTarget.style.backgroundColor = '#333';
          }}
        >
          Cadastrar Agora
        </Link>
      </div>
      
      <div style={{ 
        display: 'flex', 
        flexWrap: 'wrap',
        justifyContent: 'space-between', 
        gap: '24px',
        marginTop: '60px'
      }}>
        <div className="card" style={{ 
          flex: '1 0 calc(33.333% - 24px)',
          minWidth: '280px'
        }}>
          <h2 className="subheading" style={{ 
            color: '#ffffff',
            fontSize: '22px',
            marginBottom: '16px'
          }}>
            Por que se cadastrar?
          </h2>
          <p>
            Ao se cadastrar, você nos ajuda a criar experiências personalizadas para nossos fãs.
            Queremos oferecer conteúdo e eventos que atendam aos seus interesses.
          </p>
        </div>
        
        <div className="card" style={{ 
          flex: '1 0 calc(33.333% - 24px)',
          minWidth: '280px'
        }}>
          <h2 className="subheading" style={{ 
            color: '#ffffff',
            fontSize: '22px',
            marginBottom: '16px'
          }}>
            O que coletamos?
          </h2>
          <p>
            Coletamos informações básicas como nome e endereço, além de informações sobre seus
            interesses, atividades relacionadas à FURIA, eventos que participou e compras.
          </p>
        </div>
        
        <div className="card" style={{ 
          flex: '1 0 calc(33.333% - 24px)',
          minWidth: '280px'
        }}>
          <h2 className="subheading" style={{ 
            color: '#ffffff',
            fontSize: '22px',
            marginBottom: '16px'
          }}>
            Privacidade
          </h2>
          <p>
            Seus dados são tratados com segurança e usados apenas para melhorar sua experiência
            como fã da FURIA. Não compartilhamos seus dados com terceiros sem seu consentimento.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Home;