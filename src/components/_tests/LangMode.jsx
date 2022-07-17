import React, { useState } from 'react';
import {
	BsFillArrowRightCircleFill as Right,
	BsFillArrowLeftCircleFill as Left,
} from 'react-icons/bs';

function LangMode() {
	const [active, setActive] = useState(false);

	return (
		<div className={`langMode ${active ? 'active' : ''}`} onClick={() => setActive(!active)}>
			<p>EN </p>
			<p className='arrow'>{active ? <Left /> : <Right />}</p>
			<p> RU</p>
		</div>
	);
}

export default LangMode;
