import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';

@Controller('companies')
export class CompaniesController {
  constructor(private companiesService: CompaniesService) {}

  // @UseGuards(LocalAuthGuard)
  @Get()
  getAll() {
    return this.companiesService.getAllCompanies();
  }

  @Post()
  createCompany(@Body() dto: CreateCompanyDto) {
    return this.companiesService.createCompany(dto);
  }
}
