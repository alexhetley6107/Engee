import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getFromLS, saveToLS } from '../../utils/localStorage';
import axiosBase from '../../utils/axiosBase';

const initialState = {
  isLearning: false,
  learnLists: getFromLS('learnLists', []),
  learnWords: [],
  currentLearnWord: null,
  initialWordsAmount: null,
  isLoading: false,
};

export const startLearning = createAsyncThunk('learn/startLearning', async (listIds) => {
  try {
    const { data } = await axiosBase.get(`/word/session/${listIds}`);
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const learnSlice = createSlice({
  name: 'learn',
  initialState,
  reducers: {
    stopLearn(state) {
      state.isLearning = false;
      state.learnWords = [];
    },
    toggleLearnList(state, action) {
      const listId = action.payload;

      if (!state.learnLists.includes(listId)) {
        state.learnLists = [...state.learnLists, listId];
      } else {
        state.learnLists = state.learnLists.filter((lid) => lid !== listId);
      }

      saveToLS('learnLists', state.learnLists);
    },
    chooseAllLearnLists(state, action) {
      state.learnLists = action.payload;

      saveToLS('learnLists', state.learnLists);
    },
    removeLearnWord(state, action) {
      state.learnWords = state.learnWords.filter((word) => word.eng !== action.payload.eng);
      state.currentLearnWord =
        state.learnWords[Math.floor(Math.random() * state.learnWords.length)];
    },
  },
  extraReducers: {
    [startLearning.pending]: (state) => {
      state.isLoading = true;
      state.message = null;
    },
    [startLearning.fulfilled]: (state, action) => {
      const { sessionWords } = action.payload;
      state.isLoading = false;
      state.learnWords = sessionWords;
      state.initialWordsAmount = sessionWords.length;
      state.currentLearnWord =
        state.learnWords[Math.floor(Math.random() * state.learnWords.length)];
      state.isLearning = true;
    },
    [startLearning.rejected]: (state, action) => {
      const { message } = action.payload;
      state.isLoading = false;
      state.message = message;
      state.learnWords = [];
    },
  },
});

export const selectLearning = (state) => state.learn.isLearning;
export const selectLearnLists = (state) => state.learn.learnLists;
export const selectLearnWords = (state) => state.learn.learnWords;
export const selectCurrentLearnWord = (state) => state.learn.currentLearnWord;

export const { stopLearn, toggleLearnList, chooseAllLearnLists, removeLearnWord } =
  learnSlice.actions;

export default learnSlice.reducer;
