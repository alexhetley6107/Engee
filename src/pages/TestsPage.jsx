import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Message, TestSet, Testing } from '../components';
import { selectAllLists } from '../redux/slices/lists';
import { selectTesting, stopTest, startTest } from '../redux/slices/tests';

function TestsPage() {
	const isTesting = useSelector(selectTesting);
	const allLists = useSelector(selectAllLists);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleStart = (words) => {
		dispatch(startTest(words));
	};
	const handleStop = () => {
		dispatch(stopTest());
	};

	return (
		<>
			{allLists.length !== 0 ? (
				isTesting ? (
					<Testing stop={handleStop} />
				) : (
					<TestSet start={handleStart} />
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

export default TestsPage;
