import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Loader } from '../components';
import { getUserLists } from '../redux/slices/lists';

const ListsProvider = ({ children }) => {
  const dispatch = useDispatch();

  const { lists, pageLoading } = useSelector((st) => st.lists);

  React.useEffect(() => {
    if (!lists) {
      dispatch(getUserLists());
    }
  }, []);

  return <>{pageLoading ? <Loader /> : children}</>;
};

export default ListsProvider;
