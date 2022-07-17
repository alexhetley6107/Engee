import React, { useState } from 'react';
import { GiNothingToSay as Say } from 'react-icons/gi';
import Endorse from '../Endorse';

function Learning({ stop }) {
	const [isEndLearn, setEndLearn] = useState(false);

	const handleStopLearn = () => {
		setEndLearn(false);
		stop();
	};

	return (
		<div className='learning'>
			<p className='learning_close' onClick={() => setEndLearn(true)}>
				×
			</p>
			<div className='learning_pair'>
				<div className='learning_word'>
					<div>reds</div>
					<p>
						<Say />
					</p>
				</div>
				<div className='mid'>—</div>
				<div className='learning_word'>
					<div>красный</div>
					<p>
						<Say />
					</p>
				</div>
			</div>
			<div className='learn_startBtn btn onBlack'>remember</div>

			{isEndLearn && (
				<Endorse yes={handleStopLearn} close={() => setEndLearn(false)}>
					Do you want to stop learning?
				</Endorse>
			)}
		</div>
	);
}

export default Learning;
