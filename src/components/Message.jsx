import React, { useEffect } from 'react';
import { BsCheckLg as Right } from 'react-icons/bs';
import { CgClose as Wrong } from 'react-icons/cg';

function Message({ icon, title, children, btn, onClick, sideFunc }) {
	useEffect(() => {
		return () => {
			if (sideFunc) {
				sideFunc();
			}
		};
	});

	return (
		<div className='mes'>
			<b>{icon ? <Right /> : <Wrong />}</b>
			<h2>{title}</h2>
			<p>{children}</p>
			<button className='testing_checkBtn btn onBlack' onClick={onClick}>
				{btn}
			</button>
		</div>
	);
}

export default Message;
