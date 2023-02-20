import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye as Eye } from 'react-icons/fa';
import { HiTrash as Del } from 'react-icons/hi';
import { RiEditFill as Rename } from 'react-icons/ri';
import { useDispatch } from 'react-redux';

import { NewListPopup, Endorse } from './../index';
import { removeList, renameList } from '../../redux/slices/lists';

function ListItem({ item, lists }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isRename, setRename] = useState(false);
  const [isDel, setDel] = useState(false);
  const { _id, name, words } = item;

  const openFullList = () => {
    navigate(`/lists/${_id}`);
  };

  const remove = () => {
    // dispatch(removeList(name));
  };

  const rename = (newName) => {
    // const oldName = name;
    // dispatch(renameList({ oldName, newName }));
  };

  return (
    <>
      <div className="listItem">
        <div className="listItem_wrap">
          <div className="listItem_head">
            <div className="listItem_name" onClick={openFullList}>
              {name}
            </div>
            <div className="listItem_manage">
              <p onClick={() => setRename(true)}>
                <Rename />
              </p>
              <p className="listItem_del" onClick={() => setDel(true)}>
                <Del />
              </p>
            </div>
          </div>

          <div className="listItem_length" onClick={openFullList}>
            <span>{words.length}</span> words
          </div>
          <div className="listItem_bottom" onClick={openFullList}>
            <p className="listItem_view">
              <Eye />
            </p>
          </div>
        </div>
      </div>

      {isRename && (
        <NewListPopup ok={rename} close={() => setRename(false)} lists={lists}>
          Rename the {name} list
        </NewListPopup>
      )}
      {isDel && (
        <Endorse yes={remove} close={() => setDel(false)}>
          Do you want to remove the {name} list?
        </Endorse>
      )}
    </>
  );
}

export default ListItem;
