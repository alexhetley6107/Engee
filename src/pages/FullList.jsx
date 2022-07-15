import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BsFillPlusCircleFill as Plus, BsFillArrowLeftCircleFill as Arrow } from 'react-icons/bs';

import { WordPair } from '../components';

function FullList() {
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
					<p>
						<Plus />
					</p>
				</div>
				<div>
					Numbers : <span>56</span> words
				</div>
			</div>
			<div className='full_words'>
				{arr.map((i) => (
					<WordPair />
				))}
			</div>
		</div>
	);
}

export default FullList;
