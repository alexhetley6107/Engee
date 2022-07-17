import React from 'react';
import PopUp from '../PopUp';

function NewListPopup({ children, close }) {
	const handleOK = () => {
		close();
	};

	return (
		<PopUp close={close}>
			<h4>{children}</h4>
			<input type='text' placeholder='name of list' />
			<p className='btn onWhite' onClick={handleOK}>
				ok
			</p>
		</PopUp>
	);
}

export default NewListPopup;
