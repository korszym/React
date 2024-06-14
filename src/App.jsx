import { useState, useEffect } from 'react';
import addNotification from 'react-push-notification';
import './App.css';
import logo from '/icons/192x192.png';

function App() {
  const [count, setCount] = useState(0);
  const [deviceInfo, setDeviceInfo] = useState({});

  useEffect(() => {
    const getDeviceInfo = async () => {
      const userAgent = navigator.userAgent;
      const browserInfo = getBrowserInfo(userAgent);
      
      const info = {
        userAgent: userAgent,
        browserName: browserInfo.name,
        browserVersion: browserInfo.version,
        platform: navigator.platform,
        language: navigator.language,
        online: navigator.onLine,
        screenWidth: window.screen.width,
        screenHeight: window.screen.height,
        colorDepth: window.screen.colorDepth,
        deviceMemory: navigator.deviceMemory || 'N/A', // Some browsers support this
        hardwareConcurrency: navigator.hardwareConcurrency || 'N/A', // Some browsers support this
        orientation: window.screen.orientation ? window.screen.orientation.type : 'N/A',
        prefersReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
      };

      // Detect color scheme
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      info.colorScheme = mediaQuery.matches ? 'dark' : 'light';

      // Listen for color scheme changes
      const handleColorSchemeChange = (e) => {
        info.colorScheme = e.matches ? 'dark' : 'light';
        setDeviceInfo({ ...info }); // Update state with new color scheme
      };
      mediaQuery.addEventListener('change', handleColorSchemeChange);

      // Get battery information if available
      if (navigator.getBattery) {
        const battery = await navigator.getBattery();
        info.batteryLevel = battery.level * 100 + '%';
        info.batteryCharging = battery.charging ? 'Yes' : 'No';
      } else {
        info.batteryLevel = 'N/A';
        info.batteryCharging = 'N/A';
      }

      setDeviceInfo(info);

      return () => {
        mediaQuery.removeEventListener('change', handleColorSchemeChange);
      };
    };

    const getBrowserInfo = (userAgent) => {
      let name = 'Unknown';
      let version = 'Unknown';
      if (userAgent.includes("Firefox")) {
        name = "Mozilla Firefox";
        version = userAgent.match(/Firefox\/(\d+)/)[1];
      } else if (userAgent.includes("SamsungBrowser")) {
        name = "Samsung Internet";
        version = userAgent.match(/SamsungBrowser\/(\d+)/)[1];
      } else if (userAgent.includes("Opera") || userAgent.includes("OPR")) {
        name = "Opera";
        version = userAgent.match(/Opera\/(\d+)/) || userAgent.match(/OPR\/(\d+)/)[1];
      } else if (userAgent.includes("Trident")) {
        name = "Microsoft Internet Explorer";
        version = userAgent.match(/rv:(\d+)/)[1];
      } else if (userAgent.includes("Edge")) {
        name = "Microsoft Edge";
        version = userAgent.match(/Edge\/(\d+)/)[1];
      } else if (userAgent.includes("Chrome")) {
        name = "Google Chrome";
        version = userAgent.match(/Chrome\/(\d+)/)[1];
      } else if (userAgent.includes("Safari")) {
        name = "Apple Safari";
        version = userAgent.match(/Version\/(\d+)/)[1];
      }
      return { name, version };
    };

    getDeviceInfo();
  }, []);

  const clickToNotify = () => {
    setTimeout(() => {
      addNotification({
        title: 'To działa!',
        message: 'To jest treść naszego powiadomienia',
        duration: 4000,
        icon: logo,
        native: true,
      });
    }, 60000); // 60000 milisekund = 1 minuta
  };

  return (
    <>
      <div>
      </div>
      <h1>ReactPWA</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <br /><br />
        <button onClick={clickToNotify}>Wyślij powiadomienie</button>
      </div>
      <div>
        <h2>Informacje o urządzeniu:</h2>
        <ul>
          {Object.entries(deviceInfo).map(([key, value]) => (
            <li key={key}>
              <strong>{key}:</strong> {value}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
