import React, { useState } from 'react';
import { Message, TestSet, Testing } from '../components';

function TestsPage() {
	const [isTesting, setTesting] = useState(false);

	return (
		<>
			{isTesting ? (
				<Testing stop={() => setTesting(false)} />
			) : (
				<TestSet start={() => setTesting(true)} />
			)}

			{/* <Message icon={true} title='Right' text='You are awesome. Go on! ' btn='next' onClick={{}} /> */}
		</>
	);
}

export default TestsPage;
