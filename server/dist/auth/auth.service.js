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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const enums_1 = require("@nestjs/common/enums");
const exceptions_1 = require("@nestjs/common/exceptions");
const jwt_1 = require("@nestjs/jwt");
const users_service_1 = require("../users/users.service");
const bcrypt = require("bcryptjs");
const jwt_decode_1 = require("jwt-decode");
let AuthService = class AuthService {
    constructor(userService, jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }
    async login(userDto) {
        const user = await this.validateUser(userDto.email, String(userDto.password));
        return this.generateToken(user);
    }
    async registration(userDto) {
        const candidate = await this.userService.getUserByEmail(userDto.email);
        if (candidate) {
            throw new exceptions_1.HttpException(`User with ${candidate.email} already exist`, enums_1.HttpStatus.BAD_REQUEST);
        }
        const hashPassword = await bcrypt.hash(userDto.password, 5);
        const user = await this.userService.create(Object.assign(Object.assign({}, userDto), { password: hashPassword }));
        return this.generateToken(user);
    }
    async generateToken(user) {
        const payload = {
            email: user.email,
            id: user.id,
            roles: user.roles,
            companies: user.companies,
        };
        const existingUser = await this.userService.getUserByEmail(user.email);
        return {
            email: existingUser.email || user.email,
            access_token: this.jwtService.sign(payload),
        };
    }
    async validateUser(email, password) {
        const user = await this.userService.getUserByEmail(email);
        if (!user) {
            throw new exceptions_1.UnauthorizedException();
        }
        const passwordEquals = await bcrypt.compare(password, user.password);
        if (user && passwordEquals) {
            return user;
        }
        throw new exceptions_1.UnauthorizedException();
    }
    async checkUser(token) {
        if (token) {
            try {
                const decoded = (0, jwt_decode_1.default)(token);
                const existingUser = await this.userService.getUserByEmail(decoded.email);
                return existingUser.email;
            }
            catch (error) {
                return null;
            }
        }
        return null;
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map