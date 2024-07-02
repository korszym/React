import React from 'react';

const UpdateNotification = ({ onUpdate }) => {
  return (
    <div style={styles.container}>
      <p>Nowa wersja aplikacji jest dostępna!</p>
      <button onClick={onUpdate} style={styles.button}>Odśwież</button>
    </div>
  );
};

const styles = {
  container: {
    position: 'fixed',
    bottom: '10px',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: '#333',
    color: '#fff',
    padding: '10px 20px',
    borderRadius: '5px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    zIndex: 1000,
  },
  button: {
    marginLeft: '10px',
    backgroundColor: '#ff9800',
    color: '#fff',
    border: 'none',
    padding: '5px 10px',
    cursor: 'pointer',
    borderRadius: '3px',
  },
};

export default UpdateNotification;
