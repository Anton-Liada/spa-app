import { User } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from '../roles/roles.service';
import { AddRoleDto } from '../users/dto/add-role.dto';
export declare class UsersService {
    private userRepository;
    private roleService;
    constructor(userRepository: typeof User, roleService: RolesService);
    getAllUsers(): Promise<User[]>;
    getUserByEmail(email: string): Promise<User>;
    create(payload: CreateUserDto): Promise<User>;
    update(payload: CreateUserDto): Promise<User>;
    delete(id: number): Promise<void>;
    addRole(payload: AddRoleDto): Promise<AddRoleDto>;
}
