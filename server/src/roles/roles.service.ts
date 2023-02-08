import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './roles.model';
import { InjectModel } from '@nestjs/sequelize';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role) private roleRepository: typeof Role) {}

  async getAllUsers() {
    return await this.roleRepository.findAll({ include: { all: true } });
  }

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

  async update(payload: CreateRoleDto) {
    const existingUser = await this.roleRepository.findByPk(payload.id);

    if (!existingUser) {
      throw new HttpException('User does not exist', HttpStatus.BAD_REQUEST);
    }

    await existingUser.update(payload);

    return existingUser;
  }
}
