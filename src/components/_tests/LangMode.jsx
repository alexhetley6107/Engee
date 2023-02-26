import React from 'react';
import {
  BsFillArrowRightCircleFill as Right,
  BsFillArrowLeftCircleFill as Left,
} from 'react-icons/bs';
import { useSelector, useDispatch } from 'react-redux';

import { toggleMode } from '../../redux/slices/tests';

function LangMode() {
  const { isEngMode } = useSelector((st) => st.tests);

  const dispatch = useDispatch();

  const onClickMode = () => dispatch(toggleMode());

  return (
    <div className={`langMode ${isEngMode ? '' : 'active'}`} onClick={onClickMode}>
      <p>EN </p>
      <p className="arrow">{isEngMode ? <Right /> : <Left />}</p>
      <p> RU</p>
    </div>
  );
}

export default LangMode;
