import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BsFillPlusCircleFill as Plus, BsFillArrowLeftCircleFill as Arrow } from 'react-icons/bs';
import { useSelector, useDispatch } from 'react-redux';

import { AddWordPopup, Loader, WordPair } from '../components';
import { addWord, getFullListWords, selectAllLists } from '../redux/slices/lists';

function FullList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isAdd, setAdd] = useState(false);
  const { lists, pageLoading, fullListWords } = useSelector((st) => st.lists);

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
    <>
      {pageLoading ? (
        <Loader />
      ) : (
        <>
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
                {list.name} : <span>{list.words.length}</span> words
              </div>
            </div>
            <div className="full_words">
              {fullListWords?.length === 0 ? (
                <div className="full_empty">Empty list</div>
              ) : (
                fullListWords?.map((w) => <WordPair key={w._id} {...w} list={list} />)
              )}
            </div>
          </div>

          {isAdd && (
            <AddWordPopup ok={handleAddWord} close={() => setAdd(false)} list={list}>
              Add new pair of words
            </AddWordPopup>
          )}
        </>
      )}
    </>
  );
}

export default FullList;
