import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BsFillPlusCircleFill as Plus, BsFillArrowLeftCircleFill as Arrow } from 'react-icons/bs';
import { useSelector, useDispatch } from 'react-redux';

import { AddWordPopup, WordPair } from '../components';
import { addWord, selectAllLists } from '../redux/slices/lists';

function FullList() {
	const [isAdd, setAdd] = useState(false);
	const allLists = useSelector(selectAllLists);

	const { name } = useParams();
	const [list] = allLists.filter((l) => l.name === name);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const backToLists = () => {
		navigate('/Engee/lists');
	};

	const handleAddWord = (eng, rus) => {
		const listName = name;
		const wordPair = { eng, rus };
		dispatch(addWord({ listName, wordPair }));
	};

	return (
		<>
			<div className='full'>
				<div className='full_head'>
					<div className='full_btns'>
						<p onClick={backToLists}>
							<Arrow />
						</p>
						<p onClick={() => setAdd(true)}>
							<Plus />
						</p>
					</div>
					<div className='full_info'>
						{list.name} : <span>{list.words.length}</span> words
					</div>
				</div>
				<div className='full_words'>
					{list.words.length === 0 ? (
						<div className='full_empty'>Empty list</div>
					) : (
						list.words.map((word) => <WordPair key={word.eng} word={word} list={list} />)
					)}
				</div>
			</div>

			{isAdd && (
				<AddWordPopup ok={handleAddWord} close={() => setAdd(false)} list={list}>
					Add new pair of words
				</AddWordPopup>
			)}
		</>
	);
}

export default FullList;
