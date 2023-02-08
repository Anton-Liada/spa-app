import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from '../../axios';
import { EMessages, Status } from '../../types/enums';
import { IProfileState, IUser } from '../../types/types';
import { setError } from '/src/utils/setError';
import { setStatus } from '/src/utils/setStatus';

export const fetchProfile = createAsyncThunk(
  'profile/fetchProfile',
  async () => {
    const { data } = await axios.get(`profile`);

    return data;
  },
);

export const updateProfile = createAsyncThunk(
  'profile/updateProfile',
  async (user: IUser) => {
    const { data } = await axios.put(`profile`, user);

    return data;
  },
);

const initialState: IProfileState = {
  profile: null,
  status: Status.IDLE,
  error: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchProfile.pending, setStatus)
      .addCase(
        fetchProfile.fulfilled,
        (state, action: PayloadAction<IUser>) => {
          state.status = Status.SUCCEEDED;
          state.profile = action.payload;
        },
      )
      .addCase(fetchProfile.rejected, (state) => {
        setError(state, EMessages.ERROR)
      });

    builder
      .addCase(updateProfile.pending, setStatus)
      .addCase(
        updateProfile.fulfilled,
        (state, action: PayloadAction<IUser>) => {
          if (state.profile) {
            state.status = Status.SUCCEEDED;
            state.profile = Object.assign(state.profile, action.payload)
          }
        },
      )
      .addCase(updateProfile.rejected, (state) => {
        setError(state, EMessages.ERROR)
      });
  },
});

export default profileSlice.reducer;
