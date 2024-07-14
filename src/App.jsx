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
    <>
      <Navbar currentPath={location.pathname} />
      <Routes>
        <Route path="/React/" element={<Home />} />
        <Route path="/React/about" element={<About />} />
        {isMobile ? (
          <Route path="/React/contact" element={<Contact />} />
        ) : (
          <Route path="/React/contact" element={<Navigate to="/React/" />} />
        )}
      </Routes>
    </>
  );
};

const AppWrapper = () => (
  <Router basename="/React">
    <App />
  </Router>
);

export default AppWrapper;
