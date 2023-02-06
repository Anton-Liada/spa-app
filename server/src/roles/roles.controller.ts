import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { RolesService } from './roles.service';

@Controller('roles')
export class RolesController {
  constructor(private roleService: RolesService) {}

  @Post()
  create(@Body() payload: CreateRoleDto) {
    return this.roleService.createRole(payload);
  }

  @Get('/:position')
  getByPosition(@Param('position') position: string) {
    return this.roleService.getRoleByPosition(position);
  }
}
