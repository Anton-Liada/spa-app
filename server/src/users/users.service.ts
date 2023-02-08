import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { User } from './users.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from '../roles/roles.service';
import { AddRoleDto } from '../users/dto/add-role.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private roleService: RolesService,
  ) {}

  async getAllUsers() {
    return await this.userRepository.findAll({ include: { all: true } });
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
      include: { all: true },
    });

    return user;
  }

  async create(payload: CreateUserDto) {
    const user = await this.userRepository.create(payload);
    const role = await this.roleService.getRoleByPosition('USER');
    await user.$set('roles', [role.id]);
    user.roles = [role];

    return user;
  }

  async update(payload: CreateUserDto) {
    const existingUser = await this.userRepository.findByPk(payload.id);

    if (!existingUser) {
      throw new HttpException('User does not exist', HttpStatus.BAD_REQUEST);
    }

    await existingUser.update(payload);

    return existingUser;
  }

  async delete(id: number) {
    const existingUser = await this.userRepository.findByPk(id);

    if (!existingUser) {
      throw new HttpException('User does not exist', HttpStatus.BAD_REQUEST);
    }

    const deleteUser = await existingUser.destroy();

    return deleteUser;
  }

  async addRole(payload: AddRoleDto) {
    const user = await this.userRepository.findByPk(payload.userId);
    const role = await this.roleService.getRoleByPosition(payload.position);

    if (role && user) {
      await user.$add('role', role.id);

      return payload;
    }

    throw new HttpException('User or role not found', HttpStatus.NOT_FOUND);
  }
}
