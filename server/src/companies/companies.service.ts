import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UsersService } from 'src/users/users.service';
import { Company } from './companies.model';
import { CreateCompanyDto } from './dto/create-company.dto';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectModel(Company) private companyRepository: typeof Company,
    private usersService: UsersService,
  ) {}

  async getAllCompanies() {
    return await this.companyRepository.findAll({ include: { all: true } });
  }

  async getCompanyByTitle(name: string) {
    const company = await this.companyRepository.findOne({
      where: { name },
    });

    return company;
  }

  async createCompany(dto: CreateCompanyDto) {
    const company = await this.getCompanyByTitle(dto.name);

    if (company) {
      throw new ConflictException(`${dto.name} уже существует`);
    }

    return await this.companyRepository.create(dto);
  }
}
