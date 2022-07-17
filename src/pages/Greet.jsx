import React from 'react';
import { Link } from 'react-router-dom';

function Greet() {
	return (
		<div className='intro'>
			<h1>Welcome, Alex</h1>
			<h3>Are you ready to succeed in learning ?</h3>
			<h3>
				Currently, you have <span>5</span> lists with <span>340</span> words
			</h3>
			<p>Try to remember and then test yourself. Good luck!</p>
			<Link to='/learn'>
				<div className='intro_btn onBlack'>get started</div>
			</Link>
		</div>
	);
}

export default Greet;
