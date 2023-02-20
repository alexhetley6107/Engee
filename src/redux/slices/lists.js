import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getFromLS, saveToLS } from '../../utils/localStorage';
import axiosBase from '../../utils/axiosBase';

const initialState = {
  lists: null, // null | []
  fullListWords: null, // null | []
  message: null,
  pageLoading: false,
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
export const getDefaultLists = createAsyncThunk('lists/getDefaultLists', async () => {
  try {
    const { data } = await axiosBase.get('/list/default');
    return data;
  } catch (error) {
    console.log(error);
  }
});
export const getFullListWords = createAsyncThunk('lists/getFullListWords', async (id) => {
  try {
    const { data } = await axiosBase.get(`/word/${id}`);
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
    //get users lists
    [getUserLists.pending]: (state) => {
      state.pageLoading = true;
      state.message = null;
    },
    [getUserLists.fulfilled]: (state, action) => {
      const { lists, message } = action.payload;
      state.pageLoading = false;
      state.message = message ?? null;
      state.lists = lists ?? [];
    },
    [getUserLists.rejected]: (state, action) => {
      const { message } = action.payload;
      state.pageLoading = false;
      state.message = message;
      state.lists = [];
    },
    // get default lists
    [getDefaultLists.pending]: (state) => {
      state.isLoading = true;
      state.message = null;
    },
    [getDefaultLists.fulfilled]: (state, action) => {
      const { lists } = action.payload;
      state.isLoading = false;
      state.lists = lists;
    },
    [getDefaultLists.rejected]: (state, action) => {
      const { message } = action.payload;
      state.isLoading = false;
      state.message = message;
      state.lists = [];
    },
    // get full list words
    [getFullListWords.pending]: (state) => {
      state.pageLoading = true;
      state.message = null;
    },
    [getFullListWords.fulfilled]: (state, action) => {
      const { words } = action.payload;
      state.pageLoading = false;
      state.fullListWords = words;
    },
    [getFullListWords.rejected]: (state, action) => {
      const { message } = action.payload;
      state.pageLoading = false;
      state.message = message;
      state.lists = [];
    },
  },
});

export const selectAllLists = (state) => state.lists.lists;

export const { createList, renameList, removeList, addWord, editWord, deleteWord, getDefault } =
  listSlice.actions;

export default listSlice.reducer;
