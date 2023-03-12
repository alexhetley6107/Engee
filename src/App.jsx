import React, { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import './scss/app.scss';
import { Footer, Loader, ScrollTop } from './components';
import { Header } from './components';
import { FullList, Intro } from './pages';
import { AuthPage } from './pages';
import { Greet } from './pages';
import { LearnPage } from './pages';
import { TestsPage } from './pages';
import { ListsPage } from './pages';
import { useDispatch, useSelector } from 'react-redux';
import { getMe } from './redux/slices/auth';

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isScrollBtn, setScrollBtn] = useState(false);
  const { user, pageLoading } = useSelector((st) => st.auth);

  window.onscroll = () => {
    if (window.pageYOffset > 800) {
      setScrollBtn(true);
    } else {
      setScrollBtn(false);
    }
  };

  React.useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user]);
  React.useEffect(() => {
    dispatch(getMe());
  }, []);

  return (
    <div className="App">
      {pageLoading ? (
        <div className="get_me">
          <Loader />
        </div>
      ) : (
        <div className="container">
          <Header user={user} />
          <div className="content">
            {user ? (
              <Routes>
                <Route path="/" element={<Greet />} />
                <Route path="/learn" element={<LearnPage />} />
                <Route path="/tests" element={<TestsPage />} />
                <Route path="/lists" element={<ListsPage />} />
                <Route path="/lists/:id" element={<FullList />} />
              </Routes>
            ) : (
              <Routes>
                <Route path="/" element={<Intro />} />
                <Route path="/signup" element={<AuthPage />} />
                <Route path="/login" element={<AuthPage isLogin />} />
              </Routes>
            )}
          </div>

          <Footer />
        </div>
      )}
      {isScrollBtn && <ScrollTop />}
    </div>
  );
}

export default App;
