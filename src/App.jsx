import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import './scss/app.scss';
import { Footer } from './components';
import { Header } from './components';
import { FullList, Intro } from './pages';
import { LogIn } from './pages';
import { SignIn } from './pages';
import { Greet } from './pages';
import { Learn } from './pages';
import { Tests } from './pages';
import { Lists } from './pages';

function App() {
	const [isAuth, setAuth] = useState(false);

	return (
		<div className='App'>
			<div className='container'>
				<Header isAuth={isAuth} logout={() => setAuth(false)} />
				<div className='content'>
					<Routes>
						<Route path='/' element={isAuth ? <Greet /> : <Intro />} />
						<Route path='/signin' element={<SignIn logIn={() => setAuth(true)} />} />
						<Route path='/login' element={<LogIn logIn={() => setAuth(true)} />} />
						<Route path='/learn' element={<Learn />} />
						<Route path='/tests' element={<Tests />} />
						<Route path='/lists' element={<Lists />} />
						<Route path='/lists/full' element={<FullList />} />
					</Routes>
				</div>

				<Footer />
			</div>
		</div>
	);
}

export default App;
