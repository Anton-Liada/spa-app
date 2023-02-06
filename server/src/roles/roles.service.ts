import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './roles.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role) private roleRepository: typeof Role) {}

  async createRole(payload: CreateRoleDto) {
    const role = await this.roleRepository.create(payload);

    return role;
  }

  async getRoleByPosition(position: string) {
    const role = await this.roleRepository.findOne({
      where: { position },
    });

    return role;
  }
}
