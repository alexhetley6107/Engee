import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createNewList, renameList, setMessage } from '../../redux/slices/lists';
import MyBtn from '../MyBtn';
import PopUp from '../PopUp';

function NewListPopup({ close, children, listId, listName }) {
  const dispatch = useDispatch();
  const { lists, isLoading, message } = useSelector((st) => st.lists);

  const [value, setValue] = useState(listName ?? '');
  const onChangeName = (e) => setValue(e.target.value.trim());

  const handleOK = () => {
    if (listName === value) {
      close();
      return;
    }

    const allNames = lists.map((l) => l.name);

    if (allNames.includes(value)) {
      dispatch(setMessage('Such lists is already exists'));
    } else {
      if (listId) {
        const dto = { id: listId, name: value };
        dispatch(renameList(dto));
      } else {
        dispatch(createNewList(value));
      }
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
      <p>{children}</p>
      <input value={value} onChange={onChangeName} type="text" placeholder="name of list" />
      <MyBtn className="onWhite" onClick={handleOK} disabled={!value} loading={isLoading}>
        ok
      </MyBtn>
    </PopUp>
  );
}

export default NewListPopup;
