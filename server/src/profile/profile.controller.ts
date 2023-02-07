import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { Body, Put } from '@nestjs/common/decorators';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { ProfileService } from './profile.service';

@UseGuards(JwtAuthGuard)
@Controller('profile')
export class ProfileController {
  constructor(
    private profileService: ProfileService,
    private userService: UsersService,
  ) {}

  @Get()
  async findUser(@Request() payload: { user: CreateUserDto }) {
    return await this.userService.getUserByEmail(payload.user.email);
  }

  @Put()
  async update(@Body() payload: CreateUserDto) {
    return await this.profileService.updateProfile(payload);
  }
}
