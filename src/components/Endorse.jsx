import React from 'react';
import PopUp from './PopUp';

function Endorse({ children, close, yes }) {
	const handleYes = () => {
		yes();
		close();
	};

	return (
		<PopUp close={close}>
			<div className='endorse_title'>{children}</div>
			<div className='endorse_btns'>
				<div className='btn onWhite' onClick={handleYes}>
					yes
				</div>
				<div className='btn onWhite' onClick={close}>
					no
				</div>
			</div>
		</PopUp>
	);
}

export default Endorse;
