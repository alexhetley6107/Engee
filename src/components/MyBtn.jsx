import React from 'react';
import { Bars } from 'react-loader-spinner';

function MyBtn({ children, loading, onClick, disabled, className }) {
  return (
    <button disabled={disabled} className={`${className} my_btn `} onClick={onClick}>
      {children}

      {loading && (
        <div
          className="loader"
          style={{
            backgroundColor: className === 'onWhite' ? '#000' : '#fff',
          }}
        >
          <Bars
            height="35"
            width="70"
            color={className === 'onWhite' ? '#fff' : '#000'}
            visible={true}
          />
        </div>
      )}
    </button>
  );
}

export default MyBtn;
