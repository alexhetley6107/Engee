import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LearnSet, Learning, Message } from './../components/index';
import ListsProvider from '../providers/ListsProvider';

function LearnPage() {
  const { isLearning } = useSelector((st) => st.learn);
  const { lists } = useSelector((st) => st.lists);

  const navigate = useNavigate();

  return (
    <ListsProvider>
      {lists?.length !== 0 ? (
        isLearning ? (
          <Learning />
        ) : (
          <LearnSet />
        )
      ) : (
        <Message
          icon={false}
          title="No lists"
          btn="lists"
          onClick={() => navigate('/lists')}
          sideFunc={undefined}
        >
          Create your own lists or get default
        </Message>
      )}
    </ListsProvider>
  );
}

export default LearnPage;
