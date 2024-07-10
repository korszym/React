import React, { useState } from 'react';

const Flashlight = () => {
  const [isOn, setIsOn] = useState(false);
  const [stream, setStream] = useState(null);

  const toggleFlashlight = async () => {
    if (!isOn) {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: { exact: 'environment' } },
        });
        const track = mediaStream.getVideoTracks()[0];
        track.applyConstraints({
          advanced: [{ torch: true }],
        });
        setStream(mediaStream);
        setIsOn(true);
      } catch (err) {
        console.error('Wystąpił błąd podczas włączania latarki:', err);
      }
    } else {
      if (stream) {
        const track = stream.getVideoTracks()[0];
        track.applyConstraints({
          advanced: [{ torch: false }],
        });
        stream.getTracks().forEach(track => track.stop());
        setStream(null);
      }
      setIsOn(false);
    }
  };

  return (
    <div>
      <button onClick={toggleFlashlight}>
        {isOn ? 'Wyłącz latarkę' : 'Włącz latarkę'}
      </button>
    </div>
  );
};

export default Flashlight;
