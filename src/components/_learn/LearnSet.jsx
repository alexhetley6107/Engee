import React from 'react';
import { IconList } from '../index';

function LearnSet({ start }) {
	const arr = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
	return (
		<div className='learn'>
			<div className='learn_head'>
				<div className='learn_desc'>Choose lists for learning</div>
				<div className='learn_allBtn btn onBlack'>all</div>
			</div>
			<div className='learn_items'>
				{arr.map((i) => (
					<IconList />
				))}
			</div>
			<div className='learn_startBtn btn onBlack' onClick={start}>
				start
			</div>
		</div>
	);
}

export default LearnSet;
