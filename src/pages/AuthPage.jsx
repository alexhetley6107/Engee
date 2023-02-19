import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { MyBtn, PopUp } from '../components';
import { loginUser, registerUser } from '../redux/slices/auth';

function AuthPage({ isLogin }) {
  const dispatch = useDispatch();
  const { message, isLoading } = useSelector((st) => st.auth);
  const [isPopup, setIsPopup] = React.useState(false);

  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const onChangeName = (e) => setUsername(e.target.value);
  const onChangePass = (e) => setPassword(e.target.value);

  const handleSignUp = () => {
    try {
      if (isLogin) {
        dispatch(loginUser({ username, password }));
      } else {
        dispatch(registerUser({ username, password }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    if (message) {
      setIsPopup(true);
    }
  }, [message]);
  React.useEffect(() => {
    setIsPopup(false);
  }, []);

  return (
    <div className="authform">
      <div className="name-input input">
        <input type="text" placeholder="name" value={username} onChange={onChangeName} />
      </div>
      {/* <div className="email-input input">
        <input type="email" placeholder="email" />
      </div> */}
      <div className="pass-input input">
        <input type="password" placeholder="password" value={password} onChange={onChangePass} />
      </div>

      <MyBtn disabled={!username || !password} onClick={handleSignUp} loading={isLoading}>
        {isLogin ? 'Log In' : 'Sign Up'}
      </MyBtn>
      <p>
        Already registered?
        <Link to={isLogin ? '/signup' : '/login'}>
          <span> {isLogin ? 'Sign Up' : 'Log In'}</span>
        </Link>
      </p>

      {isPopup && (
        <PopUp close={() => setIsPopup(false)}>
          <p>{message}</p>
          <div className="testing_nextBtn btn active onWhite" onClick={() => setIsPopup(false)}>
            ok
          </div>
        </PopUp>
      )}
    </div>
  );
}

export default AuthPage;
