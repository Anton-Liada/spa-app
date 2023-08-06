import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { ProfileService } from './profile.service';
export declare class ProfileController {
    private profileService;
    private userService;
    constructor(profileService: ProfileService, userService: UsersService);
    findUser(payload: {
        user: CreateUserDto;
    }): Promise<import("../users/users.model").User>;
    update(payload: CreateUserDto): Promise<import("../users/users.model").User>;
}
