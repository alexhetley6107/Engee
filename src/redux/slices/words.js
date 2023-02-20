import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getFromLS, saveToLS } from '../../utils/localStorage';
import axiosBase from '../../utils/axiosBase';

const initialState = {
  message: null,
  pageLoading: false,
  isLoading: false,
};

export const wordSlice = createSlice({
  name: 'words',
  initialState,
  reducers: {},
  extraReducers: {},
});

// export const { addWord, editWord, deleteWord } = wordSlice.actions;

export default wordSlice.reducer;
