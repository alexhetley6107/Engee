import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye as Eye } from 'react-icons/fa';
import { HiTrash as Del } from 'react-icons/hi';
import { RiEditFill as Rename } from 'react-icons/ri';

import { AddWordPopup, NewListPopup, Endorse } from './../index';

function ListItem() {
	const [isAddWord, setAddWord] = useState(false);
	const [isRename, setRename] = useState(false);
	const [isDel, setDel] = useState(false);

	const navigate = useNavigate();

	const openFullList = () => {
		navigate('/lists/full');
	};

	return (
		<div className='listItem' /* onClick={openFullList} */>
			<div className='listItem_wrap'>
				<div className='listItem_head'>
					<div className='listItem_name'>Nucccccsssc</div>
					<p onClick={() => setRename(true)}>
						<Rename />
					</p>
					<p className='listItem_del' onClick={() => setDel(true)}>
						<Del />
					</p>
				</div>

				<div className='listItem_length'>
					<span>20</span> words
				</div>
				<div className='listItem_bottom'>
					<p className='listItem_view' onClick={openFullList}>
						<Eye />
					</p>
				</div>
			</div>

			{isRename && (
				<NewListPopup close={() => setRename(false)}>Rename the 'name' list</NewListPopup>
			)}
			{isDel && (
				<Endorse close={() => setDel(false)}>Do you want to remove the 'name' list?</Endorse>
			)}
		</div>
	);
}

export default ListItem;
