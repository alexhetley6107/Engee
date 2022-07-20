import React, { useState, useEffect } from 'react';
import { BiToggleLeft as On, BiToggleRight as Off } from 'react-icons/bi';
import { useDispatch } from 'react-redux';

function IconList({ item, sessionArray, toggle }) {
	const name = item.name;
	const length = item.words.length;

	const [isOn, setOn] = useState(sessionArray.includes(name));

	const dispatch = useDispatch();
	const handleChange = () => {
		setOn(!isOn);
		dispatch(toggle(name));
	};

	useEffect(() => {
		setOn(sessionArray.includes(name));
	}, [sessionArray]);

	return (
		<div className={isOn ? 'icon ' : 'icon unactive'} onClick={handleChange}>
			<div className='icon_wrap'>
				<div className='icon_desc'>
					<div className='icon_name'>{name}</div>
					<div className='icon_words'>
						<span>{length}</span> words
					</div>
				</div>
				<p className={isOn ? '' : 'black'}>{isOn ? <On /> : <Off />}</p>
			</div>
		</div>
	);
}

export default IconList;
