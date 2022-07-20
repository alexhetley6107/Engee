import { createSlice } from '@reduxjs/toolkit';

const getTestsFromLS = () => {
	const data = localStorage.getItem('testLists');
	const lists = data ? JSON.parse(data) : [];

	return lists;
};

const initialState = {
	isTesting: false,
	originMode: true,
	testLists: getTestsFromLS(),
	testWords: [],
	questWord: null,
};

export const testSlice = createSlice({
	name: 'tests',
	initialState,
	reducers: {
		startTest(state, action) {
			state.isTesting = true;
			state.testWords = action.payload;
			state.questWord = state.testWords[Math.floor(Math.random() * state.testWords.length)];
		},
		stopTest(state) {
			state.isTesting = false;
			state.testWords = [];
		},
		toggleTestList(state, action) {
			const list = action.payload;

			if (!state.testLists.includes(list)) {
				state.testLists = [...state.testLists, list];
			} else {
				state.testLists = state.testLists.filter((l) => l !== list);
			}
		},
		toggleMode(state) {
			state.originMode = !state.originMode;
		},
		chooseAllTestLists(state, action) {
			state.testLists = action.payload;
		},
		//remove word from test because user correctly translated the word
		removeTestWord(state, action) {
			state.testWords = state.testWords.filter((word) => word.eng !== action.payload.eng);
		},
		setNewQuestWord(state) {
			state.questWord = state.testWords[Math.floor(Math.random() * state.testWords.length)];
		},
	},
});

export const selectTesting = (state) => state.tests.isTesting;
export const selectTestLists = (state) => state.tests.testLists;
export const selectMode = (state) => state.tests.originMode;
export const selectTestWords = (state) => state.tests.testWords;
export const selectQuestWord = (state) => state.tests.questWord;

export const {
	startTest,
	stopTest,
	toggleTestList,
	toggleMode,
	chooseAllTestLists,
	removeTestWord,
	setNewQuestWord,
} = testSlice.actions;

export default testSlice.reducer;
