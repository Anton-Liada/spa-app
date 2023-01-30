import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from 'src/users/users.module';
import { User } from '../users/users.model';
import { CompaniesController } from './companies.controller';
import { Company } from './companies.model';
import { CompaniesService } from './companies.service';

@Module({
  providers: [CompaniesService],
  controllers: [CompaniesController],
  imports: [SequelizeModule.forFeature([User, Company]), UsersModule],
})
export class CompaniesModule {}
