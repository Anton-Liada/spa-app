import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Status } from "/src/types/enums";
import axios from '../../axios';
import { ILogin, IUser, IUserState } from "/src/types/types";

export const fetchAuth = createAsyncThunk('auth/fetchAuth', async (params: ILogin) => {
  const { data } = await axios.post('auth/signin', params)

  return data;
})

const initialState: IUserState = {
  user: null,
  status: Status.IDLE,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchAuth.pending, (state) => {
        state.status = Status.LOADING;
      })
      .addCase(
        fetchAuth.fulfilled,
        (state, action: PayloadAction<IUser>) => {
          state.status = Status.SUCCEEDED;
          state.user = action.payload;
        })
      .addCase(fetchAuth.rejected, (state) => {
        state.status = Status.FAILED;
        state.error = 'error';
      });
  }
});

export const selectIsAuth = (state: { auth: { user: IUser | null } }) => (
  Boolean(state.auth.user)
);

export default authSlice.reducer;

export const { logout } = authSlice.actions;
