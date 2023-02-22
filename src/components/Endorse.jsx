import React from 'react';
import MyBtn from './MyBtn';
import PopUp from './PopUp';

function Endorse({ children, close, yes, loading }) {
  const handleYes = () => {
    if (loading) return;
    yes();
  };
  const handleNo = () => {
    if (loading) return;
    close();
  };

  return (
    <PopUp close={close}>
      <div className="endorse_title">{children}</div>
      <div className="endorse_btns">
        <MyBtn className="onWhite" onClick={handleYes} loading={loading}>
          yes
        </MyBtn>
        <div className="btn onWhite" onClick={handleNo}>
          no
        </div>
      </div>
    </PopUp>
  );
}

export default Endorse;
