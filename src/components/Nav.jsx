import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Endorse } from './index';

function Nav({ isOpen, close }) {
  const navigate = useNavigate();
  const [isLogOut, setIsLogOut] = useState(false);

  const handleLogOut = () => {
    setIsLogOut(false);
    // navigate('/');
  };

  return (
    <>
      <nav className={isOpen ? 'nav' : 'nav hide'} onClick={close}>
        <NavLink to="/learn" className={({ isActive }) => `${isActive ? 'active' : ''}`}>
          <p className="tab">Learn</p>
        </NavLink>
        <NavLink to="/tests" className={({ isActive }) => `${isActive ? 'active' : ''}`}>
          <p className="tab">Tests</p>
        </NavLink>
        <NavLink to="/lists" className={({ isActive }) => `${isActive ? 'active' : ''}`}>
          <p className="tab">Lists</p>
        </NavLink>
        <p className="tab logout" onClick={() => setIsLogOut(true)}>
          Logout
        </p>
      </nav>

      {isLogOut && (
        <Endorse yes={handleLogOut} close={() => setIsLogOut(false)}>
          Do you want to logout?
        </Endorse>
      )}
    </>
  );
}

export default Nav;
