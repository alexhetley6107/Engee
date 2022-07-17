import React, { useState } from 'react';
import { BiToggleLeft as On, BiToggleRight as Off } from 'react-icons/bi';

function IconList() {
	const [isOn, setOn] = useState(true);

	return (
		<div className={isOn ? 'icon ' : 'icon unactive'} onClick={() => setOn(!isOn)}>
			<div className='icon_wrap'>
				<div className='icon_desc'>
					<div className='icon_name'>Numberssss</div>
					<div className='icon_words'>
						<span>30</span> words
					</div>
				</div>
				<p className={isOn ? '' : 'black'}>{isOn ? <On /> : <Off />}</p>
			</div>
		</div>
	);
}

export default IconList;
