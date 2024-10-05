import React, { useRef, useEffect } from 'react';
import Tesseract from 'tesseract.js';

const CameraReader = () => {
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const openCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
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
          canvas.width = offsetWidth;
          canvas.height = offsetHeight;
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
          const { data: { text } } = await Tesseract.recognize(canvas, 'eng', {
            tessedit_char_whitelist: '0123456789'
          });
          console.log('Recognized text:', text);
        }
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
    </div>
  );
};

export default CameraReader;
