import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';

function Header({ isAuth, logout }) {
	const navigate = useNavigate();

	const handleLogin = () => {
		logout();
		navigate('/');
	};

	return (
		<header className='header'>
			<Link to='/'>
				<h2 className='logo'>ENGEE</h2>
			</Link>
			<nav className='nav'>
				{isAuth ? (
					<>
						<NavLink to='/learn' className={({ isActive }) => `${isActive ? 'active' : ''}`}>
							<p className='tab'>Learn</p>
						</NavLink>
						<NavLink to='/tests' className={({ isActive }) => `${isActive ? 'active' : ''}`}>
							<p className='tab'>Tests</p>
						</NavLink>
						<NavLink to='/lists' className={({ isActive }) => `${isActive ? 'active' : ''}`}>
							<p className='tab'>Lists</p>
						</NavLink>
						<p className='tab logout' onClick={handleLogin}>
							Logout
						</p>
					</>
				) : (
					<>
						<Link to='/signin'>
							<p className='signIn'>Sign In</p>
						</Link>
						<Link to='/login'>
							<p className='logIn'>Log In</p>
						</Link>
					</>
				)}
			</nav>
		</header>
	);
}

export default Header;
