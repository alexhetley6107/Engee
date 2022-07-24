import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import './scss/app.scss';
import { Footer, ScrollTop } from './components';
import { Header } from './components';
import { FullList, Intro } from './pages';
import { LogIn } from './pages';
import { SignIn } from './pages';
import { Greet } from './pages';
import { LearnPage } from './pages';
import { TestsPage } from './pages';
import { ListsPage } from './pages';

function App() {
	const [isScrollBtn, setScrollBtn] = useState(false);

	window.onscroll = () => {
		if (window.pageYOffset > 800) {
			setScrollBtn(true);
		} else {
			setScrollBtn(false);
		}
	};

	return (
		<div className='App'>
			<div className='container'>
				<Header />
				<div className='content'>
					<Routes>
						<Route path='/' element={<Greet />} />
						<Route path='/learn' element={<LearnPage />} />
						<Route path='/tests' element={<TestsPage />} />
						<Route path='/lists' element={<ListsPage />} />
						<Route path='/lists/:name' element={<FullList />} />
					</Routes>
				</div>

				<Footer />
			</div>
			{isScrollBtn && <ScrollTop />}
		</div>
	);
}

export default App;

{
	/* 

	<Route path='/' element={ isAuth ? <Greet />  :  <Intro /> } />
  <Route path='/signin' element={<SignIn logIn={() => setAuth(true)} />} />
	<Route path='/login' element={<LogIn logIn={() => setAuth(true)} />} /> 
  
  */
}
