import React, { useState, useEffect } from 'react';
import { BiToggleLeft as On, BiToggleRight as Off } from 'react-icons/bi';
import { useDispatch } from 'react-redux';

function IconList({ list, sessionArray, toggle }) {
  const { _id, name, words } = list;

  const [isOn, setOn] = useState(sessionArray.includes(_id));

  const dispatch = useDispatch();
  const handleChange = () => {
    setOn(!isOn);
    dispatch(toggle(_id));
  };

  useEffect(() => {
    setOn(sessionArray.includes(_id));
  }, [sessionArray]);

  return (
    <div className={isOn ? 'icon ' : 'icon unactive'} onClick={handleChange}>
      <div className="icon_wrap">
        <div className="icon_desc">
          <div className="icon_name">{name}</div>
          <div className="icon_words">
            <span>{words.length}</span> words
          </div>
        </div>
        <p className={isOn ? '' : 'black'}>{isOn ? <On /> : <Off />}</p>
      </div>
    </div>
  );
}

export default IconList;
