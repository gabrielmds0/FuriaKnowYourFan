import React from 'react';
import { Link } from 'react-router-dom';
// Importe a logo
import furiaLogo from '../../assets/logo.png'; // Ajuste o caminho conforme sua estrutura de pastas

const Header = () => {
  return (
    <header style={{
      backgroundColor: '#000',
      color: '#fff',
      padding: '20px 0',
      marginBottom: '30px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
    }}>
      <div className="container" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px'
      }}>
        <Link to="/" style={{ 
          textDecoration: 'none', 
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          gap: '15px'
        }}>
          <img 
            src={furiaLogo} 
            alt="Logo Furia" 
            style={{
              height: '40px',
              width: 'auto',
              objectFit: 'contain'
            }}
          />
          <h1 style={{ 
            fontSize: '24px', 
            fontWeight: 'bold',
            letterSpacing: '1px'
          }}>
            
          </h1>
        </Link>
        <nav>
          <ul style={{ 
            display: 'flex', 
            listStyle: 'none',
            gap: '30px'
          }}>
            <li>
              <Link to="/" style={{ 
                color: '#fff', 
                textDecoration: 'none',
                fontWeight: '500',
                fontSize: '16px',
                padding: '8px 0',
                position: 'relative',
                transition: 'color 0.3s'
              }}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/register" style={{ 
                color: '#fff', 
                textDecoration: 'none',
                fontWeight: '500',
                fontSize: '16px',
                padding: '8px 0',
                position: 'relative',
                transition: 'color 0.3s'
              }}>
                Cadastrar
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;