import React, { useState } from 'react';
import { BsFillPlusCircleFill as Plus } from 'react-icons/bs';
import { ListItem, NewListPopup } from '../components';

function ListsPage() {
	const items = [1, 2, 3, 3, 3, 3, 5, 2, 3, 3, 3, 3];

	const [isNew, setNew] = useState(false);

	return (
		<div className='lists'>
			<div className='lists_head'>
				<div className='lists_owner'>
					Alex's <span>8</span> lists : <span>137</span> words
				</div>
				<p className='addBtn' onClick={() => setNew(true)}>
					<Plus />
				</p>
			</div>
			<div className='lists_items'>
				{items.map((i) => (
					<ListItem />
				))}
			</div>

			{isNew && <NewListPopup close={() => setNew(false)}>Create new list</NewListPopup>}
		</div>
	);
}

export default ListsPage;
