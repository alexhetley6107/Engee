const getSessionWords = (namesArray, allLists) => {
	let sessionWords = [];

	namesArray.forEach((str) => {
		const list = allLists.find((list) => list.name === str);
		sessionWords = [...sessionWords, ...list.words];
	});

	return sessionWords;
};

export default getSessionWords;
