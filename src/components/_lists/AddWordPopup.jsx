import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNewWord, editWord, setMessage } from '../../redux/slices/lists';
import MyBtn from '../MyBtn';
import PopUp from '../PopUp';

function AddWordPopup({ children, close, listId, word }) {
  const dispatch = useDispatch();

  const { fullListWords, isLoading, message } = useSelector((st) => st.lists);

  const [engValue, setEngValue] = useState(word?.eng ?? '');
  const [rusValue, setRusValue] = useState(word?.rus ?? '');
  const onChangeEng = (e) => setEngValue(e.target.value.trim().toLowerCase());
  const onChangeRus = (e) => setRusValue(e.target.value.trim().toLowerCase());

  const handleOK = () => {
    if (word?.eng === engValue && word?.rus === rusValue) {
      close();
      return;
    }

    const isExist = fullListWords.map((w) => w.eng)?.find((w) => w === engValue);

    if (isExist) {
      dispatch(setMessage('Such word is already added.'));
    } else {
      if (word) {
        const dto = { id: word?._id, eng: engValue, rus: rusValue };
        dispatch(editWord(dto));
      } else {
        const dto = { listId, eng: engValue, rus: rusValue };
        dispatch(addNewWord(dto));
      }
    }
  };

  const handleClose = () => {
    if (isLoading) return;
    close();
  };

  React.useEffect(() => {
    if (!isLoading && message) handleClose();
  }, [fullListWords]);

  return (
    <PopUp close={handleClose}>
      <div>{children}</div>

      <input value={engValue} onChange={onChangeEng} type="text" placeholder="english" />
      <input value={rusValue} onChange={onChangeRus} type="text" placeholder="russian" />
      <MyBtn
        className="onWhite"
        onClick={handleOK}
        loading={isLoading}
        disabled={!engValue || !rusValue}
      >
        ok
      </MyBtn>
    </PopUp>
  );
}

export default AddWordPopup;
