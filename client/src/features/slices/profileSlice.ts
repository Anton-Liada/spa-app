import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Status } from "/src/types/enums";
import { IProfileState, IUser } from "/src/types/types";
import axios from '../../axios';
import { setError, setStatus } from "/src/utils/utils";

export const fetchProfile = createAsyncThunk(
  'profile/fetchProfile',
  async () => {
    const { data } = await axios.get(`profile`);

    return data;
  }
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
        }
      )
      .addCase(fetchProfile.rejected, setError);
  }
})

export default profileSlice.reducer;