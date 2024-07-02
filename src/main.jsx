import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { registerSW } from 'virtual:pwa-register';

// Rejestracja Service Workera
const updateSW = registerSW({
  onNeedRefresh() {
    // Powiadomienie użytkownika o nowej wersji
    if (confirm('Nowa wersja jest dostępna. Czy chcesz odświeżyć?')) {
      updateSW(true);
    }
  },
  onOfflineReady() {
    console.log('Aplikacja jest gotowa do użycia offline');
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
