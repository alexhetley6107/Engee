import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Message, TestSet, Testing } from '../components';
import ListsProvider from '../providers/ListsProvider';

function TestsPage() {
  const { isTesting } = useSelector((st) => st.tests);
  const { lists } = useSelector((st) => st.lists);

  const navigate = useNavigate();

  return (
    <ListsProvider>
      {lists?.length !== 0 ? (
        isTesting ? (
          <Testing />
        ) : (
          <TestSet />
        )
      ) : (
        <Message icon={false} title="No lists" btn="lists" onClick={() => navigate('/lists')}>
          Create your own lists or get default
        </Message>
      )}
    </ListsProvider>
  );
}

export default TestsPage;
