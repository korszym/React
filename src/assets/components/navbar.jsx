import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ currentPath }) => {
  return (
    <nav>
      <ul>
        <li className={currentPath === '/' ? 'active' : ''}>
          <Link to="//">Home</Link>
        </li>
        <li className={currentPath === '/about' ? 'active' : ''}>
          <Link to="/about">O nas</Link>
        </li>
        <li className={currentPath === '/contact' ? 'active' : ''}>
          <Link to="/contact">Latarka</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
