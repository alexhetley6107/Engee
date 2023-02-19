import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { logout } from '../redux/slices/auth';
import { Endorse } from './index';

function Nav({ isOpen, close }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isLogOut, setIsLogOut] = useState(false);

  const handleLogOut = () => {
    window.localStorage.removeItem('token');
    dispatch(logout());
    setIsLogOut(false);
    navigate('/');
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
