import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { LangMode, PopUp, IconList, MyBtn } from './../index';
import { chooseAllTestLists, startTesting, toggleTestList } from './../../redux/slices/tests';

function TestSet() {
  const dispatch = useDispatch();
  const { lists } = useSelector((st) => st.lists);
  const { testLists, isLoading } = useSelector((st) => st.tests);

  const [isAlert, setAlert] = useState(false);

  const onClickStart = () => {
    const wordsAmount = lists
      .filter((l) => testLists.includes(l._id))
      .map((l) => l.words.length)
      .reduce((sum, a) => sum + a, 0);

    if (wordsAmount > 0) {
      const listIds = JSON.stringify(testLists);
      dispatch(startTesting(listIds));
    } else {
      setAlert(true);
    }
  };

  const chooseAll = () => {
    const listIds = lists?.map((item) => item._id);
    dispatch(chooseAllTestLists(listIds));
  };

  return (
    <>
      <div className="learn">
        <div className="learn_head">
          <div className="learn_desc">Choose lists for testing</div>
          <button
            disabled={testLists?.length === lists?.length}
            className="learn_allBtn btn onBlack"
            onClick={chooseAll}
          >
            all
          </button>
        </div>
        <div className="learn_items">
          {lists?.map((l) => (
            <IconList key={l._id} list={l} sessionArray={testLists} toggle={toggleTestList} />
          ))}
        </div>
        <div className="tests_btns">
          <LangMode />
          <MyBtn
            disabled={testLists.length === 0}
            className="onBlack"
            onClick={onClickStart}
            loading={isLoading}
          >
            start
          </MyBtn>
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
