import { configureStore } from '@reduxjs/toolkit';
import lists from './slices/lists';
import learn from './slices/learn';
import tests from './slices/tests';
import auth from './slices/auth';
import words from './slices/words';

export const store = configureStore({
  reducer: { auth, lists, learn, tests, words },
});
