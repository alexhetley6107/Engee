import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createNewList, setMessage } from '../../redux/slices/lists';
import MyBtn from '../MyBtn';
import PopUp from '../PopUp';

function NewListPopup({ close }) {
  const dispatch = useDispatch();
  const { lists, isLoading, message } = useSelector((st) => st.lists);

  const [value, setValue] = useState('');
  const onChangeName = (e) => setValue(e.target.value.trim());

  const handleOK = () => {
    const allNames = lists.map((l) => l.name);

    if (allNames.includes(value)) {
      dispatch(setMessage('Such lists is already exists'));
    } else {
      dispatch(createNewList(value));
    }
  };

  const handleClose = () => {
    if (isLoading) return;
    close();
  };

  React.useEffect(() => {
    if (!isLoading && message) handleClose();
  }, [lists]);

  return (
    <PopUp close={handleClose}>
      <p>Create new list</p>
      <input value={value} onChange={onChangeName} type="text" placeholder="name of list" />
      <MyBtn className="onWhite" onClick={handleOK} disabled={!value} loading={isLoading}>
        ok
      </MyBtn>
    </PopUp>
  );
}

export default NewListPopup;
