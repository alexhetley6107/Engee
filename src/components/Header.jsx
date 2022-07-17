import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Nav } from './index';

function Header({ isAuth, logout }) {
	const [isOpen, setOpen] = useState(false);

	const toggle = () => setOpen(!isOpen);

	return (
		<header className='header'>
			<Link to='/'>
				<h2 className='logo' onClick={() => setOpen(false)}>
					ENGEE
				</h2>
			</Link>
			{isAuth ? (
				<>
					<div className='burger' onClick={toggle}>
						<div className={isOpen ? 'burger_line active' : 'burger_line'}></div>
					</div>
					<Nav logout={logout} isOpen={isOpen} close={() => setOpen(false)} />
				</>
			) : (
				<div className='auth'>
					<Link to='/signin'>
						<p className='signIn'>Sign In</p>
					</Link>
					<Link to='/login'>
						<p className='logIn onBlack'>Log In</p>
					</Link>
				</div>
			)}
		</header>
	);
}

export default Header;
