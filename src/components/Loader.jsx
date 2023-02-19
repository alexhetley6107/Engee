import React from 'react';
import { Bars } from 'react-loader-spinner';

function Loader() {
  return <Bars height="100" width="100" color="#fff" visible={true} />;
}

export default Loader;
