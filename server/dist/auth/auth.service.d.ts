import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/users.model';
import { LoginUserDto } from './dto/login-user.dto';
export declare class AuthService {
    private userService;
    private jwtService;
    constructor(userService: UsersService, jwtService: JwtService);
    login(userDto: LoginUserDto): Promise<{
        email: string;
        access_token: string;
    }>;
    registration(userDto: CreateUserDto): Promise<{
        email: string;
        access_token: string;
    }>;
    private generateToken;
    validateUser(email: string, password: string): Promise<User>;
    checkUser(token: string): Promise<string>;
}
