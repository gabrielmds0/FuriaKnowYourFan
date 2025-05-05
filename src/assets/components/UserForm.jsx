import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import DocumentUpload from './DocumentUpload';
import { saveFanData } from '../services/firebase';

const UserForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleDocumentsChange = (newDocuments) => {
    setDocuments(newDocuments);
  };

  const validateCPF = (cpf) => {
    // Remove non-digits
    cpf = cpf.replace(/\D/g, '');
    
    // Check if length is 11
    if (cpf.length !== 11) return false;
    
    // Check if all digits are the same
    if (/^(\d)\1+$/.test(cpf)) return false;
    
    // Validate check digits
    let sum = 0;
    let remainder;
    
    // First check digit
    for (let i = 1; i <= 9; i++) {
      sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }
    
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf.substring(9, 10))) return false;
    
    // Second check digit
    sum = 0;
    for (let i = 1; i <= 10; i++) {
      sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }
    
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf.substring(10, 11))) return false;
    
    return true;
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setError('');
      
      // Validar CPF
      if (!validateCPF(data.cpf)) {
        setError('CPF inválido. Por favor, verifique e tente novamente.');
        setLoading(false);
        return;
      }
      
      // Verificar se há pelo menos um documento
      if (documents.length === 0) {
        setError('Por favor, faça upload de pelo menos um documento.');
        setLoading(false);
        return;
      }
      
      // Salvar dados no Firebase
      await saveFanData(data, documents);
      
      // Redirecionar para página de sucesso
      navigate('/success');
    } catch (err) {
      console.error('Erro ao enviar formulário:', err);
      setError('Ocorreu um erro ao enviar seus dados. Por favor, tente novamente.');
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="card">
        <h2 className="subheading" style={{ color: '#ffffff', marginBottom: '20px' }}>Dados Pessoais</h2>
        
        <div className="form-group">
          <label htmlFor="name">Nome Completo *</label>
          <input
            id="name"
            type="text"
            placeholder="Digite seu nome completo"
            {...register('name', { required: 'Nome é obrigatório' })}
            className={errors.name ? 'error' : ''}
          />
          {errors.name && <p className="error-message">{errors.name.message}</p>}
        </div>
        
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <div className="form-group" style={{ flex: '1', minWidth: '250px' }}>
            <label htmlFor="cpf">CPF *</label>
            <input
              id="cpf"
              type="text"
              placeholder="000.000.000-00"
              {...register('cpf', { 
                required: 'CPF é obrigatório',
                pattern: {
                  value: /^\d{3}\.\d{3}\.\d{3}-\d{2}$|^\d{11}$/,
                  message: 'Formato de CPF inválido'
                }
              })}
              className={errors.cpf ? 'error' : ''}
            />
            {errors.cpf && <p className="error-message">{errors.cpf.message}</p>}
          </div>
          
          <div className="form-group" style={{ flex: '1', minWidth: '250px' }}>
            <label htmlFor="phone">Telefone *</label>
            <input
              id="phone"
              type="tel"
              placeholder="(00) 00000-0000"
              {...register('phone', { 
                required: 'Telefone é obrigatório' 
              })}
              className={errors.phone ? 'error' : ''}
            />
            {errors.phone && <p className="error-message">{errors.phone.message}</p>}
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="email">E-mail *</label>
          <input
            id="email"
            type="email"
            placeholder="seu.email@exemplo.com"
            {...register('email', { 
              required: 'E-mail é obrigatório',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Endereço de e-mail inválido'
              }
            })}
            className={errors.email ? 'error' : ''}
          />
          {errors.email && <p className="error-message">{errors.email.message}</p>}
        </div>
      </div>
      
      <div className="card">
        <h2 className="subheading" style={{ color: '#ffffff', marginBottom: '20px' }}>Endereço</h2>
        
        <div className="form-group">
          <label htmlFor="address">Endereço Completo *</label>
          <input
            id="address"
            type="text"
            placeholder="Rua, número, complemento"
            {...register('address', { required: 'Endereço é obrigatório' })}
            className={errors.address ? 'error' : ''}
          />
          {errors.address && <p className="error-message">{errors.address.message}</p>}
        </div>
        
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <div className="form-group" style={{ flex: '1', minWidth: '250px' }}>
            <label htmlFor="zipCode">CEP *</label>
            <input
              id="zipCode"
              type="text"
              placeholder="00000-000"
              {...register('zipCode', { 
                required: 'CEP é obrigatório',
                pattern: {
                  value: /^\d{5}-?\d{3}$/,
                  message: 'Formato de CEP inválido'
                }
              })}
              className={errors.zipCode ? 'error' : ''}
            />
            {errors.zipCode && <p className="error-message">{errors.zipCode.message}</p>}
          </div>
          
          <div className="form-group" style={{ flex: '1', minWidth: '250px' }}>
            <label htmlFor="city">Cidade *</label>
            <input
              id="city"
              type="text"
              placeholder="Sua cidade"
              {...register('city', { required: 'Cidade é obrigatória' })}
              className={errors.city ? 'error' : ''}
            />
            {errors.city && <p className="error-message">{errors.city.message}</p>}
          </div>
          
          <div className="form-group" style={{ flex: '1', minWidth: '250px' }}>
            <label htmlFor="state">Estado *</label>
            <input
              id="state"
              type="text"
              placeholder="Seu estado"
              {...register('state', { required: 'Estado é obrigatório' })}
              className={errors.state ? 'error' : ''}
            />
            {errors.state && <p className="error-message">{errors.state.message}</p>}
          </div>
        </div>
      </div>
      
      <div className="card">
        <h2 className="subheading" style={{ color: '#ffffff', marginBottom: '20px' }}>Interesses e Atividades</h2>
        
        <div className="form-group">
          <label>Interesses relacionados à FURIA</label>
          <div style={{ 
            backgroundColor: 'rgba(255, 255, 255, 0.05)', 
            borderRadius: '4px', 
            border: '1px solid var(--border-color)',
            padding: '16px',
            marginBottom: '16px'
          }}>
            <div style={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              gap: '16px' 
            }}>
              {[
                'CS:GO', 
                'Valorant', 
                'League of Legends', 
                'Apex Legends', 
                'Rainbow Six', 
                'Merchandise', 
                'Eventos Presenciais'
              ].map((interest) => (
                <label key={interest} style={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  gap: '10px',
                  cursor: 'pointer',
                  padding: '10px 16px',
                  backgroundColor: 'rgba(0, 0, 0, 0.2)',
                  borderRadius: '4px',
                  marginBottom: '0',
                  transition: 'background-color 0.2s ease',
                  border: '1px solid transparent',
                  width: 'calc(50% - 8px)',
                  maxWidth: '220px'
                }}>
                  <input
                    type="checkbox"
                    id={`interest-${interest.toLowerCase().replace(/\s+/g, '_')}`}
                    value={interest.toLowerCase().replace(/\s+/g, '_')}
                    {...register('interests')}
                    style={{ 
                      margin: '0', 
                      width: '20px', 
                      height: '20px', 
                      cursor: 'pointer'
                    }}
                  />
                  <span style={{ fontSize: '15px' }}>{interest}</span>
                </label>
              ))}
            </div>
            <p style={{ 
              marginTop: '16px', 
              fontSize: '14px', 
              color: '#999',
              fontStyle: 'italic' 
            }}>
              Selecione todos os interesses que se aplicam
            </p>
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="activities">Atividades do último ano</label>
          <textarea
            id="activities"
            rows="4"
            placeholder="Descreva suas atividades relacionadas à FURIA no último ano (eventos que participou, compras realizadas, etc)"
            {...register('activities')}
          ></textarea>
        </div>
      </div>
      
      <div className="card">
        <h2 className="subheading" style={{ color: '#ffffff', marginBottom: '20px' }}>Documentos</h2>
        <DocumentUpload onDocumentsChange={handleDocumentsChange} />
      </div>
      
      {error && (
        <div style={{ 
          backgroundColor: 'rgba(160, 160, 160, 0.1)', 
          borderRadius: '4px',
          padding: '16px',
          marginBottom: '24px',
          border: '1px solid #888'
        }}>
          <p className="error-message" style={{ margin: 0 }}>{error}</p>
        </div>
      )}
      
      <button 
        type="submit" 
        disabled={loading}
        style={{ 
          width: '100%', 
          padding: '16px',
          marginTop: '20px',
          fontSize: '18px',
          backgroundColor: '#333',
          transition: 'all 0.3s ease'
        }}
      >
        {loading ? 'Enviando...' : 'Enviar Cadastro'}
      </button>
    </form>
  );
};

export default UserForm;