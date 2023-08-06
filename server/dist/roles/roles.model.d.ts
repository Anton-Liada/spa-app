import { Model } from 'sequelize-typescript';
import { User } from 'src/users/users.model';
interface RoleCreationAttrs {
    position: string;
    description: string;
}
export declare class Role extends Model<Role, RoleCreationAttrs> {
    id: number;
    position: string;
    description: string;
    users: User[];
}
export {};
