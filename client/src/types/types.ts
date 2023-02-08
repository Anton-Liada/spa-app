import { EMessages, Status } from './enums';

export interface IUser {
  id: number;
  email: string;
  phone_number: number | null;
  last_name: string;
  first_name: string;
  nick_name: string;
  roles?: IRoles[];
  companies?: ICompany[];
  password?: string;
}

export interface IRoles {
  position: string;
  description: string;
}

export interface ICompany {
  id: number;
  name: string;
  address: string;
  serviceOfActivity: string;
  userId: number;
  numberOfEmployees: number | null;
  type: string;
  author: IUser;
}

export interface ICompaniesState {
  companies: ICompany[];
  selectedCompany: ICompany | null;
  status: Status;
  error: EMessages | null;
}

export interface IAuthState {
  email: string;
  status: Status;
  error: EMessages | null;
}

export interface IUsersState {
  users: IUser[];
  status: Status;
  error: EMessages | null;
}

export interface IProfileState {
  profile: IUser | null;
  status: Status;
  error: null;
}

export interface ISelectedPage {
  selected: number;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface ISetStatus {
  status: Status;
}

export interface ISetError {
  status: Status;
  error: EMessages | null;
}
