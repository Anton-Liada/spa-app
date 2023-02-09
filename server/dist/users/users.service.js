"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const users_model_1 = require("./users.model");
const sequelize_1 = require("@nestjs/sequelize");
const roles_service_1 = require("../roles/roles.service");
let UsersService = class UsersService {
    constructor(userRepository, roleService) {
        this.userRepository = userRepository;
        this.roleService = roleService;
    }
    async getAllUsers() {
        return await this.userRepository.findAll({ include: { all: true } });
    }
    async getUserByEmail(email) {
        const user = await this.userRepository.findOne({
            where: { email },
            include: { all: true },
        });
        return user;
    }
    async create(payload) {
        const user = await this.userRepository.create(payload);
        const role = await this.roleService.getRoleByPosition('USER');
        await user.$set('roles', [role.id]);
        user.roles = [role];
        return user;
    }
    async update(payload) {
        const existingUser = await this.userRepository.findByPk(payload.id);
        if (!existingUser) {
            throw new common_1.HttpException('User does not exist', common_1.HttpStatus.BAD_REQUEST);
        }
        await existingUser.update(payload);
        return existingUser;
    }
    async delete(id) {
        const existingUser = await this.userRepository.findByPk(id);
        if (!existingUser) {
            throw new common_1.HttpException('User does not exist', common_1.HttpStatus.BAD_REQUEST);
        }
        const deleteUser = await existingUser.destroy();
        return deleteUser;
    }
    async addRole(payload) {
        const user = await this.userRepository.findByPk(payload.userId);
        const role = await this.roleService.getRoleByPosition(payload.position);
        if (role && user) {
            await user.$add('role', role.id);
            return payload;
        }
        throw new common_1.HttpException('User or role not found', common_1.HttpStatus.NOT_FOUND);
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(users_model_1.User)),
    __metadata("design:paramtypes", [Object, roles_service_1.RolesService])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map