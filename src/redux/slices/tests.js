import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getFromLS, saveToLS } from '../../utils/localStorage';
import axiosBase from '../../utils/axiosBase';

const initialState = {
  isTesting: false,
  isEngMode: true,
  testLists: getFromLS('testLists', []),
  testWords: [],
  initialWordsAmount: null,

  questWord: null,
  isLoading: false,
};

export const startTesting = createAsyncThunk('tests/startTesting', async (listIds) => {
  try {
    const { data } = await axiosBase.get(`/word/session/${listIds}`);
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const testSlice = createSlice({
  name: 'tests',
  initialState,
  reducers: {
    stopTest(state) {
      state.isTesting = false;
      state.testWords = [];
    },
    toggleTestList(state, action) {
      const listId = action.payload;

      if (!state.testLists.includes(listId)) {
        state.testLists = [...state.testLists, listId];
      } else {
        state.testLists = state.testLists.filter((lid) => lid !== listId);
      }

      saveToLS('testLists', state.testLists);
    },
    toggleMode(state) {
      state.isEngMode = !state.isEngMode;
    },
    chooseAllTestLists(state, action) {
      state.testLists = action.payload;

      saveToLS('testLists', state.testLists);
    },
    //remove word from test because user correctly translated the word
    removeTestWord(state, action) {
      state.testWords = state.testWords.filter((word) => word.eng !== action.payload.eng);
    },
    setNewQuestWord(state) {
      state.questWord = state.testWords[Math.floor(Math.random() * state.testWords.length)];
    },
  },
  extraReducers: {
    [startTesting.pending]: (state) => {
      state.isLoading = true;
      state.message = null;
    },
    [startTesting.fulfilled]: (state, action) => {
      const { sessionWords } = action.payload;
      state.isLoading = false;
      state.testWords = sessionWords;
      state.initialWordsAmount = sessionWords.length;

      state.questWord = state.testWords[Math.floor(Math.random() * state.testWords.length)];
      state.isTesting = true;
    },
    [startTesting.rejected]: (state, action) => {
      const { message } = action.payload;
      state.isLoading = false;
      state.message = message;
      state.testWords = [];
    },
  },
});

export const selectTesting = (state) => state.tests.isTesting;
export const selectTestLists = (state) => state.tests.testLists;
export const selectMode = (state) => state.tests.isEngMode;
export const selectTestWords = (state) => state.tests.testWords;
export const selectQuestWord = (state) => state.tests.questWord;

export const {
  stopTest,
  toggleTestList,
  toggleMode,
  chooseAllTestLists,
  removeTestWord,
  setNewQuestWord,
} = testSlice.actions;

export default testSlice.reducer;
