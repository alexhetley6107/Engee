import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { Endorse, PopUp, Message } from './../index';
import {
  removeTestWord,
  selectMode,
  selectTestWords,
  selectQuestWord,
  setNewQuestWord,
  stopTest,
} from '../../redux/slices/tests';

function Testing() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const input = useRef();

  const words = useSelector(selectTestWords);
  const origin = useSelector(selectMode);
  const quest = useSelector(selectQuestWord);

  const [isEnd, setEnd] = useState(false);
  const [isStop, setStop] = useState(false);
  const [isHintBtn, setHintBtn] = useState(false);
  const [isAlert, setAlert] = useState(false);
  const [isRight, setRight] = useState(false);
  const [isWrong, setWrong] = useState(false);

  const handleStopTest = () => {
    setStop(false);
    dispatch(stopTest());
  };

  const checkWord = () => {
    const answer = input.current.value.trim().toLowerCase();
    const rightAnswer = origin ? quest.rus : quest.eng;

    if (answer === '') return;

    if (answer === rightAnswer) {
      if (words.length === 1) {
        dispatch(removeTestWord(quest));
        setEnd(true);
      } else {
        dispatch(removeTestWord(quest));
        setRight(true);
      }
    } else {
      setWrong(true);
      setHintBtn(true);
    }
  };

  const showNext = () => {
    dispatch(setNewQuestWord());
    setRight(false);
    setHintBtn(false);
  };

  const onClickEnd = () => {
    setEnd(false);
    dispatch(stopTest());

    navigate('/lists');
  };
  const makeHint = () => {
    const word = origin ? quest.rus : quest.eng;
    const half = Math.ceil(word.length / 2);
    let hint = '';

    for (let i = 0; i < word.length; i++) {
      if (i < half) {
        hint = hint + word[i];
      } else {
        hint = hint + '*';
      }
    }

    return hint;
  };
  const onPressEnter = (e) => {
    if (e.key === 'Enter') {
      checkWord();
    }
  };

  useEffect(() => {
    input.current?.focus();
  });

  return (
    <>
      {!isRight && !isWrong && !isEnd && (
        <div className="testing">
          <p className="testing_close" onClick={() => setStop(true)}>
            ×
          </p>
          <div className="testing_quest">{origin ? quest.eng : quest.rus} - ...</div>
          <div className="testing_form">
            <input ref={input} type="text" placeholder="translate..." onKeyDown={onPressEnter} />
            <div className="testing_Btns">
              <button
                className="testing_hintBtn btn onBlack"
                disabled={!isHintBtn}
                onClick={() => setAlert(true)}
              >
                hint
              </button>

              <button className="testing_checkBtn btn onBlack" onClick={checkWord}>
                check
              </button>
            </div>
          </div>
          <button
            className="testing_nextBtn btn onBlack"
            disabled={words.length <= 1}
            onClick={showNext}
          >
            next
          </button>
        </div>
      )}

      {isRight && !isEnd && (
        <Message icon={true} title="Right" btn="next" onClick={showNext} sideFunc={null}>
          Your answer is right.
          <br /> Try next
        </Message>
      )}

      {isWrong && (
        <Message
          icon={false}
          title="Wrong"
          btn="try"
          onClick={() => setWrong(false)}
          sideFunc={null}
        >
          Let's try again. <br /> You can use the hint
        </Message>
      )}

      {isStop && (
        <Endorse yes={handleStopTest} close={() => setStop(false)}>
          Do you want to stop testing?
        </Endorse>
      )}

      {isAlert && (
        <PopUp yes={handleStopTest} close={() => setAlert(false)}>
          <div className="alert">
            <p>{makeHint()}</p>
            <div className="testing_nextBtn btn active onWhite" onClick={() => setAlert(false)}>
              ok
            </div>
          </div>
        </PopUp>
      )}

      {isEnd && (
        <Message
          icon={true}
          title="You are awesome"
          btn="lists"
          onClick={onClickEnd}
          sideFunc={handleStopTest}
        >
          All words are checked. <br />
          Add words to your lists and improve your skills
        </Message>
      )}
    </>
  );
}

export default Testing;
