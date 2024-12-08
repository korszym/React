import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { app } from "./firebaseConfig";

const messaging = getMessaging(app);

// Pobierz token urządzenia
export const requestFirebaseToken = async () => {
  try {
    const token = await getToken(messaging, { vapidKey: "your-vapid-key" });
    if (token) {
      console.log("Token uzyskany:", token);
      return token;
    } else {
      console.warn("Brak zgody na powiadomienia.");
    }
  } catch (error) {
    console.error("Błąd uzyskiwania tokenu:", error);
  }
};

// Obsługa powiadomień w trakcie działania aplikacji
export const setupOnMessageListener = () => {
  onMessage(messaging, (payload) => {
    console.log("Powiadomienie w trakcie działania:", payload);
  });
};
