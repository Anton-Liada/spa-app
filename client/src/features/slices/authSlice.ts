import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from '../../axios';
import { Status } from '../../types/enums';
import { IAuthState, ILogin, IUser } from '../../types/types';
import { setError, setStatus } from '../../utils/utils';

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
      .addCase(fetchLogin.pending, setStatus)
      .addCase(fetchLogin.fulfilled, (state, action: PayloadAction<string>) => {
        state.status = Status.SUCCEEDED;
        state.email = action.payload;
      })
      .addCase(fetchLogin.rejected, setError);

    builder
      .addCase(fetchAuth.pending, setStatus)
      .addCase(fetchAuth.fulfilled, (state, action: PayloadAction<string>) => {
        state.status = Status.SUCCEEDED;
        state.email = action.payload;
      })
      .addCase(fetchAuth.rejected, setError);

    builder
      .addCase(fetchRegister.pending, setStatus)
      .addCase(
        fetchRegister.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.status = Status.SUCCEEDED;
          state.email = action.payload;
        },
      )
      .addCase(fetchRegister.rejected, setError);
  },
});

export const selectIsLogin = (state: { auth: { email: string } }) =>
  Boolean(state.auth.email);

export default authSlice.reducer;

export const { logout } = authSlice.actions;
