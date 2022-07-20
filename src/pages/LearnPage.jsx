import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { LearnSet, Learning, Message } from './../components/index';
import { selectLearning, startLearn, stopLearn } from '../redux/slices/learn';
import { selectAllLists } from '../redux/slices/lists';

function LearnPage() {
	const isLeaning = useSelector(selectLearning);
	const allLists = useSelector(selectAllLists);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleStart = (words) => {
		dispatch(startLearn(words));
	};
	const handleStop = () => {
		dispatch(stopLearn());
	};

	return (
		<>
			{allLists.length !== 0 ? (
				isLeaning ? (
					<Learning stop={handleStop} />
				) : (
					<LearnSet start={handleStart} />
				)
			) : (
				<Message
					icon={false}
					title='No lists'
					btn='lists'
					onClick={() => navigate('/lists')}
					sideFunc={undefined}>
					Create your own lists or get default
				</Message>
			)}
		</>
	);
}

export default LearnPage;
