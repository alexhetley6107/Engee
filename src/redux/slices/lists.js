import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
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

//lists
export const createNewList = createAsyncThunk('lists/createNewList', async (name) => {
  try {
    const { data } = await axiosBase.post(`/list`, { name });
    return data;
  } catch (error) {
    console.log(error);
  }
});
export const renameList = createAsyncThunk('lists/renameList', async (dto) => {
  const { id, name } = dto;

  try {
    const { data } = await axiosBase.put(`/list`, { id, name });
    return data;
  } catch (error) {
    console.log(error);
  }
});
export const deleteList = createAsyncThunk('lists/deleteList', async (id) => {
  try {
    const { data } = await axiosBase.delete(`/list/${id}`);
    return data;
  } catch (error) {
    console.log(error);
  }
});

//words
export const addNewWord = createAsyncThunk('words/addNewWord', async (dto) => {
  const { listId, eng, rus } = dto;
  try {
    const { data } = await axiosBase.post(`/word`, { listId, eng, rus });
    return data;
  } catch (error) {
    console.log(error);
  }
});
export const editWord = createAsyncThunk('words/editWord', async (dto) => {
  const { id, eng, rus } = dto;

  try {
    const { data } = await axiosBase.put(`/word`, { id, eng, rus });
    return data;
  } catch (error) {
    console.log(error);
  }
});
export const deleteWord = createAsyncThunk('words/deleteWord', async (dto) => {
  const { id, listId } = dto;
  try {
    const { data } = await axiosBase.delete(`/word/${id}/${listId}`);
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const listSlice = createSlice({
  name: 'lists',
  initialState,
  reducers: {
    setMessage(state, action) {
      state.message = action.payload;
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
    // create new list
    [createNewList.pending]: (state) => {
      state.isLoading = true;
      state.message = null;
    },
    [createNewList.fulfilled]: (state, action) => {
      const { newList, message } = action?.payload;
      state.isLoading = false;
      state.lists = [...state.lists, newList];
      state.message = message;
    },
    [createNewList.rejected]: (state, action) => {
      const { message } = action.payload;
      state.isLoading = false;
      state.message = message;
    },
    // rename list
    [renameList.pending]: (state) => {
      state.isLoading = true;
      state.message = null;
    },
    [renameList.fulfilled]: (state, action) => {
      const { list, message } = action?.payload;
      state.isLoading = false;
      state.message = message;
      state.lists = state.lists.map((l) => (l._id === list._id ? list : l));
    },
    [renameList.rejected]: (state, action) => {
      const { message } = action.payload;
      state.isLoading = false;
      state.message = message;
    },
    // delete list
    [deleteList.pending]: (state) => {
      state.isLoading = true;
      state.message = null;
    },
    [deleteList.fulfilled]: (state, action) => {
      const { id, message } = action.payload;
      state.isLoading = false;
      state.message = message;
      state.lists = state.lists.filter((l) => l._id !== id);
    },
    [deleteList.rejected]: (state, action) => {
      const { message } = action.payload;
      state.isLoading = false;
      state.message = message;
    },

    // add new word
    [addNewWord.pending]: (state) => {
      state.isLoading = true;
      state.message = null;
    },
    [addNewWord.fulfilled]: (state, action) => {
      const { word, message } = action?.payload;
      state.isLoading = false;
      state.message = message;
      state.fullListWords = [...state.fullListWords, word];
      state.lists = state.lists.map((l) =>
        l._id === word.placeListId ? { ...l, words: [...l.words, word._id] } : l
      );
    },
    [addNewWord.rejected]: (state, action) => {
      const { message } = action.payload;
      state.isLoading = false;
      state.message = message;
    },
    // edit word
    [editWord.pending]: (state) => {
      state.isLoading = true;
      state.message = null;
    },
    [editWord.fulfilled]: (state, action) => {
      const { word, message } = action?.payload;
      state.isLoading = false;
      state.message = message;
      state.fullListWords = state.fullListWords.map((w) => (w._id === word._id ? word : w));
    },
    [editWord.rejected]: (state, action) => {
      const { message } = action.payload;
      state.isLoading = false;
      state.message = message;
    },
    // delete word
    [deleteWord.pending]: (state) => {
      state.isLoading = true;
      state.message = null;
    },
    [deleteWord.fulfilled]: (state, action) => {
      const { id, listId, message } = action?.payload;
      state.isLoading = false;
      state.message = message;
      state.fullListWords = state.fullListWords.filter((w) => w._id !== id);
      state.lists = state.lists.map((l) =>
        l._id === listId ? { ...l, words: l.words.filter((w) => w !== id) } : l
      );
    },
    [deleteWord.rejected]: (state, action) => {
      const { message } = action.payload;
      state.isLoading = false;
      state.message = message;
    },
  },
});

export const selectAllLists = (state) => state.lists.lists;

export const { setMessage } = listSlice.actions;

export default listSlice.reducer;

/* createList(state, action) {
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
    }, */
