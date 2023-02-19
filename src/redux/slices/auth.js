import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosBase from '../../utils/axiosBase';

const initialState = {
  user: null,
  token: null,
  isLoading: false,
  status: null,
};

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async ({ username, password }) => {
    try {
      const { data } = await axiosBase.post('/auth/register', { username, password });

      if (data.token) {
        window.localStorage.setItem('token', data.token);
      }
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: {
    [registerUser.pending]: (state) => {
      state.isLoading = true;
      state.status = null;
    },
    [registerUser.fulfilled]: (state, action) => {
      const { message, user, token } = action.payload;
      state.isLoading = false;
      state.status = message;
      state.user = user;
      state.token = token;
    },
    [registerUser.rejected]: (state, action) => {
      const { message } = action.payload;

      state.isLoading = false;
      state.status = message;
    },
  },
});

export default authSlice.reducer;
