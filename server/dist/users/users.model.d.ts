import { Model } from 'sequelize-typescript';
import { Company } from '../companies/companies.model';
import { Role } from '../roles/roles.model';
interface UserCreationAttrs {
    email: string;
    password: string;
    phone_number: string;
    last_name: string;
    first_name: string;
    nick_name: string;
}
export declare class User extends Model<User, UserCreationAttrs> {
    id: number;
    email: string;
    password: string;
    phone_number: string;
    last_name: string;
    first_name: string;
    nick_name: string;
    roles: Role[];
    companies: Company[];
}
export {};
