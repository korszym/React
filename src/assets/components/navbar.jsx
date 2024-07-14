import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ currentPath }) => {
  return (
    <nav>
      <ul>
        <li className={currentPath === '/React/' ? 'active' : ''}>
          <Link to="/React/">Home</Link>
        </li>
        <li className={currentPath === '/React/about' ? 'active' : ''}>
          <Link to="/React/about">O nas</Link>
        </li>
        <li className={currentPath === '/React/contact' ? 'active' : ''}>
          <Link to="/React/contact">Latarka</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
