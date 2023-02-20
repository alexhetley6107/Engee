import React, { useState } from 'react';
import { HiTrash as Del } from 'react-icons/hi';
import { RiEditFill as Edit } from 'react-icons/ri';
import { useDispatch } from 'react-redux';

import { editWord, deleteWord } from '../../redux/slices/lists';
import { Endorse, AddWordPopup } from './../index';

function WordPair({ _id, eng, rus, list }) {
  const dispatch = useDispatch();

  const [isEdit, setEdit] = useState(false);
  const [isDel, setDel] = useState(false);

  // const { lists, pageLoading, fullListWords } = useSelector((st) => st.lists);

  const handleEditWord = (engNew, rusNew) => {
    // const listName = list.name;
    // const engOld = word.eng;
    // dispatch(editWord({ listName, engOld, engNew, rusNew }));
  };

  const handleDeleteWord = (eng) => {
    // const listName = list.name;
    // dispatch(deleteWord({ listName, eng }));
  };

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
        <AddWordPopup ok={handleEditWord} close={() => setEdit(false)} list={list}>
          Edit the pair
        </AddWordPopup>
      )}

      {isDel && (
        <Endorse yes={() => handleDeleteWord(eng)} close={() => setDel(false)}>
          Do you want to delete the pair?
        </Endorse>
      )}
    </>
  );
}

export default WordPair;
