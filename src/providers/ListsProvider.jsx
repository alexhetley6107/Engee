import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Loader } from '../components';
import { getUserLists } from '../redux/slices/lists';

const ListsProvider = ({ children }) => {
  const dispatch = useDispatch();

  const { lists, initLoading } = useSelector((st) => st.lists);

  React.useEffect(() => {
    if (!lists) {
      dispatch(getUserLists());
    }
  }, []);

  return <>{initLoading ? <Loader /> : children}</>;
};

export default ListsProvider;
