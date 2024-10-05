import React, { useRef, useEffect, useState } from 'react';
import Tesseract from 'tesseract.js';

const CameraReader = () => {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const [recognizedText, setRecognizedText] = useState('');

  useEffect(() => {
    // Wyłączenie kamery po odmontowaniu komponentu
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const openCamera = async () => {
    try {
      // Ustawienia do przełączenia na tylną kamerę
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" }
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const recognizeText = async () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      const overlay = document.getElementById('overlay-box');

      if (context && overlay && videoRef.current) {
        // Ustawienia rozmiaru płótna na podstawie nakładki
        const { offsetWidth, offsetHeight } = overlay;
        const { videoWidth, videoHeight } = videoRef.current;

        // Dopasowanie płótna do wymiarów nakładki
        canvas.width = offsetWidth;
        canvas.height = offsetHeight;

        // Oblicz współczynniki skalowania, aby odpowiednio dopasować rozmiar nakładki do wideo
        const scaleX = videoWidth / videoRef.current.clientWidth;
        const scaleY = videoHeight / videoRef.current.clientHeight;

        const overlayRect = overlay.getBoundingClientRect();
        const videoRect = videoRef.current.getBoundingClientRect();

        // Obliczanie pozycji nakładki w odniesieniu do obrazu wideo
        const x = (overlayRect.left - videoRect.left) * scaleX;
        const y = (overlayRect.top - videoRect.top) * scaleY;
        const width = overlayRect.width * scaleX;
        const height = overlayRect.height * scaleY;

        // Rysowanie odpowiedniego obszaru wideo na płótnie
        context.drawImage(
          videoRef.current,
          x,
          y,
          width,
          height,
          0,
          0,
          offsetWidth,
          offsetHeight
        );

        console.log('Canvas has been drawn.');

        try {
          // Rozpoznawanie tekstu z płótna - tylko cyfry
          const { data: { text } } = await Tesseract.recognize(canvas, 'eng', {
            tessedit_char_whitelist: '0123456789' // Ograniczenie rozpoznawania do cyfr
          });
          console.log('Recognized text:', text);
          // Filtracja wyników - pozostawienie tylko liczb
          const filteredText = text.replace(/[^0-9]/g, '');
          setRecognizedText(filteredText);
        } catch (error) {
          console.error('Error recognizing text:', error);
        }
      } else {
        console.error('Overlay or video element not found, or canvas context not created.');
      }
    }
  };

  return (
    <div className="camera-reader-container">
      <button onClick={openCamera}>Otwórz kamerę</button>
      <div className="camera-wrapper">
        <video ref={videoRef} className="camera-feed" style={{ width: '100%', height: '100%' }}></video>
        <div id="overlay-box" className="overlay-box">
          Proszę umieścić licznik w tym polu.
        </div>
      </div>
      <button onClick={recognizeText}>Rozpoznaj cyfry</button>
      <div>
        <h3>Rozpoznane liczby: {recognizedText}</h3>
      </div>
    </div>
  );
};

export default CameraReader;
