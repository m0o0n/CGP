import { configureStore, combineReducers } from '@reduxjs/toolkit';
import constructorReducer from './constructorReducer';

const reducers = combineReducers({
  Constructor: constructorReducer,
});

export const setupStore = () => configureStore({
  reducer: reducers,
});
