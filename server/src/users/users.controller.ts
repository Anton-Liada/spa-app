import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesAuthGuard } from '../auth/guards/roles-auth.guard';
import { Roles } from '../auth/roles-auth.decorator';
import { AddRoleDto } from '../users/dto/add-role.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post()
  async create(@Body() payload: CreateUserDto) {
    return await this.userService.create(payload);
  }

  @Roles('ADMIN')
  @UseGuards(RolesAuthGuard)
  @Get()
  async getAll() {
    return await this.userService.getAllUsers();
  }

  @Roles('ADMIN')
  @UseGuards(RolesAuthGuard)
  @Post('/role')
  async addRole(@Body() payload: AddRoleDto) {
    return await this.userService.addRole(payload);
  }

  @Roles('ADMIN')
  @UseGuards(RolesAuthGuard)
  @Put()
  async update(@Body() payload: CreateUserDto) {
    return await this.userService.update(payload);
  }

  @Roles('ADMIN')
  @UseGuards(RolesAuthGuard)
  @Delete('/:id')
  async delete(@Param('id') id: string) {
    return await this.userService.delete(Number(id));
  }
}
