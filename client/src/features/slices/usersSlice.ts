import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Status } from "/src/types/enums";
import axios from '../../axios';
import { IUser, IUsersState } from "/src/types/types";
import { setError, setStatus } from "/src/utils/utils";

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async () => {
    const { data } = await axios.get('users');

    return data;
  }
);

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
        })
      .addCase(fetchUsers.rejected, setError);
  }
});

export default usersSlice.reducer;