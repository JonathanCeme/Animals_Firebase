// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAd7LDzbML3P9EjpmqmMKDtzmMK5R1YtlQ",
  authDomain: "animals-firebase-2025.firebaseapp.com",
  projectId: "animals-firebase-2025",
  storageBucket: "animals-firebase-2025.firebasestorage.app",
  messagingSenderId: "851460729881",
  appId: "1:851460729881:web:7ff61d50789b888a46ce88",
  measurementId: "G-5KL7PGZQ40"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app; /* exportamos la constante */