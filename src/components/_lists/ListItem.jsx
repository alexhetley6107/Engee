import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye as Eye } from 'react-icons/fa';
import { HiTrash as Del } from 'react-icons/hi';
import { RiEditFill as Rename } from 'react-icons/ri';
import { NewListPopup, Endorse } from './../index';
import { useDispatch, useSelector } from 'react-redux';
import { deleteList } from '../../redux/slices/lists';

function ListItem({ list }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { message, isLoading, lists } = useSelector((st) => st.lists);

  const [isRename, setRename] = useState(false);
  const [isDel, setDel] = useState(false);
  const { _id, name, words } = list;

  const openFullList = () => navigate(`/lists/${_id}`);

  const openRenamePopup = (e) => {
    e.stopPropagation();
    setRename(true);
  };
  const openDeletePopup = (e) => {
    e.stopPropagation();
    setDel(true);
  };

  const handleDeleteList = () => {
    dispatch(deleteList(_id));
  };

  React.useEffect(() => {
    if (!isLoading && message) {
      setDel(false);
    }
  }, [lists]);

  return (
    <>
      <div className="listItem" onClick={openFullList}>
        <div className="listItem_wrap">
          <div className="listItem_head">
            <div className="listItem_name" onClick={openFullList}>
              {name}
            </div>
            <div className="listItem_manage">
              <p onClick={openRenamePopup}>
                <Rename />
              </p>
              <p className="listItem_del" onClick={openDeletePopup}>
                <Del />
              </p>
            </div>
          </div>

          <div className="listItem_length">
            <span>{words.length}</span> words
          </div>
          <div className="listItem_bottom">
            <p className="listItem_view">
              <Eye />
            </p>
          </div>
        </div>
      </div>

      {isRename && (
        <NewListPopup close={() => setRename(false)} listId={_id} listName={name}>
          Rename the {name} list
        </NewListPopup>
      )}
      {isDel && (
        <Endorse yes={handleDeleteList} close={() => setDel(false)} loading={isLoading}>
          Do you want to remove the {name} list?
        </Endorse>
      )}
    </>
  );
}

export default ListItem;
