import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from '../../axios';
import { EMessages, Status } from '../../types/enums';
import { ICompaniesState, ICompany } from '../../types/types';
import { setError } from '/src/utils/setError';
import { setStatus } from '/src/utils/setStatus';
import { updatedCompany } from '/src/utils/updatedCompany';

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
  },
);

export const createNewCompany = createAsyncThunk(
  'companies/createNewCompany',
  async (company: ICompany) => {
    const { data } = await axios.post('companies', company);

    return data;
  },
);

export const updateCompany = createAsyncThunk(
  'companies/updateCompany',
  async (company: ICompany) => {
    const { data } = await axios.put(`companies`, company);

    return data;
  },
);

export const deleteCompany = createAsyncThunk(
  'companies/deleteCompany',
  async (id: number) => {
    await axios.delete(`companies/${id}`);

    return id;
  },
);

export const fetchOneCompany = createAsyncThunk(
  'companies/fetchOneCompany',
  async (id: number) => {
    const { data } = await axios.get(`companies/${id}`);

    return data;
  },
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
        },
      )
      .addCase(fetchCompanies.rejected, state => {
        return setError(state, EMessages.ERROR);
      });

    builder
      .addCase(createNewCompany.pending, setStatus)
      .addCase(
        createNewCompany.fulfilled,
        (state, action: PayloadAction<ICompany>) => {
          state.status = Status.SUCCEEDED;
          state.error = null;
          state.companies.push({ ...action.payload });
        },
      )
      .addCase(createNewCompany.rejected, state => {
        return setError(state, EMessages.ERROR_COMPANY_MSG);
      });

    builder
      .addCase(updateCompany.pending, setStatus)
      .addCase(
        updateCompany.fulfilled,
        (state, action: PayloadAction<ICompany>) => {
          state.status = Status.SUCCEEDED;
          const existingCompany = state.companies.find(company => {
            return company.id === action.payload.id;
          });

          if (existingCompany) {
            updatedCompany(existingCompany, action.payload);
          }

          if (state.selectedCompany) {
            updatedCompany(state.selectedCompany, action.payload);
          }
        },
      )
      .addCase(updateCompany.rejected, state => {
        return setError(state, EMessages.ERROR_COMPANY_MSG);
      });

    builder
      .addCase(
        deleteCompany.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.status = Status.SUCCEEDED;
          state.companies = state.companies.filter(
            company => company.id !== action.payload,
          );
        },
      )
      .addCase(deleteCompany.rejected, state => {
        return setError(state, EMessages.ERROR);
      });

    builder
      .addCase(fetchOneCompany.pending, setStatus)
      .addCase(
        fetchOneCompany.fulfilled,
        (state, action: PayloadAction<ICompany>) => {
          state.status = Status.SUCCEEDED;
          state.selectedCompany = action.payload;
        },
      )
      .addCase(fetchOneCompany.rejected, state => {
        return setError(state, EMessages.ERROR);
      });
  },
});

export default companiesSlice.reducer;
