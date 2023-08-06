import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
export declare class ProfileService {
    private userService;
    constructor(userService: UsersService);
    updateProfile(payload: CreateUserDto): Promise<import("../users/users.model").User>;
}
