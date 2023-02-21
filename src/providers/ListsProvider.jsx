import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Loader, PopUp } from '../components';
import { getUserLists, setMessage } from '../redux/slices/lists';

const ListsProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [isPopup, setPopup] = React.useState(false);

  const { lists, pageLoading, message } = useSelector((st) => st.lists);

  const handleClosePopup = () => {
    setPopup(false);
    dispatch(setMessage(null));
  };

  React.useEffect(() => {
    if (!lists) {
      dispatch(getUserLists());
    }
  }, []);
  React.useEffect(() => {
    if (message) {
      // dispatch(setMessage(message));
      setPopup(true);
    }
  }, [message]);

  return (
    <>
      {pageLoading ? <Loader /> : children}

      {isPopup && (
        <PopUp close={handleClosePopup}>
          <div>{message}</div>
          <p className="btn onWhite" onClick={handleClosePopup}>
            ok
          </p>
        </PopUp>
      )}
    </>
  );
};

export default ListsProvider;
