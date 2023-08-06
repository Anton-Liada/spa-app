import { Model } from 'sequelize-typescript';
import { User } from 'src/users/users.model';
interface CompanyCreationAttrs {
    id: number;
    userId: number;
    name: string;
    address: string;
    serviceOfActivity: string;
    numberOfEmployees: number;
}
export declare class Company extends Model<Company, CompanyCreationAttrs> {
    id: number;
    name: string;
    address: string;
    serviceOfActivity: string;
    userId: number;
    numberOfEmployees: number;
    type: string;
    author: User;
}
export {};
