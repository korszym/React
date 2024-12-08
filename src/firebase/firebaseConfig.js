// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging } from "firebase/messaging"; // Import Messaging

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDIyPnXhIddwBSqAdh4CH8W11bMp8FMCKs",
  authDomain: "fir-b8782.firebaseapp.com",
  projectId: "fir-b8782",
  storageBucket: "fir-b8782.firebasestorage.app",
  messagingSenderId: "530393524662",
  appId: "1:530393524662:web:4e1ef31c31494fa4c7b917",
  measurementId: "G-3L2LT02XW7",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Messaging
export const messaging = getMessaging(app); // Eksport Messaging
