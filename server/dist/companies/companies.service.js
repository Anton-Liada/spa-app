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
exports.CompaniesService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const companies_model_1 = require("./companies.model");
const common_2 = require("@nestjs/common");
let CompaniesService = class CompaniesService {
    constructor(companyRepository) {
        this.companyRepository = companyRepository;
    }
    async getAllCompanies() {
        return await this.companyRepository.findAll({ include: { all: true } });
    }
    async getCompanyById(id) {
        return await this.companyRepository.findOne({ where: { id } });
    }
    async getCompanyByName(name) {
        const company = await this.companyRepository.findOne({
            where: { name },
        });
        return company;
    }
    async create(payload) {
        const existingCompany = await this.getCompanyByName(payload.name);
        if (existingCompany) {
            throw new common_2.HttpException(`Company with ${existingCompany.name} already exists`, common_1.HttpStatus.BAD_REQUEST);
        }
        return await this.companyRepository.create(payload);
    }
    async update(payload) {
        const company = await this.getCompanyById(payload.id);
        if (!company) {
            throw new common_2.HttpException('Company does not exist', common_1.HttpStatus.BAD_REQUEST);
        }
        await company.update(payload);
        return company;
    }
    async delete(id) {
        const company = await this.getCompanyById(id);
        if (!company) {
            throw new common_2.HttpException('Company does not exist', common_1.HttpStatus.BAD_REQUEST);
        }
        const deleteCompany = await company.destroy();
        return deleteCompany;
    }
};
CompaniesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(companies_model_1.Company)),
    __metadata("design:paramtypes", [Object])
], CompaniesService);
exports.CompaniesService = CompaniesService;
//# sourceMappingURL=companies.service.js.map