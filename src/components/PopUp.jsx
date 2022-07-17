import React from 'react';

function PopUp({ children, close }) {
	return (
		<div className='popup' onClick={close}>
			<div className='popup_wrap' onClick={(e) => e.stopPropagation()}>
				{children}
			</div>
		</div>
	);
}

export default PopUp;
