import { createSlice } from '@reduxjs/toolkit';

const getLearnsFromLS = () => {
	const data = localStorage.getItem('learnLists');
	const lists = data ? JSON.parse(data) : [];

	return lists;
};

const initialState = {
	isLearning: false,
	learnLists: getLearnsFromLS(),
	learnWords: [],
	currentLearnWord: null,
};

// сonst fetch learnlists from DB

export const learnSlice = createSlice({
	name: 'learn',
	initialState,
	reducers: {
		startLearn(state, action) {
			state.isLearning = true;
			state.learnWords = action.payload;
			state.currentLearnWord =
				state.learnWords[Math.floor(Math.random() * state.learnWords.length)];
		},
		stopLearn(state) {
			state.isLearning = false;
			state.learnWords = [];
		},
		toggleLearnList(state, action) {
			const list = action.payload;

			if (!state.learnLists.includes(list)) {
				state.learnLists = [...state.learnLists, list];
			} else {
				state.learnLists = state.learnLists.filter((l) => l !== list);
			}
		},
		chooseAllLearnLists(state, action) {
			state.learnLists = action.payload;
		},
		removeLearnWord(state, action) {
			state.learnWords = state.learnWords.filter((word) => word.eng !== action.payload.eng);
			state.currentLearnWord =
				state.learnWords[Math.floor(Math.random() * state.learnWords.length)];
		},
	},
});

export const selectLearning = (state) => state.learn.isLearning;
export const selectLearnLists = (state) => state.learn.learnLists;
export const selectLearnWords = (state) => state.learn.learnWords;
export const selectCurrentLearnWord = (state) => state.learn.currentLearnWord;

export const { startLearn, stopLearn, toggleLearnList, chooseAllLearnLists, removeLearnWord } =
	learnSlice.actions;

export default learnSlice.reducer;
