import React from 'react';
import { IconList } from '../components';

function Learn() {
	const arr = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
	return (
		<div className='learn'>
			<div className='learn_head'>
				<div className='learn_desc'>Choose lists for learning</div>
				<div className='learn_allBtn btn'>all</div>
			</div>
			<div className='learn_items'>
				{arr.map((i) => (
					<IconList />
				))}
			</div>
			<div className='learn_startBtn btn'>start</div>
		</div>
	);
}

export default Learn;
