import React from 'react';
import PopUp from './PopUp';

function Endorse({ children, close, yes }) {
	return (
		<PopUp close={close}>
			<h4 className='endorse_title'>{children}</h4>
			<div className='endorse_btns'>
				<div className='btn onWhite' onClick={yes}>
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
