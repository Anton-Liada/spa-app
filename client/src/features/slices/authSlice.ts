import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from '../../axios';
import { EMessages, Status } from '../../types/enums';
import { IAuthState, ILogin, IUser } from '../../types/types';

export const fetchLogin = createAsyncThunk(
  'auth/fetchLogin',
  async (params: ILogin) => {
    const { data } = await axios.post('auth/signin', params);

    return data;
  },
);

export const fetchRegister = createAsyncThunk(
  'auth/fetchRegister',
  async (params: IUser) => {
    const { data } = await axios.post('auth/signup', params);

    return data;
  },
);

export const fetchAuth = createAsyncThunk('auth/fetchAuth', async () => {
  const { data } = await axios.get('auth/me');

  return data;
});

const initialState: IAuthState = {
  email: '',
  status: Status.IDLE,
  error: null,
};

const handlePending = (state: IAuthState) => {
  state.status = Status.LOADING;
};

const handleFulfilled = (state: IAuthState, action: PayloadAction<string>) => {
  state.status = Status.SUCCEEDED;
  state.email = action.payload;
};

const handleRejected = (state: IAuthState, message: EMessages) => {
  state.status = Status.FAILED;
  state.error = message;
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: state => {
      state.email = '';
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchLogin.pending, handlePending)
      .addCase(fetchLogin.fulfilled, (state, action) =>
        handleFulfilled(state, action),
      )
      .addCase(fetchLogin.rejected, state =>
        handleRejected(state, EMessages.LOGIN_ERROR_MSG),
      )

      .addCase(fetchAuth.pending, handlePending)
      .addCase(fetchAuth.fulfilled, (state, action) =>
        handleFulfilled(state, action),
      )
      .addCase(fetchAuth.rejected, state =>
        handleRejected(state, EMessages.ERROR),
      )

      .addCase(fetchRegister.pending, handlePending)
      .addCase(fetchRegister.fulfilled, (state, action) =>
        handleFulfilled(state, action),
      )
      .addCase(fetchRegister.rejected, state =>
        handleRejected(state, EMessages.REGISTER_ERROR_MSG),
      );
  },
});

export const selectIsLogin = (state: { auth: IAuthState }) =>
  Boolean(state.auth.email);

export default authSlice.reducer;

export const { logout } = authSlice.actions;
