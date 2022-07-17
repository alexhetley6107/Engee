import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function SignIn({ logIn }) {
	const navigate = useNavigate();

	const handleLogin = () => {
		logIn();
		navigate('/');
	};

	return (
		<div className='authform'>
			<div className='name-input input'>
				<input type='text' placeholder='name' />
			</div>
			<div className='email-input input'>
				<input type='email' placeholder='email' />
			</div>
			<div className='pass-input input'>
				<input type='password' placeholder='password' />
			</div>
			<div className='btn onWhite' onClick={handleLogin}>
				Sign In
			</div>
			<p>
				Аlready registered?
				<Link to='/login'>
					<span> Log In</span>
				</Link>
			</p>
		</div>
	);
}

export default SignIn;
