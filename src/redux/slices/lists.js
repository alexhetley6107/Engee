import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import defaultLists from './../defaultLists';
import { getFromLS, saveToLS } from '../../utils/localStorage';
import axiosBase from '../../utils/axiosBase';

const initialState = {
  lists: null, // null | []
  message: null,
  initLoading: false,
  isLoading: false,
};

export const getUserLists = createAsyncThunk('lists/getUserLists', async () => {
  try {
    const { data } = await axiosBase.get('/list');
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const listSlice = createSlice({
  name: 'lists',
  initialState,
  reducers: {
    createList(state, action) {
      state.lists = [action.payload, ...state.lists];

      saveToLS('allLists', state.lists);
    },
    renameList(state, action) {
      state.lists.map((list) =>
        list.name === action.payload.oldName ? (list.name = action.payload.newName) : list
      );

      saveToLS('allLists', state.lists);
    },
    removeList(state, action) {
      state.lists = state.lists.filter((list) => list.name !== action.payload);
      saveToLS('allLists', state.lists);
    },
    getDefault(state) {
      state.lists = defaultLists;
      saveToLS('allLists', state.lists);
    },
    addWord(state, action) {
      const obj = action.payload;
      // obj = { listName, wordPair}

      state.lists = state.lists.map((list) =>
        list.name === obj.listName ? { ...list, words: [obj.wordPair, ...list.words] } : list
      );

      saveToLS('allLists', state.lists);
    },
    editWord(state, action) {
      const { listName, engOld, engNew, rusNew } = action.payload;

      state.lists = state.lists.map((list) =>
        list.name === listName
          ? {
              ...list,
              words: list.words.map((word) =>
                word.eng === engOld ? { eng: engNew, rus: rusNew } : word
              ),
            }
          : list
      );

      saveToLS('allLists', state.lists);
    },
    deleteWord(state, action) {
      const obj = action.payload;
      // obj = { listName, eng}

      state.lists = state.lists.map((list) =>
        list.name === obj.listName
          ? { ...list, words: list.words.filter((word) => word.eng !== obj.eng) }
          : list
      );
      saveToLS('allLists', state.lists);
    },
  },
  extraReducers: {
    [getUserLists.pending]: (state) => {
      state.initLoading = true;
      state.message = null;
    },
    [getUserLists.fulfilled]: (state, action) => {
      const { lists, message } = action.payload;
      state.initLoading = false;
      state.message = message ?? null;
      state.lists = lists ?? [];
    },
    [getUserLists.rejected]: (state, action) => {
      const { message } = action.payload;
      state.initLoading = false;
      state.message = message;
      state.lists = [];
    },
  },
});

export const selectAllLists = (state) => state.lists.lists;

export const { createList, renameList, removeList, addWord, editWord, deleteWord, getDefault } =
  listSlice.actions;

export default listSlice.reducer;
