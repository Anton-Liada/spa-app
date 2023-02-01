import { Status } from "./enums";

export interface IUser {
  id: number;
  email: string;
  phone_number: number;
  last_name: string;
  first_name: string;
  nick_name: string;
  roles: string[];
  companies: ICompany[];
}

export interface ICompany {
  id: number;
  name: string;
  address: string;
  serviceOfActivity: string;
  userId: number;
  numberOfEmployees: number;
  author: IUser;
}

export interface ICompaniesState {
  companies: ICompany[];
  status: Status;
  error: null | string;
}

export interface IUserState {
  user: IUser | null;
  status: Status;
  error: null | string;
}

export interface ISelectedPage {
  selected: number;
}

export interface ILogin {
  email: string;
  password: string;
}
