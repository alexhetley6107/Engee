import React, { useState } from 'react';
import { MdOutlinePlayCircleFilled as Say } from 'react-icons/md';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Endorse, Message } from './../index';
import {
	removeLearnWord,
	selectLearnWords,
	selectCurrentLearnWord,
} from './../../redux/slices/learn';

function Learning({ stop }) {
	const words = useSelector(selectLearnWords);
	const current = useSelector(selectCurrentLearnWord);

	const [isEnd, setEnd] = useState(false);
	const [isStop, setStop] = useState(false);

	const handleStopLearn = () => {
		setStop(false);
		stop();
	};

	const dispatch = useDispatch();
	const rememberWord = () => {
		if (words.length !== 1) {
			dispatch(removeLearnWord(current));
		} else {
			dispatch(removeLearnWord(current));
			setEnd(true);
		}
	};

	const navigate = useNavigate();
	const onClickEnd = () => {
		setEnd(false);
		stop();
		navigate('/tests');
	};

	function speak(text, english) {
		const message = new SpeechSynthesisUtterance();
		message.lang = english ? 'en-EN' : 'ru-Ru';
		message.text = text;
		window.speechSynthesis.speak(message);
	}

	return (
		<>
			{!isEnd ? (
				<div className='learning'>
					<p className='learning_close' onClick={() => setStop(true)}>
						×
					</p>
					<div className='learning_pair'>
						<div className='learning_word'>
							<div>{current.eng}</div>
							<p onClick={() => speak(current.eng, true)}>
								<Say />
							</p>
						</div>
						<div className='mid'>—</div>
						<div className='learning_word'>
							<div>{current.rus}</div>
							<p onClick={() => speak(current.rus, false)}>
								<Say />
							</p>
						</div>
					</div>
					<button className='learn_remBtn btn onBlack' onClick={rememberWord}>
						remember
					</button>
				</div>
			) : (
				<Message
					icon={true}
					title='Everything is learned'
					btn='test'
					onClick={onClickEnd}
					sideFunc={() => stop()}>
					Try to test yourself
				</Message>
			)}

			{isStop && (
				<Endorse yes={handleStopLearn} close={() => setStop(false)}>
					Do you want to stop learning?
				</Endorse>
			)}
		</>
	);
}

export default Learning;
