import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { selectAllLists } from './../redux/slices/lists';

function Greet() {
	const userName = 'Student';

	const lists = useSelector(selectAllLists);
	const wordsAmount = lists.map((list) => list.words.length).reduce((sum, a) => sum + a, 0);

	return (
		<div className='intro'>
			<h1>Welcome, {userName}</h1>
			<h3>Are you ready to succeed in learning ?</h3>
			<h3>
				Currently, you have <span>{lists.length}</span> lists with <span>{wordsAmount}</span> words
			</h3>
			<p>Try to remember and then test yourself. Good luck!</p>
			<Link to='/Engee/learn'>
				<div className='intro_btn onBlack'>get started</div>
			</Link>
		</div>
	);
}

export default Greet;
