import React from 'react';
import { Link } from 'react-router-dom';

import './Header.scss';

const Header = () => {
  return (
    <header>
      <div className='navbar'>
        <div className='container flex navbar__flex'>
          <h1>
            <Link to='/' className='navbar__logo'>
              UsersHub
            </Link>
          </h1>
          <nav>
            <ul className='navbar__list'>
              <li>
                <Link to='/' className='navbar__nav'>
                  Users
                </Link>
              </li>
              <li>
                <Link to='/register' className='navbar__nav'>
                  Register
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
