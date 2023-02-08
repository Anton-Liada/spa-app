import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Company } from './companies.model';
import { CreateCompanyDto } from './dto/create-company.dto';
import { HttpException } from '@nestjs/common';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectModel(Company) private companyRepository: typeof Company,
  ) {}

  async getAllCompanies() {
    return await this.companyRepository.findAll({ include: { all: true } });
  }

  async getCompanyById(id: number) {
    return await this.companyRepository.findOne({ where: { id } });
  }

  async getCompanyByName(name: string) {
    const company = await this.companyRepository.findOne({
      where: { name },
    });

    return company;
  }

  async create(payload: CreateCompanyDto) {
    const existingCompany = await this.getCompanyByName(payload.name);

    if (existingCompany) {
      throw new HttpException(
        `Company with ${existingCompany.name} already exists`,
        HttpStatus.BAD_REQUEST,
      );
    }

    return await this.companyRepository.create(payload);
  }

  async update(payload: CreateCompanyDto) {
    const company = await this.getCompanyById(payload.id);

    if (!company) {
      throw new HttpException('Company does not exist', HttpStatus.BAD_REQUEST);
    }

    await company.update(payload);

    return company;
  }

  async delete(id: number) {
    const company = await this.getCompanyById(id);

    if (!company) {
      throw new HttpException('Company does not exist', HttpStatus.BAD_REQUEST);
    }

    const deleteCompany = await company.destroy();

    return deleteCompany;
  }
}
