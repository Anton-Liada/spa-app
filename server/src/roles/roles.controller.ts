import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Put, UseGuards } from '@nestjs/common/decorators';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesAuthGuard } from 'src/auth/guards/roles-auth.guard';
import { Roles } from 'src/auth/roles-auth.decorator';
import { CreateRoleDto } from './dto/create-role.dto';
import { RolesService } from './roles.service';

@UseGuards(JwtAuthGuard)
@Controller('roles')
export class RolesController {
  constructor(private roleService: RolesService) {}

  @Get()
  async getAll() {
    return await this.roleService.getAllUsers();
  }

  @Post()
  create(@Body() payload: CreateRoleDto) {
    return this.roleService.createRole(payload);
  }

  @Roles('ADMIN')
  @UseGuards(RolesAuthGuard)
  @Get('/:position')
  getByPosition(@Param('position') position: string) {
    return this.roleService.getRoleByPosition(position);
  }

  @Roles('ADMIN')
  @UseGuards(RolesAuthGuard)
  @Put()
  async update(@Body() payload: CreateRoleDto) {
    return await this.roleService.update(payload);
  }
}
