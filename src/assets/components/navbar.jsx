import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ currentPath }) => {
  return (
    <nav>
      <ul>
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
  );
};

export default Navbar;
