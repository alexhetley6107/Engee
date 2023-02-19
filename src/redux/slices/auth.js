import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosBase from '../../utils/axiosBase';

const initialState = {
  user: null,
  token: null,
  isLoading: false,
  message: null,
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
export const loginUser = createAsyncThunk('auth/loginUser', async ({ username, password }) => {
  try {
    const { data } = await axiosBase.post('/auth/login', { username, password });

    if (data.token) {
      window.localStorage.setItem('token', data.token);
    }
    return data;
  } catch (error) {
    console.log(error);
  }
});
export const getMe = createAsyncThunk('auth/getMe', async () => {
  try {
    const { data } = await axiosBase.get('/auth/me');

    return data;
  } catch (error) {
    console.log(error);
  }
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.isLoading = false;
      state.message = null;
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: {
    [registerUser.pending]: (state) => {
      state.isLoading = true;
      state.message = null;
    },
    [registerUser.fulfilled]: (state, action) => {
      const { message, user, token } = action.payload;
      state.isLoading = false;
      state.message = message;
      state.user = user;
      state.token = token;
    },
    [registerUser.rejected]: (state, action) => {
      const { message } = action.payload;
      state.isLoading = false;
      state.message = message;
    },
    [loginUser.pending]: (state) => {
      state.isLoading = true;
      state.message = null;
    },
    [loginUser.fulfilled]: (state, action) => {
      const { message, user, token } = action.payload;
      state.isLoading = false;
      state.message = message;
      state.user = user;
      state.token = token;
    },
    [loginUser.rejected]: (state, action) => {
      const { message } = action.payload;
      state.isLoading = false;
      state.message = message;
    },
    [getMe.pending]: (state) => {
      state.isLoading = true;
      state.message = null;
    },
    [getMe.fulfilled]: (state, action) => {
      const { user, token } = action.payload;
      state.isLoading = false;
      state.message = null;
      state.user = user ?? null;
      state.token = token ?? null;
    },
    [getMe.rejected]: (state, action) => {
      const { message } = action.payload;
      state.isLoading = false;
      state.message = message;
    },
  },
});

export const { logout } = authSlice.actions;

export const checkIsAuth = (state) => !!state.auth.token;

export default authSlice.reducer;
