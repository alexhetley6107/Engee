import React, { useState } from 'react';
import { BsFillPlusCircleFill as Plus } from 'react-icons/bs';
import { ListItem, Loader, NewListPopup } from '../components';
import { useSelector, useDispatch } from 'react-redux';
import { createList, getDefault, selectAllLists } from '../redux/slices/lists';
import ListsProvider from '../providers/ListsProvider';

function ListsPage() {
  const { lists } = useSelector((st) => st.lists);
  const { user } = useSelector((st) => st.auth);

  const [isNew, setNew] = useState(false);
  const [isNoLists, setNoLists] = useState(lists?.length === 0);
  const wordsAmount = lists?.map((list) => list.words.length).reduce((sum, a) => sum + a, 0);

  const dispatch = useDispatch();
  const handleGetDefault = () => {
    dispatch(getDefault());
  };

  const handleCreateList = (name) => {
    const list = { name, words: [] };
    dispatch(createList(list));
  };

  return (
    <ListsProvider>
      <div className="lists">
        <div className="lists_head">
          <div className="lists_owner">
            {user.username}'s <span>{user.lists.length}</span> lists : <span>{wordsAmount}</span>{' '}
            words
          </div>
          <p className="addBtn" onClick={() => setNew(true)}>
            <Plus />
          </p>
        </div>
        <div className="lists_items">
          {isNoLists ? (
            <div className="lists_no">
              <p className="testing_checkBtn btn onBlack" onClick={handleGetDefault}>
                default
              </p>
            </div>
          ) : (
            lists?.map((i) => <ListItem key={i.name} item={i} lists={lists} />)
          )}
        </div>
      </div>

      {isNew && (
        <NewListPopup ok={handleCreateList} close={() => setNew(false)} lists={lists}>
          Create new list
        </NewListPopup>
      )}
    </ListsProvider>
  );
}

export default ListsPage;
