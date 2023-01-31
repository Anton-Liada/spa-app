export interface IUser {
  id: number;
  email: string;
  phone_number: number;
  last_name: string;
  first_name: string;
  nick_name: string;
  roles: string[];
  companies: ICompanies[];
}

export interface ICompanies {
  id: number;
  name: string;
  address: string;
  serviceOfActivity: string;
  userId: number;
  numberOfEmployees: number;
  author: IUser;
}
