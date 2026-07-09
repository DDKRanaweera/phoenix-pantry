import { initializeApp } from "firebase/app";

import { getAuth, GoogleAuthProvider } from "firebase/auth";

import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA6DmV5RG95QkpmI2IsmPf8fQET8kxn0j8",
  authDomain: "phoenix-pantry.firebaseapp.com",
  projectId: "phoenix-pantry",
  storageBucket: "phoenix-pantry.firebasestorage.app",
  messagingSenderId: "160859539956",
  appId: "1:160859539956:web:f4340124fd046c00e9d1a1"
};

const app = initializeApp(firebaseConfig);

// Authentication
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

// Firestore
export const db = getFirestore(app);

export default app;