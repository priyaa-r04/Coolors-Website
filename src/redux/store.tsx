import { configureStore } from '@reduxjs/toolkit';
import colorsReducer from './colorSlice';
import authReducer from './authSlice';

export const store = configureStore({
  reducer: {
    colors: colorsReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
