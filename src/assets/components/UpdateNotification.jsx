import React from 'react';

const UpdateNotification = ({ onUpdate }) => {
  return (
    <div className="update-notification">
      <p>Nowa wersja aplikacji jest dostępna!</p>
      <button onClick={onUpdate}>Zaktualizuj teraz</button>
    </div>
  );
};

export default UpdateNotification;