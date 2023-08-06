import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    check(req: any): Promise<string>;
    login(payload: LoginUserDto): Promise<{
        email: string;
        access_token: string;
    }>;
    registration(payload: CreateUserDto): Promise<{
        email: string;
        access_token: string;
    }>;
}
