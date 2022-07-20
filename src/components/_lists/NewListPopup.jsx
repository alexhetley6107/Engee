import React, { useRef, useState } from 'react';
import PopUp from '../PopUp';

function NewListPopup({ children, close, ok, lists }) {
	const input = useRef();
	const [isExists, setExists] = useState(false);

	const handleOK = () => {
		const name = input.current.value.trim();

		if (name === '') return;

		const allNames = lists.map((l) => l.name);

		if (allNames.includes(name)) {
			setExists(true);
		} else {
			ok(name);
			close();
		}
	};

	return (
		<PopUp close={close}>
			<div>
				{children}
				{isExists && <h5>Such lists is already exists</h5>}
			</div>
			<input ref={input} type='text' placeholder='name of list' />
			<p className='btn onWhite' onClick={handleOK}>
				ok
			</p>
		</PopUp>
	);
}

export default NewListPopup;
