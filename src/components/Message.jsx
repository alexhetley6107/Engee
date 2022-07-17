import React from 'react';
import { BsCheckLg as Right } from 'react-icons/bs';
import { CgClose as Wrong } from 'react-icons/cg';

function Message({ icon, title, text, btn, onClick }) {
	return (
		<div className='mes'>
			<b>{icon ? <Right /> : <Wrong />}</b>
			<h2>{title}</h2>
			<p>{text}</p>
			<div className='testing_checkBtn btn onBlack' onClick={onClick}>
				{btn}
			</div>
		</div>
	);
}

export default Message;
