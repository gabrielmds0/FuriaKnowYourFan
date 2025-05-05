import React, { useState } from 'react';

const DocumentUpload = ({ onDocumentsChange }) => {
  const [documents, setDocuments] = useState([]);
  const [error, setError] = useState('');
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    validateAndAddFiles(files);
  };

  const validateAndAddFiles = (files) => {
    // Verificar o tamanho dos arquivos (limite de 5MB por arquivo)
    const oversizedFiles = files.filter(file => file.size > 5 * 1024 * 1024);
    
    if (oversizedFiles.length > 0) {
      setError('Alguns arquivos excedem o limite de 5MB.');
      return;
    }
    
    // Verificar extensões permitidas
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
    const invalidFiles = files.filter(file => !allowedTypes.includes(file.type));
    
    if (invalidFiles.length > 0) {
      setError('Alguns arquivos não são suportados. Use apenas PDF, JPEG ou PNG.');
      return;
    }
    
    // Se estiver tudo certo, adiciona os documentos
    const newDocs = [...documents, ...files];
    setDocuments(newDocs);
    onDocumentsChange(newDocs);
    setError('');
  };

  const removeDocument = (index) => {
    const updatedDocs = [...documents];
    updatedDocs.splice(index, 1);
    setDocuments(updatedDocs);
    onDocumentsChange(updatedDocs);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateAndAddFiles(Array.from(e.dataTransfer.files));
    }
  };

  const getFileIcon = (type) => {
    if (type === 'application/pdf') {
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="16" y1="13" x2="8" y2="13"></line>
          <line x1="16" y1="17" x2="8" y2="17"></line>
          <line x1="10" y1="9" x2="8" y2="9"></line>
        </svg>
      );
    } else {
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          <circle cx="8.5" cy="8.5" r="1.5"></circle>
          <polyline points="21 15 16 10 5 21"></polyline>
        </svg>
      );
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    else if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  };

  return (
    <div className="form-group">
      <label>Upload de Documentos *</label>
      
      <div 
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        style={{
          border: `2px dashed ${dragActive ? '#888' : '#444'}`,
          borderRadius: '8px',
          padding: '30px 20px',
          textAlign: 'center',
          backgroundColor: dragActive ? 'rgba(200, 200, 200, 0.05)' : 'rgba(255, 255, 255, 0.02)',
          transition: 'all 0.3s ease',
          marginBottom: '20px',
          cursor: 'pointer'
        }}
        onClick={() => document.getElementById('file-upload').click()}
      >
        <svg 
          width="48" 
          height="48" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          style={{ 
            margin: '0 auto 16px',
            color: dragActive ? '#ffffff' : '#666',
            transition: 'color 0.3s ease'
          }}
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
          <polyline points="17 8 12 3 7 8"></polyline>
          <line x1="12" y1="3" x2="12" y2="15"></line>
        </svg>
        
        <p style={{ marginBottom: '8px', color: '#b3b3b3' }}>
          Arraste e solte arquivos aqui ou clique para selecionar
        </p>
        <p style={{ fontSize: '14px', color: '#666' }}>
          Formatos aceitos: PDF, JPEG, PNG (máx. 5MB por arquivo)
        </p>
        
        <input
          type="file"
          id="file-upload"
          multiple
          onChange={handleFileChange}
          accept=".pdf,.jpg,.jpeg,.png"
          style={{ display: 'none' }}
        />
      </div>
      
      {error && <p className="error-message">{error}</p>}
      
      {documents.length > 0 && (
        <div>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '12px',
            borderBottom: '1px solid #333',
            paddingBottom: '8px'
          }}>
            <p style={{ fontWeight: '500' }}>
              Documentos selecionados ({documents.length})
            </p>
          </div>
          
          <ul style={{ 
            listStyle: 'none', 
            margin: 0, 
            padding: 0 
          }}>
            {documents.map((doc, index) => (
              <li key={index} style={{ 
                marginBottom: '12px',
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                borderRadius: '4px',
                padding: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ color: '#999' }}>
                    {getFileIcon(doc.type)}
                  </div>
                  <div>
                    <p style={{ margin: 0, fontWeight: '500' }}>{doc.name}</p>
                    <p style={{ margin: '4px 0 0 0', fontSize: '14px', color: '#999' }}>
                      {formatFileSize(doc.size)}
                    </p>
                  </div>
                </div>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    removeDocument(index);
                  }}
                  style={{
                    backgroundColor: 'transparent',
                    color: '#aaa',
                    border: 'none',
                    padding: '8px',
                    cursor: 'pointer',
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  title="Remover documento"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DocumentUpload;