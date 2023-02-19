import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Greet() {
  const { user } = useSelector((st) => st.auth);

  return (
    <div className="intro">
      <h1>Welcome, {user.username}</h1>
      <h3>Are you ready to succeed in learning ?</h3>
      <h3>
        Currently, you have <span>{user.lists.length}</span> word lists.
      </h3>
      <p>Try to remember and then test yourself. Good luck!</p>
      <Link to="/learn">
        <div className="intro_btn onBlack">get started</div>
      </Link>
    </div>
  );
}

export default Greet;
