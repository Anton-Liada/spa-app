import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from '../../axios';
import { Status } from '../../types/enums';
import { IUser, IUsersState } from '../../types/types';
import { setError } from '/src/utils/setError';
import { setStatus } from '/src/utils/setStatus';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const { data } = await axios.get('users');

  return data;
});

const initialState: IUsersState = {
  users: [],
  status: Status.IDLE,
  error: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchUsers.pending, setStatus)
      .addCase(
        fetchUsers.fulfilled,
        (state, action: PayloadAction<IUser[]>) => {
          state.status = Status.SUCCEEDED;
          state.users = action.payload.map(user => user);
        },
      )
      .addCase(fetchUsers.rejected, setError);
  },
});

export default usersSlice.reducer;
