import React from 'react';
import PopUp from '../PopUp';

function AddWordPopup({ children, close }) {
	const handleOK = () => {
		close();
	};
	return (
		<PopUp close={close}>
			<h4>{children}</h4>
			<input type='text' placeholder='english' />
			<input type='text' placeholder='russian' />
			<p className='btn onWhite' onClick={handleOK}>
				ok
			</p>
		</PopUp>
	);
}

export default AddWordPopup;
