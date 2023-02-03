import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import jwt_decode from 'jwt-decode';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class ProfileService {
  constructor(private userService: UsersService) {}

  async findUser(token: string) {
    const decoded: CreateUserDto = jwt_decode(token);
    const existingUser = await this.userService.getUserByEmail(decoded.email);

    return existingUser;
  }
}
