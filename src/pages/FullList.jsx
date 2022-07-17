import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsFillPlusCircleFill as Plus, BsFillArrowLeftCircleFill as Arrow } from 'react-icons/bs';

import { AddWordPopup, WordPair } from '../components';

function FullList() {
	const [isAdd, setAdd] = useState(false);

	const navigate = useNavigate();

	const openListsPage = () => {
		navigate('/lists');
	};

	const arr = [1, 1, 1, 1, 1];

	return (
		<div className='full'>
			<div className='full_head'>
				<div className='full_btns'>
					<p onClick={openListsPage}>
						<Arrow />
					</p>
					<p onClick={() => setAdd(true)}>
						<Plus />
					</p>
				</div>
				<div className='full_info'>
					Numbers : <span>56</span> words
				</div>
			</div>
			<div className='full_words'>
				{arr.map((i) => (
					<WordPair />
				))}
			</div>

			{isAdd && <AddWordPopup close={() => setAdd(false)}>Add new pair of words</AddWordPopup>}
		</div>
	);
}

export default FullList;
