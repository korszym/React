import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { registerSW } from "virtual:pwa-register";
import UpdateNotification from "./assets/components/UpdateNotification";
import { messaging } from "./firebase/firebaseConfig"; // Import Messaging
import { getToken, onMessage } from "firebase/messaging";

const Main = () => {
  const [showUpdate, setShowUpdate] = useState(false);
  const [updateSW, setUpdateSW] = useState(null);

  const handleUpdate = () => {
    if (updateSW) {
      updateSW(true);
    }
  };

  const onNeedRefresh = (update) => {
    console.log("onNeedRefresh called");
    setShowUpdate(true);
    setUpdateSW(() => update);
  };

  const onOfflineReady = () => {
    console.log("onOfflineReady called");
  };

  registerSW({
    onNeedRefresh,
    onOfflineReady,
  });

  useEffect(() => {
    const requestPermission = async () => {
      console.log("Requesting notification permission...");
      const permission = await Notification.requestPermission();

      if (permission === "granted") {
        console.log("Notification permission granted.");
        const token = await getToken(messaging, {
          vapidKey: "your-vapid-key", // Dodaj swój VAPID Key
        });
        console.log("Firebase Messaging Token:", token);
      } else {
        console.warn("Notification permission denied.");
      }
    };

    const setupOnMessageListener = () => {
      onMessage(messaging, (payload) => {
        console.log("Message received in foreground: ", payload);
      });
    };

    requestPermission();
    setupOnMessageListener();
  }, []);

  return (
    <div>
      <App />
      {showUpdate && <UpdateNotification onUpdate={handleUpdate} />}
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);
