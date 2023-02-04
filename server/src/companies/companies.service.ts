import { ConflictException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UsersService } from 'src/users/users.service';
import { Company } from './companies.model';
import { CreateCompanyDto } from './dto/create-company.dto';
import { HttpException } from '@nestjs/common';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectModel(Company) private companyRepository: typeof Company,
    private usersService: UsersService,
  ) {}

  async getAllCompanies() {
    try {
      return await this.companyRepository.findAll({ include: { all: true } });
    } catch (error) {
      throw new Error('something went wrong');
    }
  }

  async getCompanyById(id: number) {
    try {
      return await this.companyRepository.findOne({ where: { id } });
    } catch (error) {
      throw new Error('something went wrong');
    }
  }

  async getCompanyByName(name: string) {
    const company = await this.companyRepository.findOne({
      where: { name },
    });

    return company;
  }

  async create(dto: CreateCompanyDto) {
    try {
      const company = await this.getCompanyByName(dto.name);

      if (company) {
        throw new ConflictException(`${company.name} already exist`);
      }

      return await this.companyRepository.create(dto);
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(dto: CreateCompanyDto) {
    try {
      const company = await this.getCompanyById(dto.id);

      if (!company) {
        throw new HttpException(
          'Company does not exist',
          HttpStatus.BAD_REQUEST,
        );
      }

      await company.update(dto);

      return company;
    } catch (error) {
      throw new Error('something went wrong');
    }
  }

  async delete(id: number) {
    try {
      const company = await this.getCompanyById(id);

      if (!company) {
        throw new HttpException(
          'Company does not exist',
          HttpStatus.BAD_REQUEST,
        );
      }

      const deleteCompany = await company.destroy();

      return deleteCompany;
    } catch (error) {
      throw new Error('something went wrong');
    }
  }
}
