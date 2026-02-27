// src/firebase/firebase.ts
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA27PkiXaU8z0OpVk5G7cBEXD-K8dyXqMA",
  authDomain: "deschool-portal.firebaseapp.com",
  databaseURL: "https://deschool-portal-default-rtdb.firebaseio.com",
  projectId: "deschool-portal",
  storageBucket: "deschool-portal.firebasestorage.app",
  messagingSenderId: "298238863848",
  appId: "1:298238863848:web:e22b7b801ac39298fb5c5d",
  measurementId: "G-JGLFTD993H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Auth and Database
export const auth = getAuth(app);
export const database = getDatabase(app);