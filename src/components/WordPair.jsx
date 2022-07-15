import React from 'react';

import { HiTrash } from 'react-icons/hi';
import { RiEditFill as Edit } from 'react-icons/ri';

function WordPair() {
	return (
		<div className='pair'>
			<div className='pair_words'>numbers — номера</div>
			<div className='pair_btns'>
				<p>
					<Edit />
				</p>
				<p>
					<HiTrash />
				</p>
			</div>
		</div>
	);
}

export default WordPair;
