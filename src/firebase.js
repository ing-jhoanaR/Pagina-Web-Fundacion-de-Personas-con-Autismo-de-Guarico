import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // <--- 1. AGREGA ESTO

const firebaseConfig = {
  apiKey: "AIzaSyDaeLifPfgkNNq2EL_BnCL3hY5JrD7Luvg",
  authDomain: "fupagua-admin.firebaseapp.com",
  projectId: "fupagua-admin",
  storageBucket: "fupagua-admin.firebasestorage.app",
  messagingSenderId: "526546836333",
  appId: "1:526546836333:web:d532b2cd569ed318675864",
  measurementId: "G-SQY6QBC95B"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Exportar servicios
export const db = getFirestore(app);
export const storage = getStorage(app);