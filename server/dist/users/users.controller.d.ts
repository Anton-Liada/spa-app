import { AddRoleDto } from '../users/dto/add-role.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
export declare class UsersController {
    private userService;
    constructor(userService: UsersService);
    create(payload: CreateUserDto): Promise<import("./users.model").User>;
    getAll(): Promise<import("./users.model").User[]>;
    addRole(payload: AddRoleDto): Promise<AddRoleDto>;
    update(payload: CreateUserDto): Promise<import("./users.model").User>;
    delete(id: string): Promise<void>;
}
