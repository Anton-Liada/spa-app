import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './roles.model';
export declare class RolesService {
    private roleRepository;
    constructor(roleRepository: typeof Role);
    getAllUsers(): Promise<Role[]>;
    createRole(payload: CreateRoleDto): Promise<Role>;
    getRoleByPosition(position: string): Promise<Role>;
    update(payload: CreateRoleDto): Promise<Role>;
}
