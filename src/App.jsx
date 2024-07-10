import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Navbar from './assets/components/navbar';
import Home from './assets/pages/Home';
import About from './assets/pages/About';
import Contact from './assets/pages/Contact';
import { isMobile } from 'react-device-detect';

const App = () => {
  const location = useLocation();

  return (
    <div>
      <Navbar currentPath={location.pathname} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        {isMobile ? (
          <Route path="/contact" element={<Contact />} />
        ) : (
          <Route path="/contact" element={<Navigate to="/" />} />
        )}
      </Routes>
    </div>
  );
};

const AppWrapper = () => (
  <Router basename="/React">
    <App />
  </Router>
);

export default AppWrapper;
