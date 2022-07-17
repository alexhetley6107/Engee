import React, { useState } from 'react';
import { LearnSet } from '../components';
import { Learning } from '../components';

function LearnPage() {
	const [isLeaning, setLearning] = useState(false);

	return (
		<>
			{isLeaning ? (
				<Learning stop={() => setLearning(false)} />
			) : (
				<LearnSet start={() => setLearning(true)} />
			)}
		</>
	);
}

export default LearnPage;
