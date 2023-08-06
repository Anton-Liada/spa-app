import { CreateRoleDto } from './dto/create-role.dto';
import { RolesService } from './roles.service';
export declare class RolesController {
    private roleService;
    constructor(roleService: RolesService);
    getAll(): Promise<import("./roles.model").Role[]>;
    create(payload: CreateRoleDto): Promise<import("./roles.model").Role>;
    getByPosition(position: string): Promise<import("./roles.model").Role>;
    update(payload: CreateRoleDto): Promise<import("./roles.model").Role>;
}
