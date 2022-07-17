import React, { useState } from 'react';

import { HiTrash as Del } from 'react-icons/hi';
import { RiEditFill as Edit } from 'react-icons/ri';

import { Endorse, AddWordPopup } from './../index';

function WordPair() {
	const [isEdit, setEdit] = useState(false);
	const [isDel, setDel] = useState(false);

	return (
		<div className='pair'>
			<div className='pair_words'>number — номера</div>
			<div className='pair_btns'>
				<p onClick={() => setEdit(true)}>
					<Edit />
				</p>
				<p onClick={() => setDel(true)}>
					<Del />
				</p>
			</div>

			{isEdit && <AddWordPopup close={() => setEdit(false)}>Edit the pair</AddWordPopup>}
			{isDel && <Endorse close={() => setDel(false)}>Do you want to delete the pair?</Endorse>}
		</div>
	);
}

export default WordPair;
