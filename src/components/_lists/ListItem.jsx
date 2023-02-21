import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye as Eye } from 'react-icons/fa';
import { HiTrash as Del } from 'react-icons/hi';
import { RiEditFill as Rename } from 'react-icons/ri';
import { NewListPopup, Endorse } from './../index';

function ListItem({ list }) {
  const navigate = useNavigate();

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

  const remove = () => {};

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
        <Endorse yes={remove} close={() => setDel(false)}>
          Do you want to remove the {name} list?
        </Endorse>
      )}
    </>
  );
}

export default ListItem;
