import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './navbar.css';

const Navbar = ({ currentPath }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const sidebarVariants = {
    open: { x: 0, transition: { stiffness: 20 } },
    closed: { x: '-100%', transition: { stiffness: 20 } },
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      {isDesktop ? (
        <nav className="top-nav">
          <ul className="top-nav-list">
            <li className={currentPath === '/React/' ? 'active' : ''}>
              <Link to="/React/">Start</Link>
            </li>
            <li className={currentPath === '/React/about' ? 'active' : ''}>
              <Link to="/React/about">Modal</Link>
            </li>
            <li className={currentPath === '/React/contact' ? 'active' : ''}>
              <Link to="/React/contact">Latarka</Link>
            </li>
          </ul>
        </nav>
      ) : (
        <>
          <div className="flex-end">
            <button onClick={() => setIsOpen(!isOpen)} className="menu-button">X</button>
          </div>

          <motion.nav
            initial={false}
            animate={isOpen ? 'open' : 'closed'}
            variants={sidebarVariants}
            className="sidebar"
          >
            <ul>
              <li className={currentPath === '/React/' ? 'active' : ''}>
                <Link to="/React/" onClick={handleLinkClick}>Start</Link>
              </li>
              <li className={currentPath === '/React/about' ? 'active' : ''}>
                <Link to="/React/about" onClick={handleLinkClick}>Modal</Link>
              </li>
              <li className={currentPath === '/React/contact' ? 'active' : ''}>
                <Link to="/React/contact" onClick={handleLinkClick}>Latarka</Link>
              </li>
            </ul>
          </motion.nav>
          {isOpen && (
            <div
              onClick={() => setIsOpen(false)}
              className="overlay"
            />
          )}
        </>
      )}
    </>
  );
};

export default Navbar;
