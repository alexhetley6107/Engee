import React from 'react';
import { Link } from 'react-router-dom';

function Intro() {
  return (
    <div className="intro">
      <h1> ENGEE is awesome app</h1>
      <h3>for learning foreign words</h3>
      <p>Try ENGEE and find out a great way to learn language</p>
      <Link to="/signup">
        <div className="intro_btn onBlack">Try engee</div>
      </Link>
    </div>
  );
}

export default Intro;
