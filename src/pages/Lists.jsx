import React from 'react';
import { BsFillPlusCircleFill as Plus } from 'react-icons/bs';
import ListItem from '../components/ListItem';

function Lists() {
	const items = [1, 2, 3, 3, 3, 3, 5, 2, 3, 3, 3, 3];

	return (
		<div className='lists'>
			<div className='lists_head'>
				<div className='lists_owner'>
					Alex's <span>8</span> lists : <span>137</span> words
				</div>
				<div className='addBtn'>
					<Plus />
				</div>
			</div>
			<div className='lists_items'>
				{items.map((i) => (
					<ListItem />
				))}
			</div>
		</div>
	);
}

export default Lists;
