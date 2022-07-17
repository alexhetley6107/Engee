import React from 'react';
import { IconList } from './../index';
import { LangMode } from './../index';

function TestSet({ start }) {
	const arr = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

	return (
		<div className='learn'>
			<div className='learn_head'>
				<div className='learn_desc'>Choose lists for testing</div>
				<div className='learn_allBtn btn onBlack'>all</div>
			</div>
			<div className='learn_items'>
				{arr.map((i) => (
					<IconList />
				))}
			</div>
			<div className='tests_btns'>
				<LangMode />
				<div className='learn_startBtn btn onBlack' onClick={start}>
					start
				</div>
			</div>
		</div>
	);
}

export default TestSet;
