import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';

@UseGuards(JwtAuthGuard)
@Controller('companies')
export class CompaniesController {
  constructor(private companiesService: CompaniesService) {}

  @Get()
  async getAll() {
    return await this.companiesService.getAllCompanies();
  }

  @Get('/:id')
  async getOne(@Param('id') id: string) {
    return await this.companiesService.getCompanyById(Number(id));
  }

  @Post()
  async createCompany(@Body() payload: CreateCompanyDto) {
    return await this.companiesService.create(payload);
  }

  @Put()
  async update(@Body() payload: CreateCompanyDto) {
    return await this.companiesService.update(payload);
  }

  @Delete('/:id')
  async delete(@Param('id') id: string) {
    return await this.companiesService.delete(Number(id));
  }
}
