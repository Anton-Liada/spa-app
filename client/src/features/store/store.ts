import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../slices/authSlice';
import copmpaniesSlice from '../slices/companiesSlice';
import profileSlice from '../slices/profileSlice';
import usersSlice from '../slices/usersSlice';

export const store = configureStore({
  reducer: {
    companies: copmpaniesSlice,
    auth: authSlice,
    users: usersSlice,
    profile: profileSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
