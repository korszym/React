importScripts("https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/9.17.1/firebase-messaging.js");

// Firebase konfiguracja
const firebaseConfig = {
    apiKey: "AIzaSyDIyPnXhIddwBSqAdh4CH8W11bMp8FMCKs",
    authDomain: "fir-b8782.firebaseapp.com",
    projectId: "fir-b8782",
    storageBucket: "fir-b8782.firebasestorage.app",
    messagingSenderId: "530393524662",
    appId: "1:530393524662:web:4e1ef31c31494fa4c7b917",
    measurementId: "G-3L2LT02XW7"
};

// Inicjalizacja Firebase
firebase.initializeApp(firebaseConfig);

// Inicjalizacja Firebase Messaging
const messaging = firebase.messaging();

// Obsługa powiadomień w tle
messaging.onBackgroundMessage((payload) => {
  console.log("Powiadomienie w tle:", payload);
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: payload.notification.icon,
  });
});
