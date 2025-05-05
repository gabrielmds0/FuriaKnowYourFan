// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBmSqHwj7a4YGlAT3CBB_b5C2V6MVSMB8U",
  authDomain: "furia-know-your-fan-55003.firebaseapp.com",
  projectId: "furia-know-your-fan-55003",
  storageBucket: "furia-know-your-fan-55003.firebasestorage.app",
  messagingSenderId: "995807154002",
  appId: "1:995807154002:web:829d8c718dda0b581b348b"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Função para converter arquivo para base64
const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve({
      name: file.name,
      type: file.type,
      size: file.size,
      data: reader.result
    });
    reader.onerror = error => reject(error);
  });
};

// Função para salvar dados do fã
export const saveFanData = async (fanData, documents) => {
  try {
    // Importamos estas funções aqui para não carregar desnecessariamente
    const { collection, addDoc, serverTimestamp } = await import("firebase/firestore");
    
    // Converter documentos para base64
    const base64Documents = await Promise.all(documents.map(fileToBase64));
    
    // Limitar tamanho dos documentos (para evitar limites do Firestore)
    const safeDocuments = base64Documents.map(doc => {
      // Se o documento for muito grande, apenas armazene metadados
      if (doc.data.length > 1000000) { // ~1MB
        return {
          name: doc.name,
          type: doc.type,
          size: doc.size,
          tooLarge: true,
          // O arquivo completo seria enviado para o Storage em uma implementação de produção
        };
      }
      return doc;
    });
    
    // Salva os dados do fã com os documentos em base64
    const fanWithDocs = {
      ...fanData,
      documents: safeDocuments,
      createdAt: serverTimestamp()
    };
    
    const docRef = await addDoc(collection(db, "fans"), fanWithDocs);
    return docRef.id;
  } catch (error) {
    console.error("Erro ao salvar dados:", error);
    throw error;
  }
};