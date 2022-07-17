import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function LogIn({ logIn }) {
	const navigate = useNavigate();

	const handleLogin = () => {
		logIn();
		navigate('/');
	};
	return (
		<div className='authform'>
			<div className='email-input input'>
				<input type='email' placeholder='email' />
			</div>
			<div className='pass-input input'>
				<input type='password' placeholder='password' />
			</div>
			<div className='btn onWhite' onClick={handleLogin}>
				Log in
			</div>
			<p>
				Need an accaunt?
				<Link to='/signin'>
					<span> Sign In</span>
				</Link>
			</p>
		</div>
	);
}

export default LogIn;
