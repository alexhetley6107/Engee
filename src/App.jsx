import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import './scss/app.scss';
import { Footer, ScrollTop } from './components';
import { Header } from './components';
import { FullList, Intro } from './pages';
import { LogIn } from './pages';
import { SignUp } from './pages';
import { Greet } from './pages';
import { LearnPage } from './pages';
import { TestsPage } from './pages';
import { ListsPage } from './pages';
import { useSelector } from 'react-redux';

function App() {
  const [isScrollBtn, setScrollBtn] = useState(false);
  const { user } = useSelector((st) => st.auth);

  window.onscroll = () => {
    if (window.pageYOffset > 800) {
      setScrollBtn(true);
    } else {
      setScrollBtn(false);
    }
  };

  return (
    <div className="App">
      <div className="container">
        <Header user={user} />
        <div className="content">
          {user ? (
            <Routes>
              <Route path="/" element={<Greet />} />
              <Route path="/learn" element={<LearnPage />} />
              <Route path="/tests" element={<TestsPage />} />
              <Route path="/lists" element={<ListsPage />} />
              <Route path="/lists/:name" element={<FullList />} />
            </Routes>
          ) : (
            <Routes>
              <Route path="/" element={<Intro />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<LogIn />} />
            </Routes>
          )}
        </div>

        <Footer />
      </div>
      {isScrollBtn && <ScrollTop />}
    </div>
  );
}

export default App;
