import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';

@Injectable()
export class ProfileService {
  constructor(private userService: UsersService) {}

  async updateProfile(payload: CreateUserDto) {
    const existingUser = await this.userService.getUserByEmail(payload.email);

    if (!existingUser) {
      throw new HttpException('User does not exist', HttpStatus.BAD_REQUEST);
    }

    await existingUser.update(payload);

    return existingUser;
  }
}
