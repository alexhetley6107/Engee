export const saveToLS = (key, saveObj) => {
	const json = JSON.stringify(saveObj);

	localStorage.setItem(key, json);
};

export const getFromLS = (key, defaultValue) => {
	const data = localStorage.getItem(key);
	const obj = data ? JSON.parse(data) : defaultValue;

	return obj;
};
