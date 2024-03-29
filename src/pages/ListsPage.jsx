import React, { useState } from 'react';
import { BsFillPlusCircleFill as Plus } from 'react-icons/bs';
import { ListItem, MyBtn, NewListPopup } from '../components';
import { useSelector, useDispatch } from 'react-redux';
import { getDefaultLists } from '../redux/slices/lists';
import ListsProvider from '../providers/ListsProvider';

function ListsPage() {
  const dispatch = useDispatch();
  const { lists, isLoading } = useSelector((st) => st.lists);
  const { user } = useSelector((st) => st.auth);

  const [isNew, setNew] = useState(false);
  const [isNoLists, setIsNoLists] = useState(lists?.length === 0);
  const [wordsAmount, setWordsAmount] = useState(
    lists?.map((list) => list.words.length).reduce((sum, a) => sum + a, 0)
  );

  const handleGetDefault = () => dispatch(getDefaultLists());

  React.useEffect(() => {
    setIsNoLists(lists?.length === 0);
    setWordsAmount(lists?.map((list) => list.words.length).reduce((sum, a) => sum + a, 0));
  }, [lists, wordsAmount]);

  return (
    <ListsProvider>
      <div className="lists">
        <div className="lists_head">
          <div className="lists_owner">
            {user.username}'s <span>{lists?.length}</span> lists : <span>{wordsAmount}</span> words
          </div>
          <p className="addBtn" onClick={() => setNew(true)}>
            <Plus />
          </p>
        </div>
        <div className="lists_items">
          {isNoLists ? (
            <div className="lists_no">
              <MyBtn onClick={handleGetDefault} className="onBlack" loading={isLoading}>
                default
              </MyBtn>
            </div>
          ) : (
            lists?.map((l) => <ListItem key={l._id} list={l} />)
          )}
        </div>
      </div>

      {isNew && <NewListPopup close={() => setNew(false)}>Create new list</NewListPopup>}
    </ListsProvider>
  );
}

export default ListsPage;
