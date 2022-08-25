import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { IconList, PopUp } from '../index';
import { selectAllLists } from './../../redux/slices/lists';
import { selectLearnLists, toggleLearnList, chooseAllLearnLists } from './../../redux/slices/learn';
import getSessionWords from '../../utils/getSessionWords';

function LearnSet({ start }) {
	const allLists = useSelector(selectAllLists);
	const learnLists = useSelector(selectLearnLists);
	const [isAlert, setAlert] = useState(false);

	const onClickStart = () => {
		const words = getSessionWords(learnLists, allLists);
		if (words.length !== 0) {
			start(words);
		} else {
			setAlert(true);
		}
	};

	const dispatch = useDispatch();
	const chooseAll = () => {
		const names = allLists.map((item) => item.name);
		dispatch(chooseAllLearnLists(names));
	};

	/* useEffect(() => {
		const saves = [];
		const names = allLists.map((l) => l.name);

		learnLists.forEach((listName) => {
			if (names.includes(listName)) {
				saves.push(listName);
			}
		});

		const json = JSON.stringify(saves);
		localStorage.setItem('learnLists', json);
	}, [learnLists, allLists]); */

	return (
		<>
			<div className='learn'>
				<div className='learn_head'>
					<div className='learn_desc'>Choose lists for learning</div>
					<button
						disabled={learnLists.length === allLists.length}
						className='learn_allBtn btn onBlack'
						onClick={chooseAll}>
						all
					</button>
				</div>
				<div className='learn_items'>
					{allLists.map((item) => (
						<IconList
							key={item.name}
							item={item}
							sessionArray={learnLists}
							toggle={toggleLearnList}
						/>
					))}
				</div>
				<button
					disabled={learnLists.length === 0}
					className='learn_startBtn btn onBlack'
					onClick={onClickStart}>
					start
				</button>
			</div>

			{isAlert && (
				<PopUp close={() => setAlert(false)}>
					<div className='alert'>
						<p>Choosen lists have no words</p>
						<div className='btn onWhite' onClick={() => setAlert(false)}>
							ok
						</div>
					</div>
				</PopUp>
			)}
		</>
	);
}

export default LearnSet;
