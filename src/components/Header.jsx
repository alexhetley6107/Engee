import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Nav } from './index';

function Header({ user }) {
  const [isOpen, setOpen] = useState(false);

  const toggle = () => setOpen(!isOpen);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('lock');
    } else {
      document.body.classList.remove('lock');
    }
  }, [isOpen]);

  return (
    <header className="header">
      <Link to="/">
        <h2 className="logo" onClick={() => setOpen(false)}>
          ENGEE
        </h2>
      </Link>
      {user ? (
        <>
          <div className="burger" onClick={toggle}>
            <div className={isOpen ? 'burger_line active' : 'burger_line'}></div>
          </div>
          <Nav isOpen={isOpen} close={() => setOpen(false)} />
        </>
      ) : (
        <div className="auth">
          <Link to="/signup">
            <p className="signIn">Sign Up</p>
          </Link>
          <Link to="/login">
            <p className="logIn onBlack">Log In</p>
          </Link>
        </div>
      )}
    </header>
  );
}

export default Header;
