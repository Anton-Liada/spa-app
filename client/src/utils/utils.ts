import { Status } from "../types/enums";
import { ICompany, ISetError, ISetStatus } from "../types/types";

export const setStatus = (state: ISetStatus): void => {
  state.status = Status.LOADING;
};

export const setError = (state: ISetError): void => {
  state.status = Status.FAILED;
  state.error = 'Something went wrong';
};

export const filteredText = (text: string, values: string) => {
  return text.toLowerCase().includes(values.toLowerCase());
};

export const filteredCompaniesByTitle = (articles: ICompany[], value: string) => {
  return articles.filter(({ name }) => filteredText(name, value));
};

export const updatedCompany = (company: ICompany, payload: ICompany) => {
  return Object.assign(company, payload);
}