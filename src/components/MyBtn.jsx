import React from 'react';
import { Bars } from 'react-loader-spinner';

function MyBtn({ children, loading, onClick, disabled }) {
  return (
    <button disabled={disabled} className="btn onWhite" onClick={onClick}>
      {loading ? <Bars height="35" width="70" color="#fff" visible={true} /> : children}
    </button>
  );
}

export default MyBtn;
