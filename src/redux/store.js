import { configureStore } from '@reduxjs/toolkit';
import lists from './slices/lists';
import learn from './slices/learn';
import tests from './slices/tests';

export const store = configureStore({
	reducer: { lists, learn, tests },
});
