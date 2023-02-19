import React from 'react';

function MyBtn({ children, loading, onClick, disabled }) {
  return (
    <button disabled={disabled} className="btn onWhite" onClick={onClick}>
      {loading ? 'loading...' : children}
    </button>
  );
}

export default MyBtn;
