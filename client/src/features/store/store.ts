import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../slices/authSlice';
import copmpaniesSlice from '../slices/companiesSlice';

export const store = configureStore({
  reducer: {
    companies: copmpaniesSlice,
    auth: authSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
