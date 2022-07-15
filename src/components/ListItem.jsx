import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BsFillPlusCircleFill as Plus } from 'react-icons/bs';
import { HiTrash } from 'react-icons/hi';
import { RiEditFill } from 'react-icons/ri';

function ListItem() {
	const navigate = useNavigate();

	const openFullList = (e) => {
		// e.stopPropagation();
		navigate('/lists/full');
	};

	return (
		<div className='listItem'>
			<div className='listItem_wrap' onClick={openFullList}>
				<div className='listItem_head'>
					<div className='listItem_desc'>
						<div className='listItem_name'>
							<div>Numbers</div>
							<p>
								<RiEditFill />
							</p>
						</div>
						<div className='listItem_length'>
							<span>20</span> words
						</div>
					</div>
					<p className='listItem_del'>
						<HiTrash />
					</p>
				</div>
				<div className='listItem_manage'>
					<p className='listItem_add'>
						<Plus />
					</p>
				</div>
			</div>
		</div>
	);
}

export default ListItem;
