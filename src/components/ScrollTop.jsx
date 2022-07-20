import React from 'react';
import { BsArrowUpShort as Top } from 'react-icons/bs';

function ScrollTop() {
	const toTop = () => {
		window.scrollTo(0, 0, {
			behavior: 'smooth',
			block: 'start',
		});
	};

	return (
		<div className='topBtn'>
			<div className='topBtn_cont' onClick={toTop}>
				<div className='topBtn_wrap'>
					<Top />
				</div>
			</div>
		</div>
	);
}

export default ScrollTop;
