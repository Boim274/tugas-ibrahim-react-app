// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Import Firestore

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDNAlwSMP53FUh7iS9UgRJ_Wzm-mf7YaoY",
  authDomain: "login-auth-5370f.firebaseapp.com",
  projectId: "login-auth-5370f",
  storageBucket: "login-auth-5370f.firebasestorage.app",
  messagingSenderId: "1009681585591",
  appId: "1:1009681585591:web:65609bc024cfb75c0cc432",
  measurementId: "G-5SSHV7FZQM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firestore
export const db = getFirestore(app); // Export Firestore
export const auth = getAuth();
export default app;
