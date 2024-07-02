import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { registerSW } from 'virtual:pwa-register';
import UpdateNotification from './assets/components/UpdateNotification';
import Footer from './assets/components/Footer';  // Importowanie komponentu Footer

const Main = () => {
  const [showUpdate, setShowUpdate] = useState(false);
  const [updateSW, setUpdateSW] = useState(null);

  const handleUpdate = () => {
    if (updateSW) {
      updateSW(true);
    }
  };

  const onNeedRefresh = (update) => {
    console.log('onNeedRefresh called');
    setShowUpdate(true);
    setUpdateSW(() => update);
  };

  const onOfflineReady = () => {
    console.log('onOfflineReady called');
  };

  registerSW({
    onNeedRefresh,
    onOfflineReady,
  });

  return (
    <>
      <App />
      {showUpdate && <UpdateNotification onUpdate={handleUpdate} />}
      <Footer />  {/* Dodanie komponentu Footer */}
    </>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);