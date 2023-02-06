import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from '../../axios';
import { Status } from '/src/types/enums';
import { ICompany, ICompaniesState } from '/src/types/types';
import { setError, setStatus, updatedCompany } from '/src/utils/utils';

const initialState: ICompaniesState = {
  companies: [],
  selectedCompany: null,
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

export const createNewCompany = createAsyncThunk(
  'companies/createNewCompany',
  async (company: ICompany) => {
    try {
      const { data } = await axios.post('companies', company);

      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const updateCompany = createAsyncThunk(
  'companies/updateCompany',
  async (company: ICompany) => {
    const { data } = await axios.put(`companies`, company);

    return data;
  }
);

export const deleteCompany = createAsyncThunk(
  'companies/deleteCompany',
  async (id: number) => {
    await axios.delete(`companies/${id}`);

    return id;
  }
);

export const fetchOneCompany = createAsyncThunk(
  'companies/fetchOneCompany',
  async (id: number) => {
    const { data } = await axios.get(`companies/${id}`);

    return data;
  }
);

const companiesSlice = createSlice({
  name: 'companies',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCompanies.pending, setStatus)
      .addCase(
        fetchCompanies.fulfilled,
        (state, action: PayloadAction<ICompany[]>) => {
          state.status = Status.SUCCEEDED;
          state.companies = action.payload.map(company => company);
        })
      .addCase(fetchCompanies.rejected, setError);

    builder
      .addCase(createNewCompany.pending, setStatus)
      .addCase(
        createNewCompany.fulfilled, (state, action: PayloadAction<ICompany>) => {
          state.status = Status.SUCCEEDED;
          state.companies.push({ ...action.payload });
        }
      )
      .addCase(createNewCompany.rejected, setError);

    builder
      .addCase(updateCompany.pending, setStatus)
      .addCase(updateCompany.fulfilled, (state, action: PayloadAction<ICompany>) => {
        state.status = Status.SUCCEEDED;
        const existingCompany = state.companies.find((company) => {
          return company.id === action.payload.id;
        });

        if (existingCompany) {
          updatedCompany(existingCompany, action.payload);
        }

        if (state.selectedCompany) {
          updatedCompany(state.selectedCompany, action.payload);
        }
      })
      .addCase(updateCompany.rejected, setError);

    builder
      .addCase(deleteCompany.fulfilled, (state, action: PayloadAction<number>) => {
        state.status = Status.SUCCEEDED;
        state.companies = state.companies.filter(company => company.id !== action.payload);
      })
      .addCase(deleteCompany.rejected, setError);

    builder
      .addCase(fetchOneCompany.pending, setStatus)
      .addCase(
        fetchOneCompany.fulfilled,
        (state, action: PayloadAction<ICompany>) => {
          state.status = Status.SUCCEEDED;
          state.selectedCompany = action.payload;
        }
      )
      .addCase(fetchOneCompany.rejected, setError);
  },
});

export default companiesSlice.reducer;
