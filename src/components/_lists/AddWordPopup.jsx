import React, { useRef, useState } from 'react';
import PopUp from '../PopUp';

function AddWordPopup({ children, close, ok, list }) {
	const engInput = useRef();
	const rusInput = useRef();
	const [isExists, setExists] = useState(false);

	const handleOK = () => {
		const eng = engInput.current.value.trim().toLowerCase();
		const rus = rusInput.current.value.trim().toLowerCase();

		if (eng === '' || rus === '') return;

		const engWords = list.words.map((w) => w.eng);

		if (engWords.includes(eng)) {
			setExists(true);
		} else {
			ok(eng, rus);
			close();
		}
	};

	return (
		<PopUp close={close}>
			<div>
				{children}
				{isExists && <h5>Such word is already exists in the list</h5>}
			</div>

			<input ref={engInput} type='text' placeholder='english' />
			<input ref={rusInput} type='text' placeholder='russian' />
			<p className='btn onWhite' onClick={handleOK}>
				ok
			</p>
		</PopUp>
	);
}

export default AddWordPopup;
