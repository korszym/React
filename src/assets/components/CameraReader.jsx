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
      if (context) {
        const overlay = document.getElementById('overlay-box');
        if (overlay && videoRef.current) {
          const { offsetWidth, offsetHeight, offsetLeft, offsetTop } = overlay;

          // Ustawienia rozmiaru płótna na podstawie nakładki
          console.log('Canvas size:', offsetWidth, offsetHeight);
          canvas.width = offsetWidth;
          canvas.height = offsetHeight;

          // Rysowanie obrazu z wideo na płótnie (tylko wybrany obszar)
          context.drawImage(
            videoRef.current,
            offsetLeft,
            offsetTop,
            offsetWidth,
            offsetHeight,
            0,
            0,
            offsetWidth,
            offsetHeight
          );

          console.log('Canvas has been drawn.');

          try {
            // Rozpoznawanie tekstu z płótna
            const { data: { text } } = await Tesseract.recognize(canvas, 'eng', {
              tessedit_char_whitelist: '0123456789' // Ograniczenie rozpoznawania do cyfr
            });
            console.log('Recognized text:', text);
            setRecognizedText(text);
          } catch (error) {
            console.error('Error recognizing text:', error);
          }
        } else {
          console.error('Overlay or video element not found.');
        }
      } else {
        console.error('Canvas context not created.');
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
