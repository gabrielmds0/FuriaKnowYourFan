import React from 'react';
import Header from './Header';

const Layout = ({ children }) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh'
    }}>
      <Header />
      <main className="container" style={{
        flex: '1 0 auto',
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px'
      }}>
        {children}
      </main>
      <footer style={{
        backgroundColor: '#000',
        color: '#fff',
        padding: '30px 0',
        marginTop: '50px',
        textAlign: 'center',
        width: '100%'
      }}>
        <div className="container" style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 20px'
        }}>
          <p style={{ 
            fontSize: '14px',
            color: '#b3b3b3' 
          }}>
            © {new Date().getFullYear()} FURIA KNOW YOUR FAN. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;