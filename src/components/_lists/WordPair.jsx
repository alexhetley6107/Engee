import React, { useState } from 'react';
import { HiTrash as Del } from 'react-icons/hi';
import { RiEditFill as Edit } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';

import { deleteWord } from '../../redux/slices/lists';
import { Endorse, AddWordPopup } from './../index';

function WordPair({ word }) {
  const dispatch = useDispatch();

  const [isEdit, setEdit] = useState(false);
  const [isDel, setDel] = useState(false);

  const { _id, eng, rus, placeListId } = word;
  const { isLoading, fullListWords, message } = useSelector((st) => st.lists);

  const handleEditWord = () => {};

  const handleDeleteWord = () => {
    const dto = { id: _id, listId: placeListId };
    dispatch(deleteWord(dto));
  };

  React.useEffect(() => {
    if (!isLoading && message) {
      setDel(false);
    }
  }, [fullListWords]);

  return (
    <>
      <div className="pair">
        <div className="pair_words">
          <div>{eng}</div>
          <p>—</p>
          <div>{rus}</div>
        </div>
        <div className="pair_btns">
          <p onClick={() => setEdit(true)}>
            <Edit />
          </p>
          <p onClick={() => setDel(true)}>
            <Del />
          </p>
        </div>
      </div>

      {isEdit && (
        <AddWordPopup ok={handleEditWord} close={() => setEdit(false)} word={word}>
          Edit the pair
        </AddWordPopup>
      )}

      {isDel && (
        <Endorse yes={handleDeleteWord} close={() => setDel(false)} loading={isLoading}>
          Do you want to delete the pair?
        </Endorse>
      )}
    </>
  );
}

export default WordPair;
