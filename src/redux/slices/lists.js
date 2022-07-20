import { createSlice } from '@reduxjs/toolkit';
import defaultLists from './../defaultLists';

const getListsFromLS = () => {
	const data = localStorage.getItem('allLists');
	const lists = data ? JSON.parse(data) : defaultLists;

	return lists;
};

const initialState = {
	lists: getListsFromLS(),
};

export const listSlice = createSlice({
	name: 'lists',
	initialState,
	reducers: {
		createList(state, action) {
			state.lists = [action.payload, ...state.lists];
		},
		renameList(state, action) {
			state.lists.map((list) =>
				list.name === action.payload.oldName ? (list.name = action.payload.newName) : list,
			);
		},
		removeList(state, action) {
			state.lists = state.lists.filter((list) => list.name !== action.payload);
		},
		getDefault(state) {
			state.lists = defaultLists;
		},
		addWord(state, action) {
			const obj = action.payload;
			// obj = { listName, wordPair}

			state.lists = state.lists.map((list) =>
				list.name === obj.listName ? { ...list, words: [obj.wordPair, ...list.words] } : list,
			);
		},
		editWord(state, action) {
			const { listName, engOld, engNew, rusNew } = action.payload;

			state.lists = state.lists.map((list) =>
				list.name === listName
					? {
							...list,
							words: list.words.map((word) =>
								word.eng === engOld ? { eng: engNew, rus: rusNew } : word,
							),
					  }
					: list,
			);
		},
		deleteWord(state, action) {
			const obj = action.payload;
			// obj = { listName, eng}

			state.lists = state.lists.map((list) =>
				list.name === obj.listName
					? { ...list, words: list.words.filter((word) => word.eng !== obj.eng) }
					: list,
			);
		},
	},
});

export const selectAllLists = (state) => state.lists.lists;

export const { createList, renameList, removeList, addWord, editWord, deleteWord, getDefault } =
	listSlice.actions;

export default listSlice.reducer;
