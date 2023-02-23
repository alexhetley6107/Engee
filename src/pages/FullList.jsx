import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BsFillPlusCircleFill as Plus, BsFillArrowLeftCircleFill as Arrow } from 'react-icons/bs';
import { useSelector, useDispatch } from 'react-redux';

import { AddWordPopup, WordPair } from '../components';
import { getFullListWords } from '../redux/slices/lists';
import ListsProvider from '../providers/ListsProvider';

function FullList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isAdd, setAdd] = useState(false);
  const { lists, fullListWords } = useSelector((st) => st.lists);

  const { id } = useParams();
  const list = lists.find((l) => l._id === id);

  const backToLists = () => navigate('/lists');

  const handleAddWord = (eng, rus) => {
    // const listName = name;
    // const wordPair = { eng, rus };
    // dispatch(addWord({ listName, wordPair }));
  };

  React.useEffect(() => {
    dispatch(getFullListWords(id));
  }, [id]);

  return (
    <ListsProvider>
      <div className="full">
        <div className="full_head">
          <div className="full_btns">
            <p onClick={backToLists}>
              <Arrow />
            </p>
            <p onClick={() => setAdd(true)}>
              <Plus />
            </p>
          </div>
          <div className="full_info">
            {list.name} : <span>{fullListWords?.length}</span> words
          </div>
        </div>
        <div className="full_words">
          {fullListWords?.length === 0 ? (
            <div className="full_empty">Empty list</div>
          ) : (
            fullListWords?.map((w) => <WordPair key={w._id} word={w} />)
          )}
        </div>
      </div>

      {isAdd && (
        <AddWordPopup ok={handleAddWord} close={() => setAdd(false)} listId={id}>
          Add new pair of words
        </AddWordPopup>
      )}
    </ListsProvider>
  );
}

export default FullList;
