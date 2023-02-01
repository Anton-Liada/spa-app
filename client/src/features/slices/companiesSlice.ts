import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from '../../axios';
import { Status } from '/src/types/enums';
import { ICompany, ICompaniesState } from '/src/types/types';

const initialState: ICompaniesState = {
  companies: [],
  status: Status.IDLE,
  error: null,
};

export const fetchCompanies = createAsyncThunk(
  'companies/fetchCompanies',
  async () => {
    const { data } = await axios.get('companies');

    return data;
  }
);

const companiesSlice = createSlice({
  name: 'companies',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCompanies.pending, (state) => {
        state.status = Status.LOADING;
      })
      .addCase(
        fetchCompanies.fulfilled,
        (state, action: PayloadAction<ICompany[]>) => {
          state.status = Status.SUCCEEDED;
          state.companies = action.payload.map(article => article);
        })
      .addCase(fetchCompanies.rejected, (state) => {
        state.status = Status.FAILED;
        state.error = 'Companies can\'t be loaded';
      });
  },
});

export default companiesSlice.reducer;
