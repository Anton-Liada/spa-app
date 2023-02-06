import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from '../../axios';
import { Status } from '../../types/enums';
import { IProfileState, IUser } from '../../types/types';
import { setError, setStatus } from '../../utils/utils';

export const fetchProfile = createAsyncThunk(
  'profile/fetchProfile',
  async () => {
    const { data } = await axios.get(`profile`);

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
      .addCase(fetchProfile.rejected, setError);
  },
});

export default profileSlice.reducer;
