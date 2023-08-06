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
exports.RolesService = void 0;
const common_1 = require("@nestjs/common");
const roles_model_1 = require("./roles.model");
const sequelize_1 = require("@nestjs/sequelize");
const exceptions_1 = require("@nestjs/common/exceptions");
const enums_1 = require("@nestjs/common/enums");
let RolesService = class RolesService {
    constructor(roleRepository) {
        this.roleRepository = roleRepository;
    }
    async getAllRoles() {
        return await this.roleRepository.findAll({ include: { all: true } });
    }
    async createRole(payload) {
        const role = await this.roleRepository.create(payload);
        return role;
    }
    async getRoleByPosition(position) {
        const role = await this.roleRepository.findOne({
            where: { position },
        });
        return role;
    }
    async update(payload) {
        const existingUser = await this.roleRepository.findByPk(payload.id);
        if (!existingUser) {
            throw new exceptions_1.HttpException('User does not exist', enums_1.HttpStatus.BAD_REQUEST);
        }
        await existingUser.update(payload);
        return existingUser;
    }
};
RolesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(roles_model_1.Role)),
    __metadata("design:paramtypes", [Object])
], RolesService);
exports.RolesService = RolesService;
//# sourceMappingURL=roles.service.js.map