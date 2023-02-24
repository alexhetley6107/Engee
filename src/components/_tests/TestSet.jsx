import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { LangMode, PopUp, IconList } from './../index';
import { selectAllLists } from './../../redux/slices/lists';
import { chooseAllTestLists, selectTestLists, toggleTestList } from './../../redux/slices/tests';
import getSessionWords from '../../utils/getSessionWords';

function TestSet({ start }) {
  const allLists = useSelector(selectAllLists);
  const testLists = useSelector(selectTestLists);

  const [isAlert, setAlert] = useState(false);

  const dispatch = useDispatch();

  const onClickStart = () => {
    const words = getSessionWords(testLists, allLists);
    if (words.length !== 0) {
      start(words);
    } else {
      setAlert(true);
    }
  };

  const chooseAll = () => {
    const names = allLists?.map((item) => item.name);
    dispatch(chooseAllTestLists(names));
  };

  return (
    <>
      <div className="learn">
        <div className="learn_head">
          <div className="learn_desc">Choose lists for testing</div>
          <button
            disabled={testLists?.length === allLists?.length}
            className="learn_allBtn btn onBlack"
            onClick={chooseAll}
          >
            all
          </button>
        </div>
        <div className="learn_items">
          {allLists?.map((l) => (
            <IconList key={l._id} list={l} sessionArray={testLists} toggle={toggleTestList} />
          ))}
        </div>
        <div className="tests_btns">
          <LangMode />
          <button
            disabled={testLists.length === 0}
            className="learn_startBtn btn onBlack "
            onClick={onClickStart}
          >
            start
          </button>
        </div>
      </div>

      {isAlert && (
        <PopUp close={() => setAlert(false)}>
          <div className="alert">
            <p>Choosen lists have no words</p>
            <div className="btn onWhite" onClick={() => setAlert(false)}>
              ok
            </div>
          </div>
        </PopUp>
      )}
    </>
  );
}

export default TestSet;
