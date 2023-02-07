import { ICompany } from "../types/types";

export const updatedCompany = (company: ICompany, payload: ICompany) => {
  return Object.assign(company, payload);
};
