import React from 'react';
import { Link } from 'react-router-dom';

export const Header: React.FC = () => {
  return (
    <header className="">
      <div className="">
        <div className="">
          <Link to="/">News App</Link>
        </div>
        <nav className="">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            {/* Add more navigation items as needed */}
          </ul>
        </nav>
      </div>
    </header>
  );
};