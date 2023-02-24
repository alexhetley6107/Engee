import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IconList, MyBtn, PopUp } from '../index';
import { toggleLearnList, chooseAllLearnLists, startLearning } from './../../redux/slices/learn';

function LearnSet() {
  const dispatch = useDispatch();
  const { lists } = useSelector((st) => st.lists);
  const { learnLists, isLoading } = useSelector((st) => st.learn);
  const [isAlert, setAlert] = useState(false);

  const onClickStart = () => {
    const wordsAmount = lists
      .filter((l) => learnLists.includes(l._id))
      .map((l) => l.words.length)
      .reduce((sum, a) => sum + a, 0);

    if (wordsAmount > 0) {
      const listIds = JSON.stringify(learnLists);
      dispatch(startLearning(listIds));
    } else {
      setAlert(true);
    }
  };

  const chooseAll = () => {
    const listIds = lists?.map((item) => item._id);
    dispatch(chooseAllLearnLists(listIds));
  };

  return (
    <>
      <div className="learn">
        <div className="learn_head">
          <div className="learn_desc">Choose lists for learning</div>
          <button
            disabled={learnLists.length === lists?.length}
            className="learn_allBtn btn onBlack"
            onClick={chooseAll}
          >
            all
          </button>
        </div>
        <div className="learn_items">
          {lists?.map((l) => (
            <IconList key={l._id} list={l} sessionArray={learnLists} toggle={toggleLearnList} />
          ))}
        </div>
        <MyBtn
          disabled={learnLists.length === 0}
          className="onBlack"
          onClick={onClickStart}
          loading={isLoading}
        >
          start
        </MyBtn>
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

export default LearnSet;
