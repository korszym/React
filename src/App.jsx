import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [deviceInfo, setDeviceInfo] = useState({});
  const [sessionStartTime] = useState(Date.now());

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
        languages: navigator.languages.join(', '),
        online: navigator.onLine,
        screenWidth: window.screen.width,
        screenHeight: window.screen.height,
        colorDepth: window.screen.colorDepth,
        viewportWidth: window.innerWidth,
        viewportHeight: window.innerHeight,
        deviceMemory: navigator.deviceMemory || 'N/A',
        hardwareConcurrency: navigator.hardwareConcurrency || 'N/A',
        orientation: window.screen.orientation ? window.screen.orientation.type : 'N/A',
        prefersReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
        cookieEnabled: navigator.cookieEnabled,
        javaEnabled: navigator.javaEnabled(),
        plugins: Array.from(navigator.plugins).map(plugin => plugin.name).join(', '),
        geolocation: 'N/A',
        uptime: Math.floor(performance.now() / 1000) + ' seconds',
        localTime: new Date().toLocaleString(),
        touchSupport: 'ontouchstart' in window || navigator.maxTouchPoints > 0 ? 'Yes' : 'No',
        // Initializing audio and video support fields
        supportedAudioFormats: getSupportedAudioFormats(),
        supportedVideoFormats: getSupportedVideoFormats(),
      };

      // Detect color scheme
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      info.colorScheme = mediaQuery.matches ? 'dark' : 'light';

      // Listen for color scheme changes
      const handleColorSchemeChange = (e) => {
        info.colorScheme = e.matches ? 'dark' : 'light';
        setDeviceInfo({ ...info });
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

      // Get network information if available
      if (navigator.connection) {
        info.networkType = navigator.connection.effectiveType;
        info.downlink = navigator.connection.downlink + ' Mbps';
        info.rtt = navigator.connection.rtt + ' ms';
      } else {
        info.networkType = 'N/A';
        info.downlink = 'N/A';
        info.rtt = 'N/A';
      }

      // Get geolocation information if available
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            info.geolocation = `Latitude: ${position.coords.latitude}, Longitude: ${position.coords.longitude}`;
            setDeviceInfo({ ...info });
          },
          (error) => {
            console.error(error);
            setDeviceInfo({ ...info });
          }
        );
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

    const getSupportedAudioFormats = () => {
      const audio = document.createElement('audio');
      return {
        mp3: audio.canPlayType('audio/mpeg') ? 'Supported' : 'Not supported',
        wav: audio.canPlayType('audio/wav') ? 'Supported' : 'Not supported',
        ogg: audio.canPlayType('audio/ogg') ? 'Supported' : 'Not supported',
      };
    };

    const getSupportedVideoFormats = () => {
      const video = document.createElement('video');
      return {
        mp4: video.canPlayType('video/mp4') ? 'Supported' : 'Not supported',
        webm: video.canPlayType('video/webm') ? 'Supported' : 'Not supported',
        ogg: video.canPlayType('video/ogg') ? 'Supported' : 'Not supported',
      };
    };

    getDeviceInfo();
  }, []);

  return (
    <>
      <h1>Informacje o urządzeniu:</h1>
      <ul>
        {Object.entries(deviceInfo).map(([key, value]) => (
          <li key={key}>
            <strong>{key}:</strong> {typeof value === 'object' ? JSON.stringify(value) : value}
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
