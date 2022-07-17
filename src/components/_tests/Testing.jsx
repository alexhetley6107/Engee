import React, { useState } from 'react';
import { Endorse, PopUp } from './../index';

function Testing({ stop }) {
	const [isEndTest, setEndTest] = useState(false);
	const [isHideHint, setHideHint] = useState(true);
	const [isAlert, setAlert] = useState(false);

	const handleStopTest = () => {
		setEndTest(false);
		stop();
	};

	return (
		<div className='testing'>
			<p className='testing_close' onClick={() => setEndTest(true)}>
				×
			</p>
			<div className='testing_quest'>direction - ...</div>
			<div className='testing_form'>
				<input type='text' placeholder='translate...' />
				<div className='testing_Btns'>
					<div className='testing_hintBtn btn active onBlack' onClick={() => setAlert(true)}>
						hint
					</div>
					<div className='testing_checkBtn btn onBlack'>check</div>
				</div>
			</div>
			<div className='testing_nextBtn btn onBlack'>next</div>

			{isEndTest && (
				<Endorse yes={handleStopTest} close={() => setEndTest(false)}>
					Do you want to stop testing?
				</Endorse>
			)}

			{isAlert && (
				<PopUp yes={handleStopTest} close={() => setAlert(false)}>
					<div className='alert'>
						<p>redf****</p>
						<div className='testing_nextBtn btn active onWhite' onClick={() => setAlert(false)}>
							ok
						</div>
					</div>
				</PopUp>
			)}
		</div>
	);
}

export default Testing;
