import React from 'react';
import packageJson from '../../../package.json';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <p>Wersja aplikacji: {packageJson.version}</p>
    </footer>
  );
};

const styles = {
  footer: {
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
};

export default Footer;
