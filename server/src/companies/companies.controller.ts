import { Body, Controller, Post } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';

@Controller('companies')
export class CompaniesController {
  constructor(private companiesService: CompaniesService) {}

  // @Post()
  // createCompany(@Body() dto: CreateCompanyDto) {
  //   return this.companiesService.createCompany(dto);
  // }
}
