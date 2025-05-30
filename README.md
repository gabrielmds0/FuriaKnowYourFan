# FURIA Know Your Fan

![Logo Furia](./src/assets/images/furia.png)

Um sistema web minimalista para coleta de dados de fãs do time FURIA, desenvolvido com React e Firebase.

## 📋 Visão Geral

O FURIA Know Your Fan é uma aplicação web que permite à equipe FURIA coletar informações sobre seus fãs, incluindo dados pessoais, interesses, atividades e documentos. A plataforma é construída com uma estética minimalista em preto e branco, seguindo a identidade visual da FURIA.

## ✨ Funcionalidades

- Formulário para coleta de dados pessoais
- Sistema de seleção de interesses relacionados à FURIA
- Upload de documentos com suporte a drag-and-drop
- Validação de dados em tempo real (CPF, email, etc.)
- Integração com Firebase para armazenamento de dados
- Layout responsivo e minimalista

## 🚀 Tecnologias Utilizadas

- **React**: Biblioteca para construção da interface do usuário
- **Vite**: Ferramenta de build rápida para o desenvolvimento
- **React Router**: Navegação entre páginas
- **React Hook Form**: Gerenciamento e validação de formulários
- **Firebase**: Armazenamento de dados e documentos (Firestore e Storage)
- **CSS-in-JS**: Estilização de componentes

## 📦 Estrutura do Projeto

```
src/
  ├── assets/
  │   ├── components/
  │   │   ├── DocumentUpload.jsx  # Componente de upload de arquivos
  │   │   ├── Header.jsx          # Cabeçalho da aplicação
  │   │   ├── Layout.jsx          # Layout padrão das páginas
  │   │   └── UserForm.jsx        # Formulário principal
  │   ├── images/
  │   │   └── furia.png           # Logo da FURIA
  │   ├── pages/
  │   │   ├── Home.jsx            # Página inicial
  │   │   ├── RegisterFan.jsx     # Página de cadastro
  │   │   └── Sucess.jsx          # Página de confirmação de cadastro
  │   └── services/
  │       └── firebase.js         # Configuração e funções do Firebase
  ├── App.css                     # Estilos específicos da aplicação
  ├── App.jsx                     # Componente principal da aplicação
  ├── index.css                   # Estilos globais
  └── main.jsx                    # Ponto de entrada da aplicação
```

## 🔧 Instalação e Configuração

### Pré-requisitos

- Node.js 16+ e npm
- Conta no Firebase e projeto configurado

### Etapas de Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/furia-know-your-fan.git
   cd furia-know-your-fan
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure o Firebase:
   - Crie um projeto no [Firebase Console](https://console.firebase.google.com/)
   - Ative o Firestore e o Storage
   - Copie as configurações do seu projeto para `src/assets/services/firebase.js`

4. Configure as regras de segurança do Firestore:
   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /{document=**} {
         allow read, write: if true; // Para desenvolvimento apenas
       }
     }
   }
   ```

5. Configure as regras de segurança do Storage:
   ```
   rules_version = '2';
   service firebase.storage {
     match /b/{bucket}/o {
       match /{allPaths=**} {
         allow read, write: if true; // Para desenvolvimento apenas
       }
     }
   }
   ```

6. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

7. Acesse a aplicação em [http://localhost:3000](http://localhost:3000)

## 🚀 Deployment

Para fazer o build do projeto para produção:

```bash
npm run build
```

Os arquivos de build serão gerados na pasta `dist/`. Você pode implantá-los em qualquer hospedagem estática, como Netlify, Vercel, Firebase Hosting, etc.

### Configuração para Produção

Antes de implantar em produção, atualize as regras de segurança do Firebase para limitar o acesso:

```
// Firestore
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read: if request.auth != null;
      allow write: if request.auth != null;
    }
  }
}

// Storage
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read: if request.auth != null;
      allow write: if request.auth != null;
    }
  }
}
```

## 📱 Responsividade

A aplicação é totalmente responsiva e se adapta a diferentes tamanhos de tela:

- Desktop: Layout completo com 3 cards por linha
- Tablet: 2 cards por linha
- Mobile: 1 card por linha, layout adaptado para telas pequenas

## 📝 Armazenamento de Dados

Os dados coletados pelo formulário são armazenados no Firebase:

- Dados pessoais e interesses: Armazenados no Firestore
- Documentos: Carregados para o Firebase Storage
- Os links dos documentos são salvos junto com os dados do fã no Firestore

## 🔐 Validações

O formulário implementa diversas validações:

- Validação de CPF com algoritmo completo
- Validação de e-mail, telefone e CEP
- Verificação de campos obrigatórios
- Validação de tamanho e formato de arquivos de documento

## 🎨 Personalização

O tema da aplicação é definido por variáveis CSS em `index.css`. Para personalizar o visual:

1. Modifique as variáveis no início do arquivo `index.css`:
   ```css
   :root {
     --primary-color: #000;
     --secondary-color: #111;
     --accent-color: #666;
     --background-color: #121212;
     /* Outras variáveis... */
   }
   ```

## 🧩 Componentes Reutilizáveis

O projeto inclui diversos componentes reutilizáveis:

- **Layout**: Estrutura base para todas as páginas
- **Header**: Cabeçalho com navegação
- **UserForm**: Formulário completo com validações
- **DocumentUpload**: Componente de upload de arquivos

## 📊 Expansão Futura

Ideias para futuras melhorias:

- Autenticação de usuários
- Painel de administração para visualizar dados
- Exportação de dados em CSV/Excel
- Integração com CRM
- Gamificação para incentivar o cadastro
- Segmentação de fãs por interesses

## 📄 Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👥 Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests.

1. Faça um fork do projeto
2. Crie sua branch de feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request